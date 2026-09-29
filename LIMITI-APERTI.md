# Limiti aperti (da colmare)

Elenco vivo dei limiti rimasti dopo ogni miglioramento. Quando uno viene chiuso, cancellarlo o spostarlo in "Chiusi".
Ultimo aggiornamento: 29/09/2026 (punti 1-6 e 10).

## Nessuna verifica nel browser (vale per tutti i punti sotto)
- Nulla di quanto sotto è stato provato dal vivo (schermate, tastiera mobile, animazioni): sono stati eseguiti solo tsc, lint, validate e i test da riga di comando. Fare un giro completo su telefono e desktop.

## 1. Ripasso dilazionato
- Intervalli fissi (1, 3, 7, 14, 30, 60, 120 giorni): nessuna "facilità" per singolo esercizio, quindi gli esercizi difficili e quelli facili avanzano allo stesso passo.
- Una sola risposta giusta alla prima volta fa già salire di scatola: un esercizio indovinato per caso viene rivisto dopo 1 giorno ma poi scala in fretta.
- Sessione di ripasso massimo 12 esercizi; non si vede quanti ne scadono domani o questa settimana.
- Nessun promemoria (push o email) quando ci sono esercizi in scadenza.
- Lint: 1 warning nuovo, `Date.now()` chiamato durante il render in `reviewQueue` (src/lib/store.tsx).

## 2. Feedback sugli errori
- "Rivedi la regola" mostra tutta la teoria di regola della lezione, non solo il blocco che riguarda l'esercizio. Serve etichettare gli esercizi (circa 1.800 con quelli derivati) col blocco di teoria.
- Nell'abbinamento di coppie non compare "Tu: ..." (la risposta non si riduce a una frase).
- Nessuna spiegazione specifica per la risposta sbagliata scelta (per esempio un distrattore mcq): la spiegazione è una sola per esercizio.

## 3. Test di livello adattivo
- Solo 16 domande per livello e tutte a scelta multipla: pochi dati per stimare, e con 2-3 domande per livello un errore casuale sposta il risultato (nella simulazione con 12% di rumore il 94% cade entro 1 livello, non 100%).
- Le lezioni consigliate hanno la lezione come unità minima, non il punto specifico; con pochi errori sono poche.
- La mappa domanda-lezione è stata fatta a mano (alcune vecchie domande rimandano a lezioni di un altro livello).
- Parte sempre da A2; nessuna memoria dei risultati precedenti per ripartire dal livello già noto.
- Nessuna sezione di ascolto o scrittura nel test: misura solo grammatica.

## 4. Nuovi tipi di esercizio (dettato, traduzione, correzione)
- Sono generati dagli esercizi esistenti (src/data/derive.ts): 3 per tipo per lezione al massimo, non contenuti nuovi. Compaiono solo dai tentativi successivi al primo (il primo resta la sequenza curata di 10).
- Il dettato usa la sintesi vocale del dispositivo: la voce cambia tra browser e telefoni; dove non c'è sintesi vocale gli esercizi vengono esclusi. Non valuta la pronuncia.
- Traduzione e correzione accettano solo le risposte previste (`words` + `alternatives`, oppure la sola `correction`): varianti corrette e legittime possono essere rifiutate. Serve un elenco di alternative per esercizio o un confronto più intelligente.
- Il confronto ignora maiuscole, punteggiatura e contrazioni (I'm = I am) ma non sinonimi né errori di battitura lievi.
- Gli indici dei derivati dipendono dall'ordine degli esercizi "riordina" e "giusta o sbagliata" nella lezione: cambiare o riordinare quelli sfasa progressi ed errori già salvati.
- `validate` controlla solo i dati grezzi delle lezioni; i derivati sono coperti da `npm run test:derive`.

## 5. Pronuncia nello speaking
- La valutazione si basa sul riconoscimento vocale del browser: misura se il testo viene capito, non la pronuncia vera (accento, intonazione, durata delle vocali). Un nome proprio o una parola rara può risultare "mancata" senza colpa dell'utente.
- Il punteggio e il passaggio (80%) contano solo le parole esatte; le parole "quasi giuste" (arancione) non danno punteggio parziale.
- I consigli sono regole sulle lettere della parola (th, h iniziale, -ed, ee/ea, consonante finale...): non guardano il suono davvero sbagliato, e sono scritti solo in italiano per chi parla italiano.
- Solo il turno "Ascolta e ripeti" ha parola per parola e consigli: "Rispondi" e "Parla liberamente" non danno feedback di pronuncia.
- Nessuna memoria dei suoni deboli tra una sessione e l'altra (per esempio "sbagli spesso il th"), nessuna esercitazione dedicata alle coppie minime (ship/sheep).
- Il livello di confidenza del riconoscimento (`confidence`) non è usato: non affidabile su tutti i browser (Safari lo restituisce spesso a 0).
- Firefox non ha il riconoscimento vocale: si scrive la risposta e il feedback di pronuncia perde senso.

## 6. Obiettivo, serie con congelamento, traguardi
- **Classifica settimanale: NON fatta.** Richiede una tabella pubblica su Supabase (nome visibile, XP della settimana, RLS che espone solo chi aderisce), un consenso esplicito e la scelta del nome: sono dati di altre persone visibili e una modifica al database remoto, da decidere insieme.
- Il congelamento è derivato dai giorni con XP (1 ogni 7 giorni di studio nella serie, max 2, copre un solo giorno saltato): è coerente tra dispositivi ma non è una scelta dell'utente (non si può comprare, disattivare o usare "a mano") e non c'è un avviso "stai per perdere la serie".
- Per gli utenti già attivi la serie mostrata può salire rispetto a prima, perché i giorni saltati ora vengono coperti retroattivamente.
- L'obiettivo giornaliero ha solo 4 valori fissi (30, 50, 100, 150 XP): niente valore personalizzato, niente obiettivo in minuti o in lezioni, niente giorni di riposo.
- Il traguardo "obiettivo per 7/30 giorni" conta i giorni che superano l'obiettivo *attuale*: cambiando obiettivo il conteggio cambia.
- La notifica "Nuovo traguardo" compare solo a fine sessione di esercizi: i traguardi sbloccati con lo speaking si vedono solo nel profilo.
- Nessun test automatico per i traguardi (`badges.ts` dipende dai dati caricati da Vite, non eseguibili con tsx); la serie con congelamento è invece coperta in `test:sync`.
- Nessun badge grafico dedicato: sono emoji.

## 10. Onboarding
- Non provato dal vivo, e non ho verificato a mano i casi limite: primo avvio senza account, primo avvio di un utente con account su un dispositivo nuovo (deve aspettare la sincronizzazione e poi saltare l'onboarding), "Salta", "Indietro", test di livello dal secondo passo.
- Compare solo aprendo la home (`/`): chi entra da un link diretto a una lezione lo salta (e non viene segnato come completato).
- Sono 3 passi ma nessuna domanda sul motivo per cui si studia (lavoro, viaggi, esami): non c'è personalizzazione dei contenuti oltre a tempo e livello.
- I minuti al giorno sono tradotti in XP con una tabella fissa (5, 10, 15, 25 minuti = 30, 50, 100, 150 XP), non misurata sui tempi reali di una sessione.
- Scegliere il livello a mano imposta lo stesso valore del test di livello (`placement`): il traguardo si chiama ora "Livello stabilito" e si sblocca anche senza test, e la home non distingue le due origini.
- Nessuna richiesta di permesso per i promemoria (arrivano col punto 7).
- Il test per l'utente che ha già dati da un vecchio dispositivo senza account: vede l'onboarding una volta (poi `onboarded` si sincronizza con l'account se ne crea uno).

## Tecnico generale (dal piano iniziale)
- Bundle oltre 600 kB (dati delle lezioni tutti caricati): serve code splitting per livello.
- Lint: 11 warning preesistenti (refs in render, setState in effect, ecc.) in src/lib/store.tsx e src/pages/Profile.tsx.
- Nessun test automatico dell'interfaccia (solo script su logica): mancano Vitest e uno smoke test Playwright in CI.
- `useStore()` troppo centrale (28 archi, `store.tsx` con coesione bassa): da spezzare in parti.

## Prossimi punti del piano
6 (classifica) · 7 promemoria push · 8 riepilogo settimanale · 9 offline vero · 11 login Apple/email e cancellazione account · 12 voci TTS migliori · 13 Vitest · 14 CI · 15 performance · 16 accessibilità · 17 sicurezza Supabase (RLS) · 18 store a fette · 19 analytics rispettosi della privacy · 20 SEO e condivisione.
