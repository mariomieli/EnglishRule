import type { LevelId, PlacementQuestion } from '../data/types';
import { shuffle } from './utils';

export const PLACEMENT_LEVELS: LevelId[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
const START = 1; // si parte da A2
const NEED = 2; // risposte giuste (o sbagliate) che chiudono un livello: 2 su max 3

export interface Answered {
  level: LevelId;
  ok: boolean;
  lesson?: string;
}

type Verdict = 'pass' | 'fail' | 'open';

export function verdictOf(answers: Answered[], level: LevelId): Verdict {
  const mine = answers.filter((a) => a.level === level);
  const right = mine.filter((a) => a.ok).length;
  if (right >= NEED) return 'pass';
  if (mine.length - right >= NEED) return 'fail';
  return 'open';
}

/** Costruisce, per ogni livello, l'ordine mescolato delle domande disponibili. */
export function buildDeck(bank: PlacementQuestion[]): Record<LevelId, PlacementQuestion[]> {
  return Object.fromEntries(PLACEMENT_LEVELS.map((l) => [l, shuffle(bank.filter((q) => q.level === l))])) as Record<LevelId, PlacementQuestion[]>;
}

/**
 * Ricerca a scalino: si sale di livello dopo un livello superato, si scende dopo uno fallito,
 * e ci si ferma quando si è trovato il confine (ultimo superato + primo fallito sopra di esso).
 * Restituisce il livello da interrogare o null se il test è concluso.
 */
export function nextLevel(answers: Answered[]): LevelId | null {
  let cur = answers.length ? PLACEMENT_LEVELS.indexOf(answers[answers.length - 1].level) : START;
  for (let guard = 0; guard < 20; guard++) {
    const v = verdictOf(answers, PLACEMENT_LEVELS[cur]);
    if (v === 'open') return PLACEMENT_LEVELS[cur];
    if (v === 'pass') {
      if (cur === PLACEMENT_LEVELS.length - 1) return null;
      if (verdictOf(answers, PLACEMENT_LEVELS[cur + 1]) === 'fail') return null;
      cur++;
    } else {
      if (cur === 0) return null;
      if (verdictOf(answers, PLACEMENT_LEVELS[cur - 1]) === 'pass') return null;
      cur--;
    }
  }
  return null;
}

/** Livello stimato: il più alto superato (A1 se nessuno). */
export function placementResult(answers: Answered[]): LevelId {
  let res: LevelId = 'A1';
  for (const l of PLACEMENT_LEVELS) if (verdictOf(answers, l) === 'pass') res = l;
  return res;
}

/** Quante domande al massimo mancano, per la barra di avanzamento (stima prudente). */
export const MAX_QUESTIONS = 14;

export interface Recommendation {
  lesson: string;
  misses: number;
}

/**
 * Lezioni da rivedere in base agli errori: solo domande fino al livello stimato + 1
 * (oltre è normale non sapere). Prima gli argomenti sbagliati più volte, poi i livelli più bassi.
 */
export function recommend(answers: Answered[], result: LevelId, max = 4): Recommendation[] {
  const limit = PLACEMENT_LEVELS.indexOf(result) + 1;
  const counts = new Map<string, { misses: number; lv: number; first: number }>();
  answers.forEach((a, n) => {
    if (a.ok || !a.lesson || PLACEMENT_LEVELS.indexOf(a.level) > limit) return;
    const cur = counts.get(a.lesson) ?? { misses: 0, lv: PLACEMENT_LEVELS.indexOf(a.level), first: n };
    cur.misses++;
    counts.set(a.lesson, cur);
  });
  return [...counts.entries()]
    .sort((x, y) => y[1].misses - x[1].misses || x[1].lv - y[1].lv || x[1].first - y[1].first)
    .slice(0, max)
    .map(([lesson, v]) => ({ lesson, misses: v.misses }));
}
