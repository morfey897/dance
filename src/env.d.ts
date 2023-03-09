/// <reference types="astro/client" />
interface ImportMetaEnv {
  readonly LANGS: string;
  readonly GOOGLE_API_KEY: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}