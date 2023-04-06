import clsx from "clsx";
import { memo } from "react";
import { capitalize } from "../../../utils/str";

function Link({ children, className, label, ...props }: React.HTMLProps<HTMLAnchorElement>) {
  return <a aria-label={label} className={clsx('text-sm  hover:underline hover:decoration-pnk-100', className)} {...props}>
    {capitalize(label)}
  </a>;
}

export default memo(Link);