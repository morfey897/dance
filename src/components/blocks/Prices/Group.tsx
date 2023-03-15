
function Group({ headline, children }: { headline: string } & React.HTMLProps<HTMLDivElement>) {
  return <div className="space-y-10 md:space-y-14">
    {!!headline && <p className="uppercase text-xl md:text-3xl">{headline}</p>}
    <div className="flex gap-x-7 gap-y-10 flex-wrap justify-center xl:justify-start">
      {children}
    </div>
  </div>;
}

export default Group;