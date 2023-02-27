import clsx from "clsx";
import { useState } from "react";
import BGEffect from "../elements/BgEffect";

type DirectionType = {
  headline: string;
  subheadline?: string;
  body?: string;
  image: string;
  groups?: string[]
};

type ActiveType = {
  c: number;
  p: number;
}

const HEADLINE = 'перелік нарпавлень';
const SUBHEADLINE = '';
const LIST: Array<DirectionType> = [{
  headline: 'Направлення 1',
  body: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.',
  image: 'https://img.freepik.com/premium-photo/two-slim-women-pole-dancing-workout-professional-female-dancers-exercising-gym-pole-dance_266732-20380.jpg',
}, {
  headline: 'Направлення 2',
  body: 'voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.',
  image: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Yoon_Bo-mi_at_Pink_Paradise_concert%2C_30_May_2015_04.jpg',
  subheadline: 'At vero eos et accusamus et iusto odio dignissimos',
  groups: ['про'],
}, {
  headline: 'Направлення 3',
  body: 'At vero eos et accusamus et iusto odioatque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.',
  image: 'data:image/jpeg;base64,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',
  groups: ['про', "танці"],
}, {
  headline: 'Направлення 4',
  body: 'At atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.',
  image: 'https://www.shape.com/thmb/g6JNOqm6teAXMToMk3rl_J-hmf4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/pole-dancing-promo-c813db3793e146cdbe6bb0026a66af6c.jpg',
}];


function Directions() {

  const [active, setActive] = useState<ActiveType>({ c: 0, p: -1 });

  return <section className="w-full relative">
    <BGEffect className="left-0 top-[-50px] md:top-[-270px] md:left-[-50px]" name="direction"/>
    <div className="max-w-screen-xl mx-auto px-4 pt-5 pb-16 z-10 relative">
      <h2 className="uppercase text-2xl md:text-7xl text-center">{HEADLINE}</h2>
      <p className="text-xs md:text-base mt-7 max-w-screen-md m-auto text-center">{SUBHEADLINE}</p>
      <div className="flex mt-12 flex-col lg:flex-row">
        <div className="flex-grow w-full">
          <ol>
            {LIST.map((item: DirectionType, index: number) => (
              <DirectionItem key={`direction-${index}`} item={item} index={index} active={active} onClick={() => setActive((active) => ({ p: active.c, c: index }))} />
            ))}
          </ol>
        </div>
        <div className="flex-grow w-full mt-4 lg:mt-0 relative min-h-[217px] md:min-h-[350px] lg:min-h-auto overflow-hidden">
          {LIST.map((item, index) => (
            <img key={`image-${index}`} className={clsx("absolute transition-opacity duration-500 opacity-0 w-full object-contain lg:object-cover h-[217px] md:h-[350px] lg:h-auto", {
              '!opacity-0': active.p === index,
              '!opacity-100': active.c === index,
            })} loading="lazy" src={active.p === index || active.c === index ? item.image : ""} alt='' />
          ))}
        </div>
      </div>
    </div>
  </section>;
}

function DirectionItem({ item, index, active, ...props }: { item: DirectionType; index: number; active: ActiveType; } & React.HTMLProps<HTMLLIElement>) {
  return (<li role={'button'} className={clsx("border-b border-opacity-40 border-pnk-200 py-4", active.c === index && 'pointer-events-none')} {...props}>
    <div className={clsx("flex justify-between items-start cursor-pointer")}>
      <div className="flex">
        <p className="hidden md:block mr-5 text-lg text-pnk-200 font-light opacity-40">{String('0' + (index + 1)).slice(-2)}</p>
        <div>
          <p className="text-xl md:text-3xl">{item.headline}</p>
          {!!item.subheadline && <p className="text-xs font-light mt-1">{item.subheadline}</p>}
        </div>
      </div>
      <div className="flex space-x-5 mr-0 md:mr-10 items-end" >
        {item.groups?.length > 0 && <p className="text-lg md:text-2xl font-light opacity-30">{item.groups.join(",")}</p>}
        <span className={clsx('transition', active.c === index && 'rotate-45 active:transition-transform')}>
          <svg className="stroke-pnk-200" width="30" height="29" viewBox="0 0 30 29" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="0.646447" y1="28.6469" x2="28.6464" y2="0.646935" />
            <line y1="-0.5" x2="39.598" y2="-0.5" transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 29 29.0005)" />
          </svg>
        </span>
      </div>
    </div>
    <p className={clsx("transition-max-height max-h-0 h-auto overflow-hidden text-sm md:text-lg font-light my-0 lg:mr-10 lg:ml-10", {
      'max-h-0 duration-300': active.p === index,
      'mt-4 max-h-[500px] duration-500': active.c === index,
    })}>{item.body}</p>
  </li >);
}

export default Directions;