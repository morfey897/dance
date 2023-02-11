import { getRuntime } from "./runtime";

export async function getCount(request: Request) {
  const runtime =  getRuntime(request);
  let count: number | null;
  if (runtime) {
    let result = parseInt(await runtime.env.DANCE_KV.get('count'));
    count = (isNaN(result) ? 0 : result) + 1;
    await runtime.env.DANCE_KV.put('count', String(count))
  } else {
    count = null;
  }
  return count;
};