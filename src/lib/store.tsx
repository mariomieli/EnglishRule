import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import type { LevelId } from '../data/types';

export interface LessonProgress {
  best: number; // percentuale 0-100
  stars: number; // 0-3
  attempts: number;
  lastAt: number;
}

export interface Mistake {
  lessonId: string;
  index: number; // indice dell'esercizio nella lezione
  count: number;
  at: number;
}

export type Theme = 'dark' | 'light';

export interface State {
  xp: number;
  completed: Record<string, LessonProgress>;
  theoryRead: Record<string, true>;
  mistakes: Record<string, Mistake>; // chiave: `${lessonId}#${index}`
  seen: Record<string, Record<number, number>>; // lessonId -> indice esercizio -> volte proposto
  streak: { count: number; last: string | null; best: number };
  xpByDay: Record<string, number>;
  dailyGoal: number;
  theme: Theme;
  sound: boolean;
  placement: LevelId | null;
}

const KEY = 'er-state';

const initial: State = {
  xp: 0,
  completed: {},
  theoryRead: {},
  mistakes: {},
  seen: {},
  streak: { count: 0, last: null, best: 0 },
  xpByDay: {},
  dailyGoal: 50,
  theme: 'dark',
  sound: true,
  placement: null,
};

export const today = (d = new Date()) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

const dayDiff = (a: string, b: string) =>
  Math.round((new Date(b + 'T12:00:00').getTime() - new Date(a + 'T12:00:00').getTime()) / 86400000);

function load(): State {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return { ...initial, ...JSON.parse(raw) };
  } catch {
    /* storage non disponibile */
  }
  return initial;
}

/** La serie si azzera se l'ultimo giorno di studio è precedente a ieri. */
export function currentStreak(s: State) {
  if (!s.streak.last) return 0;
  return dayDiff(s.streak.last, today()) <= 1 ? s.streak.count : 0;
}

interface Actions {
  addXp: (n: number) => void;
  finishLesson: (id: string, score: number) => { stars: number; improved: boolean };
  markTheory: (id: string) => void;
  recordMistake: (lessonId: string, index: number) => void;
  clearMistake: (lessonId: string, index: number) => void;
  markSeen: (lessonId: string, indices: number[]) => void;
  setTheme: (t: Theme) => void;
  toggleSound: () => void;
  setPlacement: (l: LevelId) => void;
  setDailyGoal: (n: number) => void;
  reset: () => void;
}

const Ctx = createContext<{ state: State } & Actions>(null!);

export const starsFor = (score: number) => (score >= 90 ? 3 : score >= 70 ? 2 : score >= 50 ? 1 : 0);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>(load);
  const ref = useRef(state);
  ref.current = state;

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* ignora */
    }
  }, [state]);

  useEffect(() => {
    document.documentElement.dataset.theme = state.theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', state.theme === 'dark' ? '#0b0a1a' : '#f6f4ff');
  }, [state.theme]);

  const addXp = useCallback((n: number) => {
    setState((s) => {
      const d = today();
      let streak = s.streak;
      if (s.streak.last !== d) {
        const cont = s.streak.last && dayDiff(s.streak.last, d) === 1;
        const count = cont ? s.streak.count + 1 : 1;
        streak = { count, last: d, best: Math.max(s.streak.best, count) };
      }
      return { ...s, xp: s.xp + n, streak, xpByDay: { ...s.xpByDay, [d]: (s.xpByDay[d] ?? 0) + n } };
    });
  }, []);

  const finishLesson = useCallback((id: string, score: number) => {
    const stars = starsFor(score);
    const before = ref.current.completed[id];
    const improved = !before || score > before.best;
    setState((s) => {
      const prev = s.completed[id];
      return {
        ...s,
        completed: {
          ...s.completed,
          [id]: {
            best: Math.max(prev?.best ?? 0, score),
            stars: Math.max(prev?.stars ?? 0, stars),
            attempts: (prev?.attempts ?? 0) + 1,
            lastAt: Date.now(),
          },
        },
      };
    });
    return { stars, improved };
  }, []);

  const actions = useMemo<Actions>(
    () => ({
      addXp,
      finishLesson,
      markTheory: (id) => setState((s) => (s.theoryRead[id] ? s : { ...s, theoryRead: { ...s.theoryRead, [id]: true } })),
      recordMistake: (lessonId, index) =>
        setState((s) => {
          const k = `${lessonId}#${index}`;
          const m = s.mistakes[k];
          return { ...s, mistakes: { ...s.mistakes, [k]: { lessonId, index, count: (m?.count ?? 0) + 1, at: Date.now() } } };
        }),
      clearMistake: (lessonId, index) =>
        setState((s) => {
          const k = `${lessonId}#${index}`;
          if (!s.mistakes[k]) return s;
          const { [k]: _, ...rest } = s.mistakes;
          void _;
          return { ...s, mistakes: rest };
        }),
      markSeen: (lessonId, indices) =>
        setState((s) => {
          const cur = { ...(s.seen[lessonId] ?? {}) };
          indices.forEach((i) => (cur[i] = (cur[i] ?? 0) + 1));
          return { ...s, seen: { ...s.seen, [lessonId]: cur } };
        }),
      setTheme: (theme) => setState((s) => ({ ...s, theme })),
      toggleSound: () => setState((s) => ({ ...s, sound: !s.sound })),
      setPlacement: (placement) => setState((s) => ({ ...s, placement })),
      setDailyGoal: (dailyGoal) => setState((s) => ({ ...s, dailyGoal })),
      reset: () => setState({ ...initial, theme: state.theme }),
    }),
    [addXp, finishLesson, state.theme],
  );

  return <Ctx.Provider value={{ state, ...actions }}>{children}</Ctx.Provider>;
}

export const useStore = () => useContext(Ctx);
