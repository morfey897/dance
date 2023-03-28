import jwt from '@tsndr/cloudflare-worker-jwt'

type JSON_FILE = {
  client_email: string;
  private_key: string;
  private_key_id: string;
  token_uri: string
};

export async function generateAccessToken(credentinal: JSON_FILE, scopes: Array<string> | string) {

  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 3600;
  const payload = {
    iss: credentinal.client_email,
    scope: Array.isArray(scopes) ? scopes.join(' ') : scopes,
    aud: credentinal.token_uri,
    exp,
    iat,
  }

  let token = undefined;
  try {
    token = await jwt.sign(payload, credentinal.private_key, { algorithm: 'RS256', header: null });
  } catch (e) {
    token = e;
  }
  const url = new URL(credentinal.token_uri);
  url.searchParams.append('grant_type', 'urn:ietf:params:oauth:grant-type:jwt-bearer');
  url.searchParams.append('assertion', token);

  const response = await fetch(url, {
    method: "POST",
  });
  const { access_token, token_type } = (await response.json()) as { access_token: string, token_type: string };

  return { access_token, token_type };
}