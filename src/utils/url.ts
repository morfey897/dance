import { DEFAULT_LANG, AVAILABLE_LANG } from "./constants";
const LANG_REG = /^(\/[a-z]{2})(?:\/|\?|$)/;

export function getLang(href: string) {
  const url = new URL(href);
  const [, urlLang] = url.pathname.match(LANG_REG) || [];
  if (!urlLang) return DEFAULT_LANG;
  const lang = urlLang.replace(/^\/|\/$/g, '');;
  if (AVAILABLE_LANG.map(l => l.trim()).filter(l => !!l && l.length).includes(lang)) return lang;
  return undefined;
}

export function normalize(href: string) {
  const url = new URL(href);
  const urlLang = getLang(href);
  const path = url.href.replace(url.origin, '');
  const lang = urlLang === DEFAULT_LANG ? '' : urlLang;
  return `${url.protocol}//` + [url.host, urlLang ? path.replace(LANG_REG, '/' + lang + '/') : '/' + lang + '/' + path].join('/').replace(/\/{2,}/g, "/");
}