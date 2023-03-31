import type { APIRoute } from 'astro';
import { getGoogleServiceAddress, getGoogleCalendarId } from "../../data/env";
import { get as getKV, put as putKV } from "../../data/kv";
import { generateAccessToken } from "../../auth/jwt";
import { rrulestr } from "rrule";

type EventType = {
  uid: string;
  date: string;
  time: string;
  duration: number;
  trainer: string;
  direction: string;
  gym: string;
  info?: string;
}

type GoogleEventType = {
  id: string;
  summary: string;
  description: string;
  location: string;
  recurrence: Array<string>;
  start: { dateTime: string; timeZone: string };
  end: { dateTime: string; timeZone: string };
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
    const TOKEN_KV = `ACCESS_TOKEN_${credentinal.client_email}`;
    const startDateTime = `${start}T00:00:01Z`;
    const endDateTime = `${end}T23:59:59Z`;
    try {
      let tokenJSON = await getKV(TOKEN_KV, request);
      const { token_type, access_token, expires_in } = JSON.parse(tokenJSON);
      if (parseInt(expires_in) - 1000 > Math.floor(Date.now() / 1000) && token_type && access_token) {
        authorization = `${token_type} ${access_token}`;
      }
    } catch (e) {
      authorization = "";
    }
    if (!authorization) {
      const { token_type, access_token, expires_in } = await generateAccessToken(credentinal, SCOPES);
      await putKV({ key: TOKEN_KV, value: { token_type, access_token, expires_in } }, request);
      authorization = `${token_type} ${access_token}`
    }

    let googleUrl = new URL(`https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`);
    googleUrl.searchParams.append('timeMin', startDateTime);
    googleUrl.searchParams.append('timeMax', endDateTime);

    const eventsList = await fetch(googleUrl, {
      headers: {
        "Authorization": authorization
      }
    });

    const data = (await eventsList.json()) as { items: Array<GoogleEventType> };
    let events: Array<EventType> = data.items?.reduce((list, { id, summary, description, location, start: startEvent, end: endEvent, recurrence }) => {
      const [direction, trainer] = summary.split("|").map(a => a.trim());
      const [startDateOnly, startTiemOnly] = startEvent.dateTime.split('T');
      const time = startTiemOnly.match(/\d{1,2}:\d{1,2}/)[0] || "01:00";
      const rule = recurrence && recurrence[0] || "";
      const item = {
        uid: id,
        direction: direction || "",
        trainer: trainer || "",
        info: description,
        gym: location,
        time: time,
        duration: Math.ceil((new Date(endEvent.dateTime).getTime() - new Date(startEvent.dateTime).getTime()) / (1000 * 60)),
      };

      let listEvents;
      if (!rule) {
        listEvents = [{ ...item, date: startDateOnly, timestamp: new Date(startEvent.dateTime).getTime() }];
      } else {
        const rrulePatern = `DTSTART:${startDateOnly.replace(/[^\d]/g, "")}T${time.replace(/[^\d]/g, "")}00Z\n${rule}`;
        try {
          listEvents = rrulestr(rrulePatern)
            .between(new Date(start), new Date(end))
            .map(date => ({
              ...item,
              date: date.toISOString().split("T")[0],
              timestamp: date.getTime(),
            }))
        } catch (error) { 
          console.log(error, rrulePatern);
        }
      }

      return list.concat(Array.isArray(listEvents) ? listEvents : []);
    }, []).sort((a, b) => a.timestamp - b.timestamp);
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
