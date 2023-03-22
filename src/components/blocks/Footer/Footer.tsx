import SocialMedia from "../Contacts/SocialMedia";
import Link from "./Link";
import type { FooterType } from "./types";

function Footer({ socials, address, navigation }: FooterType) {

  return <footer className={"w-full z-20 pt-6 pb-6"}>
    <div className="max-w-screen-xl mx-auto px-4">
      <div className="flex justify-between items-center gap-4 flex-col-reverse md:flex-row">
        <p className="text-xs">© {new Date().getFullYear()} {address?.place || ''}</p>
        <ul className="gap-4 flex flex-wrap">
          {
            navigation?.map((link) => (<li key={link.href}><Link {...link} /></li>))
          }
        </ul>
        <ul className="gap-4 flex flex-wrap">
          {
            socials?.map((social) => <li key={social.href} ><SocialMedia {...social} title={undefined} /></li>)
          }
        </ul>
      </div>
      <div className="flex justify-center md:justify-end mt-4">
        <p className="flex items-baseline gap-x-1 border-t pt-2 font-light text-sm">Made in <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" height={16}>
          <g fill-rule="evenodd" stroke-width="1pt">
            <path fill="gold" d="M0 0h640v480H0z" />
            <path fill="#0057b8" d="M0 0h640v240H0z" />
          </g>
        </svg></p>
      </div>
    </div>
  </footer>
}

export default Footer;
