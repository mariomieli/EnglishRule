import type { Lesson, LevelId } from './types';
import { deriveExercises } from './derive';
import { LEVELS } from './levels';

// Ogni file in ./lessons esporta un array di Lesson (a1.ts, a2.ts, ...).
const modules = import.meta.glob<Record<string, Lesson[]>>('./lessons/*.ts', { eager: true });

const all: Lesson[] = Object.values(modules)
  .flatMap((m) => Object.values(m).flat())
  .map((l) => ({ ...l, exercises: [...l.exercises, ...deriveExercises(l.exercises)] }));

const order = LEVELS.map((l) => l.id);
export const LESSONS: Lesson[] = order.flatMap((lv) => all.filter((l) => l.level === lv));

export const lessonById = (id: string) => LESSONS.find((l) => l.id === id);
export const lessonsByLevel = (lv: LevelId) => LESSONS.filter((l) => l.level === lv);

export const nextLesson = (id: string) => {
  const i = LESSONS.findIndex((l) => l.id === id);
  return i >= 0 ? LESSONS[i + 1] : undefined;
};
