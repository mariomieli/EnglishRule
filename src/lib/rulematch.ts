import type { Exercise, TheoryBlock } from '../data/types';

/** Blocchi che spiegano una regola (gli esempi e i testi discorsivi non si mostrano come "la regola"). */
export const RULE_TYPES: TheoryBlock['type'][] = ['rule', 'formula', 'warning', 'tip', 'compare', 'table'];

// Solo parole italiane e articoli inglesi: le parole grammaticali inglesi (is, are, have, to...) sono proprio ciò che le regole spiegano.
const STOP = new Set(
  ('il lo la le gli un una uno di del della dei delle da in con su per tra fra e ed o ma se che chi non si è sono ha hanno come più anche molto solo quando dove ' +
    'si usa usare uso quindi poi dopo prima ogni qui questo questa questi queste quello quella suo sua era essere avere fare the an and or').split(/\s+/),
);

const strip = (s: string) => s.replace(/\*\*|==|\*/g, ' ');
const tokens = (s: string) => strip(s).toLowerCase().split(/[^a-zà-ù']+/).map((t) => t.replace(/^'+|'+$/g, '')).filter((t) => t.length > 1 && !STOP.has(t));

export const blockText = (b: TheoryBlock): string => {
  switch (b.type) {
    case 'rule':
      return `${b.title} ${b.body}`;
    case 'text':
    case 'tip':
    case 'warning':
      return b.body;
    case 'formula':
      return b.parts.join(' ');
    case 'compare':
      return [b.left.label, ...b.left.items, b.right.label, ...b.right.items].join(' ');
    case 'table':
      return [b.title ?? '', ...b.headers, ...b.rows.flat()].join(' ');
    case 'examples':
      return b.items.map((i) => i.en).join(' ');
  }
};

/** Parole dell'esercizio con il loro peso: spiegazione e grassetti contano di più del testo della domanda. */
function exerciseWeights(e: Exercise): Map<string, number> {
  const w = new Map<string, number>();
  const add = (s: string, weight: number) => tokens(s).forEach((t) => w.set(t, Math.max(w.get(t) ?? 0, weight)));
  add(e.explain, 3);
  for (const m of e.explain.matchAll(/\*\*([^*]+)\*\*/g)) add(m[1], 5);
  switch (e.type) {
    case 'mcq':
      add(e.prompt, 1);
      add(e.options[e.answer], 2);
      break;
    case 'fill':
      add(e.prompt, 1);
      add(e.answers[0], 2);
      break;
    case 'order':
      add(e.words.join(' '), 1);
      break;
    case 'judge':
      add(e.sentence, 1);
      if (e.correction) add(e.correction, 2);
      break;
    case 'match':
      add(e.prompt, 1);
      break;
    case 'listen':
      add(e.text, 1);
      break;
    case 'translate':
      add(e.answers[0], 1);
      break;
    case 'correct':
      add(e.answers[0], 2);
      break;
  }
  return w;
}

/** Indici (nella teoria) dei blocchi più pertinenti a un esercizio: al massimo 2, vuoto se nessuno spicca. */
export function bestBlocks(theory: TheoryBlock[], e: Exercise): number[] {
  const cands = theory.map((b, i) => ({ i, b })).filter(({ b }) => RULE_TYPES.includes(b.type));
  if (!cands.length) return [];
  const sets = cands.map(({ b }) => new Set(tokens(blockText(b))));
  const df = new Map<string, number>();
  sets.forEach((s) => s.forEach((t) => df.set(t, (df.get(t) ?? 0) + 1)));
  const weights = exerciseWeights(e);
  const scored = cands.map(({ i }, k) => {
    let score = 0;
    weights.forEach((wt, t) => {
      if (sets[k].has(t)) score += wt * Math.log(1 + cands.length / (df.get(t) ?? 1));
    });
    return { i, score };
  });
  scored.sort((a, b) => b.score - a.score);
  const top = scored[0];
  if (!top || top.score < 4) return [];
  const out = [top.i];
  if (scored[1] && scored[1].score >= top.score * 0.7 && scored[1].score >= 4) out.push(scored[1].i);
  return out.sort((a, b) => a - b);
}
