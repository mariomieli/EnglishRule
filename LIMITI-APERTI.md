# Limiti aperti (da colmare)

Elenco vivo dei limiti rimasti dopo ogni miglioramento. Quando uno viene chiuso, cancellarlo o spostarlo in "Chiusi".
Ultimo aggiornamento: 29/09/2026 (punti 1-6, 10, 13-19; gli altri punti del piano sono stati scartati da Mario).

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

## Verifica automatica delle risposte
- Scelta multipla, giusta/sbagliata e abbinamenti si verificano da soli 350 ms dopo la risposta: non si può più cambiare idea dopo aver toccato un'opzione (prima si poteva finché non si premeva Verifica). Completamento, riordino e le voci scritte restano manuali. Nessuna opzione per tornare al vecchio comportamento.
- Con la risposta giusta si passa all'esercizio dopo circa 1 secondo (Invio o "Continua" per anticipare): la spiegazione di un esercizio corretto resta visibile poco, e non c'è modo di fermare l'avanzamento per rileggerla. Con la risposta sbagliata si resta finché non si preme Continua.

## 13-14. Test e CI
- Gli smoke test Playwright coprono 4 percorsi, tastiera, CSP, axe (10 pagine x 2 temi) e statistiche; non coprono: accesso e sincronizzazione con Supabase reale (nessuna credenziale di prova, la CI costruisce senza cloud), cambio di dispositivo, speaking con microfono, dettato con audio, installazione come PWA, uso offline.
- Il test dell'esercizio assume che il primo esercizio di "Il verbo To Be" sia a scelta multipla: se la sequenza curata cambia va aggiornato.
- Nessuna soglia di copertura del codice; i test di interfaccia sono solo su Chrome (non Firefox né Safari/WebKit).
- La CI dura circa 3 minuti in più (browser da scaricare a ogni esecuzione: non c'è cache dei browser di Playwright).
- Il lint passa con 9 warning noti (riferimenti letti durante il render, `setState` in un effetto): non blocca, ma non sono stati eliminati.
- Gli script `validate` e `validate:speaking` restano script a parte, non test Vitest.

## 15. Performance
- All'avvio si scaricano circa 210 kB compressi (prima circa 470 kB), ma la libreria Supabase (circa 55 kB compressi) è ancora caricata subito: renderla a richiesta tocca l'accesso e non si può provare senza credenziali reali.
- Il prefetch in background scarica tutti i livelli e le pagine (circa 600 kB in più) dopo l'avvio anche su reti lente, salvo "risparmio dati": non c'è una scelta dell'utente.
- Le immagini del logo sono PNG (non SVG/WebP): il logo originale è raster, un vettoriale sarebbe più leggero e nitido a ogni dimensione.
- Non misurati i tempi reali (Lighthouse, Core Web Vitals) su dispositivi veri.
- Il service worker non ha versioni di precache per gli asset con hash: si affida alla cache "al primo utilizzo".

## Logo (aggiunto su richiesta)
- Il file originale ha lo sfondo bianco: ho ricavato la trasparenza in automatico. Ai bordi possono restare piccoli aloni; i "buchi" delle lettere (e, g, R) restano bianchi, per questo il logo completo sta su una targa bianca nel tema scuro. Meglio avere l'originale in SVG o PNG trasparente.
- Nella barra in alto uso il simbolo più la scritta in testo (per adattarsi al tema), non il file completo: la tipografia è quella del sito, non quella del logo.
- Icone PWA e favicon derivate dal simbolo: non controllate su un telefono vero (icona adattiva Android, iOS "aggiungi alla home"). L'immagine di condivisione (`og-image.png`) punta all'indirizzo pubblico su GitHub Pages: se cambia il dominio va aggiornata.

## 16. Accessibilità
- Verifica automatica (axe, WCAG 2 A/AA) su 10 pagine in tema chiaro e scuro: passa. Non copre ciò che uno strumento non vede: ordine di lettura sensato, chiarezza dei testi alternativi, uso reale con VoiceOver e TalkBack (non provati).
- L'esercizio "Abbina le coppie" e "Riordina" (tessere) non sono stati verificati con la sola tastiera né con lettore di schermo; la scelta multipla, il completamento e le nuove voci scritte sì.
- Gli esercizi dettato/traduzione/correzione non annunciano automaticamente il risultato in modo specifico oltre al riquadro di feedback (regione `aria-live`).
- Le animazioni rispettano `prefers-reduced-motion` (framer-motion e regole CSS), ma i coriandoli e i suoni non hanno un'opzione dedicata oltre a "effetti sonori".
- Il testo non è ridimensionabile con un controllo dell'app (solo lo zoom del browser); nessuna modalità ad alto contrasto oltre ai due temi.
- Solo italiano nei testi per lettori di schermo (`lang="it"` sul documento, ma le frasi inglesi non sono marcate `lang="en"`, quindi il lettore potrebbe leggerle con la voce italiana).

## 17. Sicurezza
- RLS verificata dall'esterno con la sola chiave pubblica: non si legge né si scrive nulla. La migrazione di rafforzamento (`20260930000000_hardening.sql`: limite di dimensione, versione crescente, permessi ad anon) è nel repository ma NON APPLICATA: va eseguita nel SQL Editor di Supabase (non ho accesso al database).
- La CSP è in un tag `<meta>`: GitHub Pages non permette intestazioni HTTP, quindi mancano `frame-ancestors`, `X-Content-Type-Options`, HSTS gestito solo da GitHub. Richiede stile inline (`style-src 'unsafe-inline'`) per come è scritto React/framer-motion.
- La CSP non è stata provata con un vero login Supabase o Google (redirect OAuth e realtime WebSocket); ammette `*.supabase.co` e l'indirizzo configurato.
- Non c'è una politica di cancellazione dell'account e dei dati (punto 11 del piano) né un controllo del limite di richieste lato server.
- Le dipendenze non sono controllate in automatico (nessun `npm audit` o Dependabot in CI).

## 18. Store a moduli
- `provider.tsx` e `useCloud.ts` hanno ancora warning noti (riferimenti letti durante il render). La sincronizzazione (`useCloud`) non ha test automatici perché richiede Supabase: sono testate le parti pure (calcoli e trasformazioni), non la sincronizzazione.
- `State` è ancora un unico oggetto grande: ogni cambiamento fa ridisegnare tutti i componenti che usano `useStore()` (non c'è selezione di fette con memoizzazione).

## 19. Statistiche anonime
- Il codice è pronto ma la tabella `events` NON esiste ancora: va creata eseguendo `supabase/migrations/20260930000001_events.sql` nel SQL Editor. Finché non c'è, le richieste falliscono in silenzio (compare un errore 404 nella console del browser).
- Chiunque può inserire eventi (necessario per non avere identificativi): un malintenzionato potrebbe riempire la tabella di eventi falsi; ci sono solo limiti di forma e dimensione, non di frequenza. Pianificare la cancellazione degli eventi vecchi (è nel commento della migrazione).
- Supabase vede l'indirizzo IP nei propri registri di infrastruttura anche se noi non lo salviamo: da dire nell'informativa privacy.
- Nessuna informativa privacy nel sito e nessun consenso preventivo (le statistiche sono attive di default salvo Do Not Track/Global Privacy Control o interruttore nel profilo): da valutare con il consulente legale per il GDPR.
- Nessuna dashboard: si consultano le due viste SQL (`events_lesson_funnel`, `events_hard_exercises`) dal pannello di Supabase.
- Non si misurano tempi, errori dell'app o eventi di speaking e ripasso oltre a avvio/fine.

## Tecnico generale (dal piano iniziale)
- Bundle oltre 600 kB (dati delle lezioni tutti caricati): serve code splitting per livello.
- Lint: 11 warning preesistenti (refs in render, setState in effect, ecc.) in src/lib/store.tsx e src/pages/Profile.tsx.
- Nessun test automatico dell'interfaccia (solo script su logica): mancano Vitest e uno smoke test Playwright in CI.
- `useStore()` troppo centrale (28 archi, `store.tsx` con coesione bassa): da spezzare in parti.
