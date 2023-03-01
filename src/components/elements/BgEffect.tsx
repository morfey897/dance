import clsx from "clsx";

export type BGPosition = {
  x?: 'center' | 'left' | 'right';
  y?: 'center' | 'top' | 'bottom';
}

function BGEffect({ x = 'center', y = 'center' }: BGPosition) {
  return (
    <div className="relative w-full h-full z-[-10]">
      <svg className={clsx("absolute w-[120%] h-[70vh] lg:w-[calc(1280px-2rem)] lg:h-[calc(1280px/2-2rem/2)] bg-pnk-100 rounded-[50%] rotate_-[-30deg] opacity-20 blur-[170px] ", {
        '-translate-x-[15%] lg:-translate-x-[33%]': x === 'left',
        'translate-x-[15%] lg:translate-x-[33%]': x === 'right',

        '-translate-y-[15vh] lg:-translate-y-[33%]': y === 'top',
        'translate-y-[15%]': y === 'center',
        'translate-y-[15vh] lg:translate-y-[33%]': y === 'bottom',
      })} />
    </div>
  );
}

export default BGEffect;