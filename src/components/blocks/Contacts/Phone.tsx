import { memo } from "react";

function Phone({ phone, ...props }: { phone: String } & React.HTMLProps<HTMLAnchorElement>) {
  return <a aria-label="Phone" className="flex underline font-medium text-sm md:text-3xl justify-center lg:justify-start" href={`tel:${phone}`} {...props}>{phone}</a>;
}

export default memo(Phone);