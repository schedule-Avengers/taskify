import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // vite는 케밥이 기본, 설정
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
})
