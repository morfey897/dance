
export type HeaderType = {
  navigation: { [key: number]: { href: string; label: string; } } | Array<{ href: string; label: string; }>;
  url: string;
  lang: string;
  langs: Array<string>;
}

export type NavigationType = Pick<HeaderType, 'navigation'>