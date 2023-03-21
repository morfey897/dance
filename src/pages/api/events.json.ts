import type { APIRoute } from 'astro';
import { getGoogleServiceAddress, getGoogleCalendarId } from "../../data/env";
import { calendar, auth } from "@googleapis/calendar"

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
  try {
    let url = new URL(request.url);
    const start = (url?.searchParams?.get('start') || '').split("T")[0];
    const end = (url?.searchParams?.get('end') || '').split("T")[0];
    if (start && end && credentinal) {
      let inst = calendar("v3");
      let response = await inst.events.list({
        auth: new auth.JWT(credentinal.client_email, null, credentinal.private_key, SCOPES),
        calendarId: getGoogleCalendarId(request),
        timeMin: `${start}T00:00:01Z`,
        timeMax: `${end}T23:59:59Z`,
      });
      let events = response.data.items?.map(itm => ({
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
    }
  } catch (error) {
    console.error(error);
    return {
      body: JSON.stringify({
        success: false,
        error: error.stack,
      })
    }
  }
};
