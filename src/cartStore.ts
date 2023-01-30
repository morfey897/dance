import { atom } from 'nanostores';

export const lang = atom('');
export const preferableLangs = atom<Array<string>>([]);