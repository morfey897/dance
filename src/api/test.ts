import { env_PROXY_API_ARL } from "../utils/env";

export async function get(request: Request) {
  const proxy = env_PROXY_API_ARL(request);
  const url = `${proxy.replace(/\/+$/, "")}/api/test`;

  let data = await new Promise((res, rej) => {
    fetch(url)
      .then((response: Response) => response.json())
      .then(data => res(data))
      .catch((e: Error) => res(e.message));
  });
  return { data, url };
}