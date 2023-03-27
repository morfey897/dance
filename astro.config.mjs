import { defineConfig } from "astro/config";
import react from '@astrojs/react';
import tailwind from "@astrojs/tailwind";
import basicSsl from '@vitejs/plugin-basic-ssl';
import fs from "fs";

// https://astro.build/config
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  output: 'server',
  root: '.',
  site: 'https://studio-kalipso.com',
  adapter: cloudflare({
    mode: 'directory'
  }),
  integrations: [react(), tailwind(), mdx(),],
  // vite: {
  //   server: { https: {
  //     key: fs.readFileSync("./localhost+2-key.pem"),
  //     cert: fs.readFileSync("./localhost+2.pem"),
  //   } },
  // }
});