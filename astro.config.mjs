import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import icon from "astro-icon";
import tailwind from "@astrojs/tailwind";
import solidJs from "@astrojs/solid-js";


// https://astro.build/config
export default defineConfig({
  site: 'https://wjv.io',
  integrations: [mdx(), sitemap(), icon(), tailwind(), solidJs()]
});