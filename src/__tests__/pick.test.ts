import { describe, expect, it } from 'vitest';
import type { Exercise } from '../data/types';
import { pickExercises, SESSION_SIZE } from '../lib/pick';

const types = ['mcq', 'mcq', 'mcq', 'fill', 'fill', 'fill', 'order', 'judge', 'judge', 'match', ...'mcq mcq mcq mcq fill fill fill fill order order judge judge judge match match'.split(' ')] as Exercise['type'][];
const ex = types.map((type) => ({ type }) as Exercise);

describe('scelta degli esercizi di una sessione', () => {
  it('al primo tentativo dà la sequenza curata dei primi 10', () => {
    expect(pickExercises(ex, {}, true)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it('ai tentativi successivi ruota, con un esercizio per tipo e senza doppioni', () => {
    const seen: Record<number, number> = {};
    pickExercises(ex, seen, true).forEach((i) => (seen[i] = 1));
    for (let n = 1; n <= 6; n++) {
      const s = pickExercises(ex, seen, false);
      expect(s).toHaveLength(SESSION_SIZE);
      expect(new Set(s).size).toBe(SESSION_SIZE);
      expect(new Set(s.map((i) => ex[i].type)).size).toBe(5);
      s.forEach((i) => (seen[i] = (seen[i] ?? 0) + 1));
    }
    const counts = Object.values(seen);
    expect(counts).toHaveLength(25);
    expect(Math.max(...counts) - Math.min(...counts)).toBeLessThanOrEqual(3);
  });

  it('esclude gli esercizi non eseguibili', () => {
    const withListen = [...ex, { type: 'listen' } as Exercise, { type: 'listen' } as Exercise];
    const s = pickExercises(withListen, {}, false, (e) => e.type !== 'listen');
    expect(s.every((i) => withListen[i].type !== 'listen')).toBe(true);
  });
});
