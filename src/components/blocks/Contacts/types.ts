import BlockType from "../../types/BlockType";

export interface ContactsType extends BlockType {
  google_api_key?: string;
  address: { country: string; city: string; district: string; address: string; place: string; lat: number; lng: number; };
  phones: Array<string>;
  socials: Array<{ type: string; href: string; title: string; }>;
}
