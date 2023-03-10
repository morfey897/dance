import { defineConfig } from "astro/config";
import react from '@astrojs/react';
import tailwind from "@astrojs/tailwind";
import prefetch from "@astrojs/prefetch";

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
  integrations: [react(), tailwind(), prefetch(), mdx(),],
});