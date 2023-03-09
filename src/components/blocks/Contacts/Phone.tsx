import { memo } from "react";

function Phone({ phone, ...props }: { phone: String } & React.HTMLProps<HTMLAnchorElement>) {
  return <a className="flex underline font-medium text-base md:text-3xl justify-center lg:justify-start" href={`tel:${phone}`} {...props}>{phone}</a>;
}

export default memo(Phone);