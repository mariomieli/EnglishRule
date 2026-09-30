# EnglishRule

Webapp per imparare la grammatica inglese dal livello A1 al C2, pensata per italiani.

- 63 lezioni (10 per livello, 11 in B1, B2 e C1 con i phrasal verbs), 1.575 esercizi (25 per lezione, 10 a sessione con rotazione), test di livello adattivo
- 5 tipi di esercizio: scelta multipla, completamento, riordino, giusto/sbagliato, abbinamento
- Errori riproposti a fine sessione e raccolti nel Ripasso
- XP, stelle, combo, serie giornaliera, obiettivo giornaliero, traguardi
- Pronuncia britannica degli esempi (Web Speech API), effetti sonori
- Tema chiaro/scuro, responsive mobile/desktop, scorciatoie da tastiera (⌘K ricerca, 1-4, Invio)
- PWA installabile, funziona offline dopo la prima visita
- Progressi salvati nel browser (localStorage), nessun account

## Sviluppo

```bash
npm install
npm run dev        # sviluppo
npm run validate   # controlla tutti i contenuti (risposte, blank, markup, doppioni)
npm run build      # build di produzione in dist/
```

## Contenuti

I contenuti sono in `src/data/lessons/{a1,a2,b1,b2,c1,c2}.ts` secondo lo schema di `src/data/types.ts`.
Markup inline: `**grassetto**`, `*corsivo*`, `==evidenziato==`.

## Deploy

Pubblicato su GitHub Pages: https://mariomieli.github.io/EnglishRule/ (deploy automatico a ogni push su `main`, vedi `.github/workflows/deploy.yml`).

Per altri hosting statici: `npm run build` e pubblica `dist/`. Inclusi `vercel.json` e `public/_redirects` (Netlify) per il routing SPA.

## Account e sincronizzazione

Login opzionale (email + password, Google facoltativo) con [Supabase](https://supabase.com). Senza configurazione l'app funziona solo in locale.

I progressi sono un documento con regole di fusione senza perdita di dati (`src/lib/sync/doc.ts`):
XP come contatori per giorno e per dispositivo, miglior punteggio, errori con data di registrazione/risoluzione,
impostazioni "vince la più recente", azzeramento propagato tramite epoca. La scrittura nel cloud usa un controllo
di versione ottimistico: se un altro dispositivo ha scritto nel frattempo si rilegge, si fonde e si riprova.
Test: `npm run test:sync`.

### Attivazione

1. Crea un progetto su supabase.com.
2. SQL Editor: esegui `supabase/schema.sql`.
3. Authentication > URL Configuration: Site URL `https://mariomieli.github.io/EnglishRule/`, Redirect URLs `https://mariomieli.github.io/EnglishRule/account`.
4. GitHub > Settings > Secrets and variables > Actions > Variables: `SUPABASE_URL` e `SUPABASE_ANON_KEY` (Project Settings > API). Facoltativo `AUTH_GOOGLE=true` dopo aver configurato il provider Google in Supabase.
5. Rilancia il deploy (push o "Run workflow").

In locale: `npx supabase start` e un file `.env.local` con `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY`.
