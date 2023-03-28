type JSON_FILE = {
  client_email: string;
  private_key: string;
  private_key_id: string;
  token_uri: string
};

async function generateJWT(credentinal: JSON_FILE, scopes: Array<string> | string, expires_in: number = 3600): Promise<{ token: string, exp: number } | null> {

  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + expires_in;
  const payload = {
    iss: credentinal.client_email,
    scope: Array.isArray(scopes) ? scopes.join(' ') : scopes,
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

export async function generateAccessToken(credentinal: JSON_FILE, scopes: Array<string> | string, expires_in: number = 3600): Promise<{ access_token: string; token_type: string; expires_in: number } | null> {

  try {
    if (import.meta.env.GENERATE_ACCESS_TOKEN) {
      const url = new URL(import.meta.env.GENERATE_ACCESS_TOKEN);
      url.searchParams.append('expired_in', '3600');
      url.searchParams.append('scopes', Array.isArray(scopes) ? scopes.join(" ") : scopes);

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