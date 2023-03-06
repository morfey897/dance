import { useRef } from "react";
import clsx from "clsx"; 
import Item from "./Item";


function Swiper(props: React.HTMLProps<HTMLUListElement>) {

  const ref = useRef<HTMLUListElement>(null);

  return <ul
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
}