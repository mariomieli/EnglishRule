// Test del test di livello adattivo: `npm run test:placement`
import { placement } from '../src/data/placement';
import { PLACEMENT_LEVELS, buildDeck, nextLevel, placementResult, recommend, type Answered } from '../src/lib/placement';

let fails = 0;
const ok = (c: boolean, m: string) => { if (!c) { fails++; console.log('  FALLITO:', m); } };
let seed = 7;
const rnd = () => ((seed = (seed * 1103515245 + 12345) % 2 ** 31) / 2 ** 31);

function run(trueIdx: number, noise: number) {
  const deck = buildDeck(placement);
  const used: Record<string, number> = {};
  const answers: Answered[] = [];
  for (;;) {
    const lv = nextLevel(answers);
    if (!lv) break;
    const k = (used[lv] = (used[lv] ?? 0) + 1) - 1;
    ok(!!deck[lv][k], `domande esaurite a ${lv}`);
    if (!deck[lv][k]) break;
    const li = PLACEMENT_LEVELS.indexOf(lv);
    const p = li <= trueIdx ? 1 - noise : noise; // sotto/pari al livello vero: sa rispondere
    answers.push({ level: lv, ok: rnd() < p });
    ok(answers.length <= 24, 'troppe domande');
  }
  return { n: answers.length, res: PLACEMENT_LEVELS.indexOf(placementResult(answers)) };
}

for (let t = 0; t < 6; t++) {
  const r = run(t, 0);
  ok(r.res === t, `utente perfetto di livello ${PLACEMENT_LEVELS[t]} valutato ${PLACEMENT_LEVELS[r.res]}`);
  ok(r.n <= 14, `livello ${PLACEMENT_LEVELS[t]}: ${r.n} domande`);
}
let total = 0, n = 0, within1 = 0, maxQ = 0;
for (let i = 0; i < 600; i++) {
  const t = i % 6;
  const r = run(t, 0.12);
  total += r.n; n++; maxQ = Math.max(maxQ, r.n);
  if (Math.abs(r.res - t) <= 1) within1++;
}
ok(within1 / n > 0.9, `precisione con rumore troppo bassa: ${(within1 / n).toFixed(2)}`);
console.log(`Domande medie ${(total / n).toFixed(1)} (max ${maxQ}) · entro 1 livello ${(100 * within1 / n).toFixed(0)}%`);
{
  const a: Answered[] = [
    { level: 'A2', ok: false, lesson: 'x' }, { level: 'A2', ok: false, lesson: 'y' }, { level: 'A2', ok: true, lesson: 'z' },
    { level: 'B1', ok: false, lesson: 'y' }, { level: 'C2', ok: false, lesson: 'far' }, { level: 'A1', ok: false },
  ];
  const r = recommend(a, 'B1');
  ok(r.length === 2 && r[0].lesson === 'y' && r[0].misses === 2 && r[1].lesson === 'x', 'raccomandazioni: ordine per errori, poi livello');
  ok(!r.some((x) => x.lesson === 'far' || x.lesson === 'z'), 'raccomandazioni: niente lezioni oltre il livello +1 o risposte giuste');
}
if (fails) { console.log(`${fails} test falliti`); process.exit(1); }
console.log('OK: test di livello adattivo');
