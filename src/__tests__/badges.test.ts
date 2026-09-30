import { describe, expect, it } from 'vitest';
import { LESSONS } from '../data';
import { badgesOf, unlockedIds } from '../lib/badges';
import type { State } from '../lib/store';

const empty = (): State => ({
  xp: 0,
  completed: {},
  speaking: {},
  theoryRead: {},
  mistakes: {},
  srs: {},
  vocab: {},
  seen: {},
  streak: { count: 0, last: null, best: 0, freezes: 0 },
  xpByDay: {},
  dailyGoal: 50,
  theme: 'dark',
  themePref: 'system',
  sound: true,
  placement: null,
  onboarded: false,
  autoCheck: true,
  advanceMs: 1100,
});

describe('traguardi', () => {
  it('ids unici e nessuno sbloccato all\'inizio', () => {
    const b = badgesOf(empty());
    expect(new Set(b.map((x) => x.id)).size).toBe(b.length);
    expect(b.every((x) => !x.ok && x.cur === 0)).toBe(true);
  });

  it('il progresso si ferma al traguardo e sblocca a soglia', () => {
    const s = empty();
    s.xp = 1200;
    s.streak.best = 8;
    const by = Object.fromEntries(badgesOf(s).map((b) => [b.id, b]));
    expect(by.x1.ok).toBe(true);
    expect(by.x1.cur).toBe(1000);
    expect(by.x5.ok).toBe(false);
    expect(by.x5.cur).toBe(1200);
    expect(by.s7.ok && !by.s14.ok).toBe(true);
  });

  it('livello completo solo se tutte le sue lezioni sono fatte', () => {
    const s = empty();
    const a1 = LESSONS.filter((l) => l.level === 'A1');
    a1.slice(1).forEach((l) => (s.completed[l.id] = { best: 80, stars: 2, attempts: 1, lastAt: 1 }));
    expect(unlockedIds(s).has('lv-A1')).toBe(false);
    s.completed[a1[0].id] = { best: 80, stars: 2, attempts: 1, lastAt: 1 };
    expect(unlockedIds(s).has('lv-A1')).toBe(true);
  });

  it('esercizi consolidati e giorni con obiettivo', () => {
    const s = empty();
    s.dailyGoal = 50;
    for (let i = 0; i < 7; i++) s.xpByDay[`2026-10-0${i + 1}`] = 60;
    s.xpByDay['2026-10-09'] = 10;
    for (let i = 0; i < 10; i++) s.srs[`l#${i}`] = { lessonId: 'l', index: i, step: 4, due: 0, at: 1 };
    s.srs['l#99'] = { lessonId: 'l', index: 99, step: 3, due: 0, at: 1 };
    const by = Object.fromEntries(badgesOf(s).map((b) => [b.id, b]));
    expect(by.g7.ok).toBe(true);
    expect(by.g30.cur).toBe(7);
    expect(by.r10.ok).toBe(true);
    expect(by.r100.cur).toBe(10);
  });
});
