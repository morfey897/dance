import type { PagesRuntime } from "@astrojs/cloudflare/runtime";
import { getRuntime } from "@astrojs/cloudflare/runtime";

export async function get(params, ctx) {
  const runtime = getRuntime(params.request) as PagesRuntime;
  const KV = runtime.data;
  const lang = runtime?.env['DEFAULT_LANG'];
  // 
  // console.log('TEST');
  const product = { lang: 'lang', rn: { ...runtime, "KV": KV, "DANCE_KV": runtime.env['DANCE_KV']  }, loc: lang };//await getProduct(id);

  if (!product) {
    return new Response(null, {
      status: 404,
      statusText: 'Not found'
    });
  }

  return new Response(JSON.stringify(product), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
}