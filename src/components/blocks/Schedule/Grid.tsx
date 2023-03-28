import clsx from "clsx";
import { useMemo } from "react";
import type { GridState, EventsType, EventType, DateType } from "./types";
import Indicator from "../../elements/IngIndicator";
import Tooltip from "../../elements/Tooltip";
import { toDate } from "../../../utils/data";

function Grid({ state, events, loading }: { state: GridState; events: EventsType; loading: boolean } & React.HTMLProps<HTMLDivElement>) {

  const gridData = useMemo(() => {
    const lenEvents = events ? events.length : 0;
    const timesMap = new Map<string, Array<EventType | EventType[] | undefined>>();
    for (let i = 0; i < lenEvents; i++) {
      const { date, list } = events[i];
      const listLen = list ? list.length : 0;
      for (let j = 0; j < listLen; j++) {
        const event = list[j];
        const time = ('0' + event.time.replace(/\d{2}$/, '00')).slice(-5);
        const dataList = timesMap.get(time) || new Array(state.dates.length).fill(undefined);
        let index = state.dates.findIndex((d) => toDate(date) === toDate(d));
        if (index != -1) {
          if (!dataList[index]) {
            dataList[index] = event;
          } else if (Array.isArray(dataList[index])) {
            (dataList[index] as Array<EventType>).push(event);
          } else {
            dataList[index] = [dataList[index] as EventType, event];
          }
          if (Array.isArray(dataList[index])) {
            (dataList[index] as Array<EventType>).sort((a, b) => a.time > b.time ? 1 : (a.time < b.time ? -1 : 0));
          }
        }
        timesMap.set(time, dataList);
      }
    }
    if (timesMap.size < 6) {
      for (let i = timesMap.size, start = 9; i < 6; i++, start += 2) {
        const key = ('0' + `${start}:00`).slice(-5);
        if (!timesMap.has(key)) {
          timesMap.set(key, new Array(state.dates.length).fill(undefined));
        }
      }
    }
    return [...timesMap].sort();
  }, [state, events]);

  return <div className={clsx("w-full relative")}>
    {
      gridData.map(([time, items]) => <GridRow key={time} state={state} time={time} items={items} className={clsx(loading && 'animate-pulse')} />)
    }
    {loading && <Indicator className="absolute left-0 right-0 mx-auto top-5" />}
  </div>;
}

function GridRow({ time, items, state, className }: { state: GridState } & DateType & React.HTMLProps<HTMLDivElement>) {

  const active = useMemo(() => (
    state.dates.findIndex((date) => toDate(state.active) === toDate(date))
  ), [state]);

  return <div className={clsx('w-full min-h-[67px] py-3 inline-grid gap-0 md:gap-2 border-b border-b-pnk-200 border-opacity-60',
    `grid-cols-2 md:grid-cols-${state.dates.length + 1}`, className)}>
    <div className="flex ml-5 items-center text-xl font-medium md:justify-center md:ml-0">{time}</div>
    {
      items.map((item, i) => <GridCell data-active={i === active} className={`data-[active=false]:hidden md:data-[active]:block`} item={item} key={`item_${i}`} />)
    }
  </div>
}

function GridCell({ item, className, ...props }: { item: EventType | EventType[] | undefined; } & React.HTMLProps<HTMLDivElement>) {
  return <div className={clsx('ml-2', className)} {...props}>
    {(item && Array.isArray(item) && item.length > 1) ?
      <div className={clsx("m-auto",
        "before:[&>:not([hidden])~:not([hidden])]:block",
        "before:[&>:not([hidden])~:not([hidden])]:w-[80%]",
        // "before:[&>:not([hidden])~:not([hidden])]:mx-2",
        "before:[&>:not([hidden])~:not([hidden])]:my-2",
        "before:[&>:not([hidden])~:not([hidden])]:border",
        "before:[&>:not([hidden])~:not([hidden])]:border-pnk-100",
        "before:[&>:not([hidden])~:not([hidden])]:border-opacity-40",
        "before:[&>:not([hidden])~:not([hidden])]:border-solid")}>
        {item.map((i, index) => <GridContent key={`content_${index}`} item={i} />)}
      </div> : (item && <GridContent item={Array.isArray(item) ? item[0] : item} />)
    }
  </div>;
}

function GridContent({ item, className }: { item: EventType } & React.HTMLProps<HTMLDivElement>) {
  return <div className={clsx('m-auto relative', !!item.info ? 'cursor-pointer group' : "cursor-default", className)}>
    {!!item.info && <Tooltip>{item.info}</Tooltip>}
    <div className="space-y-1 ">
      <p className="text-sm font-light"><span className="text-base font-medium mr-1">{item.time}</span>{!!item.gym && `(${item.gym})`}</p>
      <p className="text-base font-light break-words hyphens-auto">
        {!!item.info && <span className="mr-2 inline-block animate-pulse group-hover:animate-none">
          <svg className="fill-white group-hover:fill-pnk-100" width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="8" cy="8" r="8" />
            <path d="M7.96 13C7.83867 13 7.736 12.9627 7.652 12.888C7.57733 12.804 7.54 12.7013 7.54 12.58V5.762C7.54 5.63133 7.57733 5.52867 7.652 5.454C7.736 5.37933 7.83867 5.342 7.96 5.342C8.09067 5.342 8.19333 5.37933 8.268 5.454C8.34267 5.52867 8.38 5.63133 8.38 5.762V12.58C8.38 12.7013 8.34267 12.804 8.268 12.888C8.19333 12.9627 8.09067 13 7.96 13ZM7.946 3.732C7.76867 3.732 7.61467 3.67133 7.484 3.55C7.36267 3.41933 7.302 3.26067 7.302 3.074C7.302 2.85933 7.36733 2.70067 7.498 2.598C7.638 2.486 7.792 2.43 7.96 2.43C8.11867 2.43 8.26333 2.486 8.394 2.598C8.534 2.70067 8.604 2.85933 8.604 3.074C8.604 3.26067 8.53867 3.41933 8.408 3.55C8.28667 3.67133 8.13267 3.732 7.946 3.732Z" fill="black" />
          </svg>
        </span>}
        {`${item.direction}`}</p>
    </div>
  </div>
}

export default Grid;