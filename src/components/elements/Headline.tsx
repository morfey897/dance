import { memo } from "react";

function Headline({ headline, subheadline, children }: { headline: string; subheadline?: string; children?: React.ReactNode; }) {
  return <>
    <h2 className="uppercase text-3xl md:text-7xl text-center">{headline}</h2>
    {(!!subheadline || !!children) && <div className="text-xs md:text-base mt-7 max-w-screen-md m-auto text-center">
      {subheadline && <p>{subheadline}</p>}
      {children}
    </div>}
  </>;
}

export default memo(Headline);