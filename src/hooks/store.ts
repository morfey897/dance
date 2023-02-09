import { useStore } from '@nanostores/react';
import { lang } from "../appStore";
export function useLang() {
  const $lang = useStore(lang);
  return $lang;
}