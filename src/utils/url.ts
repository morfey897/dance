import { parse } from "accept-language-parser";
const LANG_REG = /^\/([a-z]{2})(?:\/|\?|$)/;

export function getLang(href: string | URL) {
  const url = new URL(href);
  const [, urlLang] = url.pathname.match(LANG_REG) || [];
  return urlLang || "";
}

export function changeLang(href: string | URL, lang: string, absolutePath: boolean = false) {
  const url = new URL(href);
  url.pathname = url.pathname.replace(LANG_REG, lang);
  let path = url.toString();
  return absolutePath ? path : path.replace(url.origin, '');
}

export function normalizeURL(href: string | URL) {
  const url = new URL(href);
  url.pathname = url.pathname.replace(/\/+$/g, "");
  return url.toString();
}

export function normalize(href: string | URL) {
  const url = new URL(href);
  return url.origin + url.pathname.replace(/\/$/g, "");
}

export function cannonical(href: string | URL, site: string) {
  const url = new URL(href);
  return site + url.pathname.replace(/\/$/g, "");
}

export function getPreferableLangs(request: Request) {
  const langList: Array<{ code: string }> = parse(
    request.headers.get("accept-language")
  );
  return [...new Set(langList.map(({ code }) => code))];
}

export function isAbsolutePath(path: string) {
  return /^(:?https?:)?\/{2}/.test(path);
}

export function concatPaths(origin: string, ...urls: string[]) {
  if (isAbsolutePath(origin)) {
    return [origin.replace(/\+$/, ""), urls.join('/').replace(/\/{2,}/g, "/").replace(/^\/+/, "")].join('/');
  }
  return [origin, ...urls].join('/').replace(/\/{2,}/g, "/");
}