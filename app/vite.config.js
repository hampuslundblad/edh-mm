import { defineConfig } from "vite"
import viteReact from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

import { TanStackRouterVite } from "@tanstack/router-plugin/vite"
import { resolve } from "node:path"

// https://vitejs.dev/config/
export default defineConfig({
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
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        rewrite: (path) => path.replace(/^\/api/, ""),
        changeOrigin: false,
        secure: false,
        configure: (proxy) => {
          proxy.on("error", (err) => {
            console.log("proxy error", err)
          })
          proxy.on("proxyReq", (req) => {
            console.log("Sending Request to the Target:", req.method, req.path)
          })
          proxy.on("proxyRes", (proxyRes, req) => {
            console.log(
              "Received Response from the Target:",
              proxyRes.statusCode,
              proxyRes.statusMessage,
              req.url,
            )
          })
        },
      },
    },
  },
})
