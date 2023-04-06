

import { getEnv, getKV } from "./cloudflare";
import { getAccessToken } from "./auth";
import flatten from "flat";
import { toBase64URL } from "../utils/url";


const IMG_REG = /^(:?https?:)?(:?\/{2})?[\/\.\d\w\-]+\.(:?png|jpe?g|avif|webp|svg)$/;

const SCOPES = ["https://www.googleapis.com/auth/cloud-platform"];

class TranslationList {
  #list:Array<string> = [];
  #indexes = new Map<number, number>();
  
  add(index: number, str: string) {
    let newIndex = this.#list.push(str) - 1;
    this.#indexes.set(index, newIndex);
  };

  getValue(index: number):string | undefined {
    let innerIndex = this.#indexes.get(index);
    return this.#list[innerIndex];
  }

  getIndex(index: number):number | undefined {
    return this.#indexes.get(index);
  }

  get values(){ 
    return [...this.#list];
  }

}

const keyToBase64 = (str:string) => toBase64URL(str.replace(/[\s\-_\.,;\d]/g, "")); 

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

export async function translateJSON({ target, source = 'uk', content }: { target: string; source?: string; content: { [key: string]: { [key: string]: any } | string | number } }, request: Request): Promise<any | null> {
  if (!source || !target || source === target) return content;

  const KEY = `TRANSLATE_${target}`;
  const KV = await getKV(request);

  const data = Object.entries(flatten(content));
  const keys = data.map(([key]) => key);
  const values: Array<string | number> = data.map(([_, value]) => value);

  const toTranslate = new TranslationList();
  const translated = new TranslationList();

  for (let index = 0; index < values.length; index++) {
    const str = values[index];
    if (typeof str === 'string' && str.length > 0 && !IMG_REG.test(str)) {
  //     const base64 = keyToBase64(str);
  //     // const trans = await KV.get(`${KEY}${base64}`);
  //     // if (!trans) {
        toTranslate.add(index, str);
  //     // } else {
  //     //   translated.add(index, trans);
  //     // }
    }
  }
  const toTranslateValues = toTranslate.values;
  const translation = await translate({ target, source, content: ['Це тест', "Тест тексту"] }, request);

  return content;
  if (!translation) return null;

  // for (let index = 0; index < translation.length; index++) {
  //   const trans = translation[index];
  //   if (trans) {
  //     const str = toTranslateValues[index];
  //     const base64 = keyToBase64(str);
  //     await KV.put(`${KEY}${base64}`, trans);
  //   }
  // }

  // const result: { [key: string]: any } = flatten.unflatten(keys.reduce((obj, key, index) => {
  //   let value = values[index];

  //   const toTranslateIndex = toTranslate.getIndex(index);
  //   if (typeof toTranslateIndex === 'number') {
  //     value = translation[toTranslateIndex];
  //   } else {
  //     const translatedValue = translated.getValue(index);
  //     if (typeof translatedValue === 'string') {
  //       value = translatedValue;
  //     }
  //   }
  //   obj[key] = value;
  //   return obj;
  // }, {}));


  // return result;
}