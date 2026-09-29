// Schema dei contenuti didattici. Spiegazioni in italiano, esempi ed esercizi in inglese.
// Nei campi di testo si può usare markup inline: **grassetto**, *corsivo*, ==evidenziato==.

export type LevelId = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export interface Example {
  en: string; // frase inglese (markup inline ammesso, es. "She ==goes== to school.")
  it?: string; // traduzione italiana
}

export type TheoryBlock =
  | { type: 'text'; body: string }
  | { type: 'rule'; title: string; body: string } // regola chiave, messa in evidenza
  | { type: 'formula'; parts: string[] } // es. ["Soggetto", "+ have/has", "+ participio passato"]
  | { type: 'examples'; title?: string; items: Example[] }
  | { type: 'table'; title?: string; headers: string[]; rows: string[][] }
  | { type: 'tip'; body: string } // trucco / consiglio
  | { type: 'warning'; body: string } // errore tipico degli italiani
  | { type: 'compare'; left: { label: string; items: string[] }; right: { label: string; items: string[] } };

export type Exercise =
  // scelta multipla: answer = indice dell'opzione corretta
  | { type: 'mcq'; prompt: string; options: string[]; answer: number; explain: string }
  // completamento: nel prompt il buco è "___" (uno solo). answers = tutte le risposte accettate (case-insensitive, spazi normalizzati)
  | { type: 'fill'; prompt: string; answers: string[]; hint?: string; explain: string }
  // riordina le parole: words = frase corretta già in ordine (verrà mescolata). Punteggiatura finale attaccata all'ultima parola.
  // alternatives = altre frasi complete accettate (se esistono ordini alternativi validi)
  | { type: 'order'; words: string[]; alternatives?: string[]; translation?: string; explain: string }
  // la frase è corretta? se isCorrect=false, correction = versione giusta
  | { type: 'judge'; sentence: string; isCorrect: boolean; correction?: string; explain: string }
  // abbina coppie (3-5 coppie): left[i] va con right[i] (verranno mescolate)
  | { type: 'match'; prompt: string; pairs: [string, string][]; explain: string }
  // Tipi generati automaticamente dagli esercizi esistenti (vedi derive.ts), mai scritti a mano nelle lezioni:
  // dettato: si ascolta la frase e la si scrive
  | { type: 'listen'; text: string; translation?: string; explain: string }
  // traduzione italiano -> inglese: answers = tutte le traduzioni accettate
  | { type: 'translate'; it: string; answers: string[]; explain: string }
  // correzione: la frase contiene un errore, va riscritta corretta
  | { type: 'correct'; sentence: string; answers: string[]; explain: string };

export interface Lesson {
  id: string; // slug univoco, es. "a1-to-be"
  level: LevelId;
  title: string; // es. "Il verbo To Be"
  subtitle: string; // es. "am, is, are: il verbo più importante"
  icon: string; // una emoji
  minutes: number; // durata stimata
  tags: string[]; // parole chiave per la ricerca, es. ["be", "essere", "am", "is"]
  theory: TheoryBlock[];
  exercises: Exercise[]; // 8-10 esercizi, tipi misti
}

export interface PlacementQuestion {
  level: LevelId;
  prompt: string; // con "___" per il buco
  options: string[];
  answer: number;
  lesson?: string; // lezione da consigliare se l'utente sbaglia
}

/* ---------------- Speaking ---------------- */

export type SpeakingTurn =
  // shadowing: ascolta e ripeti la frase
  | { type: 'repeat'; en: string; it: string }
  // botta e risposta: il partner parla, l'utente risponde seguendo il compito
  | {
      type: 'reply';
      partner: string; // battuta del partner in inglese
      partnerIt: string; // traduzione della battuta
      task: string; // cosa deve dire l'utente, in italiano (es. "Chiedi quanto costa il biglietto")
      answers: string[]; // 2-4 risposte modello complete in inglese
      // gruppi di parole chiave: la risposta è valida se contiene almeno un'alternativa di OGNI gruppo
      // (minuscolo, senza punteggiatura; alternative di 1-3 parole). Es: [["how much"], ["ticket", "tickets"]]
      keywords: string[][];
      tip?: string; // suggerimento grammaticale in italiano
    }
  // parla liberamente su un tema per qualche decina di secondi
  | {
      type: 'free';
      question: string; // domanda del partner in inglese
      questionIt: string;
      task: string; // consegna in italiano
      seconds: number; // 30-90
      targets: { label: string; patterns: string[] }[]; // strutture da usare: label in italiano, patterns = parole/espressioni che ne indicano l'uso
      model: string; // risposta modello in inglese
    };

export interface SpeakingScenario {
  id: string; // es. "sp-a1-introductions"
  level: LevelId;
  title: string; // es. "Presentarsi"
  subtitle: string;
  icon: string; // emoji
  minutes: number;
  context: string; // situazione, in italiano: dove sei, con chi parli
  partner: string; // nome e ruolo del partner, es. "Emma, la tua nuova collega"
  goals: string[]; // 2-4 obiettivi comunicativi in italiano
  lessons: string[]; // id delle lezioni di grammatica collegate (esistenti)
  phrases: { en: string; it: string }[]; // 4-6 frasi utili
  turns: SpeakingTurn[]; // 7-9 turni: 2 repeat, 4-5 reply, 1 free (l'ultimo)
}
