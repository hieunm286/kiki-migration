import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');
  return {
    // vite config
    base: '/kiki-migration/',
    resolve: {
      alias: [{ find: 'src', replacement: path.resolve(__dirname, './src') }],
    },
    server: {
      port: env.PORT ?? 3001,
      open: true,
    },
    css: {
      devSourcemap: true,
    },
    plugins: [react()],
    define: {
      __APP_ENV__: env.APP_ENV,
    },
  };
});
