import clsx from "clsx";
import { useEffect, useState } from "react";
import { filterDirections } from "../../../__mocdata/directions";
import DirectionItem from "./Item";
import Section from "../../elements/Section";
import Headline from "../../elements/Headline";
import { ANCHORS } from "../../../utils/constants";

import type { DirectionType, ActiveType } from "./types";

const HEADLINE = 'перелік нарпавлень';
const SUBHEADLINE = '';

function Directions() {

  const [active, setActive] = useState<ActiveType>({ c: 0, p: 0 });
  const [list, setList] = useState<DirectionType[]>([]);

  useEffect(() => {
    filterDirections()
      .then(list => {
        setActive({ c: list[0].uid, p: -1 });
        setList(list);
      });
  }, []);

  return <Section effect={{ x: 'left', y: 'center' }} anchor={ANCHORS.dir}>
    <Headline headline={HEADLINE} subheadline={SUBHEADLINE} />
    <div className="flex mt-12 flex-col lg:flex-row">
      <div className="grow w-full">
        <ol>
          {list.map((item: DirectionType, index: number) => (
            <DirectionItem key={`direction-${item.uid}`} item={item} index={index} active={active} onClick={() => setActive((active) => ({ p: active.c, c: item.uid }))} />
          ))}
        </ol>
      </div>
      <div className="grow w-full mt-4 lg:mt-0 relative min-h-[217px] md:min-h-[350px] lg:min-h-auto overflow-hidden">
        {list.map((item) => (
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