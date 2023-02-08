import type { Context } from "./type";

export async function onRequestGet(context: Context) {
  const countStr = await context.env.DANCE_KV.get('count');
  let count = parseInt(countStr);

  return new Response(JSON.stringify({ count: isNaN(count) ? 0 : count }), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
}

export async function onRequestPost(context: Context) {
  console.log('POST');
  const countStr = await context.env.DANCE_KV.get('count');
  let count = parseInt(countStr);
  if (isNaN(count)) {
    count = 0;
  }
  count += 1;
  await context.env.DANCE_KV.put('count', String(count));
  return new Response(JSON.stringify({ count: count }), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
}