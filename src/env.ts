interface ImportMetaEnv {
  readonly LANGS: string;
  readonly GOOGLE_API_KEY: string;
}

//  || import.meta.env
const _ENV: ImportMetaEnv = JSON.parse(JSON.stringify(process.env));
console.log('DEPLOYMENT', _ENV);

export const LANGS: Array<string> = (_ENV.LANGS || "").split(",").filter(lang => !!lang);
export const GOOGLE_API_KEY: string = _ENV.GOOGLE_API_KEY || "";

export default {
  str_f: JSON.stringify(process.env),
  _ENV,
  LANGS,
  GOOGLE_API_KEY
}
