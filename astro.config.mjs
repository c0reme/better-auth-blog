// @ts-check
import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import svelte from "@astrojs/svelte";
import node from "@astrojs/node";
import superforms from "astro-superforms";

// https://astro.build/config
export default defineConfig({
  output: "server",
  site: "https://example.com",
  integrations: [mdx(), sitemap(), svelte(), superforms()],
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: [
        "better-auth",
        "sveltekit-superforms",
        "devalue",
        "@sveltejs/kit",
      ],
    },
  },
  adapter: node({ mode: "standalone" }),
});
