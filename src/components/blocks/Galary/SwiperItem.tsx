import clsx from "clsx";
import { memo } from "react";

function SwiperItem({ children, className, scale = 1, ...props }: { scale?: number } & React.HTMLProps<HTMLLIElement>) {
  return <li data-item={!!children} className={clsx("shrink-0 snap-center transition-scale ease-in",
    "xl:w-[calc((1248px-2*48px)/3)] xl:h-[622px]",
    "lg:w-[calc((992px-2*31px)/3)] lg:h-[560px]",
    "md:w-[calc((736px-2*8px)/3)] md:h-[520px]",
    "w-[188px] h-[334px]", className)} style={{ scale: scale.toString(), filter: `grayscale(${(scale + 0.1 >= 1 ? 0 : 100) + "%"})` }} {...props}>
    {children}
  </li>
}

export default memo(SwiperItem);