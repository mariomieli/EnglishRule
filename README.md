# EnglishRule

Webapp per imparare la grammatica inglese dal livello A1 al C2, pensata per italiani.

- 60 lezioni (10 per livello), 1.500 esercizi (25 per lezione, 10 a sessione con rotazione), test di livello da 36 domande
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
