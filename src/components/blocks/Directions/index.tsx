import clsx from "clsx";
import { useEffect, useState } from "react";
import DirectionItem from "./Item";
import Section from "../../elements/Section";
import Headline from "../../elements/Headline";
import Picture from "../../elements/Picture";

import type { DirectionType, DirectionsType, PropsType } from "../../../types/ui";
import RenderHTML from "../../elements/RenderHTML";

import { filterContent, sortComparator, getFileName } from "../../../utils/md";
import { translateJSON } from "../../../services/translate";

export async function getProps({ lang, request, content }: PropsType): Promise<DirectionsType> {

  const indexDirection = filterContent(content, /\/content\/directions\/index\.md$/)[0];
  const list = filterContent(content, [/\/content\/directions\/(?:[\w\d\/-]+)\.md$/, (file) => indexDirection.file != file]);

  const childrenList = list.sort(sortComparator).map((data) => {
    const uid = getFileName(data);
    const frontmatter = data.frontmatter;
    return {
      uid,
      headline: "",
      image: "",
      subheadline: "",
      bodyHTML: data.compiledContent(),
      ...frontmatter,
    };
  });

  const dirrectionsProps = {
    ...indexDirection?.frontmatter,
    bodyHTML: indexDirection?.compiledContent(),
    list: childrenList,
  } as DirectionsType;


  const translation = await translateJSON(
    {
      target: lang,
      content: {
        dirrections: dirrectionsProps,
      },
    },
    request
  );

  const props = {
    ...dirrectionsProps,
    ...translation?.dirrections,
  } as DirectionsType;
  return props
}


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
      <div className="grow w-full mt-4 lg:mt-0 relative min-h-[217px] md:min-h-[450px] lg:min-h-auto overflow-hidden">
        {list?.map((item) => (
          <Picture key={`image-${item.uid}`} className={clsx("absolute transition-opacity duration-500 opacity-0 w-full object-contain lg:object-cover h-[217px] md:h-[450px] lg:h-auto", {
            '!opacity-0': active.prev === item.uid,
            '!opacity-100': active.cur === item.uid,
          })} image={active.prev === item.uid || active.cur === item.uid ? item.image : ""} section="directions" alt={item.headline} />
        ))}
      </div>
    </div>
  </Section>;
}

export default Directions;