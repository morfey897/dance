import clsx from "clsx";
import { memo, useCallback, useState } from "react";
import type { ImageType } from "./types";
import Image from "../../elements/Image";

function Item({ image, headline, subheadline, className, bodyHTML, ...props }: ImageType & React.HTMLProps<HTMLDivElement>) {

  const [loaded, setLoaded] = useState(false);
  const onLoaded = useCallback(() => {
    setLoaded(true);
  }, []);

  return <div className={clsx('relative w-full h-full', className)} {...props}>
    {!loaded && <div className={clsx("absolute animate-pulse w-[inherit] h-[inherit] bg-white")} />}
    <Image image={image} block='gallary' className="object-cover w-[inherit] h-[inherit]" onLoad={onLoaded} alt={headline} />
    {!!headline && <div className="text-sm absolute bottom-0 left-0 right-0 bg-[#161616]">
      <p className="px-1 py-1">{headline}</p>
    </div>}
  </div>
}

export default memo(Item);