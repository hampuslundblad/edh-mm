import { defineConfig } from "vite"
import viteReact from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

import { TanStackRouterVite } from "@tanstack/router-plugin/vite"
import { resolve } from "node:path"
import { BASE_PATH } from "./src/config"
// https://vitejs.dev/config/
export default defineConfig({
  base: `${BASE_PATH}`,
  plugins: [
    TanStackRouterVite({ autoCodeSplitting: true }),
    viteReact(),
    tailwindcss(),
  ],
  build: {
    outDir: "./dist",
  },
  test: {
    globals: true,
    environment: "jsdom",
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
})
