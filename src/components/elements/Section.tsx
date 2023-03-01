import clsx from "clsx";
import type { BGPosition } from "./BgEffect";
import BGEffect from "./BgEffect";

function Section({ effect, className, children }: { effect?: BGPosition } & React.HTMLProps<HTMLDivElement>) {
  return <section className={clsx("w-full z-20 pt-4 pb-16", !!effect && 'overflow-hidden', className)}>
    <div className="max-w-screen-xl mx-auto px-4">
      {!!effect && <BGEffect {...effect} />}
      {children}
    </div>
  </section>
}

export default Section;