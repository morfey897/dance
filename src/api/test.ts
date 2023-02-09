import { env_PROXY_API_ARL } from "../utils/env";

export async function get(request: Request) {
  const proxy = env_PROXY_API_ARL(request);
  const url = `${proxy}/api/test`;

  // fetch(url, {
  //   method: "GET"
  // })
  //   .catch(e => console.log(e));
  // console.log('url', url);
  // let response:Response = await fetch(url);
  // let data = await response.json();
  return { data: url };
}