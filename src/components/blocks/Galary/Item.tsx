import clsx from "clsx";
import type { ImageType } from "./types";

function Item({ src, title, className, ...props }: ImageType & React.HTMLProps<HTMLDivElement>) {
  return <div className={clsx('relative', className)} {...props}>
    {!!src && <img className="object-cover w-[inherit] h-[inherit]" loading="lazy" src={src} title={title} />}
    {!!title && <div className="text-sm absolute bottom-0 left-0 right-0 bg-[#161616]">
      <p className="px-1 py-1">{title}</p>
    </div>}
  </div>
}

export default Item;