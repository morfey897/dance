import clsx from "clsx";
import type { PriceType, GroupType } from "./types";
import RenderHTML from "../../elements/RenderHTML";

export function Item({ item, className }: { item: PriceType } & React.HTMLProps<HTMLDivElement>) {

  const hasOldPrice = item.oldPrice > 0 && item.oldPrice != item.price;
  return <BaseItem className={className}>
    {item.top && <p className="absolute top-[-24px] right-0 text-pnk-100 uppercase rounded-full border w-14 h-14 font-light text-sm flex justify-center items-center leading-tight rotate-45">top sale</p>}
    <h3 className="font-medium text-xl md:text-4xl">{item.headline}</h3>
    <div className="relative text-center mt-5">
      <h4 className="font-medium md:font-light text-xl md:text-4xl text-pnk-200">{item.price}<span className="ml-2">{item.currency}</span></h4>
      {hasOldPrice &&
        <span className="absolute top-[-20px] right-[20%] opacity-40 before:block before:border before:absolute before:w-[115%] before:left-[-5%] before:top-[40%]">
          {item.oldPrice}
          <span className="ml-1">{item.currency}</span>
        </span>
      }
    </div>
    {!!item.subheadline && <div className="font-light text-sm md:text-lg mt-5">
      <p>{item.subheadline}</p>
    </div>}
    {!!item.bodyHTML && <RenderHTML className="font-light text-sm md:text-lg mt-5">{item.bodyHTML}</RenderHTML>}
  </BaseItem>;
}

export function GroupItem({ item, className }: { item: GroupType } & React.HTMLProps<HTMLDivElement>) {
  return <BaseItem className={className}>
    <h3 className="font-medium text-xl md:text-4xl">{item.headline}</h3>
    <RenderHTML className="font-light text-sm md:text-lg mt-5">{item.bodyHTML}</RenderHTML>
    <p className="">{item.subheadline}</p>
    <div className="divide-y divide-pnk-100 mt-7 md:mt-8">
      {item.items.map((itm) => {
        const hasOldPrice = itm.oldPrice > 0 && itm.oldPrice != itm.price;
        return (
          <div className={clsx("flex justify-between text-sm md:text-lg font-light py-2", hasOldPrice && 'pt-5')} key={itm.uid}>
            <p className="text-left">{itm.headline}</p>
            <div className="flex gap-x-2">
              <p className={clsx(hasOldPrice && 'text-pnk-200')}>{itm.price}<span className="ml-1">{itm.currency}</span></p>
              {hasOldPrice && <span className="text-xs md:text-base relative top-[-20px] right-0 opacity-40 before:block before:border before:absolute before:w-[115%] before:left-[-5%] before:top-[40%]">
                {itm.oldPrice}
                <span className="ml-0.5">{itm.currency}</span>
              </span>}
            </div>
          </div>
        )
      })}
    </div>
  </BaseItem>;
}

function BaseItem({ className, children }: React.HTMLProps<HTMLDivElement>) {
  return <div className={clsx("bg-[#161616] rounded-lg py-7 px-3 text-center w-full md:w-[345px] lg:w-[395px] relative", className)}>
    {children}
  </div>
}
