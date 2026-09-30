import type { Lesson } from '../types';

export const b2: Lesson[] = [
  // 1) THIRD CONDITIONAL E MIXED CONDITIONALS
  {
    id: "b2-third-mixed-conditionals",
    level: "B2",
    title: "Third e mixed conditionals",
    subtitle: "If I had known... ipotesi sul passato e incroci tra tempi",
    icon: "🌀",
    minutes: 17,
    tags: ["third conditional", "mixed conditionals", "would have", "if I had known", "periodo ipotetico", "rimpianti"],
    theory: [
      {
        type: "text",
        body: "Il **third conditional** corrisponde al nostro \"**se + congiuntivo trapassato, condizionale passato**\" (*se l'avessi saputo, te l'avrei detto*). Parla di situazioni **passate che non sono successe**: si immagina un passato diverso e le sue conseguenze.",
      },
      {
        type: "formula",
        parts: ["If + past perfect (had + participio)", "would have + participio"],
      },
      {
        type: "examples",
        items: [
          { en: "If I ==had known== you were ill, I ==would have visited== you.", it: "Se avessi saputo che eri malato, sarei venuto a trovarti." },
          { en: "If she ==hadn't missed== the bus, she ==wouldn't have been== late.", it: "Se non avesse perso l'autobus, non sarebbe arrivata in ritardo." },
          { en: "We ==could have won== if we ==had played== better.", it: "Avremmo potuto vincere se avessimo giocato meglio." },
          { en: "If you ==had asked== me, I ==might have helped==.", it: "Se me l'avessi chiesto, forse ti avrei aiutato." },
        ],
      },
      {
        type: "warning",
        body: "Errore frequentissimo: mettere *would have* anche dopo *if*. ✗ *If I would have known...* → ✔ If I **had known**... Nel parlato americano si sente, ma è considerato scorretto nell'inglese standard.",
      },
      {
        type: "warning",
        body: "Attenzione alla doppia contrazione **'d**: in *If I'd known, I'd have told you*, il primo *'d* è **had** (segue il participio *known*), il secondo è **would** (segue *have*).",
      },
      {
        type: "rule",
        title: "Mixed conditionals: passato → presente",
        body: "Una condizione **passata** con una conseguenza **presente**: **If + past perfect, would + forma base**. If I **had taken** that job, I **would be** rich now. (non l'ho preso, e ora non sono ricco).",
      },
      {
        type: "rule",
        title: "Mixed conditionals: presente → passato",
        body: "Una condizione **presente o permanente** con una conseguenza **passata**: **If + past simple, would have + participio**. If I **spoke** French, I **would have understood** the film. (non parlo francese, quindi ieri non ho capito il film).",
      },
      {
        type: "table",
        title: "Riepilogo",
        headers: ["Tipo", "Frase con if", "Frase principale"],
        rows: [
          ["Third", "had + participio", "would have + participio"],
          ["Mixed (passato → ora)", "had + participio", "would + forma base"],
          ["Mixed (sempre → passato)", "past simple", "would have + participio"],
        ],
      },
      {
        type: "tip",
        body: "Per scegliere tra third e mixed, chiediti **quando** si colloca la conseguenza. Se nella frase ci sono parole come *now, today, still*, probabilmente serve un mixed conditional: If I hadn't stayed up so late, I **wouldn't be** so tired **now**.",
      },
    ],
    exercises: [
      {
        type: "mcq",
        prompt: "If I ___ about the party, I would have come.",
        options: ["had known", "would have known", "knew", "have known"],
        answer: 0,
        explain: "Third conditional: dopo *if* serve il **past perfect** *had known*, mai *would have*.",
      },
      {
        type: "fill",
        prompt: "If you had set the alarm, you ___ (not / oversleep).",
        answers: ["wouldn't have overslept", "would not have overslept"],
        hint: "(not / oversleep)",
        explain: "Conseguenza passata irreale: **wouldn't have + participio** (*overslept*).",
      },
      {
        type: "mcq",
        prompt: "If I had studied medicine, I ___ a doctor now.",
        options: ["would have been", "had been", "would be", "will be"],
        answer: 2,
        explain: "Condizione passata, conseguenza **presente** (*now*): mixed conditional, **would be**.",
      },
      {
        type: "fill",
        prompt: "If she ___ (leave) earlier, she would have caught the train.",
        answers: ["had left", "'d left"],
        hint: "(leave)",
        explain: "Frase con *if* del third conditional: **had + participio**, *had left*.",
      },
      {
        type: "judge",
        sentence: "If I would have seen the sign, I would have stopped.",
        isCorrect: false,
        correction: "If I had seen the sign, I would have stopped.",
        explain: "Nella frase con *if* non va *would have*: serve il past perfect **had seen**.",
      },
      {
        type: "judge",
        sentence: "If he weren't so shy, he would have spoken to her at the party.",
        isCorrect: true,
        explain: "Corretta: mixed conditional. Condizione permanente (è timido) al past simple, conseguenza passata con *would have spoken*.",
      },
      {
        type: "order",
        words: ["If", "we", "had", "left", "earlier,", "we", "wouldn't", "have", "missed", "it."],
        translation: "Se fossimo partiti prima, non l'avremmo perso.",
        explain: "Third conditional: **If + had + participio, wouldn't have + participio**.",
      },
      {
        type: "match",
        prompt: "Abbina l'inizio alla fine corretta.",
        pairs: [
          ["If I had saved more money,", "I could buy a house now."],
          ["If I had left on time,", "I wouldn't have missed the flight."],
          ["If I were taller,", "they would have picked me for the team."],
          ["If it rains tomorrow,", "we'll stay in."],
        ],
        explain: "Passato → presente (*could buy now*); third puro (*wouldn't have missed*); presente permanente → passato (*would have picked*); first conditional (*will*).",
      },
      {
        type: "fill",
        prompt: "I'm so tired. If I ___ (go) to bed earlier last night, I wouldn't feel like this.",
        answers: ["had gone", "'d gone"],
        hint: "(go)",
        explain: "La condizione riguarda ieri sera (passato), la conseguenza è ora: **had gone** + *wouldn't feel* (mixed).",
      },
      {
        type: "mcq",
        prompt: "\"I didn't know you needed a lift.\" Which sentence expresses the same idea?",
        options: ["If I knew you needed a lift, I would give you one.", "If I would know, I would have given you one.", "If I know you need a lift, I'll give you one.", "If I had known you needed a lift, I would have given you one."],
        answer: 3,
        explain: "Situazione passata irreale: **If I had known..., I would have given...** (third conditional).",
      },
      {
        type: "mcq",
        prompt: "The hikers ___ lost yesterday if they had taken a map with them.",
        options: ["hadn't got", "wouldn't get", "wouldn't have got", "didn't get"],
        answer: 2,
        explain: "Condizione e conseguenza sono entrambe nel **passato** (*yesterday*): third conditional, **wouldn't have got**. *Wouldn't get* parlerebbe del presente.",
      },
      {
        type: "mcq",
        prompt: "In the sentence \"If she'd asked, we'd have helped\", what do the two 'd forms stand for?",
        options: ["would / would", "had / had", "would / had", "had / would"],
        answer: 3,
        explain: "Il primo *'d* è seguito dal participio *asked*, quindi è **had**; il secondo è seguito da *have*, quindi è **would**.",
      },
      {
        type: "mcq",
        prompt: "Rosa is allergic to cats, so she didn't stay at our place last week. If she ___ allergic, she would have stayed with us.",
        options: ["weren't", "wouldn't be", "isn't", "won't be"],
        answer: 0,
        explain: "L'allergia è una condizione **permanente** (vale ancora oggi) e la conseguenza è passata: mixed conditional con il **past simple** dopo *if*, *weren't* (nel parlato anche *wasn't*).",
      },
      {
        type: "mcq",
        prompt: "We ___ the whole match if the storm hadn't knocked out the power.",
        options: ["could watch", "could have watched", "can have watched", "could had watched"],
        answer: 1,
        explain: "Nella frase principale del third conditional, al posto di *would* si può usare **could have + participio** (avremmo potuto). *Can have* e *could had* non funzionano qui.",
      },
      {
        type: "fill",
        prompt: "Priya moved to Dublin at eighteen. If she hadn't moved there, she ___ English so fluently now.",
        answers: ["wouldn't speak", "would not speak"],
        hint: "(not / speak)",
        explain: "Condizione passata (*hadn't moved*), conseguenza **presente** (*now*): mixed conditional con **wouldn't + forma base**.",
      },
      {
        type: "fill",
        prompt: "The vase ___ if the courier had packed it properly.",
        answers: ["wouldn't have broken", "would not have broken"],
        hint: "(not / break)",
        explain: "Third conditional: conseguenza passata irreale con **wouldn't have + participio**. Attenzione al participio: *broken*, non *broke*.",
      },
      {
        type: "fill",
        prompt: "If our flight ___ cancelled, we would have reached Lisbon by lunchtime.",
        answers: ["hadn't been", "had not been"],
        hint: "(not / be)",
        explain: "Frase con *if* del third conditional: **past perfect**, qui passivo negativo *hadn't been cancelled*.",
      },
      {
        type: "fill",
        prompt: "Tickets sold out in an hour. If we ___ them on Monday, we would be sitting in the front row tonight.",
        answers: ["had booked", "'d booked"],
        hint: "(book)",
        explain: "Condizione passata (lunedì) con conseguenza presente/imminente (*tonight*): mixed conditional, **had booked** + *would be sitting*.",
      },
      {
        type: "order",
        words: ["He", "wouldn't", "be", "so", "broke", "if", "he'd", "saved", "more."],
        translation: "Non sarebbe così al verde se avesse risparmiato di più.",
        explain: "Mixed conditional (passato → presente): **wouldn't + forma base** nella principale; *he'd saved* = **he had saved**, perché *'d* è seguito da un participio.",
      },
      {
        type: "order",
        words: ["Security", "might", "have", "caught", "him", "if", "the", "alarm", "had", "worked."],
        translation: "Forse la vigilanza l'avrebbe preso, se l'allarme avesse funzionato.",
        explain: "Third conditional con **might have + participio** (forse avrebbe) nella principale e **had + participio** dopo *if*.",
      },
      {
        type: "judge",
        sentence: "If the referee would have noticed the foul, he would have given a penalty.",
        isCorrect: false,
        correction: "If the referee had noticed the foul, he would have given a penalty.",
        explain: "Dopo *if* non si usa *would have*: serve il past perfect **had noticed**. *Would have* va solo nella frase principale.",
      },
      {
        type: "judge",
        sentence: "If Carla hadn't lost her glasses, she would have been able to read the menu now.",
        isCorrect: false,
        correction: "If Carla hadn't lost her glasses, she would be able to read the menu now.",
        explain: "Con *now* la conseguenza è **presente**: mixed conditional con **would + forma base** (*would be able*), non *would have been*.",
      },
      {
        type: "judge",
        sentence: "We'd have arrived on time if the satnav hadn't sent us the wrong way.",
        isCorrect: true,
        explain: "Corretta: third conditional con la principale all'inizio. *We'd have* = **we would have** (il *'d* è seguito da *have*).",
      },
      {
        type: "match",
        prompt: "Abbina ogni condizione alla sua conseguenza logica.",
        pairs: [
          ["If the bakery hadn't closed down,", "we could still buy fresh bread on our street."],
          ["If the printer hadn't jammed,", "the flyers would have been ready for Saturday."],
          ["If Sam weren't so forgetful,", "he would have remembered his mum's birthday."],
          ["If the bridge had been built properly,", "it wouldn't have collapsed."],
        ],
        explain: "Passato → presente (*could still buy*); third conditional (*would have been*, *wouldn't have collapsed*); tratto permanente → passato (*weren't so forgetful... would have remembered*).",
      },
      {
        type: "match",
        prompt: "Abbina ogni frase al tipo di condizionale.",
        pairs: [
          ["If the alarm had gone off, I would have caught my train.", "third: passato → passato"],
          ["If I hadn't eaten those prawns, I wouldn't feel sick now.", "mixed: passato → presente"],
          ["If Mia were braver, she would have spoken up at the meeting.", "mixed: presente → passato"],
          ["If it snows tonight, the schools will close.", "first: futuro possibile"],
        ],
        explain: "Guarda i tempi: *had + participio / would have* = third; *had + participio / would + base* = mixed verso il presente; *past simple / would have* = mixed verso il passato; *present / will* = first.",
      },
    ],
  },

  // 2) WISH / IF ONLY
  {
    id: "b2-wish-if-only",
    level: "B2",
    title: "Wish e if only",
    subtitle: "Desideri, rimpianti e lamentele: wish + past, past perfect, would",
    icon: "🌠",
    minutes: 16,
    tags: ["wish", "if only", "rimpianti", "desideri", "vorrei", "magari", "would"],
    theory: [
      {
        type: "text",
        body: "**wish** e **if only** (più enfatico, \"magari!\") servono per esprimere desideri su situazioni **diverse dalla realtà**. Come nei condizionali, il tempo verbale \"fa un passo indietro\" rispetto al significato.",
      },
      {
        type: "table",
        title: "Le tre strutture",
        headers: ["Struttura", "Riguarda", "Esempio"],
        rows: [
          ["wish + past simple", "il presente (situazione attuale)", "I wish I had a car."],
          ["wish + past perfect", "il passato (rimpianto)", "I wish I had studied more."],
          ["wish + would + forma base", "comportamenti altrui che irritano", "I wish you would stop talking."],
        ],
      },
      {
        type: "examples",
        items: [
          { en: "I wish I ==lived== by the sea.", it: "Vorrei vivere al mare. (ma non ci vivo)" },
          { en: "If only I ==were== taller!", it: "Magari fossi più alto!" },
          { en: "I wish I ==hadn't said== that.", it: "Vorrei non averlo detto. (ma l'ho detto)" },
          { en: "I wish it ==would stop== raining.", it: "Vorrei che smettesse di piovere." },
          { en: "I wish I ==could== speak Japanese.", it: "Vorrei saper parlare giapponese." },
        ],
      },
      {
        type: "rule",
        title: "wish + were",
        body: "Come nel second conditional, con *be* si preferisce **were** per tutte le persone: I wish I **were** on holiday. Nel parlato informale si usa anche *was*.",
      },
      {
        type: "warning",
        body: "✗ *I wish I would have more time.* → ✔ I wish I **had** more time. **wish + would** non si usa **con il soggetto I** (né con *we*) e non si usa per gli **stati**: serve per azioni o comportamenti che vorremmo cambiassero, di solito di altre persone.",
      },
      {
        type: "warning",
        body: "Per i desideri **realizzabili** nel futuro non si usa *wish* ma **hope**: ✗ *I wish you pass the exam* → ✔ I **hope** you pass the exam. (*wish* + oggetto si usa solo in formule: *I wish you a happy birthday*).",
      },
      {
        type: "compare",
        left: { label: "wish + past (presente)", items: ["I wish I knew the answer.", "= non la so adesso"] },
        right: { label: "wish + past perfect (passato)", items: ["I wish I had known the answer.", "= ieri non la sapevo"] },
      },
      {
        type: "tip",
        body: "**If only** ha la stessa grammatica di *wish* ma è più forte ed emotivo: *If only I had listened to you!* (Se solo ti avessi ascoltato!). Spesso si usa come esclamazione.",
      },
    ],
    exercises: [
      {
        type: "mcq",
        prompt: "My brother wishes he ___ how to fix his own computer.",
        options: ["know", "knew", "would know", "had know"],
        answer: 1,
        explain: "Desiderio sul **presente**: *wish + past simple*, quindi **knew**, anche con *he wishes*.",
      },
      {
        type: "fill",
        prompt: "I wish I ___ (not / eat) so much. I feel sick.",
        answers: ["hadn't eaten", "had not eaten"],
        hint: "(not / eat)",
        explain: "Rimpianto su un'azione **passata** (ho mangiato troppo): *wish + past perfect*, **hadn't eaten**.",
      },
      {
        type: "mcq",
        prompt: "If only the people upstairs ___ their music down! It's midnight.",
        options: ["would turn", "will turn", "are turning", "turn"],
        answer: 0,
        explain: "Lamentela per un comportamento irritante di altri che vorremmo cambiasse: *If only* + **would turn**.",
      },
      {
        type: "judge",
        sentence: "I wish I would be rich.",
        isCorrect: false,
        correction: "I wish I were rich.",
        explain: "*Wish + would* non si usa con *I* né con gli stati. Per un desiderio sul presente con *be*: **were**.",
      },
      {
        type: "fill",
        prompt: "If only I ___ (listen) to your advice last year!",
        answers: ["had listened", "'d listened"],
        hint: "(listen)",
        explain: "Rimpianto sul passato (*last year*): **had listened**.",
      },
      {
        type: "judge",
        sentence: "I wish I could come to your wedding, but I'll be abroad.",
        isCorrect: true,
        explain: "Corretta: *wish + could* esprime un desiderio impossibile legato a un'abilità o possibilità.",
      },
      {
        type: "order",
        words: ["She", "wishes", "she", "had", "studied", "medicine."],
        translation: "Vorrebbe aver studiato medicina.",
        explain: "Rimpianto passato: **wish + had + participio**; con *she* il verbo è *wishes*.",
      },
      {
        type: "match",
        prompt: "Abbina la frase alla situazione reale.",
        pairs: [
          ["I wish I had a bike.", "I don't have a bike."],
          ["I wish I had had a bike.", "I didn't have a bike."],
          ["I wish you would call me.", "You don't call me, and it annoys me."],
          ["I hope you call me.", "You might call me."],
        ],
        explain: "Past = realtà presente opposta; past perfect = realtà passata opposta; would = irritazione; *hope* = possibilità reale.",
      },
      {
        type: "mcq",
        prompt: "Good luck tomorrow! I ___ you get the job.",
        options: ["wish", "wished", "would wish", "hope"],
        answer: 3,
        explain: "Desiderio **realizzabile** nel futuro: si usa **hope**, non *wish*.",
      },
      {
        type: "fill",
        prompt: "It's freezing. I wish I ___ (bring) a warmer coat.",
        answers: ["had brought", "'d brought"],
        hint: "(bring)",
        explain: "Non ho portato il cappotto (azione passata): **had brought**.",
      },
      {
        type: "mcq",
        prompt: "Our flat is tiny and the kids share a room. I wish we ___ a bigger place.",
        options: ["have", "would have", "had", "had had"],
        answer: 2,
        explain: "Desiderio su una situazione **presente**: *wish + past simple*, **had**. *Would have* non si usa con *we* né con gli stati.",
      },
      {
        type: "mcq",
        prompt: "The taxi driver keeps texting while he drives. I wish he ___ that.",
        options: ["wouldn't do", "won't do", "doesn't do", "hadn't done"],
        answer: 0,
        explain: "Comportamento altrui che ci irrita e che vorremmo cambiasse: **wish + would**, qui negativo *wouldn't do*.",
      },
      {
        type: "mcq",
        prompt: "I've left my passport at home and now I can't board the plane. If only I ___ it!",
        options: ["didn't forget", "wouldn't forget", "don't forget", "hadn't forgotten"],
        answer: 3,
        explain: "Rimpianto su un'azione **passata** (l'ho dimenticato): *if only + past perfect*, **hadn't forgotten**.",
      },
      {
        type: "mcq",
        prompt: "Jonas is stuck in an office in Oslo. He wishes he ___ on a beach in Crete right now.",
        options: ["would be", "is", "has been", "were"],
        answer: 3,
        explain: "Desiderio sul presente con *be*: **were** per tutte le persone. *Would be* è sbagliato perché il soggetto è lo stesso di *wishes* e *be* è uno stato.",
      },
      {
        type: "fill",
        prompt: "My sister can't swim, and it's a problem on holiday. She wishes she ___ swim.",
        answers: ["could", "was able to", "were able to"],
        explain: "Desiderio legato a un'**abilità** nel presente: **wish + could** (o *was/were able to*).",
      },
      {
        type: "fill",
        prompt: "Please, Dad! I wish you ___ checking my messages.",
        answers: ["would stop", "'d stop"],
        hint: "(stop)",
        explain: "Lamentela per un comportamento di un'altra persona: **wish + would + forma base**, *would stop*.",
      },
      {
        type: "fill",
        prompt: "Kofi wishes he ___ his old guitar. It's worth a fortune now.",
        answers: ["hadn't sold", "had not sold"],
        hint: "(not / sell)",
        explain: "L'ha venduta in passato e se ne pente: *wish + past perfect*, **hadn't sold**.",
      },
      {
        type: "fill",
        prompt: "There's nowhere open at this hour. If only there ___ a pharmacy nearby!",
        answers: ["were", "was"],
        hint: "(be)",
        explain: "Desiderio sul **presente**: *if only + past*. Con *be* si preferisce **were**, ma nel parlato è comune anche *was*.",
      },
      {
        type: "order",
        words: ["Our", "neighbours", "wish", "we", "wouldn't", "park", "outside", "their", "gate."],
        translation: "I nostri vicini vorrebbero che non parcheggiassimo davanti al loro cancello.",
        explain: "**wish + would** per un comportamento di **altri** che dà fastidio: qui i vicini parlano di *noi*, quindi *wouldn't* è corretto.",
      },
      {
        type: "order",
        words: ["My", "parents", "wish", "I", "lived", "closer", "to", "them."],
        translation: "I miei genitori vorrebbero che abitassi più vicino a loro.",
        explain: "Situazione presente che si vorrebbe diversa: **wish + past simple** (*lived*), anche se il significato è presente.",
      },
      {
        type: "judge",
        sentence: "Good luck, Marta! I wish you pass your driving test tomorrow.",
        isCorrect: false,
        correction: "Good luck, Marta! I hope you pass your driving test tomorrow.",
        explain: "Per un desiderio **realizzabile** nel futuro si usa **hope**, non *wish*. Errore tipico dovuto all'italiano \"ti auguro di\".",
      },
      {
        type: "judge",
        sentence: "My flatmate wishes I would do the washing-up more often.",
        isCorrect: true,
        explain: "Corretta: *wish + would* per un comportamento di un'**altra persona** (io) che irrita il coinquilino.",
      },
      {
        type: "judge",
        sentence: "Lorenzo wishes he had gone to the concert with us last night.",
        isCorrect: true,
        explain: "Corretta: rimpianto su un fatto passato (*last night*), **wish + past perfect**.",
      },
      {
        type: "match",
        prompt: "Abbina la frase italiana alla traduzione inglese.",
        pairs: [
          ["Vorrei avere più pazienza.", "I wish I had more patience."],
          ["Vorrei aver avuto più pazienza.", "I wish I'd had more patience."],
          ["Vorrei che tu fossi più paziente.", "I wish you were more patient."],
          ["Vorrei che la smettessi di lamentarti.", "I wish you'd stop complaining."],
        ],
        explain: "Presente → *past simple*; passato → *past perfect* (*I'd had* = I had had); fastidio per un comportamento altrui → *would* (*you'd stop*).",
      },
      {
        type: "match",
        prompt: "Abbina ogni situazione al desiderio corrispondente.",
        pairs: [
          ["It's a pity I didn't take any photos.", "I wish I had taken some photos."],
          ["The dog next door never stops barking.", "I wish the dog would stop barking."],
          ["It's a shame I don't know her number.", "I wish I knew her number."],
          ["It's a pity I can't play the piano.", "I wish I could play the piano."],
        ],
        explain: "Fatto passato → *had + participio*; comportamento irritante → *would*; situazione presente → *past simple*; abilità mancante → *could*.",
      },
    ],
  },

  // 3) PASSIVO AVANZATO
  {
    id: "b2-advanced-passive",
    level: "B2",
    title: "Il passivo avanzato",
    subtitle: "Tutti i tempi, modali e It is said that / He is believed to",
    icon: "🏛️",
    minutes: 17,
    tags: ["passive", "passivo", "modal passive", "it is said", "is believed to", "impersonal passive", "being done"],
    theory: [
      {
        type: "text",
        body: "Il passivo si forma sempre con **be + participio passato**: basta coniugare *be* nel tempo giusto. A livello B2 bisogna padroneggiarlo in **tutti i tempi**, con i **modali** e nelle strutture **impersonali** tipiche del linguaggio giornalistico.",
      },
      {
        type: "table",
        title: "Il passivo in tutti i tempi",
        headers: ["Tempo", "Esempio passivo"],
        rows: [
          ["Present continuous", "The road is being repaired."],
          ["Past continuous", "The road was being repaired."],
          ["Present perfect", "The road has been repaired."],
          ["Past perfect", "The road had been repaired."],
          ["Future (will)", "The road will be repaired."],
          ["be going to", "The road is going to be repaired."],
        ],
      },
      {
        type: "formula",
        parts: ["Modale (can, must, should...)", "+ be / have been", "+ participio passato"],
      },
      {
        type: "examples",
        title: "Passivo con modali",
        items: [
          { en: "This form ==must be signed== by a parent.", it: "Questo modulo deve essere firmato da un genitore." },
          { en: "The tickets ==can be bought== online.", it: "I biglietti si possono comprare online." },
          { en: "The problem ==should have been fixed== last week.", it: "Il problema avrebbe dovuto essere risolto la settimana scorsa." },
        ],
      },
      {
        type: "rule",
        title: "Passivo impersonale: It is said that...",
        body: "Con verbi come **say, believe, think, know, report, expect, consider** si può dire: **It + is/was + participio + that + frase**. It **is said that** he is a millionaire. (Si dice che sia milionario).",
      },
      {
        type: "rule",
        title: "Passivo personale: He is believed to...",
        body: "In alternativa, il soggetto della frase dipendente diventa soggetto: **Soggetto + is/was + participio + to + infinito**. Se l'azione è **contemporanea**: He **is said to be** a millionaire. Se è **precedente**: He **is said to have made** his fortune in oil. (to + have + participio).",
      },
      {
        type: "examples",
        title: "Due costruzioni, stesso significato",
        items: [
          { en: "==It is believed that== the thief ==is== still in the city.", it: "Si crede che il ladro sia ancora in città." },
          { en: "The thief ==is believed to be== still in the city.", it: "Si crede che il ladro sia ancora in città." },
          { en: "The painting ==is thought to have been stolen== in 1990.", it: "Si pensa che il quadro sia stato rubato nel 1990." },
        ],
      },
      {
        type: "warning",
        body: "Non dimenticare **being** nei tempi continuous: ✗ *The house is painted at the moment* → ✔ The house **is being** painted at the moment. E non dimenticare **been** nei tempi perfect: ✗ *It has repaired* → ✔ It **has been** repaired.",
      },
      {
        type: "tip",
        body: "L'italiano usa molto il **si** passivante e il **congiuntivo** (\"si dice che **sia**\"). In inglese dopo *It is said that* si usa l'**indicativo**: It is said that he **is** rich.",
      },
    ],
    exercises: [
      {
        type: "mcq",
        prompt: "Sorry about the mess, the kitchen ___ at the moment.",
        options: ["is painted", "has painted", "is being painted", "is painting"],
        answer: 2,
        explain: "Azione in corso ora, al passivo: present continuous passivo **is being painted**.",
      },
      {
        type: "fill",
        prompt: "The results ___ (already / publish).",
        answers: ["have already been published", "'ve already been published"],
        hint: "(already / publish)",
        explain: "Present perfect passivo con soggetto plurale: **have already been published**.",
      },
      {
        type: "mcq",
        prompt: "All mobile phones must ___ off during the exam.",
        options: ["switch", "be switched", "been switched", "to be switched"],
        answer: 1,
        explain: "Passivo con modale: **must + be + participio**.",
      },
      {
        type: "fill",
        prompt: "The actor is said ___ (be) very difficult to work with.",
        answers: ["to be"],
        hint: "(be)",
        explain: "Costruzione personale con azione contemporanea: **is said + to + infinito**.",
      },
      {
        type: "judge",
        sentence: "The new bridge will be opened by the mayor next month.",
        isCorrect: true,
        explain: "Corretta: futuro passivo **will be + participio**; l'agente (*the mayor*) è un'informazione utile.",
      },
      {
        type: "judge",
        sentence: "The suspect is believed to leave the country last week.",
        isCorrect: false,
        correction: "The suspect is believed to have left the country last week.",
        explain: "L'azione (lasciare il paese) è **precedente** al momento in cui si crede: serve **to have + participio**.",
      },
      {
        type: "order",
        words: ["It", "is", "said", "that", "the", "castle", "is", "haunted."],
        translation: "Si dice che il castello sia infestato.",
        explain: "Passivo impersonale: **It is said that** + frase all'indicativo.",
      },
      {
        type: "match",
        prompt: "Abbina la frase attiva alla sua forma passiva.",
        pairs: [
          ["They are building a hotel.", "A hotel is being built."],
          ["They have built a hotel.", "A hotel has been built."],
          ["They had built a hotel.", "A hotel had been built."],
          ["They should build a hotel.", "A hotel should be built."],
        ],
        explain: "*be* prende il tempo del verbo attivo: *are building → is being built*, *have built → has been built*, ecc.",
      },
      {
        type: "fill",
        prompt: "The report should ___ finished yesterday, but nobody did it.",
        answers: ["have been"],
        explain: "Obbligo passato non rispettato, al passivo: **should have been** + participio.",
      },
      {
        type: "mcq",
        prompt: "Which sentence means \"People think the Vikings reached America first\"?",
        options: ["The Vikings are thought to reach America first.", "It is thought the Vikings to have reached America first.", "The Vikings thought to have reached America first.", "The Vikings are thought to have reached America first."],
        answer: 3,
        explain: "Azione passata rispetto al presente *think*: **are thought to have reached**.",
      },
      {
        type: "mcq",
        prompt: "When we arrived at the venue, the chairs ___, so we helped the staff.",
        options: ["were still setting up", "were still being set up", "had still set up", "still set up"],
        answer: 1,
        explain: "Azione in corso nel passato, al passivo (le sedie non si montano da sole): past continuous passivo **were being set up**.",
      },
      {
        type: "mcq",
        prompt: "The missing climber ___ to have fallen: his rucksack was found at the foot of a cliff.",
        options: ["thinks", "is thinking", "has thought", "is thought"],
        answer: 3,
        explain: "Passivo personale: **is thought + to have + participio** (si pensa che sia caduto). Le forme attive non hanno senso: non è lo scalatore a pensare.",
      },
      {
        type: "mcq",
        prompt: "This wound is infected. It ___ by a doctor as soon as the accident happened.",
        options: ["should have been seen", "should be seen", "should have seen", "should been seen"],
        answer: 0,
        explain: "Cosa che era opportuna nel **passato** e non è stata fatta, al passivo: **should have been + participio**.",
      },
      {
        type: "mcq",
        prompt: "It's official: the old cinema ___ next spring.",
        options: ["is going to demolish", "going to be demolished", "is going to be demolished", "is going to been demolished"],
        answer: 2,
        explain: "Passivo con *be going to*: **is going to be + participio**. Il cinema non demolisce, viene demolito.",
      },
      {
        type: "fill",
        prompt: "By the time the firefighters arrived, most of the building ___.",
        answers: ["had been destroyed"],
        hint: "(destroy)",
        explain: "Azione conclusa **prima** di un altro momento passato, al passivo: past perfect passivo **had been destroyed**.",
      },
      {
        type: "fill",
        prompt: "Right now the patient ___ on by a team of three surgeons.",
        answers: ["is being operated"],
        hint: "(operate)",
        explain: "Azione in corso adesso, al passivo: **is being + participio**. Il verbo è *operate on*, quindi la preposizione resta dopo il participio.",
      },
      {
        type: "fill",
        prompt: "Breaking news: it ___ that the minister has just resigned.",
        answers: ["is reported", "has been reported", "is being reported", "was reported"],
        hint: "(report)",
        explain: "Passivo impersonale tipico del linguaggio giornalistico: **It is reported that** + frase all'indicativo.",
      },
      {
        type: "fill",
        prompt: "The ship is believed ___ during a storm in 1872.",
        answers: ["to have sunk", "to have been sunk"],
        hint: "(sink)",
        explain: "Il naufragio è **precedente** al momento in cui lo si crede: **to have + participio** (*sunk*).",
      },
      {
        type: "order",
        words: ["The", "documents", "must", "be", "returned", "within", "ten", "days."],
        translation: "I documenti devono essere restituiti entro dieci giorni.",
        explain: "Passivo con modale: **must + be + participio**.",
      },
      {
        type: "order",
        words: ["The", "composer", "is", "known", "to", "have", "lived", "in", "Vienna."],
        translation: "Si sa che il compositore visse a Vienna.",
        explain: "Passivo personale con azione precedente: **is known + to have + participio**.",
      },
      {
        type: "judge",
        sentence: "Your order has dispatched and should arrive tomorrow.",
        isCorrect: false,
        correction: "Your order has been dispatched and should arrive tomorrow.",
        explain: "L'ordine non spedisce, viene spedito: present perfect passivo con **has been + participio**. Non dimenticare *been*.",
      },
      {
        type: "judge",
        sentence: "The new hospital is expected opening in June.",
        isCorrect: false,
        correction: "The new hospital is expected to open in June.",
        explain: "Nel passivo personale dopo *is expected* serve **to + infinito**, non la forma in *-ing*.",
      },
      {
        type: "judge",
        sentence: "Candidates will be contacted by email if they have been shortlisted.",
        isCorrect: true,
        explain: "Corretta: futuro passivo **will be contacted** e present perfect passivo **have been shortlisted**.",
      },
      {
        type: "match",
        prompt: "Abbina la frase impersonale alla versione personale equivalente.",
        pairs: [
          ["It is said that the chef is a genius.", "The chef is said to be a genius."],
          ["It is said that the chef trained in Paris.", "The chef is said to have trained in Paris."],
          ["It is said that the chef is opening a new restaurant.", "The chef is said to be opening a new restaurant."],
          ["It was said that the chef was a genius.", "The chef was said to be a genius."],
        ],
        explain: "Azione contemporanea → *to be*; azione precedente → *to have + participio*; azione in corso → *to be + -ing*. Il tempo di *say* passa al verbo *be* (*is said / was said*).",
      },
      {
        type: "match",
        prompt: "Abbina ogni frase passiva al tempo verbale.",
        pairs: [
          ["The contract was being drafted.", "past continuous"],
          ["The contract will have been signed.", "future perfect"],
          ["The contract had been cancelled.", "past perfect"],
          ["The contract is going to be renewed.", "be going to"],
          ["The contract can be changed.", "modale"],
        ],
        explain: "Nel passivo è *be* a portare il tempo: *was being*, *will have been*, *had been*, *is going to be*, *can be* + participio.",
      },
    ],
  },

  // 4) CAUSATIVO
  {
    id: "b2-causative",
    level: "B2",
    title: "Il causativo: have/get something done",
    subtitle: "Farsi tagliare i capelli, farsi riparare l'auto",
    icon: "✂️",
    minutes: 13,
    tags: ["causative", "causativo", "have something done", "get something done", "farsi fare", "far fare"],
    theory: [
      {
        type: "text",
        body: "Quando **qualcun altro** fa qualcosa per noi (di solito un servizio a pagamento), in italiano diciamo \"**farsi** tagliare i capelli\", \"**far** riparare l'auto\". In inglese si usa il **causativo**.",
      },
      {
        type: "formula",
        parts: ["Soggetto", "+ have / get (nel tempo giusto)", "+ oggetto", "+ participio passato"],
      },
      {
        type: "examples",
        items: [
          { en: "I ==had my hair cut== yesterday.", it: "Mi sono fatto tagliare i capelli ieri." },
          { en: "We're ==having our kitchen redecorated==.", it: "Stiamo facendo rifare la cucina." },
          { en: "You should ==get your eyes tested==.", it: "Dovresti farti controllare la vista." },
          { en: "She ==has her nails done== every week.", it: "Si fa fare le unghie ogni settimana." },
        ],
      },
      {
        type: "compare",
        left: { label: "Lo faccio io", items: ["I cut my hair.", "= mi taglio i capelli da solo"] },
        right: { label: "Lo fa qualcun altro", items: ["I had my hair cut.", "= me li ha tagliati il parrucchiere"] },
      },
      {
        type: "rule",
        title: "have o get?",
        body: "Il significato è lo stesso. **get** è più **informale** e frequente nel parlato: I need to **get** my car **serviced**. **have** è leggermente più neutro/formale. *have* e *get* si coniugano normalmente in tutti i tempi: *I'm having..., I've had..., I'll get...*",
      },
      {
        type: "rule",
        title: "Esperienze spiacevoli",
        body: "La stessa struttura si usa anche per cose **negative** che ci sono **capitate** (non volute): She **had her bag stolen** on the train. (Le hanno rubato la borsa sul treno).",
      },
      {
        type: "warning",
        body: "Ordine sbagliato tipico: ✗ *I had cut my hair* (significa \"mi ero tagliato i capelli\", past perfect!). Il causativo vuole **oggetto prima del participio**: ✔ I had **my hair cut**.",
      },
      {
        type: "warning",
        body: "Non tradurre \"fare\" con **make**: ✗ *I made my car repair* → ✔ I **had** my car **repaired**. E il verbo va al **participio**, non all'infinito.",
      },
      {
        type: "tip",
        body: "Esiste anche **have + persona + forma base** e **get + persona + to + verbo**, per dire *chi* fa il lavoro: I'll **have** the mechanic **check** it. / I'll **get** the mechanic **to check** it.",
      },
    ],
    exercises: [
      {
        type: "mcq",
        prompt: "I know nothing about engines, so when my car broke down I ___ at the garage.",
        options: ["had it repaired", "repaired it", "had repaired it", "made it repair"],
        answer: 0,
        explain: "Qualcun altro (il meccanico) l'ha riparata: causativo **had it repaired** (oggetto + participio).",
      },
      {
        type: "fill",
        prompt: "I'm going to ___ my photo taken for my new passport.",
        answers: ["have", "get"],
        explain: "Causativo: **have** o **get** + oggetto + participio (*taken*).",
      },
      {
        type: "fill",
        prompt: "We had our windows ___ (clean) last week.",
        answers: ["cleaned"],
        hint: "(clean)",
        explain: "Dopo l'oggetto serve il **participio passato**: *cleaned*.",
      },
      {
        type: "judge",
        sentence: "I had cut my hair at the new salon.",
        isCorrect: false,
        correction: "I had my hair cut at the new salon.",
        explain: "Nel causativo l'oggetto va **prima** del participio: *had my hair cut*. *I had cut my hair* è un past perfect.",
      },
      {
        type: "mcq",
        prompt: "Poor Tom! He ___ on the underground yesterday.",
        options: ["had stolen his wallet", "had his wallet stolen", "stole his wallet", "got stolen his wallet"],
        answer: 1,
        explain: "Esperienza spiacevole subita: **had his wallet stolen**.",
      },
      {
        type: "order",
        words: ["She", "is", "having", "her", "house", "painted", "this", "week."],
        translation: "Questa settimana si sta facendo imbiancare la casa.",
        explain: "Causativo al present continuous: **is having + oggetto + participio**.",
      },
      {
        type: "judge",
        sentence: "You should get your teeth checked twice a year.",
        isCorrect: true,
        explain: "Corretta: causativo con **get** + oggetto + participio, dopo il modale *should*.",
      },
      {
        type: "match",
        prompt: "Abbina ogni frase al suo significato.",
        pairs: [
          ["I washed my car.", "L'ho lavata io."],
          ["I had my car washed.", "Me l'hanno lavata."],
          ["I had washed my car.", "L'avevo lavata io."],
        ],
        explain: "Solo *had + oggetto + participio* è causativo; *had + participio + oggetto* è un past perfect.",
      },
      {
        type: "fill",
        prompt: "Have you ever ___ your fortune told?",
        answers: ["had"],
        explain: "Present perfect del causativo: *have* + **had** + oggetto + participio (*told*).",
      },
      {
        type: "mcq",
        prompt: "I'll ___ my assistant send you the documents.",
        options: ["get", "make to", "have", "let to"],
        answer: 2,
        explain: "**have + persona + forma base** (*send*). *get* vorrebbe *to send*.",
      },
      {
        type: "mcq",
        prompt: "We ___ a new boiler installed next Tuesday, so there'll be no hot water.",
        options: ["have had", "are making", "are having", "had"],
        answer: 2,
        explain: "Causativo per un appuntamento futuro già fissato: present continuous **are having** + oggetto + participio.",
      },
      {
        type: "mcq",
        prompt: "The landlord finally got the plumber ___ the leak in the bathroom.",
        options: ["to fix", "fix", "fixed", "fixing"],
        answer: 0,
        explain: "Quando si nomina chi fa il lavoro: **get + persona + to + verbo**. Con *have* sarebbe *had the plumber fix*.",
      },
      {
        type: "mcq",
        prompt: "The band ___ on their way to the festival last night.",
        options: ["broke their van into", "had broken into their van", "got broken their van into", "had their van broken into"],
        answer: 3,
        explain: "Esperienza spiacevole subita: **had + oggetto + participio**, *had their van broken into* (gli hanno scassinato il furgone).",
      },
      {
        type: "mcq",
        prompt: "How often do you ___ your car serviced?",
        options: ["make", "get", "do", "let"],
        answer: 1,
        explain: "Causativo informale: **get + oggetto + participio**. *Make* non si usa con il participio in questo senso.",
      },
      {
        type: "fill",
        prompt: "My laptop screen is cracked, so I'm getting it ___ tomorrow.",
        answers: ["replaced"],
        hint: "(replace)",
        explain: "Dopo *get + oggetto* serve il **participio passato**: *replaced*.",
      },
      {
        type: "fill",
        prompt: "By the time the guests arrive, we ___ the whole flat cleaned.",
        answers: ["will have had", "'ll have had"],
        hint: "(have)",
        explain: "Causativo al future perfect: **will have had** + oggetto + participio (avremo fatto pulire).",
      },
      {
        type: "fill",
        prompt: "The manager had her assistant ___ a table for twelve.",
        answers: ["book"],
        hint: "(book)",
        explain: "**have + persona + forma base**: *had her assistant book* (ha fatto prenotare alla sua assistente).",
      },
      {
        type: "fill",
        prompt: "Chiara got her passport ___ while she was sightseeing in Barcelona.",
        answers: ["stolen"],
        hint: "(steal)",
        explain: "Esperienza spiacevole: *get + oggetto + participio*, **stolen** (participio irregolare di *steal*).",
      },
      {
        type: "order",
        words: ["They're", "having", "their", "roof", "repaired", "after", "the", "storm."],
        translation: "Si stanno facendo riparare il tetto dopo la tempesta.",
        explain: "Causativo al present continuous: **are having + oggetto + participio**.",
      },
      {
        type: "order",
        words: ["Where", "do", "you", "get", "your", "hair", "cut?"],
        translation: "Dove ti fai tagliare i capelli?",
        explain: "Domanda al present simple con il causativo: **do you get + oggetto + participio**.",
      },
      {
        type: "judge",
        sentence: "I made my bike repair at the shop near the station.",
        isCorrect: false,
        correction: "I had my bike repaired at the shop near the station.",
        explain: "\"Far riparare\" non si traduce con *make + infinito*: serve **have/get + oggetto + participio**.",
      },
      {
        type: "judge",
        sentence: "We've just had the whole house rewired.",
        isCorrect: true,
        explain: "Corretta: causativo al present perfect, **have had + oggetto + participio** (abbiamo appena fatto rifare l'impianto elettrico).",
      },
      {
        type: "judge",
        sentence: "The coach got the players to watch a video of their mistakes.",
        isCorrect: true,
        explain: "Corretta: **get + persona + to + verbo** (l'allenatore ha fatto guardare ai giocatori un video).",
      },
      {
        type: "match",
        prompt: "Abbina la frase inglese alla traduzione.",
        pairs: [
          ["I'm having my suit altered.", "Mi sto facendo aggiustare il vestito."],
          ["I've had my suit altered.", "Mi sono fatto aggiustare il vestito."],
          ["I'll have my suit altered.", "Mi farò aggiustare il vestito."],
          ["I altered my suit myself.", "Ho aggiustato il vestito da solo."],
        ],
        explain: "Nel causativo è *have* a cambiare tempo (*am having, have had, will have*); se lo fai tu, niente causativo.",
      },
      {
        type: "match",
        prompt: "Abbina ogni situazione alla frase che la descrive.",
        pairs: [
          ["Someone took Rob's phone on the bus.", "Rob had his phone stolen."],
          ["A mechanic checked Rob's brakes for him.", "Rob had his brakes checked."],
          ["Rob asked a friend to paint his fence, and she did.", "Rob got a friend to paint his fence."],
          ["Rob painted the fence on his own.", "Rob painted his fence."],
        ],
        explain: "Esperienza spiacevole o servizio → *have + oggetto + participio*; persona nominata → *get + persona + to*; lo fa lui → verbo normale.",
      },
    ],
  },

  // 5) REPORTING VERBS
  {
    id: "b2-reporting-verbs",
    level: "B2",
    title: "Reporting verbs",
    subtitle: "suggest, advise, deny, admit, warn, offer: i verbi e i loro schemi",
    icon: "📰",
    minutes: 17,
    tags: ["reporting verbs", "reported speech", "suggest", "advise", "deny", "admit", "warn", "discorso indiretto"],
    theory: [
      {
        type: "text",
        body: "Invece di usare sempre *say* e *tell*, un inglese di livello B2 usa **reporting verbs** più precisi, che riassumono l'**intenzione** di chi parla (consigliare, negare, promettere...). Ogni verbo ha il suo **schema grammaticale**: è quello da imparare.",
      },
      {
        type: "table",
        title: "Gli schemi principali",
        headers: ["Schema", "Verbi", "Esempio"],
        rows: [
          ["verbo + to + infinito", "offer, agree, refuse, promise, threaten", "He offered to carry my bag."],
          ["verbo + persona + to + infinito", "advise, warn, tell, ask, remind, persuade, encourage", "She advised me to rest."],
          ["verbo + -ing", "deny, admit, suggest, recommend", "He denied taking the money."],
          ["verbo + preposizione + -ing", "apologise for, insist on, accuse sb of, blame sb for", "She apologised for being late."],
          ["verbo + that + frase", "explain, admit, deny, suggest, complain", "He explained that the train was late."],
        ],
      },
      {
        type: "examples",
        items: [
          { en: "\"I'll help you.\" → She ==offered to help== me.", it: "Si è offerta di aiutarmi." },
          { en: "\"Don't touch it!\" → He ==warned me not to touch== it.", it: "Mi ha avvertito di non toccarlo." },
          { en: "\"I didn't break it.\" → She ==denied breaking== it.", it: "Ha negato di averlo rotto." },
          { en: "\"Let's go to the cinema.\" → He ==suggested going== to the cinema.", it: "Ha proposto di andare al cinema." },
          { en: "\"You stole my phone!\" → She ==accused him of stealing== her phone.", it: "Lo ha accusato di averle rubato il telefono." },
        ],
      },
      {
        type: "warning",
        body: "**suggest** è la trappola numero uno per gli italiani. ✗ *He suggested me to go.* ✔ He suggested **going**. / ✔ He suggested **that I (should) go**. Mai *suggest + persona + to*.",
      },
      {
        type: "warning",
        body: "**explain** non regge direttamente la persona: ✗ *He explained me the rule* → ✔ He explained the rule **to me** / He explained **that**...",
      },
      {
        type: "rule",
        title: "Negazione",
        body: "Il **not** va subito prima di *to* o della forma *-ing*: She warned us **not to** swim there. / He admitted **not having** read the contract.",
      },
      {
        type: "tip",
        body: "*deny* e *admit* possono essere seguiti da **-ing** o **having + participio** (per sottolineare che l'azione è precedente): He denied **having taken** the money. Entrambe le forme sono corrette.",
      },
      {
        type: "compare",
        left: { label: "Persona + to", items: ["advise sb to", "warn sb (not) to", "remind sb to", "persuade sb to"] },
        right: { label: "Solo to (senza persona)", items: ["offer to", "agree to", "refuse to", "promise to"] },
      },
    ],
    exercises: [
      {
        type: "mcq",
        prompt: "\"I didn't eat your chocolate!\" → My brother ___ my chocolate.",
        options: ["denied eating", "denied to eat", "refused eating", "denied me eating"],
        answer: 0,
        explain: "**deny + -ing**: *denied eating*.",
      },
      {
        type: "fill",
        prompt: "\"You should see a doctor.\" → She advised me ___ (see) a doctor.",
        answers: ["to see"],
        hint: "(see)",
        explain: "**advise + persona + to + infinito**: *advised me to see*.",
      },
      {
        type: "mcq",
        prompt: "\"Why don't we take a break?\" → Anna ___ a break.",
        options: ["suggested us to take", "suggested to take", "suggested taking", "suggested us taking"],
        answer: 2,
        explain: "**suggest + -ing** (oppure *suggested that we take*). Mai *suggest + persona + to*.",
      },
      {
        type: "fill",
        prompt: "\"I'll carry your suitcase.\" → He offered ___ (carry) my suitcase.",
        answers: ["to carry"],
        hint: "(carry)",
        explain: "**offer + to + infinito**, senza persona: *offered to carry*.",
      },
      {
        type: "judge",
        sentence: "The guide warned us not to leave the path.",
        isCorrect: true,
        explain: "Corretta: **warn + persona + not to + infinito**.",
      },
      {
        type: "judge",
        sentence: "She apologised to be late for the meeting.",
        isCorrect: false,
        correction: "She apologised for being late for the meeting.",
        explain: "**apologise for + -ing**: dopo la preposizione serve la forma in -ing.",
      },
      {
        type: "order",
        words: ["He", "admitted", "breaking", "the", "window."],
        translation: "Ha ammesso di aver rotto la finestra.",
        explain: "**admit + -ing**: *admitted breaking*.",
      },
      {
        type: "match",
        prompt: "Abbina ogni verbo al suo schema.",
        pairs: [
          ["refuse", "+ to do"],
          ["remind", "+ somebody + to do"],
          ["recommend", "+ doing"],
          ["insist", "+ on doing"],
          ["accuse", "+ somebody + of doing"],
        ],
        explain: "Ogni reporting verb ha uno schema fisso: *refuse to*, *remind sb to*, *recommend -ing*, *insist on -ing*, *accuse sb of -ing*.",
      },
      {
        type: "fill",
        prompt: "\"Don't forget to lock the door.\" → Mum reminded me ___ lock the door.",
        answers: ["to"],
        explain: "**remind + persona + to + infinito**.",
      },
      {
        type: "mcq",
        prompt: "\"It was you who lost the keys!\" → She ___ the keys.",
        options: ["blamed him to lose", "accused him for losing", "blamed him of losing", "accused him of losing"],
        answer: 3,
        explain: "**accuse sb of + -ing**. (*blame* vorrebbe *blame sb for losing*).",
      },
      {
        type: "mcq",
        prompt: "\"I'll call the police if you don't turn that music down!\" → Our neighbour ___ the police.",
        options: ["threatened calling", "threatened to call", "threatened us to call", "warned calling"],
        answer: 1,
        explain: "**threaten + to + infinito**, senza persona: *threatened to call*.",
      },
      {
        type: "mcq",
        prompt: "\"You really should try the tasting menu.\" → The waiter ___ the tasting menu.",
        options: ["recommended to try", "recommended us try", "recommended trying", "recommended us of trying"],
        answer: 2,
        explain: "**recommend + -ing** (oppure *recommended that we try*): *recommended trying*.",
      },
      {
        type: "mcq",
        prompt: "\"It's your fault we missed the train!\" → Helen ___ missing the train.",
        options: ["blamed me for", "accused me for", "blamed me of", "blamed on me"],
        answer: 0,
        explain: "**blame sb for + -ing**. Con *accuse* la preposizione sarebbe *of*.",
      },
      {
        type: "mcq",
        prompt: "\"Remember to bring your ID tomorrow.\" → The receptionist ___ bring my ID.",
        options: ["remembered me to", "reminded to", "remembered to me", "reminded me to"],
        answer: 3,
        explain: "\"Ricordare a qualcuno di fare\" è **remind sb to**. *Remember* significa ricordarsi, non ricordare a un altro.",
      },
      {
        type: "fill",
        prompt: "\"I won't sign this contract.\" → The actor refused ___ the contract.",
        answers: ["to sign"],
        hint: "(sign)",
        explain: "**refuse + to + infinito**: *refused to sign*.",
      },
      {
        type: "fill",
        prompt: "\"Yes, I lied about my age.\" → Martina admitted ___ about her age.",
        answers: ["lying", "having lied"],
        hint: "(lie)",
        explain: "**admit + -ing** oppure **having + participio** per sottolineare che l'azione è precedente.",
      },
      {
        type: "fill",
        prompt: "\"No, dinner's on me!\" → My aunt insisted on ___ for everyone.",
        answers: ["paying"],
        hint: "(pay)",
        explain: "**insist on + -ing**: dopo la preposizione serve la forma in *-ing*.",
      },
      {
        type: "fill",
        prompt: "\"Don't mention the party to Ben.\" → Kate warned me ___ the party to Ben.",
        answers: ["not to mention"],
        hint: "(not / mention)",
        explain: "**warn sb not to + infinito**: il *not* va subito prima di *to*.",
      },
      {
        type: "order",
        words: ["She", "persuaded", "me", "to", "apply", "for", "the", "job."],
        translation: "Mi ha convinto a candidarmi per il lavoro.",
        explain: "**persuade + persona + to + infinito**.",
      },
      {
        type: "order",
        words: ["They", "suggested", "that", "we", "should", "book", "early."],
        translation: "Hanno suggerito di prenotare presto.",
        explain: "**suggest + that + soggetto + (should) + forma base**. Mai *suggest us to book*.",
      },
      {
        type: "judge",
        sentence: "My teacher suggested me to read more English novels.",
        isCorrect: false,
        correction: "My teacher suggested that I read more English novels.",
        explain: "*suggest* non regge **persona + to**: si dice *suggested that I (should) read* oppure *suggested reading*.",
      },
      {
        type: "judge",
        sentence: "The shop assistant explained me how the warranty works.",
        isCorrect: false,
        correction: "The shop assistant explained to me how the warranty works.",
        explain: "*explain* non regge direttamente la persona: serve **explain to me**.",
      },
      {
        type: "judge",
        sentence: "The mayor denied having received any money from the company.",
        isCorrect: true,
        explain: "Corretta: **deny + having + participio**, per un'azione precedente al momento in cui la si nega.",
      },
      {
        type: "match",
        prompt: "Abbina la frase diretta alla versione con il reporting verb.",
        pairs: [
          ["\"Sorry I forgot your birthday.\"", "She apologised for forgetting my birthday."],
          ["\"OK, I'll lend you the money.\"", "She agreed to lend me the money."],
          ["\"I'll be on time, I swear.\"", "She promised to be on time."],
          ["\"If I were you, I'd take a taxi.\"", "She advised me to take a taxi."],
        ],
        explain: "Scuse → *apologise for -ing*; accettazione → *agree to*; impegno → *promise to*; consiglio → *advise sb to*.",
      },
      {
        type: "match",
        prompt: "Abbina ogni frase alla traduzione: attenzione a dove sta la negazione.",
        pairs: [
          ["He admitted not reading the report.", "Ha ammesso di non aver letto la relazione."],
          ["He didn't admit reading the report.", "Non ha ammesso di aver letto la relazione."],
          ["He promised not to read the report.", "Ha promesso di non leggere la relazione."],
          ["He didn't promise to read the report.", "Non ha promesso di leggere la relazione."],
        ],
        explain: "Se *not* sta prima di *-ing* o di *to*, nega l'azione riferita; se nega il reporting verb (*didn't admit*), nega l'atto di dire.",
      },
    ],
  },

  // 6) FUTURE CONTINUOUS E FUTURE PERFECT
  {
    id: "b2-future-continuous-perfect",
    level: "B2",
    title: "Future continuous e future perfect",
    subtitle: "This time tomorrow I'll be flying; by Friday I'll have finished",
    icon: "🔮",
    minutes: 16,
    tags: ["future continuous", "future perfect", "future perfect continuous", "will be doing", "will have done", "by", "futuro anteriore"],
    theory: [
      {
        type: "text",
        body: "Oltre a *will* e *going to*, l'inglese ha tre tempi futuri che guardano a un **momento preciso nel futuro**: cosa sarà **in corso** in quel momento, cosa sarà **già concluso**, e **da quanto tempo** qualcosa starà durando.",
      },
      {
        type: "rule",
        title: "Future continuous: will be + -ing",
        body: "Azione **in corso** in un momento futuro: This time tomorrow I**'ll be lying** on a beach. Si usa anche per azioni **già programmate** o che succederanno comunque: I**'ll be seeing** Jo later, I can give it to her.",
      },
      {
        type: "rule",
        title: "Future perfect: will have + participio",
        body: "Azione che sarà **conclusa prima** di un momento futuro. Quasi sempre con **by** (entro): By 2030 they**'ll have built** the new stadium. Corrisponde al nostro **futuro anteriore** (*avranno costruito*).",
      },
      {
        type: "rule",
        title: "Future perfect continuous: will have been + -ing",
        body: "**Durata** di un'azione fino a un momento futuro: In June I**'ll have been working** here for ten years. (A giugno saranno dieci anni che lavoro qui).",
      },
      {
        type: "examples",
        items: [
          { en: "Don't call at 8. We =='ll be having== dinner.", it: "Non chiamare alle 8. Staremo cenando." },
          { en: "By the time you arrive, I =='ll have cooked== everything.", it: "Quando arriverai, avrò già cucinato tutto." },
          { en: "==Will== you ==have finished== the report by Monday?", it: "Avrai finito la relazione entro lunedì?" },
          { en: "Next month she =='ll have been living== in London for a year.", it: "Il mese prossimo sarà un anno che vive a Londra." },
        ],
      },
      {
        type: "table",
        title: "Riepilogo",
        headers: ["Tempo", "Forma", "Idea"],
        rows: [
          ["Future continuous", "will be + -ing", "in corso in quel momento"],
          ["Future perfect", "will have + participio", "concluso entro quel momento"],
          ["Future perfect continuous", "will have been + -ing", "durata fino a quel momento"],
        ],
      },
      {
        type: "warning",
        body: "Dopo **by the time, when, before, until** si usa il **present**, non *will*: ✗ *By the time you will arrive, I'll have left* → ✔ By the time you **arrive**, I'll have left.",
      },
      {
        type: "warning",
        body: "**by** = entro (non oltre), **until** = fino a (durata continua): I'll have finished **by** 5 ✔ / I'll be working **until** 5 ✔. ✗ *I'll have finished until 5.*",
      },
      {
        type: "tip",
        body: "Il future continuous è molto usato per chiedere **in modo educato** dei piani altrui: *Will you be using the car tonight?* suona più cortese di *Will you use...?*",
      },
    ],
    exercises: [
      {
        type: "mcq",
        prompt: "Don't phone me at 9 tonight. I ___ the match.",
        options: ["will watch", "will be watching", "will have watched", "watch"],
        answer: 1,
        explain: "Azione **in corso** in un momento futuro preciso (alle 9): **will be watching**.",
      },
      {
        type: "fill",
        prompt: "By the end of this year, I ___ (save) enough money for a car.",
        answers: ["will have saved", "'ll have saved"],
        hint: "(save)",
        explain: "Azione conclusa **entro** un momento futuro (*by the end of this year*): **will have saved**.",
      },
      {
        type: "mcq",
        prompt: "By the time we get to the station, the train ___ .",
        options: ["will have left", "will be leaving", "will leave", "leaves"],
        answer: 0,
        explain: "Il treno sarà **già partito** prima del nostro arrivo: **will have left**.",
      },
      {
        type: "fill",
        prompt: "In September, we ___ (live) here for exactly five years.",
        answers: ["will have been living", "'ll have been living", "will have lived", "'ll have lived"],
        hint: "(live)",
        explain: "Durata fino a un momento futuro: **will have been living** (con *live* va bene anche *will have lived*).",
      },
      {
        type: "judge",
        sentence: "I'll call you when I will have finished my homework.",
        isCorrect: false,
        correction: "I'll call you when I have finished my homework.",
        explain: "Dopo **when** con valore futuro non si usa *will*: si usa il present perfect (*have finished*) o il present simple.",
      },
      {
        type: "judge",
        sentence: "This time next week, I'll be skiing in the Alps.",
        isCorrect: true,
        explain: "Corretta: *this time next week* indica un momento futuro in cui l'azione sarà in corso: future continuous.",
      },
      {
        type: "order",
        words: ["Will", "you", "be", "using", "the", "car", "tonight?"],
        translation: "Userai la macchina stasera?",
        explain: "Domanda educata al future continuous: **Will + soggetto + be + -ing**.",
      },
      {
        type: "match",
        prompt: "Abbina ogni frase all'idea che esprime.",
        pairs: [
          ["At 10 I'll be sleeping.", "in corso alle 10"],
          ["By 10 I'll have slept eight hours.", "concluso entro le 10"],
          ["At 10 I'll have been sleeping for eight hours.", "durata fino alle 10"],
        ],
        explain: "Future continuous = in corso; future perfect = concluso; future perfect continuous = durata.",
      },
      {
        type: "fill",
        prompt: "The builders say the new bridge will have been completed ___ next spring.",
        answers: ["by"],
        explain: "Con il future perfect si usa **by** (entro), non *until*.",
      },
      {
        type: "mcq",
        prompt: "Which sentence is correct?",
        options: ["By June I'll have finish my exams.", "Until June I'll have finished my exams.", "By June I'll finishing my exams.", "By June I'll have finished my exams."],
        answer: 3,
        explain: "Future perfect corretto: **will have + participio** con **by**. *Until* esprime durata e non va con un'azione conclusa.",
      },
      {
        type: "mcq",
        prompt: "Don't try calling between 12 and 1: the team ___ a presentation to some clients.",
        options: ["will have given", "will be giving", "have given", "are given"],
        answer: 1,
        explain: "Azione **in corso** durante un intervallo futuro: future continuous **will be giving**.",
      },
      {
        type: "mcq",
        prompt: "The shop will stay closed ___ the end of August, when the work is complete.",
        options: ["by", "since", "until", "for"],
        answer: 2,
        explain: "Durata continua fino a un momento: **until** (fino a). *By* significa \"entro\" e va con azioni concluse.",
      },
      {
        type: "mcq",
        prompt: "By next summer, Aiko ___ Japanese for three years.",
        options: ["will have been studying", "will be studying", "will study", "is studying"],
        answer: 0,
        explain: "**Durata** di un'azione fino a un momento futuro (*for three years*): future perfect continuous.",
      },
      {
        type: "mcq",
        prompt: "I'll send you the photos as soon as I ___ home.",
        options: ["will get", "will have got", "will be getting", "get"],
        answer: 3,
        explain: "Dopo *as soon as* (come dopo *when, before, until*) con valore futuro si usa il **present**: *get*.",
      },
      {
        type: "fill",
        prompt: "Will you ___ the supermarket later? We're completely out of milk.",
        answers: ["be passing"],
        hint: "(pass)",
        explain: "Domanda educata sui piani altrui: future continuous **Will you be passing...?**",
      },
      {
        type: "fill",
        prompt: "Hurry up! The film ___ by the time we find a parking space.",
        answers: ["will have started", "'ll have started"],
        hint: "(start)",
        explain: "Il film sarà **già iniziato** prima di quel momento futuro: future perfect **will have started**.",
      },
      {
        type: "fill",
        prompt: "When Grandpa retires in May, he ___ at the same factory for forty years.",
        answers: ["will have been working", "'ll have been working", "will have worked", "'ll have worked"],
        hint: "(work)",
        explain: "Durata fino a un momento futuro: **will have been working** (con *work* va bene anche *will have worked*).",
      },
      {
        type: "fill",
        prompt: "At 3 a.m. tomorrow our plane ___ over the Atlantic.",
        answers: ["will be flying", "'ll be flying"],
        hint: "(fly)",
        explain: "Azione in corso a un'ora precisa del futuro: future continuous **will be flying**.",
      },
      {
        type: "order",
        words: ["The", "builders", "won't", "have", "finished", "by", "Friday."],
        translation: "I muratori non avranno finito entro venerdì.",
        explain: "Future perfect negativo: **won't have + participio**, con **by** (entro).",
      },
      {
        type: "order",
        words: ["She'll", "have", "been", "teaching", "for", "twenty", "years", "next", "June."],
        translation: "A giugno prossimo saranno vent'anni che insegna.",
        explain: "Future perfect continuous: **will have been + -ing** per la durata fino a un momento futuro.",
      },
      {
        type: "judge",
        sentence: "Before you will leave, I'll have prepared some sandwiches for the journey.",
        isCorrect: false,
        correction: "Before you leave, I'll have prepared some sandwiches for the journey.",
        explain: "Dopo **before** (come dopo *when, until, by the time*) si usa il present, non *will*.",
      },
      {
        type: "judge",
        sentence: "The cake will have cooled down by the time the guests arrive.",
        isCorrect: true,
        explain: "Corretta: future perfect nella principale e present simple dopo *by the time*.",
      },
      {
        type: "judge",
        sentence: "Next week I'll be working from home, so you can reach me on my mobile.",
        isCorrect: true,
        explain: "Corretta: future continuous per una situazione **già programmata** che sarà in corso.",
      },
      {
        type: "match",
        prompt: "Abbina l'inizio alla fine corretta.",
        pairs: [
          ["At eight tomorrow morning I'll be", "sitting in a job interview."],
          ["By the end of the week I'll have", "read all the documents."],
          ["By Christmas I'll have been", "working here for six months."],
          ["I won't leave the office until", "the meeting ends."],
        ],
        explain: "*I'll be* + *-ing* (in corso); *I'll have* + participio (concluso); *I'll have been* + *-ing* (durata); *until* + present.",
      },
      {
        type: "match",
        prompt: "Abbina ogni frase italiana alla traduzione inglese.",
        pairs: [
          ["Domani a quest'ora starò viaggiando.", "This time tomorrow I'll be travelling."],
          ["Entro domani avrò finito.", "I'll have finished by tomorrow."],
          ["A luglio saranno tre anni che studio qui.", "In July I'll have been studying here for three years."],
          ["Ti chiamo quando arrivo.", "I'll call you when I arrive."],
        ],
        explain: "\"Starò + gerundio\" → future continuous; futuro anteriore → future perfect; \"saranno X anni che\" → future perfect continuous; *when* + present.",
      },
    ],
  },

  // 7) NON-DEFINING RELATIVE CLAUSES
  {
    id: "b2-non-defining-relative-clauses",
    level: "B2",
    title: "Relative clauses (non-defining)",
    subtitle: "Informazioni in più tra virgole: who, which, whose, niente that",
    icon: "📎",
    minutes: 15,
    tags: ["non-defining relative clauses", "relative clauses", "which", "who", "whose", "virgole", "pronomi relativi", "il che"],
    theory: [
      {
        type: "text",
        body: "Le **non-defining relative clauses** aggiungono un'informazione **extra**, non necessaria per identificare la persona o la cosa. Se la togli, la frase resta chiara. Sono tipiche della lingua **scritta** e più formale.",
      },
      {
        type: "rule",
        title: "Tre regole fisse",
        body: "1) Si scrivono **tra virgole** (o virgola e punto finale). 2) **Non** si può usare **that**: solo *who, which, whose, where, when, whom*. 3) Il pronome **non si può mai omettere**.",
      },
      {
        type: "compare",
        left: { label: "Defining (identifica)", items: ["My brother who lives in Rome is a lawyer.", "= ho più fratelli: parlo di quello a Roma", "niente virgole, that ammesso"] },
        right: { label: "Non-defining (aggiunge)", items: ["My brother, who lives in Rome, is a lawyer.", "= ho un solo fratello; vive a Roma", "virgole, no that"] },
      },
      {
        type: "examples",
        items: [
          { en: "Rome, ==which== is the capital of Italy, has almost 3 million inhabitants.", it: "Roma, che è la capitale d'Italia, ha quasi 3 milioni di abitanti." },
          { en: "My boss, ==who== rarely smiles, was in a good mood today.", it: "Il mio capo, che sorride raramente, oggi era di buon umore." },
          { en: "Anna, ==whose== husband is Irish, speaks perfect English.", it: "Anna, il cui marito è irlandese, parla un inglese perfetto." },
          { en: "We visited Florence, ==where== my parents met.", it: "Abbiamo visitato Firenze, dove si sono conosciuti i miei genitori." },
        ],
      },
      {
        type: "rule",
        title: "which riferito a tutta la frase",
        body: "**, which** può riferirsi a **tutta la frase precedente**, come l'italiano \"**il che**\" / \"**cosa che**\": He didn't call me, **which** was a bit rude. (Non mi ha chiamato, il che è stato un po' maleducato). Qui non si può usare *what*.",
      },
      {
        type: "warning",
        body: "✗ *My car, that is ten years old, still works.* → ✔ My car, **which** is ten years old, still works. E ✗ *She passed the exam, what surprised everyone* → ✔ ..., **which** surprised everyone.",
      },
      {
        type: "rule",
        title: "Quantificatori + of whom / of which",
        body: "In stile più formale: I have two sisters, **both of whom** live abroad. / He bought three books, **none of which** he has read. Dopo una preposizione si usa **whom** per le persone (non *who*) e **which** per le cose.",
      },
      {
        type: "tip",
        body: "Nel parlato, le virgole corrispondono a una **pausa** e a un cambio di intonazione. Se riesci a mettere la frase relativa tra parentesi senza perdere il senso, è non-defining.",
      },
    ],
    exercises: [
      {
        type: "mcq",
        prompt: "My grandmother, ___ is 92, still goes swimming every day.",
        options: ["that", "which", "who", "whose"],
        answer: 2,
        explain: "Persona, informazione extra tra virgole: **who**. *That* non è ammesso nelle non-defining.",
      },
      {
        type: "fill",
        prompt: "The train was two hours late, ___ meant we missed the concert.",
        answers: ["which"],
        explain: "Si riferisce a **tutta la frase** precedente (il ritardo): **which** (= il che).",
      },
      {
        type: "mcq",
        prompt: "Paolo, ___ sister works with me, is coming to dinner.",
        options: ["who", "whose", "which", "that"],
        answer: 1,
        explain: "Possesso (la cui sorella): **whose**.",
      },
      {
        type: "judge",
        sentence: "The Eiffel Tower, that was built in 1889, is visited by millions.",
        isCorrect: false,
        correction: "The Eiffel Tower, which was built in 1889, is visited by millions.",
        explain: "Nelle non-defining (tra virgole) non si usa **that**: serve **which**.",
      },
      {
        type: "judge",
        sentence: "She lent me her laptop, which was really kind of her.",
        isCorrect: true,
        explain: "Corretta: **which** si riferisce all'intera frase (prestarmi il portatile).",
      },
      {
        type: "fill",
        prompt: "I spent a week in Lisbon, ___ I met some wonderful people.",
        answers: ["where"],
        explain: "Luogo in cui è successo qualcosa: **where**.",
      },
      {
        type: "order",
        words: ["My", "sister,", "who", "lives", "in", "Paris,", "is", "a", "chef."],
        translation: "Mia sorella, che vive a Parigi, fa la chef.",
        explain: "La relativa non-defining va **tra virgole**, subito dopo il nome a cui si riferisce.",
      },
      {
        type: "match",
        prompt: "Abbina ogni frase al significato corretto.",
        pairs: [
          ["The students who passed got a certificate.", "Solo alcuni studenti sono stati promossi."],
          ["The students, who passed, got a certificate.", "Tutti gli studenti sono stati promossi."],
          ["He failed, which upset him.", "Il fatto di essere bocciato lo ha turbato."],
        ],
        explain: "Senza virgole la relativa **seleziona** (defining); con le virgole **aggiunge** un'informazione su tutti (non-defining). *Which* può riferirsi a un'intera frase.",
      },
      {
        type: "fill",
        prompt: "I've got two brothers, both of ___ are doctors.",
        answers: ["whom"],
        explain: "Dopo una preposizione (*of*) per le persone si usa **whom**: *both of whom*.",
      },
      {
        type: "mcq",
        prompt: "Which sentence is correct?",
        options: ["Luca, I met at university, is my best friend.", "Luca who, I met at university, is my best friend.", "Luca, that I met at university, is my best friend.", "Luca, who I met at university, is my best friend."],
        answer: 3,
        explain: "Nelle non-defining il pronome **non si omette** e non si usa *that*: **who** (o *whom*, più formale), tra virgole.",
      },
      {
        type: "mcq",
        prompt: "We got married in 2019, ___ we were both living in Edinburgh.",
        options: ["which", "when", "where", "that"],
        answer: 1,
        explain: "Il riferimento è a un **momento** (*2019*): **when**. *That* non è ammesso nelle non-defining.",
      },
      {
        type: "mcq",
        prompt: "The gallery owns forty paintings by Turner, ___ are on display at the moment.",
        options: ["only a few of them", "only a few which", "only a few of whom", "only a few of which"],
        answer: 3,
        explain: "Quantificatore + **of which** per le cose. *Of whom* è per le persone; *of them* creerebbe due frasi unite solo da una virgola.",
      },
      {
        type: "mcq",
        prompt: "She told me she'd been promoted, ___ was great news.",
        options: ["which", "what", "that", "who"],
        answer: 0,
        explain: "Si riferisce a **tutta la frase** precedente (la promozione): **which** (= il che). *What* qui è un errore tipico.",
      },
      {
        type: "mcq",
        prompt: "Mount Etna, ___, is still very active.",
        options: ["that is Europe's highest active volcano", "is Europe's highest active volcano", "which is Europe's highest active volcano", "what is Europe's highest active volcano"],
        answer: 2,
        explain: "Informazione extra tra virgole su una cosa: **which**. Nelle non-defining niente *that* e il pronome non si omette.",
      },
      {
        type: "fill",
        prompt: "My landlord, to ___ I've sent three emails, still hasn't replied.",
        answers: ["whom"],
        explain: "Dopo una preposizione (*to*), per le persone si usa **whom**, non *who*.",
      },
      {
        type: "fill",
        prompt: "Ravi, ___ I've known since primary school, is getting married in June.",
        answers: ["who", "whom"],
        explain: "Persona, informazione extra: **who** (o *whom*, più formale, perché è complemento oggetto). Il pronome non si può omettere.",
      },
      {
        type: "fill",
        prompt: "We stayed in Matera, ___ some scenes of a James Bond film were shot.",
        answers: ["where", "in which"],
        explain: "Luogo in cui è successo qualcosa: **where** (o, più formale, *in which*).",
      },
      {
        type: "fill",
        prompt: "Our hotel, ___ view over the bay was breathtaking, was surprisingly cheap.",
        answers: ["whose"],
        explain: "Possesso (la cui vista): **whose**, che si usa anche per le cose.",
      },
      {
        type: "order",
        words: ["Our", "neighbours,", "whose", "dog", "barks", "constantly,", "are", "moving", "out."],
        translation: "I nostri vicini, il cui cane abbaia di continuo, stanno traslocando.",
        explain: "Relativa non-defining con **whose** tra due virgole, subito dopo il nome a cui si riferisce.",
      },
      {
        type: "order",
        words: ["He", "forgot", "my", "name,", "which", "was", "a", "bit", "embarrassing."],
        translation: "Ha dimenticato il mio nome, il che è stato un po' imbarazzante.",
        explain: "**, which** riferito a tutta la frase precedente (= il che).",
      },
      {
        type: "judge",
        sentence: "Venice, I visited last spring, was packed with tourists.",
        isCorrect: false,
        correction: "Venice, which I visited last spring, was packed with tourists.",
        explain: "Nelle non-defining il pronome relativo **non si può omettere**, nemmeno quando è complemento oggetto.",
      },
      {
        type: "judge",
        sentence: "The concert was cancelled at the last minute, what annoyed everyone.",
        isCorrect: false,
        correction: "The concert was cancelled at the last minute, which annoyed everyone.",
        explain: "Per riferirsi a un'intera frase (\"il che\") si usa **which**, mai *what*.",
      },
      {
        type: "judge",
        sentence: "I complained to the manager, who apologised immediately.",
        isCorrect: true,
        explain: "Corretta: **who** per una persona, informazione aggiuntiva dopo la virgola.",
      },
      {
        type: "match",
        prompt: "Scegli il pronome relativo giusto per ogni frase.",
        pairs: [
          ["The Nile, ___ flows through eleven countries,", "which"],
          ["Frida Kahlo, ___ paintings are famous worldwide,", "whose"],
          ["Marrakech, ___ we spent our honeymoon,", "where"],
          ["1989, ___ the Berlin Wall fell,", "when"],
          ["My uncle, ___ everyone adores,", "who"],
        ],
        explain: "Cosa → *which*; possesso → *whose*; luogo → *where*; tempo → *when*; persona → *who*.",
      },
      {
        type: "match",
        prompt: "Abbina ogni frase al suo significato.",
        pairs: [
          ["She has two sons, both of whom are engineers.", "Tutti e due i figli sono ingegneri."],
          ["She has two sons, neither of whom is married.", "Nessuno dei due figli è sposato."],
          ["She has four sons, one of whom lives in Perth.", "Uno dei figli vive a Perth."],
          ["She has four sons, all of whom play rugby.", "Tutti i figli giocano a rugby."],
        ],
        explain: "Quantificatore + **of whom** per le persone: *both, neither, one, all of whom*.",
      },
    ],
  },

  // 8) MODALI DI DEDUZIONE
  {
    id: "b2-modals-deduction",
    level: "B2",
    title: "Modali di deduzione",
    subtitle: "must, might, can't (+ have + participio): quanto sei sicuro?",
    icon: "🕵️",
    minutes: 16,
    tags: ["modals of deduction", "must", "might", "can't", "must have", "deduzione", "probabilità", "could"],
    theory: [
      {
        type: "text",
        body: "I **modali di deduzione** servono a esprimere **quanto siamo sicuri** di qualcosa, sulla base di indizi. In italiano usiamo \"deve essere\", \"forse è\", \"non può essere\". Cambia la struttura se parliamo del **presente** o del **passato**.",
      },
      {
        type: "table",
        title: "Scala di certezza (presente)",
        headers: ["Modale", "Certezza", "Esempio"],
        rows: [
          ["must", "quasi sicuro che SÌ", "She must be tired. She's been working all day."],
          ["might / may / could", "possibile", "He might be at the gym."],
          ["might not / may not", "possibile che NO", "They may not know the address."],
          ["can't", "quasi sicuro che NO", "That can't be Tom. He's in Canada."],
        ],
      },
      {
        type: "formula",
        parts: ["must / might / may / could / can't", "+ have", "+ participio passato"],
      },
      {
        type: "rule",
        title: "Deduzioni sul passato",
        body: "Per il passato si usa **modale + have + participio**: She **must have left** early. (Deve essere uscita presto). He **can't have seen** us. (Non può averci visto). They **might have got** lost. (Potrebbero essersi persi).",
      },
      {
        type: "examples",
        items: [
          { en: "The lights are off. They ==must be== out.", it: "Le luci sono spente. Devono essere fuori." },
          { en: "You ==can't be== hungry! You've just eaten.", it: "Non puoi avere fame! Hai appena mangiato." },
          { en: "The ground is wet. It ==must have rained== last night.", it: "Il terreno è bagnato. Deve aver piovuto stanotte." },
          { en: "I can't find my keys. I ==might have left== them at work.", it: "Non trovo le chiavi. Potrei averle lasciate al lavoro." },
          { en: "She ==couldn't have written== this. She doesn't speak German.", it: "Non può averlo scritto lei. Non parla tedesco." },
        ],
      },
      {
        type: "warning",
        body: "Il contrario di *must* (deduzione) **non** è *mustn't*, ma **can't**: ✗ *He mustn't be at home, the car isn't there* → ✔ He **can't** be at home. *Mustn't* esprime un **divieto**, non una deduzione.",
      },
      {
        type: "warning",
        body: "Non usare **can** per la possibilità in frasi affermative specifiche: ✗ *She can be at the office now* → ✔ She **might/could** be at the office now.",
      },
      {
        type: "compare",
        left: { label: "Deduzione (passato)", items: ["He could have taken the bus.", "= forse ha preso l'autobus", "(non so)"] },
        right: { label: "Possibilità non realizzata", items: ["You could have told me!", "= avresti potuto dirmelo", "(ma non l'hai fatto)"] },
      },
      {
        type: "tip",
        body: "Nel parlato *must have*, *might have*, *can't have* si pronunciano ridotti: /ˈmʌstəv/, /ˈmaɪtəv/. Per questo alcuni madrelingua scrivono per errore *must of*: è sbagliato, la forma corretta è sempre **have**.",
      },
    ],
    exercises: [
      {
        type: "mcq",
        prompt: "He's been running for an hour. He ___ exhausted.",
        options: ["must be", "can't be", "mustn't be", "must have"],
        answer: 0,
        explain: "Deduzione quasi certa sul presente in base a un indizio: **must be**.",
      },
      {
        type: "fill",
        prompt: "That ___ be Sarah at the door. She's on holiday in Spain.",
        answers: ["can't", "cannot", "couldn't"],
        explain: "Quasi sicuro che **no** (è in Spagna): **can't** (anche *couldn't*). Non *mustn't*.",
      },
      {
        type: "mcq",
        prompt: "The window is broken and the TV has gone. Someone ___ into the house.",
        options: ["must break", "must have broken", "can't have broken", "might break"],
        answer: 1,
        explain: "Deduzione quasi certa sul **passato**: **must have broken**.",
      },
      {
        type: "fill",
        prompt: "I'm not sure where Luca is. He ___ (go) to the gym.",
        answers: ["might have gone", "may have gone", "could have gone"],
        hint: "(go)",
        explain: "Possibilità sul passato: **might / may / could + have gone**.",
      },
      {
        type: "judge",
        sentence: "She mustn't be Italian: she doesn't understand a word of it.",
        isCorrect: false,
        correction: "She can't be Italian: she doesn't understand a word of it.",
        explain: "Per la deduzione negativa si usa **can't**. *Mustn't* esprime un divieto.",
      },
      {
        type: "judge",
        sentence: "You can't have seen him yesterday. He was in hospital.",
        isCorrect: true,
        explain: "Corretta: deduzione negativa sul passato, **can't have + participio**.",
      },
      {
        type: "order",
        words: ["They", "must", "have", "forgotten", "about", "the", "meeting."],
        translation: "Devono essersi dimenticati della riunione.",
        explain: "Deduzione sul passato: **must + have + participio**.",
      },
      {
        type: "match",
        prompt: "Abbina la frase inglese alla traduzione.",
        pairs: [
          ["He must have left.", "Deve essere uscito."],
          ["He can't have left.", "Non può essere uscito."],
          ["He might have left.", "Forse è uscito."],
          ["He must be leaving.", "Sicuramente sta uscendo."],
        ],
        explain: "*must have* = quasi certo sì; *can't have* = quasi certo no; *might have* = possibile. *must be + -ing* = deduzione su un'azione in corso ora.",
      },
      {
        type: "fill",
        prompt: "She didn't answer the phone. She ___ (be) asleep.",
        answers: ["must have been", "might have been", "may have been", "could have been"],
        hint: "(be)",
        explain: "Deduzione sul passato: **modale + have been**. *Must have been* (quasi certo) o *might/may/could have been* (possibile) sono tutti corretti.",
      },
      {
        type: "mcq",
        prompt: "Which sentence means \"Perhaps she took the wrong train\"?",
        options: ["She must take the wrong train.", "She can't have taken the wrong train.", "She might have taken the wrong train.", "She must have took the wrong train."],
        answer: 2,
        explain: "\"Perhaps\" = possibilità sul passato: **might have taken**. L'ultima opzione usa *took* al posto del participio *taken*.",
      },
      {
        type: "mcq",
        prompt: "Dev's phone goes straight to voicemail. I suppose he ___ in the cinema.",
        options: ["must have", "might be", "can't be", "mustn't be"],
        answer: 1,
        explain: "Ipotesi possibile sul presente (*I suppose*): **might be**. *Mustn't* esprime un divieto, non una deduzione.",
      },
      {
        type: "mcq",
        prompt: "You ___ the 9:15 train. It was cancelled this morning!",
        options: ["must have caught", "might have caught", "mustn't have caught", "can't have caught"],
        answer: 3,
        explain: "Quasi certo che **no**, riferito al passato: **can't have + participio**.",
      },
      {
        type: "mcq",
        prompt: "Why did you walk home in the rain? You ___ me for a lift!",
        options: ["could have asked", "must have asked", "can't have asked", "might ask"],
        answer: 0,
        explain: "Possibilità **non realizzata** (rimprovero): **could have + participio**, \"avresti potuto chiedermi\".",
      },
      {
        type: "mcq",
        prompt: "Look at that queue! The new bakery ___ really popular.",
        options: ["can be", "mustn't be", "must be", "must have"],
        answer: 2,
        explain: "Deduzione quasi certa sul presente basata su un indizio (la fila): **must be**.",
      },
      {
        type: "fill",
        prompt: "Somebody ___ my umbrella by mistake. It was here a minute ago.",
        answers: ["must have taken", "might have taken", "may have taken", "could have taken"],
        hint: "(take)",
        explain: "Deduzione sul passato: **modale + have + participio** (*taken*). *Must have* = quasi certo, *might/may/could have* = possibile.",
      },
      {
        type: "fill",
        prompt: "The bread is still warm, so it ___ this morning.",
        answers: ["must have been baked"],
        hint: "(bake, quasi certo)",
        explain: "Deduzione quasi certa sul passato, al passivo: **must have been + participio**.",
      },
      {
        type: "fill",
        prompt: "Carlos's car is still in the car park, so he ___ late tonight.",
        answers: ["must be working"],
        hint: "(work, quasi certo)",
        explain: "Deduzione su un'azione **in corso** ora: **must be + -ing**.",
      },
      {
        type: "fill",
        prompt: "Nobody has confirmed delivery, so the parcel ___ yet.",
        answers: ["might not have arrived", "may not have arrived", "mightn't have arrived"],
        hint: "(not / arrive, forse)",
        explain: "Possibilità negativa sul passato: **might not / may not + have + participio**. *Mustn't* non si usa per le deduzioni.",
      },
      {
        type: "order",
        words: ["She", "can't", "have", "heard", "the", "doorbell."],
        translation: "Non può aver sentito il campanello.",
        explain: "Deduzione negativa sul passato: **can't + have + participio**.",
      },
      {
        type: "order",
        words: ["The", "keys", "might", "be", "in", "your", "other", "jacket."],
        translation: "Le chiavi potrebbero essere nell'altra giacca.",
        explain: "Possibilità sul presente: **might + be**.",
      },
      {
        type: "judge",
        sentence: "He must of forgotten our appointment.",
        isCorrect: false,
        correction: "He must have forgotten our appointment.",
        explain: "*must of* è un errore di scrittura dovuto alla pronuncia ridotta: la forma corretta è sempre **must have**.",
      },
      {
        type: "judge",
        sentence: "The streets are dry, so it can't have rained much overnight.",
        isCorrect: true,
        explain: "Corretta: deduzione negativa sul passato con **can't have + participio**.",
      },
      {
        type: "judge",
        sentence: "Take an umbrella: it could rain later this afternoon.",
        isCorrect: true,
        explain: "Corretta: **could** esprime una possibilità. *Can* in questo senso sarebbe sbagliato.",
      },
      {
        type: "match",
        prompt: "Abbina ogni indizio alla deduzione più logica.",
        pairs: [
          ["Her eyes are red and puffy.", "She must have been crying."],
          ["He's never been to Asia.", "He can't have eaten in that Tokyo restaurant."],
          ["The lights are on but nobody answers.", "They might be in the garden."],
          ["He's been yawning all morning.", "He must be exhausted."],
        ],
        explain: "*must have been + -ing* = deduzione su un'attività passata; *can't have* = impossibile; *might be* = possibile; *must be* = quasi certo ora.",
      },
      {
        type: "match",
        prompt: "Abbina ogni frase alla sua funzione.",
        pairs: [
          ["You could have warned me!", "rimprovero: non l'hai fatto"],
          ["She could have missed the bus.", "deduzione: forse è successo"],
          ["You mustn't park here.", "divieto"],
          ["He can't be serious.", "deduzione: quasi certo di no"],
        ],
        explain: "*could have* può essere un rimprovero o una deduzione (dipende dal contesto); *mustn't* è un divieto; *can't* è una deduzione negativa.",
      },
    ],
  },

  // 9) CONNETTIVI DI CONTRASTO
  {
    id: "b2-contrast-linkers",
    level: "B2",
    title: "Connettivi di contrasto",
    subtitle: "although, even though, despite, in spite of, however, whereas",
    icon: "⚖️",
    minutes: 15,
    tags: ["linkers", "although", "despite", "in spite of", "however", "whereas", "connettivi", "nonostante"],
    theory: [
      {
        type: "text",
        body: "I **connettivi di contrasto** collegano due idee che si oppongono. Il loro significato è simile (\"anche se\", \"nonostante\", \"però\"), ma la **grammatica** che li segue è diversa: è qui che si fanno gli errori.",
      },
      {
        type: "table",
        title: "Cosa segue ogni connettivo",
        headers: ["Connettivo", "Segue", "Esempio"],
        rows: [
          ["although / though / even though", "soggetto + verbo", "Although it was raining, we went out."],
          ["despite / in spite of", "nome o -ing", "Despite the rain, we went out."],
          ["despite the fact that", "soggetto + verbo", "Despite the fact that it was raining, we went out."],
          ["however", "nuova frase (dopo punto o ;)", "It was raining. However, we went out."],
          ["whereas / while", "soggetto + verbo (confronto)", "I like tea, whereas my wife prefers coffee."],
        ],
      },
      {
        type: "examples",
        items: [
          { en: "==Although== he's rich, he isn't happy.", it: "Anche se è ricco, non è felice." },
          { en: "==Even though== I set two alarms, I overslept.", it: "Anche se avevo messo due sveglie, non mi sono svegliato." },
          { en: "==In spite of== feeling ill, she went to work.", it: "Nonostante stesse male, è andata al lavoro." },
          { en: "The hotel was nice. ==However==, it was very expensive.", it: "L'hotel era bello. Tuttavia, era molto caro." },
          { en: "Italy is hot in summer, ==whereas== Scotland is quite cool.", it: "L'Italia d'estate è calda, mentre la Scozia è piuttosto fresca." },
        ],
      },
      {
        type: "warning",
        body: "✗ *Despite it was cold...* → ✔ *Although it was cold...* / ✔ Despite **the cold**... / ✔ Despite **the fact that** it was cold... E ✗ *despite of*: si dice **despite** oppure **in spite of**, mai *despite of*.",
      },
      {
        type: "warning",
        body: "**However** non collega due frasi con una virgola come *but*: ✗ *It was late, however we continued.* ✔ It was late. **However**, we continued. (o *It was late; however, we continued.*)",
      },
      {
        type: "compare",
        left: { label: "Stesso soggetto: -ing", items: ["Despite being tired, he kept working.", "In spite of having a map, we got lost."] },
        right: { label: "Frase completa: although", items: ["Although he was tired, he kept working.", "Although we had a map, we got lost."] },
      },
      {
        type: "tip",
        body: "**even though** è più enfatico di *although* (\"anche se\", detto con più forza). **though** è informale e si può mettere anche alla **fine** della frase: It was expensive. I bought it, **though**.",
      },
      {
        type: "rule",
        title: "whereas / while: confronto",
        body: "**whereas** e **while** mettono a confronto due fatti **diversi** senza che uno sia sorprendente rispetto all'altro: My brother is tall, **whereas** I'm quite short.",
      },
    ],
    exercises: [
      {
        type: "mcq",
        prompt: "___ the heavy traffic, we arrived on time.",
        options: ["Despite", "Although", "However", "Even though"],
        answer: 0,
        explain: "Segue un **nome** (*the heavy traffic*): serve **despite**. *Although/even though* vogliono soggetto + verbo.",
      },
      {
        type: "fill",
        prompt: "___ she had studied hard, she failed the test.",
        answers: ["Although", "Even though", "Though"],
        explain: "Segue una frase completa (*she had studied*): **Although** / **Even though** / **Though**.",
      },
      {
        type: "mcq",
        prompt: "The film got great reviews. ___, I found it boring.",
        options: ["Although", "Despite", "However", "Whereas"],
        answer: 2,
        explain: "Inizio di una nuova frase dopo il punto, seguito da virgola: **However**.",
      },
      {
        type: "fill",
        prompt: "In spite ___ the rain, the match went ahead.",
        answers: ["of"],
        explain: "La forma completa è **in spite of** + nome.",
      },
      {
        type: "judge",
        sentence: "Despite of the cold weather, we went swimming.",
        isCorrect: false,
        correction: "Despite the cold weather, we went swimming.",
        explain: "Non esiste *despite of*: si dice **despite** oppure **in spite of**.",
      },
      {
        type: "judge",
        sentence: "Despite being exhausted, she finished the marathon.",
        isCorrect: true,
        explain: "Corretta: **despite + -ing** quando il soggetto è lo stesso delle due frasi.",
      },
      {
        type: "order",
        words: ["Although", "it", "was", "late,", "we", "kept", "working."],
        translation: "Anche se era tardi, abbiamo continuato a lavorare.",
        explain: "**Although + soggetto + verbo**, poi la frase principale dopo la virgola.",
      },
      {
        type: "match",
        prompt: "Abbina ogni connettivo a ciò che lo segue.",
        pairs: [
          ["although", "+ soggetto + verbo"],
          ["despite", "+ nome / -ing"],
          ["however", "+ virgola, a inizio frase"],
          ["despite the fact that", "+ frase completa"],
        ],
        explain: "La grammatica dopo il connettivo è la chiave: *although* e *despite the fact that* vogliono una frase; *despite* vuole un nome o -ing; *however* apre una nuova frase.",
      },
      {
        type: "fill",
        prompt: "My sister loves horror films, ___ I can't stand them.",
        answers: ["whereas", "while", "but", "although", "though"],
        explain: "Confronto tra due persone diverse: **whereas** / **while** (o semplicemente *but*). Accettabili anche *although / though*, che però sottolineano la concessione più che il confronto.",
      },
      {
        type: "mcq",
        prompt: "Which sentence is correct?",
        options: ["Despite it was expensive, I bought it.", "Although the price, I bought it.", "In spite of it was expensive, I bought it.", "Even though it was expensive, I bought it."],
        answer: 3,
        explain: "**Even though + soggetto + verbo** è corretto. *Despite / In spite of* non possono essere seguiti da una frase; *although* non può essere seguito da un semplice nome.",
      },
      {
        type: "mcq",
        prompt: "___ having lived in Madrid for years, Tariq still can't speak Spanish.",
        options: ["Although", "In spite of", "However", "Even though"],
        answer: 1,
        explain: "Segue una forma in **-ing** (*having lived*): serve **in spite of** (o *despite*).",
      },
      {
        type: "mcq",
        prompt: "I enjoyed the course. It was quite expensive, ___.",
        options: ["although", "whereas", "despite", "though"],
        answer: 3,
        explain: "**though** (informale) è l'unico connettivo di questa lista che si può mettere a **fine frase**.",
      },
      {
        type: "mcq",
        prompt: "Some people learn best by listening, ___ others need to see things written down.",
        options: ["whereas", "despite", "however", "in spite of"],
        answer: 0,
        explain: "Confronto tra due gruppi diversi: **whereas** + soggetto + verbo.",
      },
      {
        type: "mcq",
        prompt: "Julia's parents are both doctors, ___ she has never been interested in medicine.",
        options: ["despite", "however", "although", "in spite of"],
        answer: 2,
        explain: "Segue una frase completa: **although**. *However* non può unire due frasi con una virgola; *despite / in spite of* vogliono un nome o -ing.",
      },
      {
        type: "fill",
        prompt: "The flat is small. ___, it's in a fantastic location.",
        answers: ["However", "Nevertheless", "Nonetheless", "Still", "Even so"],
        explain: "Nuova frase dopo il punto, seguita da virgola: **However** (o *Nevertheless, Even so*).",
      },
      {
        type: "fill",
        prompt: "Beatrice didn't qualify for the final despite ___ every day.",
        answers: ["training"],
        hint: "(train)",
        explain: "**despite + -ing** quando il soggetto è lo stesso: *despite training*.",
      },
      {
        type: "fill",
        prompt: "The restaurant was fully booked. We managed to get a table, ___.",
        answers: ["though", "however"],
        explain: "A fine frase, dopo la virgola, il connettivo più naturale è **though** (informale).",
      },
      {
        type: "fill",
        prompt: "___ the fact that she was nervous, Keiko gave a brilliant speech.",
        answers: ["Despite", "In spite of"],
        explain: "Davanti a *the fact that* + frase: **Despite** / **In spite of**.",
      },
      {
        type: "order",
        words: ["In", "spite", "of", "the", "delay,", "the", "concert", "was", "a", "success."],
        translation: "Nonostante il ritardo, il concerto è stato un successo.",
        explain: "**In spite of + nome**, poi la frase principale dopo la virgola.",
      },
      {
        type: "order",
        words: ["Even", "though", "I", "was", "exhausted,", "I", "couldn't", "sleep."],
        translation: "Anche se ero sfinito, non riuscivo a dormire.",
        explain: "**Even though + soggetto + verbo**: più enfatico di *although*.",
      },
      {
        type: "judge",
        sentence: "The flights left on time despite it was snowing.",
        isCorrect: false,
        correction: "The flights left on time although it was snowing.",
        explain: "*despite* non può essere seguito da soggetto + verbo: serve **although** (oppure *despite the snow*).",
      },
      {
        type: "judge",
        sentence: "The hotel was lovely, however the staff were rude.",
        isCorrect: false,
        correction: "The hotel was lovely. However, the staff were rude.",
        explain: "*However* non unisce due frasi con una virgola: va dopo un punto (o un punto e virgola) e seguito da virgola.",
      },
      {
        type: "judge",
        sentence: "While my sister is very sporty, I prefer reading on the sofa.",
        isCorrect: true,
        explain: "Corretta: **while** mette a confronto due fatti diversi, come *whereas*.",
      },
      {
        type: "match",
        prompt: "Abbina ogni frase al connettivo che la completa.",
        pairs: [
          ["___ the noise, I slept well.", "Despite"],
          ["___ it was noisy, I slept well.", "Although"],
          ["It was noisy. ___, I slept well.", "However"],
          ["I like noisy places, ___ my partner hates them.", "whereas"],
        ],
        explain: "Nome → *despite*; soggetto + verbo → *although*; nuova frase → *However*; confronto tra due persone → *whereas*.",
      },
      {
        type: "match",
        prompt: "Abbina l'inizio alla fine più logica.",
        pairs: [
          ["Despite winning the lottery,", "he kept his job at the supermarket."],
          ["Tokyo is huge and busy,", "whereas Kyoto feels much calmer."],
          ["The instructions were clear.", "However, nobody followed them."],
          ["Even though she hates flying,", "she flew to Sydney for the wedding."],
        ],
        explain: "*Despite + -ing* e *even though + frase* introducono un contrasto sorprendente; *whereas* confronta; *However* apre una nuova frase.",
      },
    ],
  },

  // 10) QUANTIFICATORI AVANZATI
  {
    id: "b2-advanced-quantifiers",
    level: "B2",
    title: "Quantificatori avanzati",
    subtitle: "both, either, neither, all, none, each, every",
    icon: "🧮",
    minutes: 16,
    tags: ["quantifiers", "both", "either", "neither", "all", "none", "each", "quantificatori"],
    theory: [
      {
        type: "text",
        body: "Questi quantificatori sembrano semplici, ma hanno regole precise su **quanti elementi** indicano (due o più di due), sul **verbo** (singolare o plurale) e sulla **costruzione con of**.",
      },
      {
        type: "table",
        title: "Due elementi o più?",
        headers: ["Per 2 elementi", "Per 3 o più", "Significato"],
        rows: [
          ["both", "all", "tutti e due / tutti"],
          ["either", "any", "l'uno o l'altro / uno qualsiasi"],
          ["neither", "none", "nessuno dei due / nessuno"],
        ],
      },
      {
        type: "examples",
        items: [
          { en: "==Both== my parents are teachers.", it: "Entrambi i miei genitori sono insegnanti." },
          { en: "You can sit on ==either== side.", it: "Puoi sederti da una parte o dall'altra." },
          { en: "==Neither== answer is correct.", it: "Nessuna delle due risposte è corretta." },
          { en: "==None of== my friends ==could== come.", it: "Nessuno dei miei amici è potuto venire." },
          { en: "==Each== student ==has== a different task.", it: "Ogni studente ha un compito diverso." },
        ],
      },
      {
        type: "rule",
        title: "either / neither: singolare",
        body: "**either** e **neither** + nome vogliono il **nome singolare** e il verbo singolare: Neither **option is** good. Con **of** + plurale (*neither of them*), nell'inglese formale il verbo è singolare, ma nel parlato si accetta anche il plurale: Neither of them **is/are** coming.",
      },
      {
        type: "rule",
        title: "both ... and / either ... or / neither ... nor",
        body: "**both X and Y** = sia X sia Y; **either X or Y** = o X o Y; **neither X nor Y** = né X né Y. I speak **neither** French **nor** German. Attenzione: *neither* ha già valore negativo, quindi il verbo è **affermativo**.",
      },
      {
        type: "compare",
        left: { label: "each", items: ["uno per uno, individualmente", "anche per 2 elementi", "each of + plurale: each of the rooms", "può stare da solo: They each got a prize."] },
        right: { label: "every", items: ["tutti, come gruppo", "solo per 3 o più", "NO every of → every one of", "every day, every time"] },
      },
      {
        type: "warning",
        body: "Doppia negazione vietata: ✗ *I don't like neither of them* → ✔ I **don't** like **either** of them / ✔ I like **neither** of them. In italiano diciamo \"non mi piace nessuno dei due\", ma in inglese una sola negazione basta.",
      },
      {
        type: "warning",
        body: "✗ *All of people* → ✔ *All people* (in generale) o All **the** people / All of **the** people (specifici). Con *of* serve sempre un **determinante** (the, my, these) o un pronome (*all of us, all of them*). E **every** vuole sempre il **singolare**: ✗ *every days* → ✔ every **day**.",
      },
      {
        type: "tip",
        body: "**none of** + nome plurale: nell'inglese formale il verbo è singolare (None of the students **has** finished), ma nell'uso comune il plurale è molto diffuso e accettato (None of the students **have** finished).",
      },
    ],
    exercises: [
      {
        type: "mcq",
        prompt: "I have two brothers. ___ of them live in Milan.",
        options: ["All", "Both", "Each", "Every"],
        answer: 1,
        explain: "Due elementi, entrambi (verbo plurale *live*): **Both**.",
      },
      {
        type: "fill",
        prompt: "I tried three shops, but ___ of them had the book I wanted.",
        answers: ["none"],
        explain: "Più di due elementi, risultato zero: **none of** (per due useremmo *neither*).",
      },
      {
        type: "mcq",
        prompt: "\"Tea or coffee?\" \"___ is fine, thanks.\"",
        options: ["Either", "Neither", "Both", "All"],
        answer: 0,
        explain: "Uno qualsiasi dei due va bene: **Either**. *Neither* significherebbe che non vuole nessuno dei due.",
      },
      {
        type: "fill",
        prompt: "She speaks neither Spanish ___ Portuguese.",
        answers: ["nor"],
        explain: "La correlazione è **neither ... nor** (né ... né).",
      },
      {
        type: "judge",
        sentence: "I don't like neither of these jackets.",
        isCorrect: false,
        correction: "I don't like either of these jackets.",
        explain: "Doppia negazione: con *don't* si usa **either**. In alternativa: *I like neither of these jackets.*",
      },
      {
        type: "judge",
        sentence: "Each of the rooms has its own bathroom.",
        isCorrect: true,
        explain: "Corretta: **each of** + plurale, con verbo **singolare** (*has*).",
      },
      {
        type: "order",
        words: ["Neither", "of", "my", "parents", "can", "drive."],
        translation: "Nessuno dei miei genitori sa guidare.",
        explain: "**Neither of** + determinante + nome plurale, verbo affermativo.",
      },
      {
        type: "match",
        prompt: "Abbina ogni quantificatore al suo significato.",
        pairs: [
          ["both", "tutti e due"],
          ["neither", "nessuno dei due"],
          ["either", "l'uno o l'altro"],
          ["none", "nessuno (di tre o più)"],
          ["all", "tutti (tre o più)"],
        ],
        explain: "*both, either, neither* si riferiscono a **due** elementi; *all* e *none* a tre o più.",
      },
      {
        type: "fill",
        prompt: "The bus leaves ___ ten minutes.",
        answers: ["every"],
        explain: "Frequenza a intervalli regolari: **every ten minutes**. Qui *each* non si può usare, perché *every* + numero indica l'intervallo.",
      },
      {
        type: "mcq",
        prompt: "Which sentence is correct?",
        options: ["Every of the students passed.", "All of students passed.", "Each students passed.", "Every one of the students passed."],
        answer: 3,
        explain: "*Every* non si usa con *of*: serve **every one of**. *All of* vuole un determinante (*all of the students*); *each* vuole il singolare.",
      },
      {
        type: "mcq",
        prompt: "The twins ___ want to study law.",
        options: ["all", "both", "every", "either"],
        answer: 1,
        explain: "I gemelli sono **due**: **both**. *All* si usa per tre o più.",
      },
      {
        type: "mcq",
        prompt: "We can meet on ___ Tuesday or Thursday; I'm free on both days.",
        options: ["both", "neither", "whether", "either"],
        answer: 3,
        explain: "**either X or Y** = o l'uno o l'altro. *Both* vorrebbe *and*.",
      },
      {
        type: "mcq",
        prompt: "___ guest received a small gift at the end of the evening.",
        options: ["Every", "All", "Both", "All of"],
        answer: 0,
        explain: "Nome **singolare** (*guest*) e verbo singolare: **Every**. *All* e *both* vorrebbero il plurale.",
      },
      {
        type: "mcq",
        prompt: "The runners ___ received a medal at the finish line.",
        options: ["every", "all of", "each", "every one"],
        answer: 2,
        explain: "**each** può stare da solo dopo il soggetto: *The runners each received...* *Every* non può.",
      },
      {
        type: "fill",
        prompt: "I asked both receptionists, but ___ of them could help me.",
        answers: ["neither"],
        explain: "Due persone, nessuna delle due: **neither of** + pronome, con verbo affermativo.",
      },
      {
        type: "fill",
        prompt: "___ of the two children has their own bedroom, so they never argue about space.",
        answers: ["Each"],
        explain: "Uno per uno, individualmente: **Each of** + plurale, con verbo **singolare** (*has*). *Every* non si usa con *of* e non si usa per due elementi.",
      },
      {
        type: "fill",
        prompt: "Not ___ the students agreed with the new rules: about a third voted against them.",
        answers: ["all", "all of"],
        explain: "\"Non tutti\": **not all (of) the students**. Con *of* serve il determinante (*the*).",
      },
      {
        type: "fill",
        prompt: "___ of the four suitcases was damaged: they all arrived in perfect condition.",
        answers: ["None", "Not one"],
        explain: "Più di due elementi, risultato zero: **None of** (per due useremmo *neither*). Nell'inglese formale il verbo è singolare.",
      },
      {
        type: "order",
        words: ["Every", "one", "of", "these", "apples", "is", "rotten."],
        translation: "Ognuna di queste mele è marcia.",
        explain: "*every* non si usa con *of*: serve **every one of** + plurale, con verbo **singolare**.",
      },
      {
        type: "order",
        words: ["The", "hotel", "was", "both", "cheap", "and", "comfortable."],
        translation: "L'hotel era sia economico sia comodo.",
        explain: "**both ... and** = sia ... sia.",
      },
      {
        type: "judge",
        sentence: "Every flats in this building has a balcony.",
        isCorrect: false,
        correction: "Every flat in this building has a balcony.",
        explain: "**every** vuole sempre il nome **singolare**: *every flat*.",
      },
      {
        type: "judge",
        sentence: "Neither restaurant was open on Sunday evening.",
        isCorrect: true,
        explain: "Corretta: **neither + nome singolare** con verbo singolare e affermativo.",
      },
      {
        type: "judge",
        sentence: "Take either of the keys: they both open the front door.",
        isCorrect: true,
        explain: "Corretta: **either of** = una qualsiasi delle due; *they both* = entrambe.",
      },
      {
        type: "match",
        prompt: "Abbina ogni frase alla traduzione.",
        pairs: [
          ["Neither of us went.", "Nessuno di noi due è andato."],
          ["None of us went.", "Nessuno di noi (tre o più) è andato."],
          ["Both of us went.", "Siamo andati tutti e due."],
          ["All of us went.", "Siamo andati tutti (tre o più)."],
          ["Either of us could go.", "Poteva andare l'uno o l'altro di noi."],
        ],
        explain: "*both, either, neither* per **due** persone; *all* e *none* per tre o più.",
      },
      {
        type: "match",
        prompt: "Abbina l'inizio alla fine corretta.",
        pairs: [
          ["She can either stay with us", "or book a hotel."],
          ["He's both talented", "and hard-working."],
          ["They have neither money", "nor time."],
          ["Not every", "bird can fly."],
        ],
        explain: "Correlazioni fisse: *either ... or*, *both ... and*, *neither ... nor*; *every* vuole il singolare (*bird*).",
      },
    ],
  },
  // PHRASAL VERBS
  {
    "id": "b2-phrasal-verbs-three-word",
    "level": "B2",
    "title": "Phrasal verbs a tre parti e significati multipli",
    "subtitle": "look forward to, put up with, run out of: verbo + particella + preposizione",
    "icon": "🔤",
    "minutes": 15,
    "tags": [
      "phrasal verbs",
      "three-word",
      "look forward to",
      "put up with",
      "run out of",
      "come up with",
      "take off",
      "pick up",
      "verbi frasali"
    ],
    "theory": [
      {
        "type": "text",
        "body": "I phrasal verbs **a tre parti** hanno verbo + particella + preposizione e sono **sempre inseparabili**: l'oggetto viene dopo tutto il gruppo (*I look forward to the weekend*). Inoltre molti phrasal verbs hanno **più significati**: *take off* vale \"decollare\" ma anche \"togliersi (un capo)\"; *pick up* vale \"raccogliere\", \"andare a prendere\" e \"imparare\"."
      },
      {
        "type": "rule",
        "title": "Tre parti: inseparabili e con la preposizione",
        "body": "Con *look forward to, get on with, put up with, run out of, come up with, catch up with, cut down on, look down on, get away with* l'oggetto va **dopo** la preposizione, anche se è un pronome: *I put up with him*, non ✗ *I put him up with*. Attenzione: in *look forward to* il **to è una preposizione**, quindi dopo si usa la **forma in -ing**: *I'm looking forward to seeing you*."
      },
      {
        "type": "table",
        "title": "Tre parti da conoscere",
        "headers": [
          "Phrasal verb",
          "Significato",
          "Esempio"
        ],
        "rows": [
          [
            "look forward to",
            "non vedere l'ora di",
            "I look forward to hearing from you."
          ],
          [
            "put up with",
            "sopportare",
            "I can't put up with the noise."
          ],
          [
            "run out of",
            "finire, esaurire",
            "We've run out of milk."
          ],
          [
            "come up with",
            "inventare, tirar fuori (un'idea)",
            "She came up with a plan."
          ],
          [
            "catch up with",
            "raggiungere, mettersi in pari",
            "I'll catch up with you later."
          ],
          [
            "get on with",
            "andare d'accordo con",
            "He gets on well with his boss."
          ],
          [
            "cut down on",
            "ridurre",
            "Try to cut down on sugar."
          ],
          [
            "get away with",
            "farla franca",
            "He got away with it."
          ]
        ]
      },
      {
        "type": "rule",
        "title": "Un verbo, più significati",
        "body": "*Take off*: decollare / togliersi un capo / avere successo. *Pick up*: raccogliere / andare a prendere (qualcuno) / imparare (una lingua) senza sforzo. *Put off*: rimandare / scoraggiare. *Turn down*: rifiutare / abbassare (il volume). *Get over*: superare (una malattia, una delusione). Il significato giusto lo decide il **contesto**."
      },
      {
        "type": "examples",
        "title": "In contesto",
        "items": [
          {
            "en": "I'm ==looking forward to seeing== you next week.",
            "it": "Non vedo l'ora di vederti la settimana prossima."
          },
          {
            "en": "We've ==run out of== coffee.",
            "it": "Abbiamo finito il caffè."
          },
          {
            "en": "The plane ==took off== at six.",
            "it": "L'aereo è decollato alle sei."
          },
          {
            "en": "She ==picked up== Spanish in a few months.",
            "it": "Ha imparato lo spagnolo in pochi mesi."
          },
          {
            "en": "They ==turned down== our offer.",
            "it": "Hanno rifiutato la nostra offerta."
          }
        ]
      },
      {
        "type": "compare",
        "left": {
          "label": "Separabili (oggetto in mezzo)",
          "items": [
            "put the meeting off",
            "turn the offer down",
            "pick you up",
            "take your shoes off"
          ]
        },
        "right": {
          "label": "A tre parti (inseparabili)",
          "items": [
            "look forward to the trip",
            "put up with the noise",
            "run out of time",
            "come up with an idea"
          ]
        }
      },
      {
        "type": "warning",
        "body": "Dopo *look forward to* serve la forma in **-ing**: ✗ *I look forward to see you* → *I look forward to **seeing** you*. E con i tre pezzi non si separa mai: ✗ *I put up him with* → *I put up with him*."
      },
      {
        "type": "tip",
        "body": "Se il verbo ha più significati, cerca nella frase l'**oggetto**: *pick up a book* (raccogliere), *pick up a friend* (andare a prendere), *pick up a language* (imparare). Annota ogni significato con una frase tua."
      }
    ],
    "exercises": [
      {
        "type": "mcq",
        "prompt": "I'm really looking forward ___ you next week.",
        "options": [
          "to seeing",
          "to see",
          "for seeing",
          "at seeing"
        ],
        "answer": 0,
        "explain": "In *look forward to* il **to è una preposizione**: serve la forma in -ing, *to seeing*."
      },
      {
        "type": "mcq",
        "prompt": "We've ___ milk. Could you buy some?",
        "options": [
          "run out of",
          "run into",
          "run away",
          "run up"
        ],
        "answer": 0,
        "explain": "**Run out of** = finire, esaurire qualcosa."
      },
      {
        "type": "mcq",
        "prompt": "I can't ___ this noise any longer.",
        "options": [
          "put up with",
          "put up for",
          "put out with",
          "put off"
        ],
        "answer": 0,
        "explain": "**Put up with** = sopportare. Ha tre parti e non si separa."
      },
      {
        "type": "mcq",
        "prompt": "She ___ a brilliant idea for the campaign.",
        "options": [
          "came up with",
          "came up to",
          "came across",
          "came out"
        ],
        "answer": 0,
        "explain": "**Come up with** = tirar fuori, inventare (un'idea, un piano)."
      },
      {
        "type": "mcq",
        "prompt": "The plane ___ at 6 a.m.",
        "options": [
          "took off",
          "took out",
          "took up",
          "took in"
        ],
        "answer": 0,
        "explain": "**Take off** = decollare (per un aereo)."
      },
      {
        "type": "mcq",
        "prompt": "I've ___ a lot of Spanish since I moved to Madrid.",
        "options": [
          "picked up",
          "picked on",
          "picked out",
          "picked over"
        ],
        "answer": 0,
        "explain": "**Pick up** = imparare senza sforzo, per esposizione."
      },
      {
        "type": "mcq",
        "prompt": "It took me months to ___ the flu.",
        "options": [
          "get over",
          "get away",
          "get off",
          "get out"
        ],
        "answer": 0,
        "explain": "**Get over** = superare (una malattia, una delusione)."
      },
      {
        "type": "mcq",
        "prompt": "We had to ___ the meeting because the manager was ill.",
        "options": [
          "put off",
          "put up",
          "put on",
          "put away"
        ],
        "answer": 0,
        "explain": "**Put off** = rimandare. È separabile: *put the meeting off*."
      },
      {
        "type": "mcq",
        "prompt": "He ___ my invitation because he was busy.",
        "options": [
          "turned down",
          "turned on",
          "turned up",
          "turned into"
        ],
        "answer": 0,
        "explain": "**Turn down** = rifiutare (un'offerta, un invito)."
      },
      {
        "type": "fill",
        "prompt": "I'm trying to cut ___ on sugar.",
        "answers": [
          "down"
        ],
        "hint": "ridurre",
        "explain": "**Cut down on** = ridurre il consumo di qualcosa."
      },
      {
        "type": "fill",
        "prompt": "You can't get ___ with cheating forever.",
        "answers": [
          "away"
        ],
        "explain": "**Get away with** = farla franca."
      },
      {
        "type": "fill",
        "prompt": "I get ___ well with my new colleagues.",
        "answers": [
          "on"
        ],
        "explain": "**Get on with** = andare d'accordo con (qualcuno)."
      },
      {
        "type": "fill",
        "prompt": "Slow down! I can't catch ___ with you.",
        "answers": [
          "up"
        ],
        "explain": "**Catch up with** = raggiungere qualcuno che è avanti."
      },
      {
        "type": "fill",
        "prompt": "She looks down ___ people who don't read.",
        "answers": [
          "on"
        ],
        "hint": "disprezzare",
        "explain": "**Look down on** = guardare dall'alto in basso, disprezzare."
      },
      {
        "type": "fill",
        "prompt": "We're running out ___ time.",
        "answers": [
          "of"
        ],
        "explain": "**Run out of** = esaurire, finire."
      },
      {
        "type": "order",
        "words": [
          "I'm",
          "looking",
          "forward",
          "to",
          "meeting",
          "your",
          "parents."
        ],
        "translation": "Non vedo l'ora di conoscere i tuoi genitori.",
        "explain": "Dopo *look forward to* si usa l'-ing: *meeting*."
      },
      {
        "type": "order",
        "words": [
          "He",
          "put",
          "the",
          "meeting",
          "off",
          "until",
          "Friday."
        ],
        "alternatives": [
          "He put off the meeting until Friday."
        ],
        "translation": "Ha rimandato la riunione a venerdì.",
        "explain": "**Put off** è separabile: l'oggetto può stare in mezzo."
      },
      {
        "type": "order",
        "words": [
          "I",
          "can't",
          "put",
          "up",
          "with",
          "his",
          "behaviour."
        ],
        "translation": "Non sopporto il suo comportamento.",
        "explain": "**Put up with** ha tre parti e non si separa."
      },
      {
        "type": "judge",
        "sentence": "I'm looking forward to see you.",
        "isCorrect": false,
        "correction": "I'm looking forward to seeing you.",
        "explain": "Dopo *look forward to* serve l'-ing: *seeing*."
      },
      {
        "type": "judge",
        "sentence": "She came up with a great solution.",
        "isCorrect": true,
        "explain": "Corretta: *come up with* = tirar fuori un'idea o una soluzione."
      },
      {
        "type": "judge",
        "sentence": "We ran out coffee.",
        "isCorrect": false,
        "correction": "We ran out of coffee.",
        "explain": "*Run out* vuole la preposizione **of**: *run out of coffee*."
      },
      {
        "type": "judge",
        "sentence": "They turned down the offer.",
        "isCorrect": true,
        "explain": "Corretta: *turn down* = rifiutare."
      },
      {
        "type": "judge",
        "sentence": "She looks down people who are late.",
        "isCorrect": false,
        "correction": "She looks down on people who are late.",
        "explain": "Manca la preposizione: *look down **on** someone*."
      },
      {
        "type": "match",
        "prompt": "Abbina il phrasal verb al significato.",
        "pairs": [
          [
            "put up with",
            "sopportare"
          ],
          [
            "run out of",
            "esaurire"
          ],
          [
            "come up with",
            "inventare"
          ],
          [
            "cut down on",
            "ridurre"
          ],
          [
            "get away with",
            "farla franca"
          ]
        ],
        "explain": "Cinque phrasal verbs a tre parti."
      },
      {
        "type": "match",
        "prompt": "Abbina la frase al significato di *pick up*.",
        "pairs": [
          [
            "Pick up your toys.",
            "raccogliere"
          ],
          [
            "I'll pick you up at eight.",
            "passare a prendere"
          ],
          [
            "She picked up French quickly.",
            "imparare senza sforzo"
          ]
        ],
        "explain": "Lo stesso verbo cambia significato secondo l'oggetto e il contesto."
      }
    ]
  },
];
