// Genera src/data/meta.gen.ts: elenco leggero delle lezioni (senza teoria ed esercizi) da caricare subito,
// mentre i contenuti completi si scaricano solo quando servono. Eseguito in automatico prima della build.
import { writeFileSync } from 'node:fs';
import { deriveExercises } from '../src/data/derive';
import { LESSONS_RAW } from './load';

const meta = LESSONS_RAW.map((l) => ({
  id: l.id,
  level: l.level,
  title: l.title,
  subtitle: l.subtitle,
  icon: l.icon,
  minutes: l.minutes,
  tags: l.tags,
  exerciseCount: l.exercises.length + deriveExercises(l.exercises).length,
}));
const out = `// FILE GENERATO da scripts/gen-meta.ts (npm run gen:meta): non modificare a mano.\nimport type { LessonMeta } from './types';\n\nexport const LESSON_META: LessonMeta[] = ${JSON.stringify(meta, null, 2)};\n`;
writeFileSync(new URL('../src/data/meta.gen.ts', import.meta.url), out);
console.log(`meta.gen.ts: ${meta.length} lezioni`);
