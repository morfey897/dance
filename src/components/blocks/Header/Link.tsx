import { memo } from "react";
import { capitalize } from "../../../utils/str";

function Link({ label, ...props }: React.HTMLProps<HTMLAnchorElement>) {
  return <a {...props}>
    {capitalize(label)}
  </a>;
}

export default memo(Link);