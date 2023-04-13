import { useReducer } from "react";
import { addDays, previousMonday, differenceInDays } from "date-fns";
import { enUS, ru, uk } from 'date-fns/locale'
import GridHeader from "./GridHeader";
import ChangeDate from "./ChangeDate";
import Grid from "./Grid";
import type { GridState, DateAction, ScheduleType, EventType, PropsType } from "../../../types/ui";
import useSWR from 'swr';
import { toDate } from "../../../utils/data";

import Section from "../../elements/Section";
import Headline from "../../elements/Headline";
import RenderHTML from "../../elements/RenderHTML";
import { filterContent } from "../../../utils/md";
import { translateJSON } from "../../../services/translate";
import { useEnv } from "../../providers/EnvProvider";
import { useInView } from 'react-intersection-observer';

export async function getProps({ content, lang, request }: PropsType): Promise<ScheduleType> {

  const indexDirection = filterContent(content, /\/content\/schedule\/(?:[\w\d\/-]+).md$/)[0];

  const scheduleProps = {
    ...indexDirection?.frontmatter,
    bodyHTML: indexDirection?.compiledContent(),
  };

  const translation = await translateJSON(
    {
      target: lang,
      content: {
        schedule: scheduleProps,
      },
    },
    request
  );

  return {
    ...scheduleProps,
    ...translation?.schedule,
  } as ScheduleType;
}


const LOCALES = {
  uk: uk,
  ru: ru,
  en: enUS,
};

const DAYS = new Array(7).fill(0).map((_, index) => index);

const generateDates = (array: Array<number>, active: Date) => array.map((index) => addDays(active, index));

function init({ lang }: { lang: string }) {
  const now = new Date(toDate(new Date()));
  const active = previousMonday(now);
  return {
    now,
    active: now,
    locale: LOCALES[lang] || uk,
    dates: generateDates(DAYS.map((index) => index), active),
  }
}

function reducer(state: GridState, action: DateAction): GridState {
  switch (action.type) {
    case 'now': {
      const now = new Date(toDate(new Date()));
      const active = previousMonday(now);
      return {
        ...state,
        active: now,
        dates: generateDates(DAYS.map((index) => index), active),
      };
    }
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

function InnerGrid({ timeLabel, todayLabel }: { timeLabel: string; todayLabel: string; }) {

  const { LANG } = useEnv();

  const [state, dispatch] = useReducer(reducer, { lang: LANG }, init);
  const { data: events, error, isLoading } = useSWR(`/api/events.json?start=${toDate(state.dates[0])}&end=${toDate(state.dates[state.dates.length - 1])}`, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return <>
    <ChangeDate
      className="mt-12"
      state={state}
      todayLabel={todayLabel}
      onNext={() => dispatch({ type: 'inc' })}
      onPrev={() => dispatch({ type: 'dec' })}
      onNow={() => dispatch({ type: 'now' })} />
    <GridHeader timeLabel={timeLabel} onSelectDate={(d) => dispatch({ type: 'active', payload: d })} state={state} />
    <Grid state={state} events={events} loading={isLoading} />
  </>
}

function Schedule({ headline, subheadline, anchor, timeLabel, todayLabel, bodyHTML }: ScheduleType) {

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return <Section anchor={anchor}>
    <Headline headline={headline} subheadline={subheadline}>
      <RenderHTML>{bodyHTML}</RenderHTML>
    </Headline>
    <div ref={ref}>
      {inView && <InnerGrid timeLabel={timeLabel} todayLabel={todayLabel} />}
    </div>
  </Section>;
}

export default Schedule;