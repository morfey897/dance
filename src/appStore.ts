import { atom, map } from 'nanostores';

export const address = map<{ country: string; city: string; district: string; address: string; place: string; lat: number; lng: number;}>({
  country: '',
  city: '',
  district: '',
  address: '',
  place: '',
  lat: 0,
  lng: 0,
});

export const phones = atom<Array<string>>([]);
export const social = atom<Array<{ type: string; href: string; title: string; }>>([]);

export const lang = atom('');

export default {
  address,
  phones,
  social,
  lang
}