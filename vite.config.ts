import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { rename } from 'fs/promises';

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [
    react(),
    // rename output html file so that it works with surge
    {
      name: 'rename-html',
      writeBundle: async () => {
        const distDir = './dist/';
        try {
          await rename(`${distDir}index.html`, `${distDir}200.html`);
        } catch (err) {
          console.error('Failed to rename index.html to 200.html:', err);
        }
      },
    },
  ],
});
