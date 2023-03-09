import SocialMedia from "../Contacts/SocialMedia";
import Link from "./Link";
import { ANCHORS } from "../../../utils/constants";
import { useSocial, useAddress } from "../../../hooks/store";

const LINKS: Array<{ href: string; label: string; active?: boolean }> = [{
  href: `#${ANCHORS.schdl}`,
  label: 'Розклад'
}, {
  href: `#${ANCHORS.prc}`,
  label: 'Прайс',
}, {
  href: `#${ANCHORS.dir}`,
  label: 'Направлення'
}];

function Footer() {

  const socials = useSocial();
  const address = useAddress();

  return <footer className={"w-full z-20 pt-6 pb-10"}>
    <div className="max-w-screen-xl mx-auto px-4">
      <div className="flex justify-between items-center gap-4 flex-col-reverse md:flex-row">
        <p className="text-xs">© {new Date().getFullYear()} {address.place}</p>
        <ul className="gap-4 flex flex-wrap">
          {
            LINKS.map((link) => (<li key={link.href}><Link {...link} /></li>))
          }
        </ul>
        <ul className="gap-4 flex flex-wrap">
          {
            socials.map((social) => <li key={social.href} ><SocialMedia {...social} title={undefined} /></li>)
          }
        </ul>
      </div>
    </div>
  </footer>
}

export default Footer;
