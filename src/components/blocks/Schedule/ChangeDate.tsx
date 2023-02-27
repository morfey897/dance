import { compareAsc, format } from "date-fns";
import { useMemo } from "react";
import clsx from "clsx";
import type { GridState } from './types';

const BTN_NOW = 'Сьогодні';

function ChangeDate({ onNext, onPrev, onNow, state }: { onNext: React.MouseEventHandler; onPrev: React.MouseEventHandler; onNow: React.MouseEventHandler; state: GridState; } & React.HTMLProps<HTMLDivElement>) {

  const showToday = useMemo(() => (
    compareAsc(state.now, state.dates[0]) <= 0 || compareAsc(state.dates[state.dates.length - 1], state.now) <= 0
  ), [state]);

  return <div className="flex justify-center">
    <div className={clsx("flex items-center space-x-5")}>
      <button className="group" onClick={onPrev}>
        <svg className="stroke-white group-hover:stroke-pnk-200 group-active:stroke-pnk-100" fill="none" width="22" height="44" viewBox="0 0 22 44" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 1L1 21L21 43" />
        </svg>
      </button>
      <div>
        <p className="inline-block text-pnk-200">{format(state.dates[0], 'dd MMM', { locale: state.locale }) + ' - ' + format(state.dates[state.dates.length - 1], 'dd MMM', { locale: state.locale })}</p>
        {showToday && <button onClick={onNow} className="block m-auto text-sm underline">{BTN_NOW}</button>}
      </div>
      <button className="group" onClick={onNext}>
        <svg className="stroke-white group-hover:stroke-pnk-200 group-active:stroke-pnk-100" fill="none" width="22" height="44" viewBox="0 0 22 44" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L21 21L1 43" />
        </svg>
      </button>
    </div>
  </div>
}

export default ChangeDate;