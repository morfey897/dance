import { memo } from "react";

function Link({ label, ...props }: React.HTMLProps<HTMLAnchorElement>) {
  return <a {...props}>
    {label}
  </a>;
}

export default memo(Link);