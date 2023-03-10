import Section from "../../elements/Section";
import Phone from "./Phone";
import SocialMedia from "./SocialMedia";
import CanvasMap from "./CanvasMap";
import { useInView } from 'react-intersection-observer';
import clsx from "clsx";
import { ANCHORS } from "../../../utils/constants";
import { useAddress, useSocial, usePhones } from "../../../hooks/store";
import { Wrapper } from "@googlemaps/react-wrapper";

const HEADLINE = 'Контакти';
const SUBHEADLINE = 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.';

function Contacts({ google_api_key }: { google_api_key: string }) {

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const phones = usePhones();
  const socials = useSocial();
  const address = useAddress();

  return <Section anchor={ANCHORS.cntct}>
    <div className="flex gap-8 flex-col-reverse lg:flex-row ">
      <div className="basis-2/5 w-full">
        <div className={clsx("h-[300px] lg:h-full -mb-16 lg:mb-0 -mx-4 lg:mx-0 lg:w-full bg-white", !inView && 'animate-pulse')} ref={ref}>
          {inView && <Wrapper apiKey={google_api_key}>
            <CanvasMap center={{ lat: address.lat, lng: address.lng }} zoom={16} className="w-full h-[inherit]" />
          </Wrapper>}
        </div>
      </div>
      <div className="basis-3/5 w-full">
        <h2 className="uppercase text-3xl md:text-7xl text-left">{HEADLINE}</h2>
        <a className="block text-base md:text-3xl mt-10 max-w-screen-md m-auto text-left underline" href={`https://www.google.com/maps/search/?api=1&query=${encodeURI(`${address.place}`)}`} target="_blank" rel="noreferrer">{[address.city, address.district, address.address].filter(a => !!a).join(", ")}</a>
        <p className="text-xs md:text-base mt-5 max-w-screen-md m-auto text-left">{SUBHEADLINE}</p>
        <div className="flex justify-between mt-10 items-center lg:items-end gap-8 flex-col-reverse lg:flex-row">
          <ul className="space-y-6 md:space-y-10">{phones.map((phone) => <li key={phone} ><Phone phone={phone} /></li>)}</ul>
          <ul className="space-y-6 md:space-y-10">{socials.map((social) => <li key={social.href} ><SocialMedia {...social} /></li>)}</ul>
        </div>
      </div>
    </div>
  </Section>
}

export default Contacts;