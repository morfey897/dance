import clsx from "clsx";
import Section from "../../elements/Section";
import Image from "../../elements/Image";
import type { AboutType } from "./types";
import RenderHTML from "../../elements/RenderHTML";

function About({ headline, subheadline, anchor, image, cta, bodyHTML }: AboutType) {

  return <Section className="text-center pt-[74px]" anchor={anchor}>
    <div className="absolute inset-0 z-0">
      <Image image={'/background.png'} alt={''} block="about" className="bg-cover h-full w-full" />
    </div>
    <div className="relative z-10">
      <Image image={image} alt={headline} block="about" className="m-auto md:p-0 px-10 brightness-75" />
      <h1 className="uppercase text-4xl md:text-9xl mt-14">{headline}</h1>
      <div className={clsx(
        "text-sm md:text-lg mt-7 max-w-screen-lg m-auto",
      )}>
        {subheadline && <p>{subheadline}</p>}
        <RenderHTML>{bodyHTML}</RenderHTML>
      </div>
      {cta && <a aria-label={cta.label} href={cta.href} className="group space-x-2 block w-fit m-auto mt-7 text-sm md:text-lg text-center border-2 border-pnk-200 rounded-3xl py-2 px-4 hover:bg-pnk-200 hover:border-pnk-200 hover:shadow hover:shadow-pnk-200 active:border-pnk-100 active:shadow active:shadow-pnk-100">
        <span className="inline-block">{cta.label}</span>
        <svg className="animate-bounce inline-block fill-pnk-100 group-hover:animate-none" height="24px" width="24px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 512 512" xmlSpace="preserve">
          <g>
            <g>
              <g>
                <path d="M256,0C114.618,0,0,114.618,0,256s114.618,256,256,256s256-114.618,256-256S397.382,0,256,0z M256,469.333
				c-117.818,0-213.333-95.515-213.333-213.333S138.182,42.667,256,42.667S469.333,138.182,469.333,256S373.818,469.333,256,469.333
				z"/>
                <path d="M347.582,198.248L256,289.83l-91.582-91.582c-8.331-8.331-21.839-8.331-30.17,0c-8.331,8.331-8.331,21.839,0,30.17
				l106.667,106.667c8.331,8.331,21.839,8.331,30.17,0l106.667-106.667c8.331-8.331,8.331-21.839,0-30.17
				C369.42,189.917,355.913,189.917,347.582,198.248z"/>
              </g>
            </g>
          </g>
        </svg>
      </a>}
    </div>
  </Section>
}

export default About;