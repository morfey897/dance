import clsx from "clsx";
import type { DirectionType } from "../../../types/ui";
import React from "react";
import RenderHTML from "../../elements/RenderHTML";

function DirectionItem({ item, index, activePrev, activeCur, children, ...props }: { item: DirectionType; index: number; activePrev: string, activeCur: string; } & React.HTMLProps<HTMLLIElement>) {
  return (<li role={'button'} className={clsx("border-b border-opacity-40 border-pnk-200 py-4", activeCur === item.uid && 'pointer-events-none')} {...props}>
    <div className={clsx("flex justify-between items-start cursor-pointer")}>
      <div className="flex">
        <p className="hidden md:block mr-5 text-lg text-pnk-200 font-light opacity-40">{String('0' + (index + 1)).slice(-2)}</p>
        <div>
          <p className="text-xl md:text-3xl">{item.headline}</p>
          {!!item.subheadline && <p className="text-xs font-light mt-1">{item.subheadline}</p>}
        </div>
      </div>
      <div className="flex space-x-5 mr-0 md:mr-10 items-end" >
        {item.groups?.length > 0 && <p className="text-lg md:text-2xl font-light opacity-30">{item.groups.join(",")}</p>}
        <span className={clsx('transition', activeCur === item.uid && 'rotate-45 active:transition-transform')}>
          <svg className="stroke-pnk-200" width="30" height="29" viewBox="0 0 30 29" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="0.646447" y1="28.6469" x2="28.6464" y2="0.646935" />
            <line y1="-0.5" x2="39.598" y2="-0.5" transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 29 29.0005)" />
          </svg>
        </span>
      </div>
    </div>
    <RenderHTML className={clsx("transition-max-height max-h-0 h-auto overflow-hidden text-sm md:text-lg font-light my-0 lg:mr-10 lg:ml-9", {
      'max-h-0 duration-300': activePrev === item.uid,
      'mt-4 max-h-[500px] duration-500': activeCur === item.uid,
    })}>{item.bodyHTML}</RenderHTML>
  </li >);
}

export default DirectionItem;