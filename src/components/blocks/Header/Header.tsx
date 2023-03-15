import clsx from "clsx";
import { useScrollDirection } from "../../../hooks/useScrollDetect";
import Link from "./Link";
import type { HeaderType } from "./types";

function Header({ navigation }: HeaderType) {

  const scrlDetect = useScrollDirection();

  return <header className={clsx("fixed top-0 z-20 w-full bg-transparent", {
    'backdrop-blur': scrlDetect.percent > 0.02,
  })}>
    <div className="max-w-screen-xl mx-auto py-2.5 px-4">
      <nav className="flex items-center justify-between">
        <a href="/">
          <img loading="lazy" src='/logo.png' alt='' />
        </a>
        <div className="block md:hidden">
          <button className="bg-pnk-200 rounded-full h-[30px] w-[30px] text-center group relative">
            <svg className="m-auto" width="20" height="11" viewBox="0 0 20 11" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line y1="0.5" x2="15" y2="0.5" stroke="white" />
              <line y1="5.5" x2="10" y2="5.5" stroke="white" />
              <line y1="10.5" x2="20" y2="10.5" stroke="white" />
            </svg>
            <ul className="absolute hidden group-hover:block bg-black bg-opacity-60 p-2.5 right-0 top-0 space-y-4 rounded-sm">
              {
                navigation?.map((link) => (
                  <li key={`${link.href}-drop`} className='inline-block'>
                    <Link {...link} className='text-sm text-center py-2 px-4' />
                  </li>
                ))
              }
            </ul>
          </button>
        </div>
        <ul className="space-x-4 hidden md:block">
          {
            navigation?.map((link) => (
              <li key={`${link.href}-menu`} className='inline-block'>
                <Link {...link} className={clsx('text-base lg:text-lg text-center border-2 rounded-3xl py-2 px-2 lg:px-4 hover:bg-pnk-200 hover:border-pnk-200 hover:shadow hover:shadow-pnk-200 border-transparent')} />
              </li>
            ))
          }
        </ul>
      </nav>
    </div>
  </header>;
}
export default Header;
