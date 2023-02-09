/// <reference types="astro/client" />
interface ImportMetaEnv {
  readonly DEFAULT_LANG: string;
  readonly AVAILABLE_LANGS: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}