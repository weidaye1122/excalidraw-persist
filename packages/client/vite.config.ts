import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

const excalidrawZhCNLocaleModule = path.resolve(
  __dirname,
  './src/i18n/excalidrawZhCNLocale.ts'
);

const excalidrawZhCNLocalePlugin = () => ({
  name: 'excalidraw-zh-cn-locale',
  enforce: 'pre' as const,
  resolveId(source: string) {
    if (source.includes('?excalidraw-original-locale')) {
      return null;
    }

    if (
      source === './locales/zh-CN-LNUGB5OW.js' ||
      source === '@excalidraw/excalidraw/dist/prod/locales/zh-CN-LNUGB5OW.js'
    ) {
      return excalidrawZhCNLocaleModule;
    }

    return null;
  },
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [excalidrawZhCNLocalePlugin(), react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    exclude: ['@excalidraw/excalidraw'],
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      },
    },
  },
});
