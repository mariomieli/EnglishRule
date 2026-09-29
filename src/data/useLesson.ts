import { useEffect, useState } from 'react';
import { loadLesson } from '.';
import type { Lesson } from './types';

/** Carica i contenuti completi di più lezioni. `loading` resta true finché non sono tutte pronte (o fallite). */
export function useLessons(ids: string[]): { lessons: Record<string, Lesson>; loading: boolean; failed: boolean } {
  const key = [...new Set(ids)].sort().join('|');
  const [done, setDone] = useState<{ key: string; lessons: Record<string, Lesson>; failed: boolean } | null>(null);
  useEffect(() => {
    let alive = true;
    const list = key ? key.split('|') : [];
    Promise.all(list.map((id) => loadLesson(id).catch(() => undefined))).then((ls) => {
      if (!alive) return;
      const lessons: Record<string, Lesson> = {};
      ls.forEach((l) => l && (lessons[l.id] = l));
      setDone({ key, lessons, failed: ls.some((l) => !l) });
    });
    return () => {
      alive = false;
    };
  }, [key]);
  const ready = done?.key === key;
  return { lessons: ready ? done.lessons : {}, loading: !ready, failed: ready && done.failed };
}

export const useLesson = (id: string | undefined) => {
  const { lessons, loading, failed } = useLessons(id ? [id] : []);
  return { lesson: id ? lessons[id] : undefined, loading, failed };
};
