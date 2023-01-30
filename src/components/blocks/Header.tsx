import { useLang } from "../../hooks/store";
// import { getImage } from '@astrojs/image';
// const img = await getImage({  width: undefined, aspectRatio: '5:6', format: 'avif' });

function Header() {
  const $lang = useLang();
  // {`LANG: ${$lang}`}
  return <header className="sticky top-0 z-20 w-full bg-white shadow">
    <div className="max-w-screen-xl mx-auto py-2.5">
      <nav className="border">
        <a href="/">
          <img loading="lazy" src='/logo.png' alt='' />
        </a>
        <a href="/">
          {'DEFAULT_LANG:'}{$lang}
        </a>
      </nav>
    </div>
  </header>;
}

export default Header;
