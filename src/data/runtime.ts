import { getRuntime as rntm } from "@astrojs/cloudflare/runtime";
import { KVNamespace } from "@cloudflare/workers-types";

export type RuntimeEnv = {
  LANGS: string;
  DANCE_KV: KVNamespace;
}

export function getRuntime(request: Request) {
  return rntm<RuntimeEnv>(request);
}