import clsx from "clsx";
import type { SyntheticEvent } from "react";
import { useCallback, memo } from "react";
import ArrowButton from "./ArrowButton";
import DotButton from "./DotButton";

function Controls({ onPage, pages, active }: { pages: Array<number>; active: number; onPage: (name: 'next' | 'prev' | 'page', page?: number) => void }) {

  const onClickPage = useCallback((event: SyntheticEvent<HTMLButtonElement>) => {
    const name = event?.currentTarget?.name;
    if (name === 'next') {
      onPage('next');
    } else if (name === 'prev') {
      onPage('prev');
    } else {
      let page = parseInt(name);
      if (typeof page === 'number') {
        onPage('page', page);
      }
    }
  }, [onPage]);

  return <>
    <ArrowButton name="prev" onClick={onClickPage} className={clsx("hidden md:flex absolute top-[calc(50%-70px/2)]",
      "xl:left-[calc(50%-(1248px-2*48px)/6-1.2*70px)] xl:scale-100",
      "lg:left-[calc(50%-(992px-2*31px)/6-1.1*70px)] lg:scale-100",
      "md:left-[calc(50%-(736px-2*8px)/6-0.8*70px)] md:scale-50",
    )} />
    <ArrowButton name="next" onClick={onClickPage} className={clsx("hidden md:flex absolute rotate-180 top-[calc(50%-70px/2)]",
      "xl:left-[calc(50%+(1248px-2*48px)/6+0.2*70px)] xl:scale-100",
      "lg:left-[calc(50%+(992px-2*31px)/6+0.1*70px)] lg:scale-100",
      "md:left-[calc(50%+(736px-2*8px)/6-0.2*70px)] md:scale-50",
    )} />
    <div className="flex justify-center mt-12">
      <div className="flex flex-wrap space-x-3">
        {pages.map((page) => <DotButton onClick={onClickPage} key={page} name={page.toString()} disabled={active === page} />)}
      </div>
    </div>
  </>
}

export default memo(Controls);