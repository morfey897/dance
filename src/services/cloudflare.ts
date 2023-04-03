import { getRuntime } from "@astrojs/cloudflare/runtime";
import { KVNamespace } from "@cloudflare/workers-types";

type RuntimeEnv = {
  LANGS: string;
  DANCE_KV: KVNamespace;
}

type EnvType = {
  LANGS: Array<string>;
  SITE: string;
  GOOGLE_API_KEY: string;
  GOOGLE_CALENDAR_ID: string;
  GOOGLE_PROJECT_ID: string;
  GOOGLE_SERVICE_ADDRESS: {
    type: string;
    project_id: string;
    private_key_id: string;
    private_key: string;
    client_email: string;
    client_id: string;
    auth_uri: string;
    token_uri: string;
  } | null
};

export function getEnv(request: Request): EnvType {
  const runtime = getRuntime<RuntimeEnv>(request);

  const env = {
    LANGS: (runtime?.env['LANGS'] || import.meta.env.LANGS || "uk").split(",").map(lang => lang.trim().toLowerCase()),
    SITE:  (runtime?.env['SITE'] || import.meta.env.SITE || ""),
    GOOGLE_API_KEY: (runtime?.env['GOOGLE_API_KEY'] || import.meta.env.GOOGLE_API_KEY || ""),
    GOOGLE_CALENDAR_ID: (runtime?.env['GOOGLE_CALENDAR_ID'] || import.meta.env.GOOGLE_CALENDAR_ID || ""),
    GOOGLE_PROJECT_ID: (runtime?.env['GOOGLE_PROJECT_ID'] || import.meta.env.GOOGLE_PROJECT_ID || ""),
    GOOGLE_SERVICE_ADDRESS: null
  }
  try {
    env.GOOGLE_SERVICE_ADDRESS = JSON.parse(runtime?.env['GOOGLE_SERVICE_ADDRESS'] || import.meta.env.GOOGLE_SERVICE_ADDRESS);
  } catch (e) { }

  return env;
}

export async function getKV(request: Request) {
  const runtime = getRuntime<RuntimeEnv>(request);
  const KV = runtime?.env?.DANCE_KV;

  if (!KV) {
    try {
      const fs = await import('fs/promises');
      await fs.mkdir("./.wrangler/state/kv", { recursive: true });
      return {
        get: async (key: string) => {
          const bf = await fs.readFile(`./.wrangler/state/kv/${key}`, { encoding: 'utf-8' });
          return bf?.toString();
        },
        put: async (key: string, value: string) => {
          await fs.writeFile(`./.wrangler/state/kv/${key}`, value, { encoding: 'utf-8' });
          return value;
        },
        del: async (key: string) => {
          await fs.unlink(`./.wrangler/state/kv/${key}`);
          return;
        }
      }
    } catch (error) {
      console.warn(error);
    }
  }

  return {
    get: async (key: string) => {
      if (!KV) return null;
      const value: string = await KV.get(key);
      return value;
    },
    put: async (key: string, value: string) => {
      if (!KV) return null;
      await KV.put(key, value);
      return value;
    },
    del: async (key: string) => {
      if (!KV) return null;
      await KV.delete(key);
      return;
    }
  };
}