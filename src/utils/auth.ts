import { Base64 } from "js-base64";

type JSON_FILE = {
  client_email: string;
  private_key: string;
  private_key_id: string;
  token_uri: string
};

async function pemToPrivateKey(privateKey: string) {
  const pem = privateKey.replace(/\n/g, '');
  const pemHeader = '-----BEGIN PRIVATE KEY-----';
  const pemFooter = '-----END PRIVATE KEY-----';

  if (!pem.startsWith(pemHeader) || !pem.endsWith(pemFooter)) {
    throw new Error('Invalid service account private key');
  }

  const pemContents = pem.substring(pemHeader.length, pem.length - pemFooter.length);

  const algorithm = {
    name: 'RSASSA-PKCS1-v1_5',
    hash: {
      name: 'SHA-256',
    }
  };

  const buffer = Base64.toUint8Array(pemContents);

  const result = await crypto.subtle.importKey('pkcs8', buffer, algorithm, false, ['sign']);

  return result;
}

export async function generateJWT(jsonFile: JSON_FILE, scopes: Array<string> | string) {
  const header = {
    alg: "RS256",
    typ: "JWT",
    kid: jsonFile.private_key_id,
  };
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 3600;
  const payload = {
    iss: jsonFile.client_email,
    sub: jsonFile.client_email,
    iat,
    exp,
    scope: Array.isArray(scopes) ? scopes.join(' ') : scopes,
    aud: jsonFile.token_uri,
    //"https://www.googleapis.com/oauth2/v4/token"
  }

  const encodedHeader = Base64.toBase64(JSON.stringify(header));
  const encodedPayload = Base64.toBase64(JSON.stringify(payload));

  const textEncoder = new TextEncoder()
  const inputArrayBuffer = textEncoder.encode(`${encodedHeader}.${encodedPayload}`)

  // const client = new SubtleCrypto();
  const outputArrayBuffer = await crypto.subtle.sign(
    { name: 'RSASSA-PKCS1-v1_5' },
    await pemToPrivateKey(jsonFile.private_key),
    inputArrayBuffer
  )

  const encodedSignature = Base64.fromUint8Array(new Uint8Array(outputArrayBuffer), true);
  const token = `${encodedHeader}.${encodedPayload}.${encodedSignature}`;
  return token;

}

export async function generateAccessToken(jsonFile: JSON_FILE, scopes: Array<string> | string) {

  const token = await generateJWT(jsonFile, scopes);
console.log('token', token);
  const response = await fetch(`${jsonFile.token_uri}?grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${token}`, {
    method: 'POST',
    headers: {
      'ContentType': 'application/x-www-form-urlencoded'
    }
  });

  const content = await response.json();
  return content;
}