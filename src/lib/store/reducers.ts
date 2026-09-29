import type { LevelId } from '../../data/types';
import { emptyDoc, isActiveMistake, nextSrs, type Doc, type LessonProgress, type Settings } from '../sync/doc';

/** Trasformazioni pure del documento dei progressi: nessuno stato, nessun effetto, facili da provare. */

export const addXpTo = (d: Doc, day: string, dev: string, n: number): Doc => {
  const cur = d.xp[day] ?? {};
  return { ...d, xp: { ...d.xp, [day]: { ...cur, [dev]: (cur[dev] ?? 0) + n } } };
};

const bump = (prev: LessonProgress | undefined, score: number, stars: number, at: number): LessonProgress => ({
  best: Math.max(prev?.best ?? 0, score),
  stars: Math.max(prev?.stars ?? 0, stars),
  attempts: (prev?.attempts ?? 0) + 1,
  lastAt: at,
});

export const finishLessonIn = (d: Doc, id: string, score: number, stars: number, at: number): Doc => ({ ...d, completed: { ...d.completed, [id]: bump(d.completed[id], score, stars, at) } });

export const finishSpeakingIn = (d: Doc, id: string, score: number, stars: number, at: number): Doc => ({ ...d, speaking: { ...(d.speaking ?? {}), [id]: bump(d.speaking?.[id], score, stars, at) } });

export const markTheoryIn = (d: Doc, id: string, at: number): Doc => (d.theoryRead[id] ? d : { ...d, theoryRead: { ...d.theoryRead, [id]: at } });

export const recordAnswerIn = (d: Doc, lessonId: string, index: number, ok: boolean, at: number): Doc => {
  const k = `${lessonId}#${index}`;
  return { ...d, srs: { ...d.srs, [k]: nextSrs(d.srs?.[k], lessonId, index, ok, at) } };
};

export const recordMistakeIn = (d: Doc, lessonId: string, index: number, at: number): Doc => {
  const k = `${lessonId}#${index}`;
  const m = d.mistakes[k];
  const active = m && isActiveMistake(m);
  return { ...d, mistakes: { ...d.mistakes, [k]: { ...m, lessonId, index, count: (active ? m.count : 0) + 1, at: Math.max(at, (m?.cleared ?? 0) + 1) } } };
};

export const clearMistakeIn = (d: Doc, lessonId: string, index: number, at: number): Doc => {
  const k = `${lessonId}#${index}`;
  const m = d.mistakes[k];
  if (!m || !isActiveMistake(m)) return d;
  return { ...d, mistakes: { ...d.mistakes, [k]: { ...m, cleared: Math.max(at, m.at + 1) } } };
};

export const markSeenIn = (d: Doc, lessonId: string, indices: number[]): Doc => {
  const cur = { ...(d.seen[lessonId] ?? {}) };
  indices.forEach((i) => (cur[i] = (cur[i] ?? 0) + 1));
  return { ...d, seen: { ...d.seen, [lessonId]: cur } };
};

export const setSettingIn = <K extends keyof Settings>(d: Doc, k: K, v: Settings[K], at: number): Doc => ({ ...d, settings: { ...d.settings, [k]: { v, at } } });

export const completeOnboardingIn = (d: Doc, o: { goal?: number; level?: LevelId }, at: number): Doc => {
  const settings = { ...d.settings, onboarded: { v: true, at } } as Doc['settings'];
  if (o.goal) settings.dailyGoal = { v: o.goal, at };
  if (o.level) settings.placement = { v: o.level, at };
  return { ...d, settings };
};

/** Nuova "epoca": l'azzeramento vince su tutti i dati precedenti, anche di altri dispositivi. Si conserva solo il tema. */
export const resetDoc = (d: Doc, at: number): Doc => {
  const e = emptyDoc();
  if (d.settings.theme) e.settings.theme = d.settings.theme;
  return { ...e, epoch: at };
};
