import { describe, expect, it } from 'vitest';
import { placement } from '../data/placement';
import { PLACEMENT_LEVELS, buildDeck, nextLevel, placementResult, recommend, type Answered } from '../lib/placement';

const ok = (c: boolean, m: string) => expect(c, m).toBe(true);

describe('test di livello adattivo', () => {
  it('test di livello adattivo', () => {
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
  });
});

describe('banca di domande del test di livello', () => {
  it('ogni domanda è ben formata, con una lezione esistente, e ci sono due formati per livello', async () => {
    const { placement } = await import('../data/placement');
    const { lessonById } = await import('../data');
    for (const q of placement) {
      const blanks = (q.prompt.match(/_{2,}/g) ?? []).length;
      expect(blanks, q.prompt).toBe(q.kind === 'sentence' ? 0 : 1);
      expect(q.answer).toBeGreaterThanOrEqual(0);
      expect(q.answer).toBeLessThan(q.options.length);
      expect(new Set(q.options).size).toBe(q.options.length);
      expect(lessonById(q.lesson ?? ''), `lezione di: ${q.prompt}`).toBeDefined();
    }
    for (const lv of ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']) {
      const qs = placement.filter((q) => q.level === lv);
      expect(qs.length).toBeGreaterThanOrEqual(20);
      expect(qs.filter((q) => q.kind === 'sentence').length).toBeGreaterThanOrEqual(6);
      const prompts = qs.filter((q) => q.kind !== 'sentence').map((q) => q.prompt);
      expect(new Set(prompts).size).toBe(prompts.length);
    }
  });
});
