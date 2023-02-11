/// <reference types="astro/client" />
interface ImportMetaEnv {
  readonly LANGS: string;
  readonly PROXY_API_ARL: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}