import { useCallback, useEffect, useState } from "react";
import { useLang } from "../../hooks/store";
// import { getImage } from '@astrojs/image';
// const img = await getImage({  width: undefined, aspectRatio: '5:6', format: 'avif' });

function Header({ title }: { title: string }) {
  const $lang = useLang();
  return <header className="sticky top-0 z-20 w-full bg-white shadow">
    <div className="max-w-screen-xl mx-auto py-2.5">
      <nav className="border flex">
        <a href="/">
          <img loading="lazy" src='/logo.png' alt='' />
        </a>
        <p>
          {title}{'HEADER'}
        </p>
      </nav>
    </div>
  </header>;
}

export default Header;
