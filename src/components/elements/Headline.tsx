function Headline({ headline, subheadline }: { headline: string; subheadline?: string }) {
  return <>
    <h2 className="uppercase text-3xl md:text-7xl text-center">{headline}</h2>
    {!!subheadline && <p className="text-xs md:text-base mt-7 max-w-screen-md m-auto text-center">{subheadline}</p>}
  </>;
}

export default Headline;