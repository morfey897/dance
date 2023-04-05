import { defineConfig } from "astro/config";
import react from '@astrojs/react';
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  output: 'server',
  root: '.',
  adapter: cloudflare({
    mode: 'directory'
  }),
  integrations: [react(), tailwind(), mdx(),],
});