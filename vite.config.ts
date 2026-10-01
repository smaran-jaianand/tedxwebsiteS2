import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // The GitHub Pages project is served from the custom-domain root.
  // Keeping this at `/` makes generated JS, CSS, and public asset URLs resolve
  // from https://tedxsiuhyderabad.siu.edu.in/ instead of /tedxwebsiteS2/.
  base: '/',
  plugins: [react()],
})
