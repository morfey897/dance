import { env_PROXY_API_ARL } from "../utils/env";

export async function get(request: Request) {
  const proxy = env_PROXY_API_ARL(request);
  const url = `${proxy.replace(/\/+/, "")}/api/test`;
  // let response: Response = await fetch(url);
  // let data = await response.json();
  return { data: 'FETCH', url };
}