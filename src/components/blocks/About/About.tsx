import clsx from "clsx";
import Section from "../../elements/Section";
import Image from "../../elements/Image";
import type { AboutType } from "./types";

function About({ headline, subheadline, anchor, image, cta, children }: AboutType) {

  return <Section className="bg-[url('/background.png')] bg-cover text-center pt-[74px]" anchor={anchor}>
    <Image image={image} alt={headline} block="about" className="m-auto md:p-0 px-10" />
    <h1 className="uppercase text-4xl md:text-9xl mt-14">{headline}</h1>
    <div className={clsx(
      "text-sm md:text-lg mt-7 max-w-screen-lg m-auto",
    )}>
      {subheadline && <p>{subheadline}</p>}
      {children}
    </div>
    {cta && <a href={cta.href} className="block w-fit m-auto mt-7 text-sm md:text-lg text-center border-2 border-pnk-200 rounded-3xl py-2 px-4 hover:bg-pnk-200 hover:border-pnk-200 hover:shadow hover:shadow-pnk-200 active:border-pnk-100 active:shadow active:shadow-pnk-100">{cta.label}</a>}
  </Section>
}

export default About;