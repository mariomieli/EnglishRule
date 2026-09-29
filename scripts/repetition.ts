// Analisi ripetitività: `npx tsx scripts/repetition.ts`
import { LESSONS_RAW as L } from './load';
import { placement } from '../src/data/placement';
import type { Exercise } from '../src/data/types';

const clean = (s: string) => s.toLowerCase().replace(/\*\*|==|\*/g, '').replace(/_{2,}/g, ' ___ ').replace(/\([^)]*\)/g, ' ').replace(/[^a-z' _]/g, ' ').replace(/\s+/g, ' ').trim();
const text = (e: Exercise) => (e.type === 'judge' ? e.sentence : e.type === 'order' ? e.words.join(' ') : e.type === 'match' ? e.pairs.flat().join(' ') : e.type === 'mcq' && /which sentence|choose the/i.test(e.prompt) ? e.options.join(' ') : e.prompt);
const toks = (s: string) => new Set(clean(s).split(' ').filter((w) => w.length > 2 && w !== '___'));
const jac = (a: Set<string>, b: Set<string>) => { let i = 0; a.forEach((x) => b.has(x) && i++); return i / (a.size + b.size - i || 1); };

const items = L.flatMap((l) => l.exercises.map((e, i) => ({ id: `${l.id}#${i + 1}`, type: e.type, t: text(e), k: toks(text(e)) })));
placement.forEach((q, i) => items.push({ id: `placement#${i + 1}`, type: 'mcq', t: q.prompt, k: toks(q.prompt) }));
const examples = L.flatMap((l) => l.theory.flatMap((b) => (b.type === 'examples' ? b.items.map((x) => ({ id: l.id, t: x.en, k: toks(x.en) })) : [])));

const exact: string[] = [], near: string[] = [], copied: string[] = [];
for (let a = 0; a < items.length; a++) for (let b = a + 1; b < items.length; b++) {
  const A = items[a], B = items[b];
  if (clean(A.t) === clean(B.t)) exact.push(`${A.id} = ${B.id}: ${A.t}`);
  else if (A.k.size >= 4 && B.k.size >= 4 && jac(A.k, B.k) >= 0.6) near.push(`${A.id} ~ ${B.id} (${jac(A.k, B.k).toFixed(2)})\n     ${A.t}\n     ${B.t}`);
}
for (const it of items) for (const ex of examples) if (it.id.startsWith(ex.id + '#') && it.k.size >= 3 && (clean(ex.t).replace(' ___ ', ' ') === clean(it.t).replace(' ___ ', ' ') || jac(it.k, ex.k) >= 0.85)) copied.push(`${it.id}: "${it.t}" ≈ esempio "${ex.t}"`);

// soggetti/nomi propri più ricorrenti
const freq = new Map<string, number>();
items.forEach((it) => it.k.forEach((w) => freq.set(w, (freq.get(w) ?? 0) + 1)));
const names = [...freq].filter(([w]) => /^[a-z]+$/.test(w)).sort((a, b) => b[1] - a[1]);
const proper = new Map<string, number>();
items.forEach((it) => (it.t.match(/\b[A-Z][a-z]{2,}\b/g) ?? []).filter((w) => !/^(The|She|They|What|When|Where|Who|Why|How|This|That|These|Those|There|Have|Has|Did|Does|Can|Could|Would|Will|Should|Not|Never|Only|Had|Were|Was|Are|His|Her|Our|Their|Your|Its|Hardly|Little|Rarely|Seldom|Under|Nowhere|Such|Some|Many|Much|Most|All|Every|Each|Both|Neither|Either|Although|Despite|However|If|Unless|Had|Should|Were|Yesterday|Tomorrow|Last|Next|After|Before|While|Because|Please|Don|Let|Look|Open|Close|Sit|Stand|Turn|Put|Give|Take|Go|Come|Tell|Ask|Well|Yes|No|English|Italian|Italy|London|Rome|Paris|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday|January|February|March|April|May|June|July|August|September|October|November|December|Christmas|Easter)$/.test(w)).forEach((w) => proper.set(w, (proper.get(w) ?? 0) + 1)));

console.log(`Esercizi analizzati: ${items.length}`);
console.log(`\nDUPLICATI ESATTI (${exact.length})`); exact.forEach((x) => console.log('  ' + x));
console.log(`\nQUASI DUPLICATI (${near.length})`); near.forEach((x) => console.log('  ' + x));
console.log(`\nESERCIZI COPIATI DAGLI ESEMPI DELLA TEORIA (${copied.length})`); copied.forEach((x) => console.log('  ' + x));
console.log('\nNomi propri più usati:', [...proper].sort((a, b) => b[1] - a[1]).slice(0, 15).map(([w, n]) => `${w}:${n}`).join(' '));
console.log('Parole più frequenti:', names.slice(0, 25).map(([w, n]) => `${w}:${n}`).join(' '));
