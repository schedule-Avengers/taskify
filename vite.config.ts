import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  // vite는 케밥이 기본, 설정
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
  server: {
    port: 3000,
  },
});
