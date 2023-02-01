import { getRuntime } from "@astrojs/cloudflare/runtime";

export async function get(params, ctx) {
  const runtime = getRuntime(params.request);
  const lang = runtime?.env['DEFAULT_LANG'];
  // 
  // console.log('TEST');
  const product = { lang: 'lang', rn: {...runtime}, loc: lang };//await getProduct(id);

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