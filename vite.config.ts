import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  // GitHub Pages serve il sito sotto /EnglishRule/: il path arriva da BASE_PATH in fase di build
  base: process.env.BASE_PATH ?? '/',
  plugins: [react()],
  build: {
    rolldownOptions: {
      output: {
        // vendor e contenuti in blocchi separati: si mettono in cache indipendentemente dal codice dell'app
        codeSplitting: {
          groups: [
            { name: 'vendor', test: /node_modules/ },
            { name: 'content', test: /src[\\/]data[\\/]/ },
          ],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
})
