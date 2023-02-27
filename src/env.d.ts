/// <reference types="astro/client" />
interface ImportMetaEnv {
  readonly LANGS: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}