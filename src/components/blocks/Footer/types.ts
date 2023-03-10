
export type FooterType = {
  address: { country: string; city: string; district: string; address: string; place: string; lat: number; lng: number; };
  socials: Array<{ type: string; href: string; title: string; }>;
  navigation: Array<{ href: string; label: string; }>;
}
