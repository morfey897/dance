import { getRuntime } from "@astrojs/cloudflare/runtime";

export async function get(params) {
  // const id = params.id;

  const lang = getRuntime(params.request)?.env['DEFAULT_LANG'];
  const product = {lang};//await getProduct(id);

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