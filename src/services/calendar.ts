import { getEnv, getKV } from "./cloudflare";
import { getAccessToken } from "./auth";
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
  timestamp?: number;
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

export async function events({ start: st, end: ed }: { start: string | Date; end: string | Date }, request: Request): Promise<Array<EventType> | null> {

  const { GOOGLE_CALENDAR_ID, GOOGLE_SERVICE_ADDRESS } = getEnv(request);
  try {

    const start = (typeof st === 'string' ? st : st.toISOString()).split("T")[0];
    const end = (typeof ed === 'string' ? ed : ed.toISOString()).split("T")[0];

    if (!start || !end || !GOOGLE_SERVICE_ADDRESS) throw new Error('Undefined');
    const startDateTime = `${start}T00:00:01Z`;
    const endDateTime = `${end}T23:59:59Z`;

    const authorization = await getAccessToken(GOOGLE_SERVICE_ADDRESS, SCOPES, undefined, await getKV(request));

    const googleUrl = new URL(`https://www.googleapis.com/calendar/v3/calendars/${GOOGLE_CALENDAR_ID}/events`);
    googleUrl.searchParams.append('timeMin', startDateTime);
    googleUrl.searchParams.append('timeMax', endDateTime);

    const eventsResponse = await fetch(googleUrl, {
      headers: {
        "Authorization": authorization
      }
    });

    const data = (await eventsResponse.json()) as { items: Array<GoogleEventType> };
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

      let listEvents: Array<EventType>;
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
    return events;
  } catch (error) {
    console.warn(error.stack);
    return null;
  }
};
