import clsx from "clsx";

function Tooltip({ parent = 'group', arrow, border, className, children }: { parent?: 'peer' | 'group'; arrow?: boolean; border?: boolean; } & React.HTMLProps<HTMLDivElement>) {
  return <div className={clsx("absolute transition-all inset-x-0 top-0 opacity-0 translate-y-0",
    "rounded bg-black bg-opacity-80 p-2 text-xs text-white whitespace-pre",
    {
      "border-pnk-100 border": border,
      "peer-hover:-translate-y-full peer-hover:opacity-100 peer-hover:inline-block": parent === 'peer',
      "group-hover:-translate-y-full group-hover:opacity-100 group-hover:inline-block": parent === 'group',
      "peer-hover:-translate-y-[calc(100%+12px)]": parent === 'peer' && arrow,
      "group-hover:-translate-y-[calc(100%+12px)]": parent === 'group' && arrow,
    },
    className
  )}>
    {!!arrow && <span
      className="h-0 w-0 top-full absolute border-t-[12px] border-t-pnk-100 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent"
    />}
    {children}
  </div >;
}

export default Tooltip;
