import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/farm/',
  build: {
    outDir: '../dist/farm',
    emptyOutDir: true,  // Suppresses the outDir warning
    chunkSizeWarningLimit: 600,  // Raises the warning limit
  }
})