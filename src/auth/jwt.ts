// import jwt from '@tsndr/cloudflare-worker-jwt'

type JSON_FILE = {
  client_email: string;
  private_key: string;
  private_key_id: string;
  token_uri: string
};

export async function generateJWT(credentinal: JSON_FILE, scopes: Array<string> | string): Promise<{ token: string, exp: number } | null> {

  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 3600;
  const payload = {
    iss: credentinal.client_email,
    scope: Array.isArray(scopes) ? scopes.join(' ') : scopes,
    aud: credentinal.token_uri,
    exp,
    iat,
  }

  let token = null;
  try {
    const jwt = await import('@tsndr/cloudflare-worker-jwt');
    token = await jwt.sign(payload, credentinal.private_key, { algorithm: 'RS256', header: null });
  } catch (e) {
    return null;
  }
  return { token, exp };
}

export async function generateAccessToken(credentinal: JSON_FILE, scopes: Array<string> | string): Promise<{ access_token: string; token_type: string; expires_in: number } | null> {

  const jwt = await generateJWT(credentinal, scopes);
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