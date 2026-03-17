// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  output: 'server',           // 或 'server'（全动态）
  adapter: cloudflare({
    // 可选：imageService: 'cloudflare' 等
  }),
  integrations: [mdx()],
});
