import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // GitHub project Pages serves this site below /tedxwebsiteS2/.
  // Keep the local development server at the normal root URL.
  base: process.env.GITHUB_ACTIONS === 'true' ? '/tedxwebsiteS2/' : '/',
  plugins: [react()],
})
