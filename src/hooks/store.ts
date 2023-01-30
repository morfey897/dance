import { useStore } from '@nanostores/react';
import { lang } from "../cartStore";
export function useLang() {
  const $lang = useStore(lang);
  return $lang;
}