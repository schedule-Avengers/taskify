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
  resolve: {
    alias: [
      { find: '@', replacement: '/src' },
      { find: '@axios', replacement: 'src/axios' },
      { find: '@components', replacement: 'src/components' },
      { find: '@hooks', replacement: 'src/hooks' },
      { find: '@pages', replacement: 'src/pages' },
      { find: '@stores', replacement: 'src/stores' },
      { find: '@styles', replacement: 'src/styles' },
      { find: '@types', replacement: 'src/types' },
      { find: '@utils', replacement: 'src/utils' },
    ],
  },
});
