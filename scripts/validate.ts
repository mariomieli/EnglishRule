// Validazione automatica dei contenuti: `npm run validate`
import { readdirSync } from 'node:fs';
import { evaluate } from '../src/lib/grading';
import { normalize } from '../src/lib/utils';
import type { Lesson } from '../src/data/types';
import { placement } from '../src/data/placement';

const errors: string[] = [];
const warn: string[] = [];
const lessons: Lesson[] = [];
for (const f of readdirSync(new URL('../src/data/lessons', import.meta.url)).sort()) {
  const mod = await import(`../src/data/lessons/${f}`);
  for (const v of Object.values(mod)) lessons.push(...(v as Lesson[]));
}

const ids = new Set<string>();
const strings = (o: unknown, path: string, out: [string, string][] = []) => {
  if (typeof o === 'string') out.push([path, o]);
  else if (Array.isArray(o)) o.forEach((x, i) => strings(x, `${path}[${i}]`, out));
  else if (o && typeof o === 'object') for (const [k, v] of Object.entries(o)) strings(v, `${path}.${k}`, out);
  return out;
};

for (const l of lessons) {
  const at = (s: string) => errors.push(`${l.id}: ${s}`);
  if (ids.has(l.id)) at('id duplicato');
  ids.add(l.id);
  if (l.exercises.length !== 25) warn.push(`${l.id}: ${l.exercises.length} esercizi`);
  if (l.theory.length < 5) warn.push(`${l.id}: solo ${l.theory.length} blocchi di teoria`);
  const types = new Set(l.exercises.map((e) => e.type));
  if (types.size < 5) warn.push(`${l.id}: tipi di esercizio ${[...types].join(',')}`);

  for (const [p, s] of strings(l, l.id)) {
    if (/[–—]/.test(s)) at(`trattino lungo in ${p}`);
    if ((s.match(/\*\*/g)?.length ?? 0) % 2) at(`** sbilanciato in ${p}: ${s}`);
    if ((s.match(/==/g)?.length ?? 0) % 2) at(`== sbilanciato in ${p}: ${s}`);
    if (/\s{2,}/.test(s.replace(/\n/g, ' ').trim()) && !p.includes('body')) warn.push(`${p}: spazi doppi`);
  }

  l.exercises.forEach((ex, i) => {
    const e = (s: string) => at(`es.${i + 1} (${ex.type}): ${s}`);
    if (!ex.explain?.trim()) e('explain mancante');
    switch (ex.type) {
      case 'mcq':
        if (ex.answer < 0 || ex.answer >= ex.options.length) e('answer fuori range');
        if (new Set(ex.options.map(normalize)).size !== ex.options.length) e('opzioni duplicate');
        if (ex.options.length < 2) e('troppe poche opzioni');
        break;
      case 'fill':
        if ((ex.prompt.match(/_{2,}/g) ?? []).length !== 1) e(`deve avere esattamente un ___: ${ex.prompt}`);
        if (!ex.answers.length) e('answers vuoto');
        for (const a of ex.answers) if (!evaluate(ex, a)) e(`risposta non accettata: ${a}`);
        if (ex.answers.some((a) => a.includes('_'))) e('answer contiene _');
        break;
      case 'order':
        if (!evaluate(ex, ex.words)) e('ordine corretto non accettato');
        if (ex.words.length < 3) e('troppo corta');
        if (ex.words.some((w) => /\s/.test(w.trim()) && w.split(' ').length > 3)) warn.push(`${l.id} es.${i + 1}: tessera lunga "${ex.words.find((w) => w.split(' ').length > 3)}"`);
        break;
      case 'judge':
        if (!ex.isCorrect && !ex.correction) e('correction mancante');
        if (ex.isCorrect && ex.correction) warn.push(`${l.id} es.${i + 1}: correction su frase corretta`);
        if (!ex.isCorrect && ex.correction && normalize(ex.correction) === normalize(ex.sentence)) e('correction uguale alla frase');
        break;
      case 'match': {
        const L = ex.pairs.map((p) => normalize(p[0]));
        const R = ex.pairs.map((p) => normalize(p[1]));
        if (new Set(L).size !== L.length) e('voci sinistre duplicate');
        if (new Set(R).size !== R.length) e('voci destre duplicate (abbinamento ambiguo)');
        if (ex.pairs.length < 3 || ex.pairs.length > 6) e(`${ex.pairs.length} coppie`);
        if (!evaluate(ex, { mistakes: 0 })) e('eval');
        break;
      }
    }
  });
}

const byLevel: Record<string, number> = {};
placement.forEach((q, i) => {
  byLevel[q.level] = (byLevel[q.level] ?? 0) + 1;
  if ((q.prompt.match(/_{2,}/g) ?? []).length !== 1) errors.push(`placement ${i + 1}: blank`);
  if (q.answer < 0 || q.answer >= q.options.length) errors.push(`placement ${i + 1}: answer`);
  if (new Set(q.options).size !== q.options.length) errors.push(`placement ${i + 1}: opzioni duplicate`);
  if (/[–—]/.test(q.prompt + q.options.join())) errors.push(`placement ${i + 1}: trattino lungo`);
});

const perLevel = lessons.reduce<Record<string, number>>((a, l) => ((a[l.level] = (a[l.level] ?? 0) + 1), a), {});
console.log('Lezioni per livello:', perLevel, '· totale', lessons.length, '· esercizi', lessons.reduce((a, l) => a + l.exercises.length, 0));
console.log('Placement per livello:', byLevel);
warn.forEach((w) => console.log('  avviso:', w));
if (errors.length) {
  errors.forEach((e) => console.log('  ERRORE:', e));
  process.exit(1);
}
console.log('OK: nessun errore');
