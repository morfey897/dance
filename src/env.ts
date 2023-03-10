interface ImportMetaEnv {
  readonly LANGS: string;
  readonly GOOGLE_API_KEY: string;
}

const _ENV: ImportMetaEnv = JSON.parse(JSON.stringify(process?.env || import.meta.env));

export const LANGS = _ENV.LANGS;
export const GOOGLE_API_KEY = _ENV.GOOGLE_API_KEY;

export default {
  LANGS,
  GOOGLE_API_KEY
}
