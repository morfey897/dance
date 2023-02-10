import { defineConfig } from "astro/config";
import react from '@astrojs/react';
import tailwind from "@astrojs/tailwind";
import prefetch from "@astrojs/prefetch";

// https://astro.build/config
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  output: 'server',
  root: '.',
  site: 'https://studio-kalipso.com.ua',
  integrations: [react(), tailwind(),
  prefetch(), sitemap({
    customPages: ['https://studio-kalipso.com.ua/sitemap.xml'],
  })],
  adapter: cloudflare({ mode: 'directory' })
});