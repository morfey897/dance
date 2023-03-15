import clsx from "clsx";
import { useEffect, useState } from "react";
import DirectionItem from "./Item";
import Section from "../../elements/Section";
import Headline from "../../elements/Headline";

import type { DirectionType, ActiveType, DirectionsType } from "./types";

function Directions({ headline, subheadline, anchor, list, children }: DirectionsType) {

  const [active, setActive] = useState<ActiveType>({ c: '', p: '' });

  useEffect(() => {
    if (list && list.length) {
      setActive({ c: list[0].uid, p: '' });
    }
  }, [list]);

  return <Section effect={{ x: 'left', y: 'center' }} anchor={anchor}>
    <Headline headline={headline} subheadline={subheadline}>
      {children}
    </Headline>
    <div className="flex mt-12 flex-col lg:flex-row">
      <div className="grow w-full">
        <ol className="lg:min-h-[500px]">
          {list?.map((item: DirectionType, index: number) => (
            <DirectionItem key={`direction-${item.uid}`} item={item} index={index} active={active} onClick={() => setActive((active) => ({ p: active.c, c: item.uid }))} />
          ))}
        </ol>
      </div>
      <div className="grow w-full mt-4 lg:mt-0 relative min-h-[217px] md:min-h-[350px] lg:min-h-auto overflow-hidden">
        {list?.map((item) => (
          <img key={`image-${item.uid}`} className={clsx("absolute transition-opacity duration-500 opacity-0 w-full object-contain lg:object-cover h-[217px] md:h-[350px] lg:h-auto", {
            '!opacity-0': active.p === item.uid,
            '!opacity-100': active.c === item.uid,
          })} loading="lazy" src={active.p === item.uid || active.c === item.uid ? item.image : ""} alt='' />
        ))}
      </div>
    </div>
  </Section>;
}

export default Directions;