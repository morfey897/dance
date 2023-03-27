import jwt from '@tsndr/cloudflare-worker-jwt'
import type { APIRoute } from 'astro';
import { getGoogleServiceAddress, getGoogleCalendarId } from "../../data/env";

type CredentialType = {
  type: string;
  project_id: string;
  private_key_id: string;
  private_key: string;
  client_email: string;
  client_id: string;
  auth_uri: string;
  token_uri: string;
};


const SCOPES = [
  'https://www.googleapis.com/auth/calendar',
  'https://www.googleapis.com/auth/calendar.events',
];

export const get: APIRoute = async ({ params, request }) => {
  const credentinal = getGoogleServiceAddress(request);
  const header = {
    alg: 'RS256',
    typ: 'JWT',
    kid: credentinal.private_key_id,
  };
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 3600;
  const payload = {
    iss: credentinal.client_email,
    sub: credentinal.client_email,
    iat,
    exp,
    scope: Array.isArray(SCOPES) ? SCOPES.join(' ') : SCOPES,
    aud: credentinal.token_uri,
    //"https://www.googleapis.com/oauth2/v4/token"
  }

  let token = undefined;
  try {
    token = await jwt.sign(payload, credentinal.private_key, { header });
  } catch(e) {

  }
  
  return new Response(token, {
    headers: {
      "Content-Type": "application/json"
    }
  });
}