type PayloadType = {
  iss: string;
  scope: string;
  aud: string;
  exp: number;
  iat: number;
}

type JSON_FILE = {
  client_email: string;
  private_key: string;
  private_key_id: string;
  token_uri: string
};

function toBase64URL(json: any) {
  const jsonString = JSON.stringify(json);
  const btyeArray = Buffer.from(jsonString);
  return btyeArray.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

async function _generateJWT_WebCrypto(payload: PayloadType, secret: string) {
  let token: string | null = null;
  const options = { algorithm: 'RS256', header: null };
  try {
    const jwt = await import('@tsndr/cloudflare-worker-jwt');
    token = await jwt.sign(payload, secret, options);
  } catch (error) {
    console.warn('SubtleCrypto not supported!');
    token = null;
  }
  return token;
}

async function _generateJWT_NodeCrypto(payload: PayloadType, secret: string) {
  let token: string | null = null;
  const header = {
    alg: "RS256",
    typ: "JWT"
  };
  try {
    const encodedHeader = toBase64URL(header);
    const encodedPayload = toBase64URL(payload);
    const crypto = await import('crypto');
    const signer = crypto.createSign("RSA-SHA256");
    signer.write(encodedHeader + "." + encodedPayload);
    signer.end();
    const signature = signer.sign(secret, "base64");
    const encodedSignature = signature.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
    token = `${encodedHeader}.${encodedPayload}.${encodedSignature}`;
  } catch (error) {
    console.warn('Crypto not supported!');
    token = null;
  }
  return token;
}

async function generateJWT(credentinal: JSON_FILE, scopes: Array<string>, expires_in: number = 3600): Promise<{ token: string, exp: number } | null> {

  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + expires_in;
  const payload: PayloadType = {
    iss: credentinal.client_email,
    scope: scopes.join(' '),
    aud: credentinal.token_uri,
    exp,
    iat,
  };

  let token = await _generateJWT_WebCrypto(payload, credentinal.private_key);
  if (!token) {
    token = await _generateJWT_NodeCrypto(payload, credentinal.private_key);
  }

  return token ? { token, exp } : null;
}

/**
 * Generate a new access token
 * @param credentinal 
 * @param scopes 
 * @param expires_in 
 * @returns 
 */
export async function generateNewAccessToken(credentinal: JSON_FILE, scopes: Array<string>, expires_in: number = 3600): Promise<{ access_token: string; token_type: string; expires_in: number } | null> {
  const jwt = await generateJWT(credentinal, scopes, expires_in);
  if (!jwt) return null;
  try {
    const url = new URL(credentinal.token_uri);
    url.searchParams.append('grant_type', 'urn:ietf:params:oauth:grant-type:jwt-bearer');
    url.searchParams.append('assertion', jwt.token);

    const response = await fetch(url, {
      method: "POST",
    });
    const { access_token, token_type } = (await response.json()) as { access_token: string, token_type: string; expires_in: number };
    return { access_token, token_type, expires_in: jwt.exp };
  } catch (e) {

  }
  return null;
}

/**
 * Get access token from cache or generate a new one
 * @param credentinal 
 * @param scopes 
 * @param expires_in 
 * @returns 
 */
export async function getAccessToken(
  credentinal: JSON_FILE,
  scopes: Array<string>,
  expires_in: number | undefined,
  cache: { get: (key: string) => Promise<string>; put: (key: string, value: string) => Promise<string> }
): Promise<string | null> {
  let authorization: string | null = null;
  const key = `AUTH_${scopes.map(sc => sc.split("/").reverse()[0]).join('-')}_${credentinal.client_email}`;
  try {
    let tokenJSON = await cache.get(key);
    if (tokenJSON) {
      const { token_type, access_token, expires_in: exp } = JSON.parse(tokenJSON);
      if (parseInt(exp) - 1000 > Math.floor(Date.now() / 1000) && token_type && access_token) {
        authorization = `${token_type} ${access_token}`;
      }
    }
  } catch (e) {

  }
  if (!authorization) {
    try {
      const accessToken = await generateNewAccessToken(credentinal, scopes, expires_in);
      if (accessToken) {
        const { token_type, access_token, expires_in: exp } = accessToken;
        await cache.put(key, JSON.stringify({ token_type, access_token, expires_in: exp }));
        authorization = `${token_type} ${access_token}`
      }
    } catch (error) {

    }
  }
  return authorization;
}