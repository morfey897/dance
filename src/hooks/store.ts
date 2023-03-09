import { useStore } from '@nanostores/react';
import { lang, address, phones, social } from "../appStore";

export function useLang() {
  const $lang = useStore(lang);
  return $lang;
}

export function useAddress() {
  const $address = useStore(address);
  return $address;
}

export function usePhones() {
  const $phones = useStore(phones);
  return $phones;
}

export function useSocial() {
  const $social = useStore(social);
  return $social;
}