import { describe, expect, it } from 'vitest';
import { deriveExercises } from '../data/derive';
import type { Lesson } from '../data/types';
import { evaluate, isComplete, solution } from '../lib/grading';
import { pickExercises } from '../lib/pick';
import { looseKey } from '../lib/utils';

const modules = import.meta.glob<Record<string, Lesson[]>>('../data/lessons/*.ts', { eager: true });
const RAW: Lesson[] = Object.values(modules).flatMap((m) => Object.values(m).flat());

describe('confronto libero delle risposte', () => {
  it('ignora contrazioni, punteggiatura e maiuscole ma non le differenze vere', () => {
    expect(looseKey("I'm happy.")).toBe(looseKey('I am happy'));
    expect(looseKey("She doesn't like it!")).toBe(looseKey('she does not like it'));
    expect(looseKey("I can't go")).toBe(looseKey('I cannot go'));
    expect(looseKey('He likes tea')).not.toBe(looseKey('He like tea'));
  });
});

describe('esercizi derivati (dettato, traduzione, correzione)', () => {
  it('ci sono lezioni', () => expect(RAW.length).toBe(60));

  it.each(RAW.map((l) => [l.id, l] as const))('%s: derivati coerenti', (_id, l) => {
    const extra = deriveExercises(l.exercises);
    expect(deriveExercises(l.exercises)).toEqual(extra); // deterministico
    expect(extra.length).toBeGreaterThan(0);
    for (const e of extra) {
      const s = solution(e);
      expect(s, `${e.type} senza soluzione`).toBeTruthy();
      expect(isComplete(e, s!)).toBe(true);
      expect(evaluate(e, s!)).toBe(true);
      expect(evaluate(e, s!.toUpperCase().replace(/[.!?]$/, ''))).toBe(true);
      expect(evaluate(e, 'zzz qqq')).toBe(false);
      if (e.type === 'correct') {
        expect(isComplete(e, e.sentence)).toBe(false);
        expect(e.sentence.toLowerCase()).not.toBe(e.answers[0].toLowerCase());
      }
    }
    const all = [...l.exercises, ...extra];
    expect(pickExercises(all, {}, true)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    expect(pickExercises(all, {}, false, (e) => e.type !== 'listen').every((i) => all[i].type !== 'listen')).toBe(true);
    expect(new Set(pickExercises(all, {}, false).map((i) => all[i].type)).size).toBeGreaterThanOrEqual(6);
  });
});
