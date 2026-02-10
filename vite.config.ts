import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  root: './',
  base: '/tomo/', // GitHub Pages repository name
  publicDir: 'public',
  plugins: [react()],
  build: {
    outDir: 'dist',
  }
})
