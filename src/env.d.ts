/// <reference types="astro/client" />
interface ImportMetaEnv {
  readonly LANGS: string;
  readonly GOOGLE_API_KEY: string;
  readonly GOOGLE_SERVICE_ADDRESS: string;
  readonly GOOGLE_CALENDAR_ID: string;
  readonly CDN_PROVIDER: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}