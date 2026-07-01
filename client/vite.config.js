import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '#components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '#context': fileURLToPath(new URL('./src/context', import.meta.url)),
      '#services': fileURLToPath(new URL('./src/services', import.meta.url)),
    },
  },
})
