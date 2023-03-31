import Section from "../../elements/Section";
import Phone from "./Phone";
import SocialMedia from "./SocialMedia";
import CanvasMap from "./CanvasMap";
import { useInView } from 'react-intersection-observer';
import clsx from "clsx";
import { Wrapper } from "@googlemaps/react-wrapper";
import type { ContactsType } from "./types";
import Image from "../../elements/Image";
import RenderHTML from "../../elements/RenderHTML";

function Contacts({ headline, subheadline, images, google_api_key, address, phones, socials, anchor, bodyHTML }: ContactsType) {

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return <Section anchor={anchor}>
    <div className="flex gap-8 flex-col-reverse lg:flex-row ">
      <div className="basis-2/5 w-full">
        <div className={clsx("h-[300px] lg:min-h-[500px] lg:h-full -mb-16 lg:mb-0 -mx-4 lg:mx-0 lg:w-full bg-white", !inView && 'animate-pulse')} ref={ref}>
          {inView && <Wrapper apiKey={google_api_key}>
            <CanvasMap center={{ lat: address.lat, lng: address.lng }} zoom={16} className="w-full h-[inherit]" />
          </Wrapper>}
        </div>
      </div>
      <div className="basis-3/5 w-full flex flex-col justify-between">
        <div>
          <h2 className="uppercase text-3xl md:text-7xl text-left">{headline}</h2>
          <a className="block text-base md:text-3xl mt-10 max-w-screen-md m-auto text-left underline" href={`https://www.google.com/maps/search/?api=1&query=${encodeURI(`${address.place}`)}`} target="_blank" rel="noreferrer">{[address.city, address.district, address.street].filter(a => !!a).join(", ")}</a>
          <div className="text-xs md:text-base mt-5 max-w-screen-md m-auto text-left">
            {subheadline && <p>{subheadline}</p>}
            <RenderHTML>{bodyHTML}</RenderHTML>
          </div>
        </div>
        <div className="flex flex-col-reverse lg:flex-col">
          {images?.length > 0 && <div className="flex gap-2 mt-5 flex-wrap">
            {images?.map((image, index) => <div key={index} className={clsx('relative w-full md:w-[240px] h-[240px] md:h-auto')}>
              <Image key={index} image={image} block="contacts" className="object-cover w-[inherit] h-[inherit]" />
              {(typeof image === "object" && !!image.alt) && <div className="text-sm absolute bottom-0 left-0 right-0 bg-[#161616]">
                <p className="px-1 py-1">{image.alt}</p>
              </div>}
            </div>
            )}
          </div>}
          <div className="flex justify-between mt-10 items-end gap-8 flex-row">
            <ul className="space-y-6 md:space-y-10">{phones.map((phone) => <li key={phone} ><Phone phone={phone} /></li>)}</ul>
            <ul className="space-y-6 md:space-y-10">{socials.map((social) => <li key={social.href} ><SocialMedia {...social} /></li>)}</ul>
          </div>
        </div>
      </div>
    </div>
  </Section>
}

export default Contacts;