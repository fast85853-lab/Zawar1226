
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',       // ye crucial hai
  server: {
    host: true,
    port: 3002
  }
})
