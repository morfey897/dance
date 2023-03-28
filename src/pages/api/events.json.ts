import type { APIRoute } from 'astro';
import { getGoogleServiceAddress, getGoogleCalendarId } from "../../data/env";
import { generateAccessToken } from "../../utils/auth";

type EventType = {
  uid: string;
  date: string;
  time: string;
  duration: number;
  direction: string;
  gym: string;
  info?: string;
}

type JSON_FILE = {
  client_email: string;
  private_key: string;
  token_uri: string
};

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

    const token = await generateAccessToken(credentinal, SCOPES);

    let googleUrl = new URL(`https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`);
    googleUrl.searchParams.append('timeMin', `${start}T00:00:01Z`);
    googleUrl.searchParams.append('timeMax', `${end}T23:59:59Z`);

    const eventsList = await fetch(googleUrl, {
      headers: {
        "Authorization": `${token.token_type} ${token.access_token}`
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
        token,
        url: googleUrl,
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
