import clsx from "clsx";
import { compareAsc, isWeekend, format } from "date-fns";
import type { GridState } from "./types";
import { Fragment } from "react";
import { capitalize } from "../../../utils/str";

const TIME_LABEL = 'Час заняття';

function GridHeader({ state, onSelectDate }: { state: GridState; onSelectDate: (d: Date) => void; } & React.HTMLProps<HTMLDivElement>) {

  return <nav className={clsx("sticky top-0 z-30 backdrop-blur-md grid gap-2 md:border-b-2 border-b-pnk-200 py-4 md:py-6 items-end", {
    'grid-cols-7 md:grid-cols-8': state.dates.length === 7,
  })}>
    <div className="font-medium text-xl text-center hidden md:block overflow-hidden text-ellipsis">
      {TIME_LABEL}
    </div>
    {
      state.dates.map((date) => {
        const compare = compareAsc(state.now, date);
        const today = compare === 0;
        const past = compare > 0;
        const weekend = isWeekend(date);
        const isActive = compareAsc(state.active, date) === 0;
        return <Fragment key={`day_${date.getTime()}`}>
          <p className={clsx("hidden md:block font-medium text-center text-base lg:text-xl overflow-hidden text-ellipsis",
            today && '!text-pnk-100',
            past ? 'md:text-[#c7c6c6]' : (weekend && 'text-[#f8bbe3]'))}>
            {capitalize(format(date, "EEEE", { locale: state.locale }))}
            <span className="block font-light mt-2">
              {format(date, "d MMM", { locale: state.locale })}
            </span>
          </p>
          <button onClick={() => onSelectDate(date)} className={clsx("block md:hidden text-xs font-light text-center py-1 border-2 rounded-full",
            today && 'bg-pnk-100 !border-pnk-100',
            (today && !isActive) && 'opacity-50',
            past ? 'border-white' : 'border-pnk-200',
            isActive && 'bg-pnk-100',
            weekend && !isActive && !past && 'text-[#fa99da]',
          )}>
            {capitalize(format(date, "EEEEEE.", { locale: state.locale }))}<br />
            <span className="font-medium text-sm">
              {format(date, "dd", { locale: state.locale })}
            </span>
          </button>
        </Fragment>;
      })
    }
  </nav >
}

export default GridHeader;