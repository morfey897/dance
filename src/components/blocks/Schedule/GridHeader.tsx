import clsx from "clsx";
import { compareAsc, isWeekend, format } from "date-fns";
import type { GridState } from "./types";
import { Fragment } from "react";
import { capitalize } from "../../../utils/str";

const TIME_LABEL = 'Час заняття';

function GridHeader({ state, onSelectDate }: { state: GridState; onSelectDate: (d: Date) => void; } & React.HTMLProps<HTMLDivElement>) {

  return <nav className={clsx("sticky top-0 z-30 backdrop-blur-md grid gap-1 lg:border-b-2 border-b-pnk-200 py-4 lg:py-6", {
    'grid-cols-7 lg:grid-cols-8': state.dates.length === 7,
  })}>
    <div className="font-medium text-2xl text-center hidden lg:block">
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
          <p className={clsx("hidden lg:block font-medium text-center text-xl",
            today && '!text-pnk-100',
            past ? 'lg:text-[#c7c6c6]' : (weekend && 'text-[#f8bbe3]'))}>
            {capitalize(format(date, "EEEE", { locale: state.locale }))}
            <span className="block font-light mt-2">
              {format(date, "d MMM", { locale: state.locale })}
            </span>
          </p>
          <button onClick={() => onSelectDate(date)} className={clsx("block lg:hidden text-xs font-light text-center py-1 border-2 rounded-full",
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