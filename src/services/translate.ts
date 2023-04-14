

import { getEnv, getKV } from "./cloudflare";
import { getAccessToken } from "./auth";
import { flatten, unflatten } from "flat";
import { encodeB64 } from '../utils/base64';

const URL_REG = /^(:?https?:)?(:?\/{2})?[\/\.\d\w\-\#\?=&]+$/i;

const SCOPES = ["https://www.googleapis.com/auth/cloud-platform"];

class TranslationList {
  #list: Array<string> = [];
  #indexes = new Map<number, number>();
  #base64: Array<string> = [];

  add(index: number, str: string, base64?: string) {
    let newIndex = this.#list.push(str) - 1;
    this.#indexes.set(index, newIndex);
    if (base64) {
      this.#base64[newIndex] = base64;
    }
  };

  getValue(index: number): string | undefined {
    let innerIndex = this.#indexes.get(index);
    return this.#list[innerIndex];
  }

  getIndex(index: number): number | undefined {
    return this.#indexes.get(index);
  }

  get values() {
    return [...this.#list];
  }


  get base64s() {
    return [...this.#base64];
  }

}

export async function translate({ target, source = 'uk', content }: { target: string; source?: string; content: Array<string> }, request: Request): Promise<Array<string> | null> {
  if (!source || !target || source === target || !content || content.length == 0) return content;
  const { GOOGLE_PROJECT_ID, GOOGLE_SERVICE_ADDRESS } = getEnv(request);
  try {

    if (!GOOGLE_SERVICE_ADDRESS) throw new Error('Undefined env');
    const authorization = await getAccessToken(GOOGLE_SERVICE_ADDRESS, SCOPES, undefined, await getKV(request));
    if (!authorization) throw new Error('Undefined authorization');
    const googleUrl = new URL(`https://translation.googleapis.com/v3/projects/${GOOGLE_PROJECT_ID}:translateText`);

    const translateResponse = await fetch(googleUrl, {
      method: 'POST',
      body: JSON.stringify({
        "sourceLanguageCode": source,
        "targetLanguageCode": target,
        "contents": content,
      }),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": authorization
      }
    });
    const data = (await translateResponse.json()) as { translations: Array<{ translatedText: string }> };
    return data.translations.map(({ translatedText }) => translatedText);
  } catch (error) {
    console.warn(error);
    return null;
  }
}

export async function translateJSON({ target, source = 'uk', content }: { target: string; source?: string; content: { [key: string]: { [key: string]: any } } }, request: Request): Promise<any | null> {
  if (!source || !target || source === target) return content;

  const KV = await getKV(request);

  const list = Object.entries(content);
  const len = list.length;
  const result = {};
  for (let i = 0; i < len; i++) {
    const [file, content] = list[i];

    let storedData: Object;
    try {
      let d = await KV.get(`TRANSLATE_${target}_${file}`);
      storedData = typeof d === 'string' ? JSON.parse(d) : {};
    } catch (error) {
      storedData = {};
    }

    const data = Object.entries(flatten(content));
    const keys = data.map(([key]) => key);
    const values: Array<string | number> = data.map(([_, value]) => value);

    const toTranslate = new TranslationList();
    const translated = new TranslationList();

    for (let index = 0; index < values.length; index++) {
      const str = values[index];
      if (typeof str === 'string' && str.length > 0 && !URL_REG.test(str)) {
        const token = str.replace(/[\s\d\-\+\*\\\=_\.,;:\!\?@]/g, "");
        if (token.length) {
          const base64 = encodeB64(token).slice(0, 128);
          const trans = storedData[base64];
          if (!trans) {
            toTranslate.add(index, str, base64);
          } else {
            translated.add(index, trans);
          }
        }
      }
    }

    const toTranslateValues = toTranslate.values;
    const toTranslateBase64s = toTranslate.base64s;
    const translation = await translate({ target, source, content: toTranslateValues }, request);

    if (translation) {
      for (let index = 0; index < translation.length; index++) {
        const trans = translation[index];
        if (trans) {
          const base64 = toTranslateBase64s[index];
          storedData[base64] = trans;
        }
      }
      try {
        await KV.put(`TRANSLATE_${target}_${file}`, JSON.stringify(storedData));
      } catch (error) { }
    }

    result[file] = unflatten(keys.reduce((obj, key, index) => {
      let value = values[index];

      const toTranslateIndex = toTranslate.getIndex(index);
      if (typeof toTranslateIndex === 'number') {
        value = translation[toTranslateIndex];
      } else {
        const translatedValue = translated.getValue(index);
        if (typeof translatedValue === 'string') {
          value = translatedValue;
        }
      }
      obj[key] = value;
      return obj;
    }, {}));

  }

  return result;
}