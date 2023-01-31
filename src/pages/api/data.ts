import type { APIRoute } from 'astro';

export const get: APIRoute = (params) => {
  const serverUrl = JSON.stringify(params);//import.meta.env.DEFAULT_LANG;
  return {
    body: JSON.stringify({
      message: "This was a GET!: " + serverUrl
    })
  }
}