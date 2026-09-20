import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  base: "./",
  server: {
    proxy: {
      "/school-api": {
        target: "https://thptchuyen.hatinh.edu.vn",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/school-api/, ""),
      },
    },
  },
  build: {
    outDir: resolve(__dirname, "../dist/tkb"),
    assetsDir: "assets",
    emptyOutDir: true,
  },
});
