import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Pages provides the repository path; local development continues to use '/'.
  base: process.env.PAGES_BASE_PATH || '/',
  plugins: [react()],
})
