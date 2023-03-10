
export type ContactsType = {
  headline: string;
  google_api_key?: string;
  anchor?: string;
  address: { country: string; city: string; district: string; address: string; place: string; lat: number; lng: number; };
  phones: Array<string>;
  socials: Array<{ type: string; href: string; title: string; }>;
}
