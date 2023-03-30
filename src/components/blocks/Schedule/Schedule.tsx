import { useEffect, useMemo, useReducer } from "react";
import { addDays, previousMonday, differenceInDays } from "date-fns";
import { enUS, ru, uk } from 'date-fns/locale'
import GridHeader from "./GridHeader";
import ChangeDate from "./ChangeDate";
import Grid from "./Grid";
import type { GridState, DateAction, ScheduleType, EventType } from "./types";
import useSWR from 'swr';
import { toDate } from "../../../utils/data";

import Section from "../../elements/Section";
import Headline from "../../elements/Headline";

const DAYS = new Array(7).fill(0).map((_, index) => index);

const generateDates = (array: Array<number>, active: Date) => array.map((index) => addDays(active, index));

function init() {
  const now = new Date(toDate(new Date()));
  const active = previousMonday(now);
  return {
    now,
    active: now,
    locale: uk,
    dates: generateDates(DAYS.map((index) => index), active),
  }
}

function reducer(state: GridState, action: DateAction): GridState {
  switch (action.type) {
    case 'now':
      return init();
    case 'inc': {
      const active = addDays(state.dates[0], 7);
      return {
        ...state,
        active,
        dates: generateDates(DAYS, active),
      }
    }
    case 'dec': {
      const active = addDays(state.dates[0], -7);
      return {
        ...state,
        active,
        dates: generateDates(DAYS, active),
      }
    }
    case 'active': {
      return {
        ...state,
        active: action.payload,
      }
    }
    default:
      throw new Error();
  }
}

const fetcher = (url: string) => fetch(url)
  .then(r => r.json())
  .then(({ success, events, start, end, error }: { events: Array<EventType>; start: string; end: string; success: boolean; error?: string; }) => {
    if (!success) throw new Error(error);
    const startDate = new Date(start);
    let list = new Array(differenceInDays(new Date(end), startDate) + 1).fill(0).map((_, index) => {
      let d = addDays(startDate, index);
      return {
        date: d,
        list: events.filter(event => event.date === toDate(d))
      }
    });
    return list
  });

function Schedule({ headline, subheadline, anchor, timeLabel, children }: ScheduleType) {

  const [state, dispatch] = useReducer(reducer, undefined, init);
  const { data: events, error, isLoading } = useSWR(`/api/events.json?start=${toDate(state.dates[0])}&end=${toDate(state.dates[state.dates.length - 1])}`, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return <Section anchor={anchor}>
    <Headline headline={headline} subheadline={subheadline}>
      {children}
    </Headline>
    <ChangeDate
      className="mt-12"
      state={state}
      onNext={() => dispatch({ type: 'inc' })}
      onPrev={() => dispatch({ type: 'dec' })}
      onNow={() => dispatch({ type: 'now' })} />
    <GridHeader timeLabel={timeLabel} onSelectDate={(d) => dispatch({ type: 'active', payload: d })} state={state} />
    <Grid state={state} events={events} loading={isLoading} />
  </Section>;
}

export default Schedule;