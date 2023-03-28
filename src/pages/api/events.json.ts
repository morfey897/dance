import type { APIRoute } from 'astro';
import { getGoogleServiceAddress, getGoogleCalendarId } from "../../data/env";
import { get as getKV, put as putKV } from "../../data/kv";
import { generateAccessToken } from "../../auth/jwt";

type EventType = {
  uid: string;
  date: string;
  time: string;
  duration: number;
  direction: string;
  gym: string;
  info?: string;
}

const SCOPES = [
  'https://www.googleapis.com/auth/calendar',
  'https://www.googleapis.com/auth/calendar.events',
];

export const get: APIRoute = async ({ params, request }) => {
  const credentinal = getGoogleServiceAddress(request);
  const calendarId = getGoogleCalendarId(request);
  try {
    let url = new URL(request.url);
    const start = (url?.searchParams?.get('start') || '').split("T")[0];
    const end = (url?.searchParams?.get('end') || '').split("T")[0];

    if (!start || !end || !credentinal) throw new Error('Undefined');

    let authorization = "";
    try {
      let tokenJSON = await getKV(`ACCESS_TOKEN_${credentinal.client_email}`, request);
      const { token_type, access_token, expires_in } = JSON.parse(tokenJSON);
      if (parseInt(expires_in) - 1000  > Math.floor(Date.now() / 1000) && token_type && access_token) {
        authorization = `${token_type} ${access_token}`;
      }
    } catch (e) {
      authorization = "";
    }
    if (!authorization) {
      const { token_type, access_token, expires_in } = await generateAccessToken(credentinal, SCOPES);
      await putKV({ key: `ACCESS_TOKEN_${credentinal.client_email}`, value: { token_type, access_token, expires_in } }, request);
      authorization = `${token_type} ${access_token}`
    }

    let googleUrl = new URL(`https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`);
    googleUrl.searchParams.append('timeMin', `${start}T00:00:01Z`);
    googleUrl.searchParams.append('timeMax', `${end}T23:59:59Z`);

    const eventsList = await fetch(googleUrl, {
      headers: {
        "Authorization": authorization
      }
    });

    const data = (await eventsList.json()) as { items: Array<{ id: string; summary: string; description: string; location: string; start: { dateTime: string; }; end: { dateTime: string; } }> };
    let events: Array<EventType> = data.items?.map((itm) => ({
      uid: itm.id,
      direction: itm.summary,
      info: itm.description,
      gym: itm.location,
      date: itm.start.dateTime.split('T')[0],
      time: itm.start.dateTime.split('T')[1].match(/\d{1,2}:\d{1,2}/)[0],
      duration: Math.ceil((new Date(itm.end.dateTime).getTime() - new Date(itm.start.dateTime).getTime()) / (1000 * 60)),
      timestamp: new Date(itm.start.dateTime).getTime(),
    })).sort((a, b) => a.timestamp - b.timestamp);
    return {
      body: JSON.stringify({
        success: true,
        events: events || [],
        start,
        end
      })
    }
  } catch (error) {
    return {
      body: JSON.stringify({
        success: false,
        error: error.stack,
      })
    }
  }
};
