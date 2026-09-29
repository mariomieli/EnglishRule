// Test dei tipi di esercizio derivati (dettato, traduzione, correzione): `npm run test:derive`
import { LESSONS_RAW as L } from './load';
import { deriveExercises } from '../src/data/derive';
import { evaluate, isComplete, solution } from '../src/lib/grading';
import { looseKey } from '../src/lib/utils';
import { pickExercises } from '../src/lib/pick';

let fails = 0;
const ok = (c: boolean, m: string) => { if (!c) { fails++; console.log('  FALLITO:', m); } };

ok(looseKey("I'm happy.") === looseKey('I am happy'), 'I\'m = I am');
ok(looseKey("She doesn't like it!") === looseKey('she does not like it'), "doesn't = does not");
ok(looseKey("I can't go") === looseKey('I cannot go'), "can't = cannot");
ok(looseKey('He likes tea') !== looseKey('He like tea'), 'differenze vere restano');

const count: Record<string, number> = {};
for (const l of L) {
  const extra = deriveExercises(l.exercises);
  ok(JSON.stringify(extra) === JSON.stringify(deriveExercises(l.exercises)), `${l.id}: derivazione non deterministica`);
  for (const e of extra) {
    count[e.type] = (count[e.type] ?? 0) + 1;
    const s = solution(e);
    ok(!!s, `${l.id}: ${e.type} senza soluzione`);
    if (!s) continue;
    ok(isComplete(e, s), `${l.id}: ${e.type} soluzione considerata incompleta`);
    ok(evaluate(e, s), `${l.id}: ${e.type} la soluzione non passa`);
    ok(evaluate(e, s.toUpperCase().replace(/[.!?]$/, '')), `${l.id}: ${e.type} maiuscole/punteggiatura devono essere ignorate`);
    ok(!evaluate(e, 'zzz qqq'), `${l.id}: ${e.type} accetta una risposta assurda`);
    if (e.type === 'correct') ok(!isComplete(e, e.sentence), `${l.id}: correct accetta la frase originale come risposta`);
    if (e.type === 'correct') ok(e.sentence.toLowerCase() !== e.answers[0].toLowerCase(), `${l.id}: correct senza differenza`);
  }
  const all = [...l.exercises, ...extra];
  const noListen = pickExercises(all, {}, false, (e) => e.type !== 'listen');
  ok(noListen.every((i) => all[i].type !== 'listen'), `${l.id}: dettato scelto senza audio`);
  ok(pickExercises(all, {}, true).join() === [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].join(), `${l.id}: il primo tentativo non è più quello curato`);
  const s2 = pickExercises(all, {}, false);
  ok(new Set(s2.map((i) => all[i].type)).size >= 6, `${l.id}: poca varietà di tipi`);
}
console.log('Esercizi derivati:', count);
if (fails) { console.log(`${fails} test falliti`); process.exit(1); }
console.log('OK: esercizi derivati');
