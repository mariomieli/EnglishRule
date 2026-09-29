// Genera src/data/rulemap.gen.ts: per ogni esercizio (compresi i derivati) i blocchi di teoria più pertinenti,
// così "Rivedi la regola" mostra solo la parte che serve. Il confronto è lessicale: le parole della spiegazione
// dell'esercizio (soprattutto quelle in grassetto) contro le parole di ogni blocco di regola della lezione,
// pesate per quanto sono rare tra i blocchi. Eseguito in automatico prima della build.
import { writeFileSync } from 'node:fs';
import { deriveExercises } from '../src/data/derive';
import { bestBlocks } from '../src/lib/rulematch';
import { LESSONS_RAW } from './load';

const map: Record<string, number[][]> = {};
let total = 0;
let mapped = 0;
for (const l of LESSONS_RAW) {
  const exs = [...l.exercises, ...deriveExercises(l.exercises)];
  map[l.id] = exs.map((e) => bestBlocks(l.theory, e));
  total += exs.length;
  mapped += map[l.id].filter((x) => x.length).length;
}
const out = `// FILE GENERATO da scripts/gen-rulemap.ts (npm run gen:rulemap): non modificare a mano.\n// lezione -> per ogni esercizio, indici dei blocchi di teoria più pertinenti (vuoto = nessuna corrispondenza chiara).\nexport const RULE_MAP: Record<string, number[][]> = ${JSON.stringify(map)};\n`;
writeFileSync(new URL('../src/data/rulemap.gen.ts', import.meta.url), out);
console.log(`rulemap.gen.ts: ${mapped}/${total} esercizi con un blocco pertinente`);
