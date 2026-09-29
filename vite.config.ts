import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  // GitHub Pages serve il sito sotto /EnglishRule/: il path arriva da BASE_PATH in fase di build
  base: process.env.BASE_PATH ?? '/',
  plugins: [react()],
  build: {
    rolldownOptions: {
      output: {
        // librerie in un blocco a parte: si mettono in cache indipendentemente dal codice dell'app.
        // I contenuti delle lezioni restano un file per livello, scaricato solo quando serve.
        codeSplitting: {
          groups: [
            { name: 'react', test: /node_modules[\\/](react|react-dom|react-router|react-router-dom|scheduler)[\\/]/ },
            { name: 'motion', test: /node_modules[\\/](framer-motion|motion-dom|motion-utils)[\\/]/ },
            { name: 'supabase', test: /node_modules[\\/]@supabase[\\/]/ },
            { name: 'confetti', test: /node_modules[\\/]canvas-confetti[\\/]/ },
            { name: 'vendor', test: /node_modules/ },
          ],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
})
