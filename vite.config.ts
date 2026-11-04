import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import path from 'node:path';

const rootDir = path.resolve(fileURLToPath(new URL('.', import.meta.url)));
const rootMediaFile = /\.(pdf|jpe?g|png|webp|gif)$/i;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    watch: {
      // Skip locked media files sitting directly in the project root (not public/ or src/)
      ignored: [
        (file: string) => path.dirname(path.resolve(file)) === rootDir && rootMediaFile.test(file),
      ],
    },
  },
});
