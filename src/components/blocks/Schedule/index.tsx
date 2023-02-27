import { useEffect, useReducer, useState } from "react";
import { addDays, nextMonday, previousMonday } from "date-fns";
import { enUS, ru, uk } from 'date-fns/locale'
import GridHeader from "./GridHeader";
import ChangeDate from "./ChangeDate";
import Grid from "./Grid";
import type { GridState, DateAction, EventsType } from "./types";

import { fetchEvents } from "../../../__mocdata/events";

const HEADLINE = 'Розклад';
const SUBHEADLINE = '';
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

function Schedule() {

  const [state, dispatch] = useReducer(reducer, undefined, init);
  const [events, setEvents] = useState<EventsType | undefined>();

  useEffect(() => {
    fetchEvents(toDate(state.dates[0]), toDate(state.dates[state.dates.length - 1])).then(events => setEvents(events.map(data => ({ ...data, date: new Date(data.date) }))));
  }, [state]);

  return <section className="w-full relative z-20">
    <div className="max-w-screen-xl mx-auto px-4 pt-4 pb-16">
      <h2 className="uppercase text-2xl md:text-7xl text-center">{HEADLINE}</h2>
      <p className="text-xs md:text-base mt-7 max-w-screen-md m-auto text-center">{SUBHEADLINE}</p>
      <ChangeDate onNext={() => dispatch({ type: 'inc' })} onPrev={() => dispatch({ type: 'dec' })} onNow={() => dispatch({ type: 'now' })} state={state} />
      <GridHeader onSelectDate={(d) => dispatch({ type: 'active', payload: d })} state={state} />
      <Grid state={state} events={events} />
    </div>
  </section>;
}

export default Schedule;