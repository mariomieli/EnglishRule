import { deriveExercises } from './derive';
import { LEVELS } from './levels';
import { LESSON_META } from './meta.gen';
import type { Lesson, LessonMeta, LevelId } from './types';

// Elenco leggero delle lezioni (generato): i contenuti completi stanno in ./lessons/<livello>.ts
// e vengono scaricati solo quando servono (un file per livello).
const bodies = import.meta.glob<Record<string, Lesson[]>>('./lessons/*.ts');

const order = LEVELS.map((l) => l.id);
export const LESSONS: LessonMeta[] = order.flatMap((lv) => LESSON_META.filter((l) => l.level === lv));

export const lessonById = (id: string) => LESSONS.find((l) => l.id === id);
export const lessonsByLevel = (lv: LevelId) => LESSONS.filter((l) => l.level === lv);

/** Numero della lezione all'interno del suo livello (1, 2, 3...). */
export const lessonNumber = (id: string) => {
  const l = lessonById(id);
  return l ? lessonsByLevel(l.level).findIndex((x) => x.id === id) + 1 : 0;
};

export const nextLesson = (id: string) => {
  const i = LESSONS.findIndex((l) => l.id === id);
  return i >= 0 ? LESSONS[i + 1] : undefined;
};

const cache = new Map<string, Promise<Lesson | undefined>>();

/** Contenuto completo di una lezione (teoria ed esercizi, compresi i derivati). */
export function loadLesson(id: string): Promise<Lesson | undefined> {
  const meta = lessonById(id);
  if (!meta) return Promise.resolve(undefined);
  let p = cache.get(id);
  if (!p) {
    const loader = bodies[`./lessons/${meta.level.toLowerCase()}.ts`];
    p = loader().then((mod) => {
      const l = Object.values(mod).flat().find((x) => x.id === id);
      return l && { ...l, exercises: [...l.exercises, ...deriveExercises(l.exercises)] };
    });
    p.catch(() => cache.delete(id)); // riprova se il download è fallito (es. senza rete)
    cache.set(id, p);
  }
  return p;
}

/** Scarica in background i contenuti di tutti i livelli: così, con il service worker, funzionano anche offline. */
export const prefetchAllLessons = () => Promise.all(Object.values(bodies).map((load) => load().catch(() => undefined)));
