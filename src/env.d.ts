/// <reference types="astro/client" />
interface ImportMetaEnv {
  readonly DEFAULT_LANG: string;
  readonly AVAILABLE_LANG: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}