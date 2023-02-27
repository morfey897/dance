import clsx from "clsx";
import { useMemo } from "react";
import { compareAsc } from "date-fns";
import type { GridState, EventsType, EventType, DateType } from "./types";

function Grid({ state, events }: { state: GridState; events: EventsType; } & React.HTMLProps<HTMLDivElement>) {

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
        let index = state.dates.findIndex((d) => compareAsc(date, d) === 0);
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
    return [...timesMap].sort();
  }, [state, events]);


  return <div className="w-full">
    {
      gridData.map(([time, items]) => <GridRow key={time} state={state} time={time} items={items} />)
    }
  </div>;
}

function GridRow({ time, items, state }: { state: GridState } & DateType & React.HTMLProps<HTMLDivElement>) {

  const active = useMemo(() => (
    state.dates.findIndex((date) => compareAsc(state.active, date) === 0)
  ), [state]);

  return <div className={clsx('w-full min-h-[67px] py-3 inline-grid gap-2 border-b border-b-pnk-200 border-opacity-40',
    `grid-cols-2 lg:grid-cols-${state.dates.length + 1}`)}>
    <div className="flex ml-5 items-center text-xl font-medium lg:justify-center lg:ml-0">{time}</div>
    {
      items.map((item, i) => <GridCell data-active={i === active} className={`data-[active=false]:hidden lg:data-[active]:block`} item={item} key={`item_${i}`} />)
    }
  </div>
}

function GridCell({ item, className, ...props }: { item: EventType | EventType[] | undefined; } & React.HTMLProps<HTMLDivElement>) {
  return <div className={clsx('mx-auto', className)} {...props}>
    {(item && Array.isArray(item) && item.length > 1) ?
      <div className={clsx("m-auto",
        "before:[&>:not([hidden])~:not([hidden])]:block",
        "before:[&>:not([hidden])~:not([hidden])]:w-[80%]",
        "before:[&>:not([hidden])~:not([hidden])]:mx-auto",
        "before:[&>:not([hidden])~:not([hidden])]:my-2",
        "before:[&>:not([hidden])~:not([hidden])]:border",
        "before:[&>:not([hidden])~:not([hidden])]:border-pnk-100",
        "before:[&>:not([hidden])~:not([hidden])]:border-dashed")}>
        {item.map((i, index) => <GridContent key={`content_${index}`} item={i} />)}
      </div> : (item && <GridContent item={Array.isArray(item) ? item[0] : item} />)
    }
  </div>;
}

function GridContent({ item, className }: { item: EventType } & React.HTMLProps<HTMLDivElement>) {
  return <div className={clsx('space-y-1 m-auto', !!item.hasInfo ? 'cursor-pointer group' : "cursor-default", className)}>
    <p className="text-sm font-light">{item.time} {`(${item.gym})`}</p>
    <p className="text-base font-light break-words hyphens-auto">{!!item.hasInfo && <span className="mr-2 inline-block">
      <svg className="fill-white group-hover:fill-pnk-100" width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="8" cy="8" r="8" />
        <path d="M7.96 13C7.83867 13 7.736 12.9627 7.652 12.888C7.57733 12.804 7.54 12.7013 7.54 12.58V5.762C7.54 5.63133 7.57733 5.52867 7.652 5.454C7.736 5.37933 7.83867 5.342 7.96 5.342C8.09067 5.342 8.19333 5.37933 8.268 5.454C8.34267 5.52867 8.38 5.63133 8.38 5.762V12.58C8.38 12.7013 8.34267 12.804 8.268 12.888C8.19333 12.9627 8.09067 13 7.96 13ZM7.946 3.732C7.76867 3.732 7.61467 3.67133 7.484 3.55C7.36267 3.41933 7.302 3.26067 7.302 3.074C7.302 2.85933 7.36733 2.70067 7.498 2.598C7.638 2.486 7.792 2.43 7.96 2.43C8.11867 2.43 8.26333 2.486 8.394 2.598C8.534 2.70067 8.604 2.85933 8.604 3.074C8.604 3.26067 8.53867 3.41933 8.408 3.55C8.28667 3.67133 8.13267 3.732 7.946 3.732Z" fill="black" />
      </svg>
    </span>}{`${item.direction}`}</p>
  </div>
}

export default Grid;