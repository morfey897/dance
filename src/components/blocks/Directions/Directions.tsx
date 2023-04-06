import clsx from "clsx";
import { useEffect, useState } from "react";
import DirectionItem from "./Item";
import Section from "../../elements/Section";
import Headline from "../../elements/Headline";
import Image from "../../elements/Image";

import type { DirectionType, DirectionsType } from "./types";
import RenderHTML from "../../elements/RenderHTML";

function Directions({ headline, subheadline, anchor, list, bodyHTML }: DirectionsType) {

  const [active, setActive] = useState({ cur: '', prev: '' });

  useEffect(() => {
    if (list && list.length) {
      setActive({ cur: list[0].uid, prev: '' });
    }
  }, [list]);

  return <Section effect={{ x: 'left', y: 'center' }} anchor={anchor}>
    <Headline headline={headline} subheadline={subheadline}>
      <RenderHTML>{bodyHTML}</RenderHTML>
    </Headline>
    <div className="flex mt-12 flex-col lg:flex-row">
      <div className="grow w-full">
        <ul className="lg:min-h-[500px]">
          {list?.map((item: DirectionType, index: number) => (
            <DirectionItem key={`direction-${item.uid}`} item={item} index={index} activePrev={active.prev} activeCur={active.cur} onClick={() => {
              setActive(({ cur }) => ({ prev: cur, cur: item.uid }));
            }} />
          ))}
        </ul>
      </div>
      <div className="grow w-full mt-4 lg:mt-0 relative min-h-[217px] md:min-h-[350px] lg:min-h-auto overflow-hidden">
        {list?.map((item) => (
          <Image key={`image-${item.uid}`} className={clsx("absolute transition-opacity duration-500 opacity-0 w-full object-contain lg:object-cover h-[217px] md:h-[350px] lg:h-auto", {
            '!opacity-0': active.prev === item.uid,
            '!opacity-100': active.cur === item.uid,
          })} image={active.prev === item.uid || active.cur === item.uid ? item.image : ""} block="directions" alt={item.headline} />
        ))}
      </div>
    </div>
  </Section>;
}

export default Directions;