type JSON_FILE = {
  client_email: string;
  private_key: string;
  private_key_id: string;
  token_uri: string
};

async function generateJWT(credentinal: JSON_FILE, scopes: Array<string>, expires_in: number = 3600): Promise<{ token: string, exp: number } | null> {

  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + expires_in;
  const payload = {
    iss: credentinal.client_email,
    scope: scopes.join(' '),
    aud: credentinal.token_uri,
    exp,
    iat,
  };

  let token = null;
  try {
    const jwt = await import('@tsndr/cloudflare-worker-jwt');
    token = await jwt.sign(payload, credentinal.private_key, { algorithm: 'RS256', header: null });
  } catch (e) {
    return null;
  }
  return { token, exp };
}

/**
 * Generate a new access token
 * @param credentinal 
 * @param scopes 
 * @param expires_in 
 * @returns 
 */
export async function generateNewAccessToken(credentinal: JSON_FILE, scopes: Array<string>, expires_in: number = 3600): Promise<{ access_token: string; token_type: string; expires_in: number } | null> {

  try {
    if (import.meta.env.GENERATE_ACCESS_TOKEN) {
      const url = new URL(import.meta.env.GENERATE_ACCESS_TOKEN);
      url.searchParams.append('expired_in', '3600');
      url.searchParams.append('scopes', scopes.join(" "));

      const responseLocaly = await fetch(url);
      const { access_token, token_type, expires_in } = (await responseLocaly.json()) as { access_token: string, token_type: string; expires_in: number };
      return { access_token, token_type, expires_in };
    }
  } catch (error) {
    console.log(error);
  }

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
): Promise<string> {
  let authorization = "";
  const key = `${scopes.map(sc => sc.split("/").reverse[0]).join('-')}_${credentinal.client_email}`;
  try {
    let tokenJSON = await cache.get(key);
    const { token_type, access_token, expires_in: exp } = JSON.parse(tokenJSON);
    if (parseInt(exp) - 1000 > Math.floor(Date.now() / 1000) && token_type && access_token) {
      authorization = `${token_type} ${access_token}`;
    }
  } catch (e) {
    authorization = "";
  }
  if (!authorization) {
    const { token_type, access_token, expires_in: exp } = await generateNewAccessToken(credentinal, scopes, expires_in);
    await cache.put(key, JSON.stringify({ token_type, access_token, expires_in: exp }));
    authorization = `${token_type} ${access_token}`
  }
  return authorization;
}