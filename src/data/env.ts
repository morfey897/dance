import { getRuntime } from "./runtime";

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