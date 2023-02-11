import { parse } from "accept-language-parser";
const LANG_REG = /^\/([a-z]{2})(?:\/|\?|$)/;

export function getLang(href: string | URL) {
  const url = new URL(href);
  const [, urlLang] = url.pathname.match(LANG_REG) || [];
  return urlLang || "";
}

export function normalize(href: string | URL) {
  const url = new URL(href);
  return url.origin + url.pathname.replace(/\/$/g, "");
}

export function getPreferableLangs(request: Request) {
  const langList: Array<{ code: string }> = parse(
    request.headers.get("accept-language")
  );
  return [...new Set(langList.map(({ code }) => code))];
}
