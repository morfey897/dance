import { getRuntime } from "./runtime";

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

export function getLangs(request: Request): Array<string> {
  const runtime = getRuntime(request);
  const value: string = runtime?.env['LANGS'] || import.meta.env.LANGS;
  return value.split(",");
}

export function getGoogleApiKey(request: Request): string {
  const runtime = getRuntime(request);
  const value: string = runtime?.env['GOOGLE_API_KEY'] || import.meta.env.GOOGLE_API_KEY;
  return value;
}

export function getGoogleCalendarId(request: Request): string {
  const runtime = getRuntime(request);
  const value: string = runtime?.env['GOOGLE_CALENDAR_ID'] || import.meta.env.GOOGLE_CALENDAR_ID;
  return value;
}

export function getGoogleServiceAddress(request: Request): CredentialType | undefined {
  const runtime = getRuntime(request);
  const value: string = runtime?.env['GOOGLE_SERVICE_ADDRESS'] || import.meta.env.GOOGLE_SERVICE_ADDRESS;
  let credentinal: CredentialType;
  try {
    credentinal = JSON.parse(import.meta.env.GOOGLE_SERVICE_ADDRESS);
  } catch (e) { }
  return credentinal;
}