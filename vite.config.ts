import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react()
  ],
  server: {
    hmr: { overlay: false },
    fs: {
      strict: false
    }
  },
  build: {
    // 캐시 방지를 위한 타임스탬프
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].${new Date().getTime()}.js`,
        chunkFileNames: `assets/[name].${new Date().getTime()}.js`,
        assetFileNames: `assets/[name].${new Date().getTime()}.[ext]`
      }
    }
  }
})
