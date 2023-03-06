import clsx from "clsx";
import type { SyntheticEvent } from "react";
import { useCallback, memo } from "react";
import ArrowButton from "./ArrowButton";
import DotButton from "./DotButton";
import type { ControlsType } from "./types";

const NextPageButton = memo(({ className, name, ...props }: { name: 'prev' | 'next' } & React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <ArrowButton
    name={name}
    className={clsx("hidden md:flex absolute top-[calc(50%-70px/2)]",
      {
        'rotate-180': name === 'next',
        "xl:left-[calc(50%-(1248px-2*48px)/6-1.2*70px)] xl:scale-100": name === 'prev',
        "lg:left-[calc(50%-(992px-2*31px)/6-1.1*70px)] lg:scale-100": name === 'prev',
        "md:left-[calc(50%-(736px-2*8px)/6-0.8*70px)] md:scale-50": name === 'prev',
        "xl:left-[calc(50%+(1248px-2*48px)/6+0.2*70px)] xl:scale-100": name === 'next',
        "lg:left-[calc(50%+(992px-2*31px)/6+0.1*70px)] lg:scale-100": name === 'next',
        "md:left-[calc(50%+(736px-2*8px)/6-0.2*70px)] md:scale-50": name === 'next',
      },
      className
    )} {...props} />
));

function Controls({ onSelectPage, pages, active }: ControlsType) {

  const onClickPage = useCallback((event: SyntheticEvent<HTMLButtonElement>) => {
    const name = event?.currentTarget?.name;
    if (name === 'next') {
      onSelectPage(active + 1);
    } else if (name === 'prev') {
      onSelectPage(active - 1);
    } else {
      let page = parseInt(name);
      if (typeof page === 'number') {
        onSelectPage(page);
      }
    }
  }, [onSelectPage, active]);

  return <>
    {pages.length > 0 && <NextPageButton name="prev" disabled={active <= pages[0]} onClick={onClickPage} />}
    {pages.length > 0 && <NextPageButton name="next" disabled={active >= pages[pages.length - 1]} onClick={onClickPage} />}
    <div className="flex justify-center mt-12">
      <div className="flex flex-wrap space-x-3">
        {pages.map((page) => <DotButton onClick={onClickPage} key={page} name={page.toString()} disabled={active === page} />)}
      </div>
    </div>
  </>
}


export default memo(Controls);