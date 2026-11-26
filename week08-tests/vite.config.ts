import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vitest/config'

// https://vite.dev/config/
export default defineConfig({
  test: { environment: 'jsdom' },
  plugins: [react(), tailwindcss()],
})
