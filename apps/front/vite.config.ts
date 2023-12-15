import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  server: {
    warmup: {
      clientFiles: [
        // Warmup the main entry point
        './src/App.vue',
        './src/assets/index.css',
        './src/router/index.ts',
        // Warmup views
        './src/views/month/MonthView.vue',
      ],
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
