import type { Exercise } from '../data/types';
import { shuffle } from './utils';

export const SESSION_SIZE = 10;
const MAX_PER_TYPE = 4;

/**
 * Sceglie gli esercizi di una sessione.
 * Primo tentativo: i primi 10 (sequenza curata a difficoltà crescente).
 * Tentativi successivi: prima gli esercizi visti meno volte, almeno uno per tipo,
 * al massimo 4 dello stesso tipo, in ordine mescolato.
 */
export function pickExercises(exercises: Exercise[], seen: Record<number, number> = {}, firstTime: boolean): number[] {
  const all = exercises.map((_, i) => i);
  if (all.length <= SESSION_SIZE) return firstTime ? all : shuffle(all);
  if (firstTime) return all.slice(0, SESSION_SIZE);

  // ordinati per "meno visti", a parità casuale
  const ranked = shuffle(all).sort((a, b) => (seen[a] ?? 0) - (seen[b] ?? 0));
  const picked: number[] = [];
  const perType = new Map<string, number>();
  const add = (i: number) => {
    picked.push(i);
    perType.set(exercises[i].type, (perType.get(exercises[i].type) ?? 0) + 1);
  };

  // un esercizio per ogni tipo disponibile
  for (const t of new Set(exercises.map((e) => e.type))) {
    const i = ranked.find((k) => exercises[k].type === t);
    if (i !== undefined) add(i);
  }
  for (const i of ranked) {
    if (picked.length >= SESSION_SIZE) break;
    if (picked.includes(i) || (perType.get(exercises[i].type) ?? 0) >= MAX_PER_TYPE) continue;
    add(i);
  }
  // se il limite per tipo ha lasciato buchi, completa comunque
  for (const i of ranked) {
    if (picked.length >= SESSION_SIZE) break;
    if (!picked.includes(i)) add(i);
  }
  return shuffle(picked);
}
