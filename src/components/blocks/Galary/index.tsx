import clsx from "clsx";
import { SyntheticEvent, useEffect, useRef } from "react";
import { useMemo, useCallback, useState } from "react";
import { smoothScroll, calculateScale, SCROLL_EPS } from "../../../utils/ui";
import { throttle } from "throttle-debounce";
import Headline from "../../elements/Headline";
import Indicator from "../../elements/IngIndicator";
import Section from "../../elements/Section";
import ArrowButton from "./ArrowButton";
import DotButton from "./DotButton";
import Item from "./Item";
import Controls from "./Controls";
import type { ImageType } from "./types";

import { filterImages } from "../../../__mocdata/images";

const HEADLINE = 'ГАЛЕРЕЯ';

function Gallery() {

  const ref = useRef<HTMLUListElement>(null);

  const [inited, setInited] = useState(false);

  const [images, setImages] = useState<Array<ImageType>>([]);

  const [oldScales, setOldScales] = useState<Array<number>>([]);

  const [scales, setScales] = useState<Array<number>>([]);

  const [scrolling, setScrolling] = useState(false);

  const pages = useMemo(() => new Array(images && images.length > 2 ? images.length - 2 : 0).fill(1).map((_, index) => index + 1), [images]);

  const active = useMemo(() => {
    const max = { index: -1, scale: 0 };
    scales.forEach((scale, index) => {
      if (scale > max.scale) {
        max.scale = scale;
        max.index = index;
      }
    });
    return max.index;
  }, [scales]);

  const onScroll = useMemo(() => throttle(100, () => {
    setOldScales(calculateScale(ref.current));
  }), []);

  const onResize = useMemo(() => throttle(300, () => {
    smoothScroll(1, ref.current, 'auto');
    const scales = calculateScale(ref.current);
    setScales(scales);
    setOldScales(scales);
  }), []);

  const onPage = useCallback((name: 'prev' | 'next' | 'page', page?: number) => {
    if (typeof active !== 'number') return;
    let next = active;
    switch (name) {
      case 'next':
        next += 1;
        break;
      case 'prev':
        next -= 1;
        break;
      case 'page':
        next = page;
        break;
      default:
        return;
    }
    setScrolling(true);
    smoothScroll(next, ref.current)
      .then(() => setScrolling(false));
  }, [active]);

  useEffect(() => {
    window.addEventListener('scrollend', (e) => console.log('END', e))
    window.addEventListener('resize', onResize);

    setInited(false);
    filterImages()
      .then(list => {
        setImages([{ uid: Number.MIN_SAFE_INTEGER, src: '' }, ...list, { src: '', uid: Number.MAX_SAFE_INTEGER }]);
        return new Promise((res) => {
          setTimeout(res, 100);
        });
      })
      .then(() => {
        onResize();
        setInited(true);
      });

    return () => {
      onScroll.cancel();
      onResize.cancel();
      window.removeEventListener('resize', onResize);
    }
  }, []);

  useEffect(() => {
    console.log(scrolling, { scales, oldScales });
    if (!scrolling && (scales.length != oldScales.length || oldScales.some((v, index) => scales[index] != v))) {
      setScales([...oldScales]);
    }
  }, [oldScales, scales, scrolling]);

  return <Section effect={{ x: 'left' }}>
    <Headline headline={HEADLINE} />
    {!inited && <Indicator className="mx-auto mt-12" />}
    <div className="relative">
      <ul
        onScroll={inited ? onScroll : undefined}
        ref={ref}
        className={clsx("mt-12 snap-x snap-mandatory flex hide-scroll overflow-x-auto opacity-0",
          "xl:gap-x-[48px]",
          "lg:gap-x-[31px]",
          "md:gap-x-[8px]",
          "gap-x-4",
          inited && "transition-opacity opacity-100"
        )}>
        {
          images?.map((image, index) => {
            const scale = scales[index] || 1;
            const grayscale = (scale + SCROLL_EPS >= 1 ? 0 : 100) + "%";
            return <li key={image.uid} className={clsx("shrink-0 snap-center",
              inited && 'transition-scale ease-in',
            )} style={{ scale: scale.toString(), filter: `grayscale(${grayscale})` }} >
              <Item className={clsx(
                "xl:w-[calc((1248px-2*48px)/3)] xl:h-[622px]",
                "lg:w-[calc((992px-2*31px)/3)] lg:h-[560px]",
                "md:w-[calc((736px-2*8px)/3)] md:h-[520px]",
                "w-[188px] h-[334px]")} {...image} />
            </li>;
          })
        }
      </ul>
      {
        images?.length > 3 && inited && <Controls onPage={onPage} pages={pages} active={active} />
      }
    </div>
  </Section >;
}

export default Gallery;