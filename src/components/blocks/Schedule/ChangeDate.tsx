import { compareAsc, format } from "date-fns";
import { useMemo } from "react";
import clsx from "clsx";
import type { GridState } from './types';

function ChangeDate({ onNext, onPrev, onNow, state, todayLabel, className }: { onNext: React.MouseEventHandler; onPrev: React.MouseEventHandler; onNow: React.MouseEventHandler; todayLabel: string; state: GridState; } & React.HTMLProps<HTMLDivElement>) {

  const showToday = useMemo(() => (
    compareAsc(state.now, state.dates[0]) <= 0 || compareAsc(state.dates[state.dates.length - 1], state.now) <= 0
  ), [state]);

  return <div className={clsx("flex justify-center", className)}>
    <div className={clsx("flex items-center space-x-5")}>
      <button aria-label={'previous week'} className="group" onClick={onPrev}>
        <svg className="stroke-white group-hover:stroke-pnk-200 group-active:stroke-pnk-100" fill="none" width="22" height="44" viewBox="0 0 22 44" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 1L1 21L21 43" />
        </svg>
      </button>
      <div>
        <p className="inline-block text-pnk-200">{format(state.dates[0], 'dd MMM', { locale: state.locale }) + ' - ' + format(state.dates[state.dates.length - 1], 'dd MMM', { locale: state.locale })}</p>
        {showToday && <button aria-label={todayLabel} onClick={onNow} className="block m-auto text-sm underline">{todayLabel}</button>}
      </div>
      <button aria-label={'next week'} className="group" onClick={onNext}>
        <svg className="stroke-white group-hover:stroke-pnk-200 group-active:stroke-pnk-100" fill="none" width="22" height="44" viewBox="0 0 22 44" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L21 21L1 43" />
        </svg>
      </button>
    </div>
  </div>
}

export default ChangeDate;