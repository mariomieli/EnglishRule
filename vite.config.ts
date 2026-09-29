import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
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
