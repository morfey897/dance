export type AboutType = {
  headline: string;
  img?: string | { src: string, alt: string; };
  cta?: {
    label: string;
    href: string;
  }
}