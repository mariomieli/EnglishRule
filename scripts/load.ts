import { readdirSync } from 'node:fs';
import type { Lesson } from '../src/data/types';
export const LESSONS_RAW: Lesson[] = [];
for (const f of readdirSync(new URL('../src/data/lessons', import.meta.url)).sort()) {
  const mod = await import(`../src/data/lessons/${f}`);
  for (const v of Object.values(mod)) LESSONS_RAW.push(...(v as Lesson[]));
}
