# Limiti aperti (da colmare)

Elenco vivo dei limiti rimasti. Quando uno viene chiuso si cancella da qui.
Ultimo aggiornamento: 30/09/2026. I punti del piano non ancora fatti (classifica, promemoria push, riepilogo settimanale, offline avanzato, login Apple e cancellazione account, voci TTS migliori, SEO) sono stati scartati da Mario.

## Da fare da parte di Mario (non posso farlo io)
- (Fatto il 30/09: migrazioni Supabase applicate e verificate dall'esterno: `progress` e `events` non sono leggibili con la chiave pubblica, le viste esistono. Restano le statistiche da consultare dal pannello.)
- **Informativa privacy e consenso** per le statistiche anonime, ora attive di default (spegnibili dal profilo, rispettano Do Not Track e Global Privacy Control). Supabase vede comunque gli indirizzi IP nei propri registri: da dire nell'informativa. Da valutare con il consulente legale (GDPR).
- **Logo in SVG o PNG trasparente**: il file originale ha lo sfondo bianco, la trasparenza l'ho ricavata in automatico (alone ai bordi, "buchi" bianchi nelle lettere e, g, R; per questo il logo completo sta su una targa bianca nel tema scuro).
- **Prove su dispositivi veri**: icone PWA e iOS "aggiungi alla home", VoiceOver, TalkBack, login Google e Supabase reale, microfono e dettato.

## Ripasso e feedback
- Un esercizio indovinato per caso alla prima volta sale comunque di scatola (1 giorno), poi gli intervalli si adattano solo dopo qualche risposta.
- Sessione di ripasso massimo 12 esercizi; nessun promemoria quando ci sono esercizi in scadenza (scartato).
- "Rivedi la regola" usa una corrispondenza per parole (calcolata in build): funziona bene sui casi provati ma può indicare un blocco poco pertinente; con "Mostra tutta la teoria" si vede il resto.
- Nell'abbinamento di coppie non compare "Tu: ...".
- Nessuna spiegazione specifica per la risposta sbagliata scelta (distrattore): la spiegazione è una sola per esercizio.

## Test di livello
- 22 domande per livello in due formati (completa la frase, quale frase è corretta), tutte a scelta multipla: con 2-3 domande per livello un errore casuale sposta il risultato (simulazione con 12% di rumore: 94% entro 1 livello).
- Le lezioni consigliate hanno la lezione come unità minima; la mappa domanda-lezione è stata fatta a mano.
- Parte sempre da A2, senza memoria dei risultati precedenti; misura solo grammatica (niente ascolto o scrittura).

## Esercizi derivati (dettato, traduzione, correzione)
- Sono generati dagli esercizi esistenti (`src/data/derive.ts`), 6 per lezione, e compaiono dal secondo tentativo in poi.
- Traduzione e correzione confrontano con le risposte previste (ignorano maiuscole, punteggiatura e contrazioni): una variante valida viene rifiutata, ma l'utente può contestarla ("La mia risposta è giusta") e viene contata giusta. Le contestazioni vanno nella statistica `answer_disputed` (vista `events_disputed_answers`) ma nessuno le raccoglie ancora per aggiungere le varianti agli esercizi.
- Il dettato usa la sintesi vocale del dispositivo (voce diversa tra browser e telefoni; escluso se manca) e non valuta la pronuncia.
- Gli indici dei derivati dipendono dall'ordine degli esercizi "riordina" e "giusta o sbagliata": riordinare quelli esistenti sfasa progressi ed errori già salvati.

## Speaking e pronuncia
- La valutazione si basa sul riconoscimento vocale del browser: misura se il testo viene capito, non la pronuncia vera (accento, intonazione, durata delle vocali). Un nome proprio o una parola rara può risultare "mancata" senza colpa dell'utente. Firefox non ha il riconoscimento vocale.
- Il punteggio di "Ascolta e ripeti" conta solo le parole esatte; le "quasi giuste" (arancione) non danno punteggio parziale.
- I consigli sono regole sulle lettere della parola (th, h iniziale, -ed, ee/ea, consonante finale...), non guardano il suono davvero sbagliato, e sono solo in italiano per chi parla italiano. In "Rispondi" e "Parla liberamente" c'è solo "forse volevi dire…" per parole capite in modo simile a quelle attese; nessun feedback parola per parola.
- Nessuna memoria dei suoni deboli tra una sessione e l'altra; nessuna esercitazione sulle coppie minime (ship/sheep). Il livello di confidenza del riconoscimento non è usato (poco affidabile: Safari lo dà spesso a 0).

## Serie, traguardi, onboarding
- Il congelamento della serie è derivato dai giorni con XP (1 ogni 7 giorni, massimo 2): non si compra, non si disattiva, nessun avviso "stai per perdere la serie". Per chi ha già una serie il numero può salire (i giorni saltati ora sono coperti anche per il passato).
- L'obiettivo giornaliero ha 4 valori fissi; i traguardi "obiettivo 7/30 giorni" contano i giorni rispetto all'obiettivo attuale. "Nuovo traguardo" compare solo dopo gli esercizi (non dopo lo speaking); i traguardi non hanno grafiche dedicate (emoji).
- Onboarding: compare solo dalla home (non da un link diretto), non chiede il motivo di studio, traduce i minuti in XP con una tabella fissa; scegliere il livello a mano vale come il test ("Livello stabilito").

## Esercizi: verifica e avanzamento automatici
- Sono regolabili dal profilo (verifica automatica sì/no; avanzamento manuale, 1 s o 3 s; toccando la spiegazione si ferma). Non c'è una regolazione più fine per tipo di esercizio.
- Con "Manuale" o dopo aver fermato l'avanzamento si resta finché non si preme Continua; con gli altri tempi la spiegazione di un esercizio giusto resta visibile poco.

## Test e CI
- I test nel browser (Playwright) coprono onboarding, esercizi, test di livello, ripasso, tastiera (scelta, riordino, abbinamento), CSP, accessibilità (10 pagine x 2 temi), statistiche, contestazione delle risposte e regola pertinente. Non coprono: login e sincronizzazione con Supabase reale (la sincronizzazione è provata con un finto Supabase in memoria), cambio di dispositivo, speaking con microfono, dettato con audio, installazione come PWA, uso offline; solo Chrome (non Firefox né Safari).
- Alcuni test dipendono dal primo esercizio di "Il verbo To Be" (a scelta multipla) e dai dati: se la sequenza curata cambia vanno aggiornati.
- Nessuna soglia di copertura del codice; la CI scarica i browser a ogni esecuzione (circa 3 minuti in più).
- Lint: 0 warning. `validate` e `validate:speaking` restano script a parte, non test Vitest.

## Performance
- All'avvio si scaricano circa 210 kB compressi; la libreria Supabase (circa 55 kB compressi) è ancora caricata subito: renderla a richiesta tocca il login e non si può provare senza credenziali reali.
- Il prefetch in background scarica tutti i livelli e le pagine (circa 600 kB) dopo l'avvio, salvo "risparmio dati": non c'è una scelta dell'utente.
- Il logo è PNG (raster). Nessuna misura reale (Lighthouse, Core Web Vitals) su dispositivi veri. Il service worker non ha precache versionato per gli asset con hash.

## Accessibilità
- Verifica automatica (axe, WCAG 2 A/AA) su 10 pagine in due temi: passa. Riordino e abbinamento sono provati da tastiera; non provati con VoiceOver/TalkBack. Le frasi inglesi hanno `lang="en"` negli esercizi, negli esempi di teoria e nello speaking, ma non nei testi misti (spiegazioni, abbinamenti).
- Nessun controllo per ingrandire il testo (solo zoom del browser), nessuna modalità ad alto contrasto oltre ai due temi; coriandoli e suoni solo con "effetti sonori" e `prefers-reduced-motion`.

## Sicurezza
- La CSP è in un tag `<meta>` (GitHub Pages non permette intestazioni HTTP): mancano `frame-ancestors` e `X-Content-Type-Options`; richiede `style-src 'unsafe-inline'`. Non provata con un vero login Supabase/Google (OAuth e realtime).
- Nessun controllo del limite di richieste lato server, nessuna politica di cancellazione dell'account e dei dati, nessun `npm audit`/Dependabot in CI.
- Le statistiche accettano inserimenti da chiunque (necessario per non avere identificativi): possibile spam con eventi falsi, limitato solo da vincoli di forma e dimensione. Pianificare la cancellazione degli eventi vecchi (è nel commento della migrazione).

## Statistiche anonime
- Nessuna dashboard: si consultano le viste SQL dal pannello di Supabase. Non si misurano tempi, errori dell'app o eventi di speaking oltre a avvio/fine.

## Store
- `State` è ancora un unico oggetto: ogni cambiamento ridisegna tutti i componenti che usano `useStore()` (nessuna selezione di fette con memoizzazione). La sincronizzazione reale con Supabase (`useCloud`) non ha test automatici oltre al finto Supabase.
