import { getRuntime } from "./runtime";

export function getLangs(request: Request): Array<string> {
  const runtime = getRuntime(request);
  const value: string = runtime?.env['LANGS'] || import.meta.env.LANGS || "";
  return value.split(",");
} 