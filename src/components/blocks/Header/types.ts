
export type HeaderType = {
  navigation: Array<{ href: string; label: string; }>;
  url: string;
  lang: string;
  langs: Array<string>;
}

export type NavigationType = Pick<HeaderType, 'navigation'>