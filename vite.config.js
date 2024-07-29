import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  alias: {
    "@": "/src",
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
