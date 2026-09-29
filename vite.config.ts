import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv, type Plugin } from 'vite'

/** Inserisce nella CSP l'indirizzo esatto di Supabase configurato (più quelli ospitati da Supabase). */
function cspSupabase(mode: string): Plugin {
  return {
    name: 'csp-supabase',
    transformIndexHtml(html) {
      const env = loadEnv(mode, process.cwd(), 'VITE_');
      const sources = new Set(['https://*.supabase.co', 'wss://*.supabase.co']);
      try {
        const u = new URL(env.VITE_SUPABASE_URL ?? '');
        sources.add(u.origin);
        sources.add(`${u.protocol === 'https:' ? 'wss' : 'ws'}://${u.host}`);
      } catch {
        /* cloud non configurato */
      }
      return html.replace('__SUPABASE_CONNECT__', [...sources].join(' '));
    },
  };
}

export default defineConfig(({ mode }) => ({
  // GitHub Pages serve il sito sotto /EnglishRule/: il path arriva da BASE_PATH in fase di build
  base: process.env.BASE_PATH ?? '/',
  plugins: [react(), cspSupabase(mode)],
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
}))
