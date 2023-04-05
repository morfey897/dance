

import { getEnv, getKV } from "./cloudflare";
import { getAccessToken } from "./auth";
import flatten from "flat";

const IMG_REG = /^(:?https?:)?(:?\/{2})?[\/\.\d\w\-]+\.(:?png|jpe?g|avif|webp|svg)$/;

const SCOPES = ["https://www.googleapis.com/auth/cloud-platform"];

export async function translate({ target, source = 'uk', content }: { target: string; source?: string; content: Array<string> }, request: Request): Promise<Array<string> | null> {
  if (!source || !target || source === target) return content;
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

export async function translateJSON({ target, source = 'uk', content }: { target: string; source?: string; content: { [key: string]: { [key: string]: any } | string | number } }, request: Request): Promise<{ [key: string]: { [key: string]: any } | string | number } | null> {
  if (!source || !target || source === target) return content;
  const data = Object.entries(flatten(content));
  const keys = data.map(([key]) => key);
  const values: Array<string | number> = data.map(([_, value]) => value);
  const { toTranslate, indexes } = values.reduce((to, str, index) => {
    if (typeof str === 'string' && str.length > 0 && !IMG_REG.test(str)) {
      let newIndex = to.toTranslate.push(str) - 1;
      to.indexes.set(index, newIndex);
    }
    return to;
  }, { toTranslate: [], indexes: new Map<number, number>() });
  const translation = await translate({ target, source, content: toTranslate }, request);

  if (!translation) return null;

  const result: { [key: string]: any } = flatten.unflatten(keys.reduce((obj, key, index) => {
    let oldIndex = indexes.get(index);
    const value = (typeof oldIndex === 'number' ? translation[oldIndex] : values[index]) || values[index];
    obj[key] = value;
    return obj;
  }, {}));


  return result;
}