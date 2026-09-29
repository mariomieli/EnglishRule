// Verifica la rotazione degli esercizi: `npx tsx scripts/test-pick.ts`
import { pickExercises, SESSION_SIZE } from '../src/lib/pick';
import type { Exercise } from '../src/data/types';

const types = ['mcq','mcq','mcq','fill','fill','fill','order','judge','judge','match', ...'mcq mcq mcq mcq fill fill fill fill order order judge judge judge match match'.split(' ')] as Exercise['type'][];
const ex = types.map((type) => ({ type }) as Exercise);
const seen: Record<number, number> = {};
let fail = 0;
const s0 = pickExercises(ex, seen, true);
if (s0.join() !== [0,1,2,3,4,5,6,7,8,9].join()) { console.log('primo tentativo errato', s0); fail++; }
s0.forEach((i) => (seen[i] = 1));
for (let n = 1; n <= 6; n++) {
  const s = pickExercises(ex, seen, false);
  const t = new Set(s.map((i) => ex[i].type));
  const maxSeenBefore = Math.max(...s.map((i) => seen[i] ?? 0));
  const minUnpicked = Math.min(...ex.map((_, i) => i).filter((i) => !s.includes(i)).map((i) => seen[i] ?? 0));
  if (s.length !== SESSION_SIZE || new Set(s).size !== SESSION_SIZE) { console.log('dimensione/duplicati', s); fail++; }
  if (t.size !== 5) { console.log('tipi mancanti', n, [...t]); fail++; }
  s.forEach((i) => (seen[i] = (seen[i] ?? 0) + 1));
  console.log(`sessione ${n + 1}: nuovi mai visti=${s.filter((i) => seen[i] === 1).length}, max visto prima=${maxSeenBefore}, min non scelto=${minUnpicked}`);
}
const counts = Object.values(seen);
console.log('dopo 7 sessioni, volte viste per esercizio: min', Math.min(...counts), 'max', Math.max(...counts), '(esercizi coperti', counts.length, '/ 25)');
process.exit(fail ? 1 : 0);
