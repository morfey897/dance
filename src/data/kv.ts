import { getRuntime } from "./runtime";

export async function get(key: string, request: Request): Promise<string | null> {
  const runtime = getRuntime(request);
  const KV = runtime?.env?.DANCE_KV;
  if (!KV) return null;
  const value: string = await KV.get(key);
  return value;
}

export async function put(data: { key: string; value: any }, request: Request): Promise<string | null> {
  const runtime = getRuntime(request);
  const KV = runtime?.env?.DANCE_KV;
  if (!KV) return null;
  const value = JSON.stringify(data.value);
  await KV.put(data.key, value);
  return value;
}

export async function del(key: string, request: Request): Promise<void | null> {
  const runtime = getRuntime(request);
  const KV = runtime?.env?.DANCE_KV;
  if (!KV) return null;
  await KV.delete(key);
  return;
}