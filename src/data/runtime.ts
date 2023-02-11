import { getRuntime as rntm } from "@astrojs/cloudflare/runtime";
import { KVNamespace } from "@cloudflare/workers-types";

export type RuntimeEnv = {
  PROXY_API_ARL: string;
  LANGS: string;
  DANCE_KV: KVNamespace;
}

export function getRuntime(request: Request) {
  return rntm<RuntimeEnv>(request);
}