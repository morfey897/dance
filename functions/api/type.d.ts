import { EventContext, KVNamespace } from "@cloudflare/workers-types";
export type Context<Data = {}> = EventContext<{ DANCE_KV: KVNamespace; }, string, Data>;