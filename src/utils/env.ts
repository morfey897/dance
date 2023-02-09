import { getRuntime } from "@astrojs/cloudflare/runtime";

export function env_PROXY_API_ARL(request: Request) {
  const runtime = getRuntime(request);
  const value: string = runtime?.env['PROXY_API_ARL'] || import.meta.env.PROXY_API_ARL;
  return `${value} && rn = ${typeof runtime}`;
} 