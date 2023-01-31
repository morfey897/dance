import type { APIRoute } from 'astro';

export const get: APIRoute = () => {
  const serverUrl = import.meta.env.DEFAULT_LANG;
  return {
    body: JSON.stringify({
      message: "This was a GET!: " + serverUrl
    })
  }
}