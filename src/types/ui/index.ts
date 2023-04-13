import type { EnvType } from "../env";
import type { MarkdownInstance } from "astro";

export type ClientEnvType = Pick<EnvType, 'SITE' | 'LANGS' | 'CDN_PROVIDER' | 'GOOGLE_API_KEY'> &
{ URL: string; LANG: string; IMAGES: Map<string, string> }

export type ContextType = { env: ClientEnvType; };

export type PropsType = { content: Array<MarkdownInstance<any>>; lang: string; request: Request; };

export interface BlockType {
  headline: string;
  subheadline?: string;
  bodyHTML?: string;
  image?: string | { src: string, alt: string; };
  anchor?: string;
};

export interface NavigationType {
  navigation: { [key: number]: { href: string; label: string; } } | Array<{ href: string; label: string; }>;
}

export interface HeaderType extends NavigationType {
  title: string;

}

export interface FooterType extends NavigationType{
  address: { country: string; city: string; district: string; address: string; place: string; lat: number; lng: number; };
  socials: Array<{ type: string; href: string; title: string; }>;
}

export interface AboutType extends BlockType {
  cta?: {
    label: string;
    href: string;
  }
}

export type DirectionType = {
  uid: string;
  headline: string;
  subheadline?: string;
  bodyHTML?: string;
  image: string;
  groups?: string[]
};

export interface DirectionsType extends BlockType {
  list: Array<DirectionType>;
}

export interface ScheduleType extends BlockType {
  timeLabel: string;
  todayLabel: string;
}
export type EventType = {
  uid: string;
  time: string;
  duration: number;
  direction: string;
  trainer: string;
  gym: string;
  date: string;
  info?: string;
}

export type EventsType = Array<{
  date: Date;
  list: EventType[];
}>;

export type DateType = {
  time: string;
  items: Array<EventType | EventType[] | undefined>;
}

export type GridState = {
  now: Date;
  active: Date;
  locale: Locale;
  dates: Array<Date>;
}

export type DateAction = {
  type: 'inc' | 'dec' | 'active' | 'now';
  payload?: Date;
}

interface ElementType {
  uid: string;
  headline: string;
  subheadline?: string;
  bodyHTML?: string;
}

export interface PriceType extends ElementType {
  price?: number;
  oldPrice?: number;
  currency: string;
  top?: boolean;
}

export interface GroupType extends ElementType {
  items: Array<PriceType>;
}

export interface PricesType extends BlockType {
  list: Array<ElementType & {
    items: Array<PriceType | GroupType>
  }>;
}

export type ControlsType = {
  pages: Array<number>;
  active: number;
  onSelectPage: (page: number) => void;
}

export type ImageType = {
  uid: string;
  headline?: string;
  subheadline?: string;
  bodyHTML?: string;
  image: string | { src: string, alt: string; };
}

export interface GallaryType extends BlockType {
  list: Array<ImageType>;
}

export interface ContactsType extends BlockType {
  google_api_key?: string;
  address: { country: string; city: string; district: string; street: string; place: string; lat: number; lng: number; };
  phones: Array<string>;
  socials: Array<{ type: string; href: string; title: string; }>;
  images?: Array<string | { src: string, alt: string; }>;
}
