// Validazione degli scenari di speaking: `npm run validate:speaking`
import { readdirSync } from 'node:fs';
import type { SpeakingScenario } from '../src/data/types';
import { LESSONS_RAW } from './load';
import { checkReply, checkTargets, normSpeech } from '../src/lib/speech-eval';

const lessonIds = new Set(LESSONS_RAW.map((l) => l.id));
const all: SpeakingScenario[] = [];
for (const f of readdirSync(new URL('../src/data/speaking', import.meta.url)).sort()) {
  const mod = await import(`../src/data/speaking/${f}`);
  for (const v of Object.values(mod)) all.push(...(v as SpeakingScenario[]));
}
const errors: string[] = [];
const ids = new Set<string>();
const byLevel: Record<string, number> = {};
for (const s of all) {
  const e = (m: string) => errors.push(`${s.id}: ${m}`);
  byLevel[s.level] = (byLevel[s.level] ?? 0) + 1;
  if (ids.has(s.id)) e('id duplicato');
  ids.add(s.id);
  if (!s.id.startsWith(`sp-${s.level.toLowerCase()}-`)) e('id deve iniziare con sp-<livello>-');
  s.lessons.forEach((l) => lessonIds.has(l) || e(`lezione inesistente ${l}`));
  if (s.phrases.length < 4) e('poche frasi utili');
  const types = s.turns.map((t) => t.type);
  if (types.filter((t) => t === 'repeat').length < 2) e('servono almeno 2 repeat');
  if (types.filter((t) => t === 'reply').length < 4) e('servono almeno 4 reply');
  if (types[types.length - 1] !== 'free') e("l'ultimo turno deve essere free");
  if (JSON.stringify(s).match(/[–—]/)) e('trattino lungo');
  s.turns.forEach((t, i) => {
    const w = (m: string) => e(`turno ${i + 1} (${t.type}): ${m}`);
    if (t.type === 'reply') {
      if (t.answers.length < 2) w('servono almeno 2 risposte modello');
      if (!t.keywords.length) w('keywords vuote');
      t.answers.forEach((a) => {
        const r = checkReply(a, t.keywords, []);
        if (!r.ok) w(`la risposta modello "${a}" non soddisfa le keywords ${JSON.stringify(t.keywords)} (gruppi: ${r.groups})`);
      });
      t.keywords.flat().forEach((k) => normSpeech(k).trim() || w(`keyword vuota "${k}"`));
      // keywords non troppo permissive: la sola battuta del partner non deve bastare
      if (checkReply(t.partner, t.keywords, []).ok) w('le keywords sono già soddisfatte dalla battuta del partner (troppo permissive)');
    }
    if (t.type === 'free') {
      const used = checkTargets(t.model, t.targets);
      used.forEach((u) => u.used || w(`il modello non usa il target "${u.label}"`));
      if (t.seconds < 20 || t.seconds > 120) w('seconds fuori range');
    }
  });
}
console.log('Scenari per livello:', byLevel, 'totale', all.length);
if (errors.length) {
  errors.forEach((x) => console.log('  ERRORE:', x));
  process.exit(1);
}
console.log('OK: nessun errore');
