import { useEffect, useReducer, useState } from "react";
import { addDays, nextMonday, previousMonday, differenceInDays } from "date-fns";
import { enUS, ru, uk } from 'date-fns/locale'
import GridHeader from "./GridHeader";
import ChangeDate from "./ChangeDate";
import Grid from "./Grid";
import type { GridState, DateAction, EventsType, ScheduleType, EventType } from "./types";

import Section from "../../elements/Section";
import Headline from "../../elements/Headline";

const DAYS = new Array(7).fill(0).map((_, index) => index);

const generateDates = (array: Array<number>, active: Date) => array.map((index) => addDays(active, index));
const toDate = (d: Date) => d.toISOString().split('T')[0];

function init() {
  const now = new Date(toDate(new Date()));
  return {
    now,
    active: now,
    change: 0,
    locale: uk,
    dates: generateDates(DAYS.map((index) => index - 1), now),
  }
}

function reducer(state: GridState, action: DateAction): GridState {
  let change = state.change;
  switch (action.type) {
    case 'now':
      return init();
    case 'inc': {
      change = state.change + 1;
      break;
    }
    case 'dec': {
      change = state.change - 1;
      break;
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
  let newState: GridState = state;
  if (change == 0) {
    newState = init();
  } else {
    const start = change > 0 ? nextMonday(state.now) : previousMonday(state.now);
    newState = {
      ...state,
      change,
      active: start,
      dates: generateDates(DAYS, start),
    };
    if (change > 1 || change < -1) {
      const sign = (change - (change > 0 ? -1 : 1)) * 7;
      const start = addDays(newState.dates[0], sign);
      newState = {
        ...newState,
        active: start,
        dates: generateDates(DAYS, start),
      }
    }
  }

  return newState;
}

function Schedule({ headline, subheadline, anchor, timeLabel, children }: ScheduleType) {

  const [state, dispatch] = useReducer(reducer, undefined, init);
  const [events, setEvents] = useState<EventsType>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    setLoading(true);
    fetch(`/api/events.json?start=${toDate(state.dates[0])}&end=${toDate(state.dates[state.dates.length - 1])}`, { signal })
      .then((response: Response) => response.json())
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
      })
      .then((list) => {
        setEvents(list);
      })
      .catch((e) => {
        console.warn(e);
      })
      .finally(() => {
        setLoading(false);
      });
    return () => {
      controller.abort();
    }
  }, [state.dates]);

  useEffect(() => {
    console.log('RENDERING', events, loading);
  })

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
    <Grid state={state} events={events} loading={loading} />
  </Section>;
}

export default Schedule;