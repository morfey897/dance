/// <reference types="astro/client" />
interface ImportMetaEnv {
  readonly LANGS: string;
  readonly GOOGLE_API_KEY: string;
  readonly GOOGLE_SERVICE_ADDRESS: string;
  readonly GOOGLE_CALENDAR_ID: string;
  readonly GENERATE_ACCESS_TOKEN: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}