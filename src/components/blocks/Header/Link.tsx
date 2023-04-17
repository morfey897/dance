import { memo } from "react";
import { capitalize } from "../../../utils/str";

function Link({ label, href, ...props }: React.HTMLProps<HTMLAnchorElement>) {
  return <a aria-label={label} href={href} {...props}>
    {capitalize(label)}
  </a>;
}

export default memo(Link);