import { describe, expect, it } from 'vitest';
import { deriveExercises } from '../data/derive';
import type { Lesson } from '../data/types';
import { evaluate, isComplete, solution } from '../lib/grading';
import { pickExercises } from '../lib/pick';
import { bestBlocks } from '../lib/rulematch';
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

describe('elenco leggero delle lezioni (meta.gen.ts)', () => {
  it('è aggiornato rispetto ai contenuti: se fallisce, eseguire npm run gen:meta', async () => {
    const { LESSON_META } = await import('../data/meta.gen');
    expect(LESSON_META.map((m) => m.id)).toEqual(RAW.map((l) => l.id));
    for (const l of RAW) {
      const m = LESSON_META.find((x) => x.id === l.id)!;
      expect(m).toMatchObject({ level: l.level, title: l.title, subtitle: l.subtitle, icon: l.icon, minutes: l.minutes, tags: l.tags });
      expect(m.exerciseCount).toBe(l.exercises.length + deriveExercises(l.exercises).length);
    }
  });

  it('loadLesson restituisce teoria ed esercizi (con i derivati) di ogni lezione', async () => {
    const { loadLesson, LESSONS } = await import('../data');
    for (const meta of LESSONS.slice(0, 12)) {
      const l = await loadLesson(meta.id);
      expect(l?.theory.length).toBeGreaterThan(0);
      expect(l?.exercises.length).toBe(meta.exerciseCount);
    }
    expect(await loadLesson('non-esiste')).toBeUndefined();
  });
});

describe('teoria pertinente per esercizio (rulemap.gen.ts)', () => {
  it('è aggiornata e coerente: se fallisce, eseguire npm run gen:rulemap', async () => {
    const { RULE_MAP } = await import('../data/rulemap.gen');
    const { bestBlocks, RULE_TYPES } = await import('../lib/rulematch');
    let total = 0;
    let mapped = 0;
    for (const l of RAW) {
      const exs = [...l.exercises, ...deriveExercises(l.exercises)];
      expect(RULE_MAP[l.id]).toHaveLength(exs.length);
      exs.forEach((e, i) => {
        expect(RULE_MAP[l.id][i]).toEqual(bestBlocks(l.theory, e));
        for (const k of RULE_MAP[l.id][i]) expect(RULE_TYPES).toContain(l.theory[k].type);
        total++;
        if (RULE_MAP[l.id][i].length) mapped++;
      });
    }
    expect(mapped / total).toBeGreaterThan(0.9);
  });

  it('sceglie il blocco che contiene il termine in grassetto della spiegazione quando è in un solo blocco', () => {
    const theory = [
      { type: 'rule', title: 'Regola uno', body: 'Con **is** si parla di una persona.' },
      { type: 'rule', title: 'Regola due', body: 'Con **are** si parla di più persone.' },
    ] as Lesson['theory'];
    const e = { type: 'mcq', prompt: 'They ___ happy.', options: ['is', 'are'], answer: 1, explain: 'Con **they** serve **are**.' } as Lesson['exercises'][number];
    expect(bestBlocks(theory, e)).toEqual([1]);
  });
});
