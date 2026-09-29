import { LESSONS_RAW as L } from './load';
const n = (s: string) => s.toLowerCase().replace(/\*\*|==|\*/g, '').trim();
// mcq generici: confronto su prompt + opzioni
const g = L.flatMap((l) => l.exercises.map((e, i) => ({ id: `${l.id}#${i + 1}`, e })).filter((x) => x.e.type === 'mcq' && /which sentence/i.test((x.e as any).prompt)));
const seen = new Map<string, string>();
g.forEach(({ id, e }) => (e as any).options.forEach((o: string) => { const k = n(o); if (seen.has(k)) console.log('OPZIONE RIPETUTA', seen.get(k), id, o); else seen.set(k, id); }));
// stessa risposta corretta ripetuta nella stessa lezione
for (const l of L) {
  const ans = new Map<string, number>();
  l.exercises.forEach((e) => {
    const a = e.type === 'mcq' ? e.options[e.answer] : e.type === 'fill' ? e.answers[0] : null;
    if (a) ans.set(n(a), (ans.get(n(a)) ?? 0) + 1);
  });
  const rep = [...ans].filter(([, c]) => c >= 3);
  if (rep.length) console.log('RISPOSTA RIPETUTA', l.id, rep.map(([a, c]) => `"${a}" x${c}`).join(', '));
  // stesso soggetto/apertura ripetuta
  const starts = new Map<string, number>();
  l.exercises.forEach((e) => {
    const t = e.type === 'judge' ? e.sentence : e.type === 'order' ? e.words.join(' ') : e.type === 'match' ? '' : e.prompt;
    const w = n(t).split(' ').slice(0, 2).join(' ');
    if (w && !/which sentence|choose the/.test(w)) starts.set(w, (starts.get(w) ?? 0) + 1);
  });
  const rs = [...starts].filter(([, c]) => c >= 3);
  if (rs.length) console.log('APERTURA RIPETUTA', l.id, rs.map(([a, c]) => `"${a}..." x${c}`).join(', '));
}
