import clsx from "clsx";
import { memo } from "react";

function Link({ children, className, label, ...props }: React.HTMLProps<HTMLAnchorElement>) {
  return <a className={clsx('text-sm  hover:underline hover:decoration-pnk-100', className)} {...props}>
    {label}
  </a>;
}

export default memo(Link);