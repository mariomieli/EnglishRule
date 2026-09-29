import type { LevelId } from '../../data/types';
import { isActiveMistake, isDue, settingsOf, streakOf, xpByDay, type Doc, type LessonProgress, type SrsCard, type Theme, type ThemePref } from '../sync/doc';

export type { LessonProgress, Theme, ThemePref };

export interface Mistake {
  lessonId: string;
  index: number;
  count: number;
  at: number;
}

/** Vista derivata dal documento sincronizzato, usata dalle pagine. */
export interface State {
  xp: number;
  completed: Record<string, LessonProgress>;
  speaking: Record<string, LessonProgress>;
  theoryRead: Record<string, true>;
  mistakes: Record<string, Mistake>;
  srs: Record<string, SrsCard>;
  seen: Record<string, Record<number, number>>;
  streak: { count: number; last: string | null; best: number; freezes: number };
  xpByDay: Record<string, number>;
  dailyGoal: number;
  theme: Theme; // tema effettivamente mostrato
  themePref: ThemePref; // scelta dell'utente (system = come il dispositivo)
  sound: boolean;
  placement: LevelId | null;
  onboarded: boolean;
  autoCheck: boolean;
  advanceMs: number;
}

export const today = (d = new Date()) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

export const dayDiff = (a: string, b: string) =>
  Math.round((new Date(b + 'T12:00:00').getTime() - new Date(a + 'T12:00:00').getTime()) / 86400000);

/** Serie valida se l'ultimo giorno di studio è oggi o ieri; se ieri è saltato, regge solo con un congelamento. */
export function currentStreak(s: State) {
  if (!s.streak.last) return 0;
  const gap = dayDiff(s.streak.last, today());
  return gap <= 1 || (gap === 2 && s.streak.freezes > 0) ? s.streak.count : 0;
}

/** Esercizi da ripassare ora: prima gli errori aperti, poi le schede scadute (le più in ritardo per prime). */
export function reviewQueue(s: State, now = Date.now()): Mistake[] {
  const errors = Object.values(s.mistakes).sort((a, b) => b.count - a.count || b.at - a.at);
  const due = Object.entries(s.srs)
    .filter(([k, c]) => isDue(c, now) && !s.mistakes[k])
    .sort((a, b) => a[1].due - b[1].due)
    .map(([, c]) => ({ lessonId: c.lessonId, index: c.index, count: 0, at: c.at }));
  return [...errors, ...due];
}

export const starsFor = (score: number) => (score >= 90 ? 3 : score >= 70 ? 2 : score >= 50 ? 1 : 0);

export const systemTheme = (): Theme => (typeof matchMedia !== 'undefined' && matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');

export function view(doc: Doc, sys: Theme): State {
  const byDay = xpByDay(doc);
  const s = settingsOf(doc);
  const mistakes: Record<string, Mistake> = {};
  for (const [k, m] of Object.entries(doc.mistakes)) if (isActiveMistake(m)) mistakes[k] = { lessonId: m.lessonId, index: m.index, count: m.count, at: m.at };
  const theoryRead: Record<string, true> = {};
  for (const k of Object.keys(doc.theoryRead)) theoryRead[k] = true;
  return {
    xp: Object.values(byDay).reduce((a, n) => a + n, 0),
    completed: doc.completed,
    speaking: doc.speaking ?? {},
    theoryRead,
    mistakes,
    srs: doc.srs ?? {},
    seen: doc.seen as State['seen'],
    streak: streakOf(byDay),
    xpByDay: byDay,
    ...s,
    themePref: s.theme,
    theme: s.theme === 'system' ? sys : s.theme,
  };
}

