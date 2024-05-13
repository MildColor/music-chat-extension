import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"), // 메인 애플리케이션의 entry
        background: path.resolve(__dirname, "src/background.ts"), // background 스크립트의 entry
        content: path.resolve(__dirname, "src/content.ts"), // content 스크립트의 entry
      },
      output: {
        format: "es", // ES 모듈 포맷 사용
        entryFileNames: "[name].js",
        chunkFileNames: "[name].js",
        assetFileNames: "[name].[ext]",
      },
    },
  },
});
