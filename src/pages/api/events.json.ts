import type { APIRoute } from 'astro';
import { events } from '../../services/calendar';

export const get: APIRoute = async ({ params, request }) => {
  let url = new URL(request.url);
  const start = (url?.searchParams?.get('start') || '').split("T")[0];
  const end = (url?.searchParams?.get('end') || '').split("T")[0];

  const response = await events({ start, end }, request);
  const success = !!response;
  return {
    body: JSON.stringify({
      success,
      ...(success ? { events: response } : { error: 'Not found' }),
      start,
      end
    })
  }
};
