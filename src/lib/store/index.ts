// Punto d'ingresso dello store: il resto dell'app importa da qui.
//   derived.ts   vista derivata e calcoli puri (serie, coda di ripasso)
//   reducers.ts  trasformazioni pure del documento dei progressi
//   persist.ts   salvataggio locale
//   useCloud.ts  account e sincronizzazione
//   provider.tsx composizione: contesto React e azioni
export { StoreProvider, useStore } from './provider';
export { currentStreak, reviewQueue, starsFor, today, upcomingReviews } from './derived';
export type { LessonProgress, Mistake, State, Theme, ThemePref } from './derived';
export type { SyncStatus } from './useCloud';
