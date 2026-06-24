import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Presentation micro-site. Built for laptop/desktop big-screen playback first.
export default defineConfig({
  plugins: [react()],
  server: { host: true, port: 5173 },
  build: { assetsInlineLimit: 0 },
})
