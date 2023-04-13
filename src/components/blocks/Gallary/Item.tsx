import clsx from "clsx";
import { memo } from "react";
import type { ImageType } from "../../../types/ui";
import Picture from "../../elements/Picture";

function Item({ image, headline, subheadline, className, bodyHTML, ...props }: ImageType & React.HTMLProps<HTMLDivElement>) {

  return <div className={clsx('relative w-full h-full', className)} {...props}>
    <Picture image={image} section='gallary' className="[&>img]:object-cover [&>img]:w-[inherit] [&>img]:h-[inherit] w-[inherit] h-[inherit]" alt={headline} />
    {!!headline && <div className="text-sm absolute bottom-0 left-0 right-0 bg-[#161616]">
      <p className="px-1 py-1">{headline}</p>
    </div>}
  </div>
}

export default memo(Item);