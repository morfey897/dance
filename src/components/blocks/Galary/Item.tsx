import clsx from "clsx";
import { memo, useCallback, useEffect, useState } from "react";
import type { ImageType } from "./types";

function Item({ src, title, className, ...props }: ImageType & React.HTMLProps<HTMLDivElement>) {

  const [loaded, setloaded] = useState(false);

  const onLoaded = useCallback(() => {
    setloaded(true);
  }, []);

  return <div className={clsx('relative w-full h-full', className)} {...props}>
    {!loaded && <div className={clsx("absolute animate-pulse w-[inherit] h-[inherit] bg-white")} />}
    {!!src && <img className="object-cover w-[inherit] h-[inherit]" loading="lazy" src={src} title={title} onLoad={onLoaded} />}
    {!!title && <div className="text-sm absolute bottom-0 left-0 right-0 bg-[#161616]">
      <p className="px-1 py-1">{title}</p>
    </div>}
  </div>
}

export default memo(Item);