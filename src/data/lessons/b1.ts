import type { Lesson } from '../types';

export const b1: Lesson[] = [
  // 1) PRESENT PERFECT VS PAST SIMPLE
  {
    id: "b1-present-perfect-vs-past",
    level: "B1",
    title: "Present perfect vs past simple",
    subtitle: "I have seen o I saw? Esperienze, for/since e tempo definito",
    icon: "⏳",
    minutes: 15,
    tags: ["present perfect", "past simple", "for", "since", "ever", "never", "passato prossimo", "esperienze"],
    theory: [
      {
        type: "text",
        body: "In italiano usiamo spesso il **passato prossimo** sia per azioni appena successe sia per azioni lontane nel tempo (\"ho visto Roma nel 2010\"). In inglese invece la scelta tra **present perfect** e **past simple** dipende da una sola domanda: **l'azione è collegata al presente o è chiusa in un momento passato preciso?**",
      },
      {
        type: "formula",
        parts: ["Soggetto", "+ have/has", "+ participio passato"],
      },
      {
        type: "rule",
        title: "Present perfect: passato collegato al presente",
        body: "Si usa per: **esperienze di vita** senza dire quando (*I've been to Japan*); azioni **iniziate nel passato e ancora in corso** con **for/since** (*I've lived here for ten years*); azioni recenti con **risultato visibile ora** (*I've lost my keys*, quindi non le ho); con **just, already, yet, ever, never**.",
      },
      {
        type: "rule",
        title: "Past simple: tempo finito e definito",
        body: "Si usa quando l'azione è **conclusa** in un momento passato **specificato o chiaro dal contesto**: *yesterday, last week, in 2019, two days ago, when I was a child, What time...?* Se c'è un'espressione di tempo passato definito, il present perfect è **vietato**.",
      },
      {
        type: "examples",
        title: "A confronto",
        items: [
          { en: "I ==have been== to Paris three times.", it: "Sono stato a Parigi tre volte. (esperienza, non importa quando)" },
          { en: "I ==went== to Paris last summer.", it: "Sono andato a Parigi l'estate scorsa. (quando: definito)" },
          { en: "She ==has worked== here since 2020.", it: "Lavora qui dal 2020. (e ci lavora ancora)" },
          { en: "She ==worked== here from 2015 to 2020.", it: "Ha lavorato qui dal 2015 al 2020. (periodo chiuso)" },
          { en: "==Have== you ever ==eaten== sushi? Yes, I ==had== it in Tokyo.", it: "Hai mai mangiato sushi? Sì, l'ho mangiato a Tokyo." },
        ],
      },
      {
        type: "table",
        title: "For o since?",
        headers: ["for + durata", "since + punto di inizio"],
        rows: [
          ["for two hours", "since 9 o'clock"],
          ["for three weeks", "since Monday"],
          ["for ten years", "since 2015"],
          ["for a long time", "since I was a child"],
        ],
      },
      {
        type: "warning",
        body: "Errore tipico: tradurre \"**Vivo qui da due anni**\" con il presente: ✗ *I live here since two years*. In inglese serve il present perfect + **for**: I**'ve lived** here **for** two years. E attenzione: **since** si usa solo con il punto di inizio, mai con una durata.",
      },
      {
        type: "warning",
        body: "Mai present perfect con un tempo passato definito: ✗ *I have seen him yesterday* → I **saw** him yesterday. Anche la domanda **When...?** vuole il past simple: When **did** you **arrive**? (non ✗ *When have you arrived?*).",
      },
      {
        type: "compare",
        left: { label: "Present perfect (tempo non finito)", items: ["today (se è ancora oggi)", "this week / this year", "ever, never", "just, already, yet", "for / since (azione in corso)"] },
        right: { label: "Past simple (tempo finito)", items: ["yesterday", "last week / last year", "in 2019", "three days ago", "when I was young"] },
      },
      {
        type: "tip",
        body: "Nell'**inglese americano** si usa spesso il past simple con *just, already, yet*: *Did you eat yet?* / *I just saw him.* Nell'inglese britannico standard è preferibile *Have you eaten yet?* / *I've just seen him.*",
      },
    ],
    exercises: [
      {
        type: "mcq",
        prompt: "I ___ in this city since I was born.",
        options: ["have lived", "live", "am living", "lived"],
        answer: 0,
        explain: "Situazione iniziata nel passato e ancora vera, con **since**: serve il present perfect **have lived**. Il presente semplice (*I live since...*) è un calco dall'italiano.",
      },
      {
        type: "fill",
        prompt: "We have known each other ___ 2012.",
        answers: ["since"],
        explain: "2012 è un **punto di inizio**, quindi **since**. Con una durata (ten years) useremmo *for*.",
      },
      {
        type: "mcq",
        prompt: "When ___ to London?",
        options: ["have you moved", "you moved", "did you move", "have you been moving"],
        answer: 2,
        explain: "Le domande con **When** chiedono un momento preciso nel passato: si usa il past simple **did you move**.",
      },
      {
        type: "fill",
        prompt: "My brother ___ (never / be) to the USA.",
        answers: ["has never been", "'s never been"],
        hint: "(never / be)",
        explain: "Esperienza di vita senza tempo definito: present perfect **has never been**. *Never* va tra l'ausiliare e il participio.",
      },
      {
        type: "judge",
        sentence: "We have visited my aunt in hospital yesterday.",
        isCorrect: false,
        correction: "We visited my aunt in hospital yesterday.",
        explain: "*Yesterday* è un tempo passato definito: con esso si usa solo il past simple.",
      },
      {
        type: "judge",
        sentence: "She has worked for this company for six years.",
        isCorrect: true,
        explain: "Corretta: l'azione è iniziata sei anni fa e continua ancora, quindi present perfect + **for** + durata.",
      },
      {
        type: "order",
        words: ["How", "long", "have", "you", "lived", "in", "this", "flat?"],
        translation: "Da quanto tempo vivi in questo appartamento?",
        explain: "Domanda sulla durata di una situazione ancora in corso: **How long + have + soggetto + participio**.",
      },
      {
        type: "fill",
        prompt: "Mozart ___ (write) more than 600 pieces of music.",
        answers: ["wrote"],
        hint: "(write)",
        explain: "Mozart è morto: la sua vita è un periodo **concluso**, quindi past simple **wrote**. Il present perfect implicherebbe che può ancora scriverne.",
      },
      {
        type: "match",
        prompt: "Abbina l'inizio alla fine corretta.",
        pairs: [
          ["I've lived here", "since 2019."],
          ["I moved here", "in 2019."],
          ["Have you ever", "been to Japan?"],
          ["When did", "you arrive?"],
        ],
        explain: "*since* va con il present perfect; una data precisa (*in 2019*) e *When...?* vogliono il past simple; *ever* introduce un'esperienza (present perfect).",
      },
      {
        type: "mcq",
        prompt: "\"Is Tom here?\" \"No, he ___ out about ten minutes ago.\"",
        options: ["has gone", "has been", "goes", "went"],
        answer: 3,
        explain: "*Ten minutes ago* indica un momento passato preciso: anche se recentissimo, serve il past simple **went**.",
      },
      {
        type: "mcq",
        prompt: "Olivia ___ her driving test three weeks ago, and now she drives to work every day.",
        options: ["has passed", "passed", "has been passing", "passes"],
        answer: 1,
        explain: "*Three weeks ago* è un momento passato **definito**: serve il past simple **passed**, anche se il risultato (ora guida) è ancora attuale.",
      },
      {
        type: "mcq",
        prompt: "Ben and I are best friends. We ___ each other since primary school.",
        options: ["have known", "know", "knew", "are knowing"],
        answer: 0,
        explain: "Situazione iniziata nel passato e ancora vera, con **since**: present perfect **have known**. *Know* è un verbo di stato, quindi niente forma -ing.",
      },
      {
        type: "mcq",
        prompt: "What time ___ home after the concert last night?",
        options: ["have you got", "have you been getting", "do you get", "did you get"],
        answer: 3,
        explain: "*What time...?* e *last night* chiedono un momento preciso e concluso: past simple **did you get**.",
      },
      {
        type: "mcq",
        prompt: "Have you ever ___ a camel in the desert?",
        options: ["rode", "ridden", "ride", "riding"],
        answer: 1,
        explain: "Dopo *have* serve il **participio passato**: *ride, rode, ==ridden==*. *Rode* è il past simple, che non va con l'ausiliare *have*.",
      },
      {
        type: "fill",
        prompt: "I ___ (not / see) Giulia since her wedding.",
        answers: ["haven't seen", "have not seen"],
        hint: "(not / see)",
        explain: "Con **since** + punto di inizio, per una situazione che dura fino a oggi, si usa il present perfect: **haven't seen**.",
      },
      {
        type: "fill",
        prompt: "Kate lived in Dublin ___ five years, but then she moved to Cork.",
        answers: ["for"],
        explain: "*Five years* è una **durata**, quindi **for**. Qui il verbo è al past simple perché il periodo a Dublino è **chiuso**: *for* si usa anche con il passato, *since* no.",
      },
      {
        type: "fill",
        prompt: "The Beatles ___ (split up) in 1970.",
        answers: ["split up"],
        hint: "(split up)",
        explain: "*In 1970* è un tempo passato definito: past simple. Attenzione, *split* è irregolare e resta uguale: *split, ==split==, split*.",
      },
      {
        type: "fill",
        prompt: "This is the best pizza I ___ (ever / eat).",
        answers: ["have ever eaten", "'ve ever eaten"],
        hint: "(ever / eat)",
        explain: "Dopo un superlativo (*the best...*) si usa il present perfect con **ever** per parlare di tutta l'esperienza fino a ora: **have ever eaten**.",
      },
      {
        type: "order",
        words: ["I", "have", "never", "tried", "Indian", "food."],
        translation: "Non ho mai provato il cibo indiano.",
        explain: "Esperienza di vita senza un momento definito: present perfect. **Never** va tra *have* e il participio.",
      },
      {
        type: "order",
        words: ["When", "did", "your", "parents", "get", "married?"],
        translation: "Quando si sono sposati i tuoi genitori?",
        explain: "Le domande con **When** chiedono un momento preciso: past simple con **did** + forma base (*get married*).",
      },
      {
        type: "judge",
        sentence: "I live in Bologna since 2018.",
        isCorrect: false,
        correction: "I've lived in Bologna since 2018.",
        explain: "Calco dall'italiano \"vivo a Bologna dal 2018\". Per una situazione iniziata nel passato e ancora in corso serve il present perfect: **I've lived** ... **since**.",
      },
      {
        type: "judge",
        sentence: "My parents got married in 1995 and they have been together ever since.",
        isCorrect: true,
        explain: "Corretta: *in 1995* è un momento definito (past simple **got married**); *ever since* arriva fino a oggi (present perfect **have been**).",
      },
      {
        type: "judge",
        sentence: "I have finished university two years ago.",
        isCorrect: false,
        correction: "I finished university two years ago.",
        explain: "Con **ago** il momento è definito: il present perfect non si può usare. Serve il past simple **finished**.",
      },
      {
        type: "match",
        prompt: "Abbina l'inizio alla fine corretta.",
        pairs: [
          ["She has had this car", "since last spring."],
          ["She bought this car", "last spring."],
          ["She has driven", "over 10,000 km in it."],
          ["When did she", "pass her test?"],
        ],
        explain: "*since* va con il present perfect (*has had*); un momento definito (*last spring*) e *When...?* vogliono il past simple; *has driven* esprime quanto ha fatto finora.",
      },
      {
        type: "match",
        prompt: "Abbina la frase italiana alla traduzione corretta.",
        pairs: [
          ["Lavoro qui da tre mesi.", "I've worked here for three months."],
          ["Lavoro qui da marzo.", "I've worked here since March."],
          ["Ho lavorato lì per tre mesi, poi ho cambiato.", "I worked there for three months, then I left."],
          ["Ho cominciato a lavorare qui a marzo.", "I started working here in March."],
        ],
        explain: "\"Da\" + situazione ancora in corso = present perfect con **for** (durata) o **since** (inizio). Un periodo chiuso o un momento preciso vogliono il past simple.",
      },
    ],
  },

  // 2) PRESENT PERFECT CONTINUOUS
  {
    id: "b1-present-perfect-continuous",
    level: "B1",
    title: "Present perfect continuous",
    subtitle: "I've been waiting for hours: durata e attività recenti",
    icon: "🏃",
    minutes: 14,
    tags: ["present perfect continuous", "have been doing", "for", "since", "how long", "durata", "attività"],
    theory: [
      {
        type: "text",
        body: "Il **present perfect continuous** mette l'accento sull'**attività** e sulla sua **durata**, non sul risultato. Si usa per azioni iniziate nel passato che **continuano ancora** o che sono **appena finite** e hanno effetti visibili.",
      },
      {
        type: "formula",
        parts: ["Soggetto", "+ have/has been", "+ verbo-ing"],
      },
      {
        type: "rule",
        title: "Quando si usa",
        body: "1) **Durata** di un'azione ancora in corso, spesso con **How long, for, since**: *I've been learning English for five years.* 2) Attività **appena conclusa** che spiega una situazione presente: You're out of breath. **Have** you **been running**?",
      },
      {
        type: "examples",
        items: [
          { en: "It ==has been raining== all day.", it: "È tutto il giorno che piove." },
          { en: "How long ==have== you ==been waiting==?", it: "Da quanto tempo aspetti?" },
          { en: "Your eyes are red. ==Have== you ==been crying==?", it: "Hai gli occhi rossi. Hai pianto?" },
          { en: "She =='s been working== here since March.", it: "Lavora qui da marzo." },
        ],
      },
      {
        type: "compare",
        left: { label: "Continuous: attività, durata", items: ["I've been reading this book all week.", "(non so se l'ho finito)", "How long have you been...?", "She's been painting the kitchen. (ha la vernice sulle mani)"] },
        right: { label: "Simple: risultato, quantità", items: ["I've read three books this week.", "(finiti, contati)", "How many / How much have you...?", "She's painted the kitchen. (la cucina è finita)"] },
      },
      {
        type: "warning",
        body: "I **verbi di stato** (*know, like, love, want, believe, own, understand, belong*) non vanno alla forma -ing: ✗ *I've been knowing her for years* → I**'ve known** her for years.",
      },
      {
        type: "warning",
        body: "Errore tipico italiano: \"**Studio inglese da tre anni**\" → ✗ *I study English since three years*. Corretto: I**'ve been studying** English **for** three years.",
      },
      {
        type: "tip",
        body: "Se nella frase c'è un **numero di cose fatte** (*three emails, five kilometres, twice*), usa il present perfect **simple**: *I've written three emails.* Se c'è una **durata** (*all morning, for two hours*), il continuous è di solito la scelta più naturale.",
      },
      {
        type: "table",
        title: "Forme",
        headers: ["Affermativa", "Negativa", "Domanda"],
        rows: [
          ["I've been working", "I haven't been working", "Have I been working?"],
          ["She's been working", "She hasn't been working", "Has she been working?"],
          ["They've been working", "They haven't been working", "Have they been working?"],
        ],
      },
    ],
    exercises: [
      {
        type: "mcq",
        prompt: "I'm tired because I ___ all afternoon.",
        options: ["garden", "have been gardening", "was gardened", "am gardening"],
        answer: 1,
        explain: "Attività durata tutto il pomeriggio che spiega una situazione presente (sono stanco): **have been gardening**.",
      },
      {
        type: "fill",
        prompt: "How long ___ you been learning the guitar?",
        answers: ["have"],
        explain: "Domanda al present perfect continuous: **How long + have + you + been + -ing**.",
      },
      {
        type: "fill",
        prompt: "It ___ (snow) since this morning.",
        answers: ["has been snowing", "'s been snowing"],
        hint: "(snow)",
        explain: "Azione iniziata stamattina e ancora in corso, con *since*: **has been snowing**.",
      },
      {
        type: "mcq",
        prompt: "I ___ four chapters of the book so far.",
        options: ["have read", "am reading", "have been reading", "read"],
        answer: 0,
        explain: "C'è una **quantità** completata (four chapters) e *so far*: si usa il present perfect simple **have read**.",
      },
      {
        type: "judge",
        sentence: "I've been knowing Maria since we were at school.",
        isCorrect: false,
        correction: "I've known Maria since we were at school.",
        explain: "*Know* è un verbo di stato e non si usa alla forma -ing: serve il present perfect simple **I've known**.",
      },
      {
        type: "order",
        words: ["She", "has", "been", "working", "here", "for", "ten", "years."],
        translation: "Lavora qui da dieci anni.",
        explain: "Struttura: soggetto + **has been + -ing** + luogo + **for** + durata.",
      },
      {
        type: "judge",
        sentence: "Your hands are dirty. Have you been fixing the bike?",
        isCorrect: true,
        explain: "Corretta: attività appena conclusa con un effetto visibile ora (mani sporche), tipico uso del continuous.",
      },
      {
        type: "match",
        prompt: "Abbina l'inizio della frase alla continuazione più naturale.",
        pairs: [
          ["I've been cleaning", "the kitchen all morning."],
          ["I've cleaned", "three rooms so far."],
          ["I've known", "Sarah since school."],
          ["We've been waiting", "for the bus for an hour."],
        ],
        explain: "Il continuous va con la durata (*all morning*, *for an hour*); il simple con la quantità (*three rooms*) e con i verbi di stato (*know*).",
      },
      {
        type: "fill",
        prompt: "They ___ (not / speak) to each other since the argument.",
        answers: ["haven't been speaking", "have not been speaking", "haven't spoken", "have not spoken"],
        hint: "(not / speak)",
        explain: "Situazione negativa che dura da un punto nel passato (*since the argument*): **haven't been speaking** o anche **haven't spoken**, entrambi corretti.",
      },
      {
        type: "mcq",
        prompt: "\"You look hot!\" \"Yes, I ___ tennis.\"",
        options: ["play", "am played", "have been play", "have been playing"],
        answer: 3,
        explain: "Attività appena finita che spiega l'aspetto attuale: **have been playing** (have been + -ing).",
      },
      {
        type: "mcq",
        prompt: "We ___ this flat since 2021, and we still love it.",
        options: ["have been owning", "own", "are owning", "have owned"],
        answer: 3,
        explain: "*Own* è un **verbo di stato**: non va alla forma -ing. Con *since* serve il present perfect simple **have owned**.",
      },
      {
        type: "mcq",
        prompt: "Lucy has ___ three cakes for the party so far.",
        options: ["been baking", "baked", "bake", "baking"],
        answer: 1,
        explain: "C'è una **quantità** completata (*three cakes*) e *so far*: present perfect simple **has baked**. Il continuous non va con un numero di cose finite.",
      },
      {
        type: "mcq",
        prompt: "How long ___ Spanish?",
        options: ["are you studying", "do you study", "have you been studying", "you have been studying"],
        answer: 2,
        explain: "Domanda sulla durata di un'attività ancora in corso: **How long + have + you + been + -ing**. *Do you study / are you studying* sono calchi dall'italiano.",
      },
      {
        type: "mcq",
        prompt: "My grandad ___ been feeling very well lately.",
        options: ["haven't", "isn't", "hasn't", "didn't"],
        answer: 2,
        explain: "Negativa del present perfect continuous: **hasn't been** + -ing, con *has* per la terza persona singolare (*my grandad*).",
      },
      {
        type: "fill",
        prompt: "My neighbours ___ (argue) all evening, and I can't sleep!",
        answers: ["have been arguing", "'ve been arguing"],
        hint: "(argue)",
        explain: "Attività che dura da tutta la sera ed è ancora in corso: present perfect continuous **have been arguing**.",
      },
      {
        type: "fill",
        prompt: "I've ___ (write) five emails since lunch.",
        answers: ["written"],
        hint: "(write)",
        explain: "C'è un **numero** di cose completate (*five emails*): present perfect simple, quindi il participio **written**, non *been writing*.",
      },
      {
        type: "fill",
        prompt: "___ he been sleeping well recently?",
        answers: ["Has"],
        explain: "Domanda al present perfect continuous: **Has + he + been + -ing**. Con *he/she/it* si usa *has*.",
      },
      {
        type: "fill",
        prompt: "We've been living in Turin ___ we got married.",
        answers: ["since"],
        explain: "*We got married* indica il **punto di inizio**: serve **since**. *For* vorrebbe una durata (*for six years*).",
      },
      {
        type: "order",
        words: ["What", "have", "you", "been", "doing", "all", "day?"],
        translation: "Che cosa hai fatto tutto il giorno?",
        explain: "Domanda su un'attività che ha occupato tutta la giornata: **What + have + you + been + -ing**.",
      },
      {
        type: "order",
        words: ["They", "haven't", "been", "going", "out", "much", "recently."],
        translation: "Ultimamente non sono usciti molto.",
        explain: "Negativa del present perfect continuous: **haven't been + -ing**. *Recently* indica un periodo che arriva fino a ora.",
      },
      {
        type: "judge",
        sentence: "I'm waiting for you since six o'clock!",
        isCorrect: false,
        correction: "I've been waiting for you since six o'clock!",
        explain: "Calco dall'italiano \"ti aspetto dalle sei\". Per un'azione iniziata nel passato e ancora in corso serve **have been + -ing**.",
      },
      {
        type: "judge",
        sentence: "Paolo has been cycling to work since his office moved.",
        isCorrect: true,
        explain: "Corretta: abitudine iniziata in un momento passato (*since his office moved*) e ancora in corso, espressa con il continuous.",
      },
      {
        type: "judge",
        sentence: "She's been drinking five coffees today.",
        isCorrect: false,
        correction: "She's drunk five coffees today.",
        explain: "Con un **numero** preciso (*five coffees*) si usa il present perfect simple: **She's drunk** (o *She's had*).",
      },
      {
        type: "match",
        prompt: "Abbina ogni domanda alla risposta più logica.",
        pairs: [
          ["How long have you been driving?", "Since I was eighteen."],
          ["How many cars have you had?", "Three so far."],
          ["Why are you so sunburnt?", "I've been lying on the beach."],
          ["Have you finished the report?", "Not yet, I'm still on page two."],
        ],
        explain: "*How long* chiede la durata (continuous); *How many* chiede una quantità (simple); il continuous spiega anche un effetto visibile (la scottatura).",
      },
      {
        type: "match",
        prompt: "Abbina la frase italiana alla traduzione corretta.",
        pairs: [
          ["Studio qui da settembre.", "I've been studying here since September."],
          ["Ho studiato tre capitoli.", "I've studied three chapters."],
          ["Conosco Luca da anni.", "I've known Luca for years."],
          ["Non dormo bene da una settimana.", "I haven't been sleeping well for a week."],
        ],
        explain: "Durata di un'attività = continuous; quantità completata = simple; *know* è un verbo di stato e resta al simple.",
      },
    ],
  },

  // 3) PAST PERFECT
  {
    id: "b1-past-perfect",
    level: "B1",
    title: "Past perfect",
    subtitle: "Il passato del passato: had + participio",
    icon: "⏪",
    minutes: 14,
    tags: ["past perfect", "had done", "trapassato", "before", "after", "already", "sequenza"],
    theory: [
      {
        type: "text",
        body: "Il **past perfect** corrisponde al nostro **trapassato prossimo** (*avevo fatto, ero andato*). Serve per indicare un'azione avvenuta **prima di un altro momento passato**: è \"il passato del passato\".",
      },
      {
        type: "formula",
        parts: ["Soggetto", "+ had", "+ participio passato"],
      },
      {
        type: "rule",
        title: "Due azioni passate, una prima dell'altra",
        body: "Quando raccontiamo al past simple e dobbiamo **tornare indietro** a un'azione precedente, usiamo il past perfect: When I arrived at the station, the train **had** already **left**. (prima è partito il treno, poi sono arrivato io).",
      },
      {
        type: "compare",
        left: { label: "Past simple + past simple", items: ["When I arrived, the train left.", "= sono arrivato e POI il treno è partito", "(l'ho visto partire)"] },
        right: { label: "Past simple + past perfect", items: ["When I arrived, the train had left.", "= il treno era GIÀ partito", "(non c'era più)"] },
      },
      {
        type: "examples",
        items: [
          { en: "I ==had never seen== the sea before I moved to Naples.", it: "Non avevo mai visto il mare prima di trasferirmi a Napoli." },
          { en: "She was upset because she ==had lost== her phone.", it: "Era turbata perché aveva perso il telefono." },
          { en: "By the time we got there, the film ==had started==.", it: "Quando siamo arrivati, il film era già iniziato." },
          { en: "==Had== you ==met== him before the party?", it: "Lo avevi conosciuto prima della festa?" },
        ],
      },
      {
        type: "tip",
        body: "Con **before** e **after** l'ordine delle azioni è già chiaro, quindi il past perfect è spesso facoltativo: After I **finished** / **had finished** work, I went home. Entrambe sono corrette.",
      },
      {
        type: "warning",
        body: "Non usare il past perfect solo perché un'azione è \"molto lontana\" nel tempo. ✗ *I had been to Rome in 1990* se non c'è un altro momento passato di riferimento: basta I **went** to Rome in 1990.",
      },
      {
        type: "warning",
        body: "Attenzione alla contrazione **'d**: può essere *had* o *would*. *I'd finished* = I **had** finished (segue il participio). *I'd finish* = I **would** finish (segue la forma base).",
      },
      {
        type: "table",
        title: "Espressioni tipiche",
        headers: ["Espressione", "Esempio"],
        rows: [
          ["already", "The guests had already gone."],
          ["never ... before", "I had never flown before."],
          ["by the time", "By the time he called, I had gone to bed."],
          ["just", "She had just left when you phoned."],
        ],
      },
    ],
    exercises: [
      {
        type: "mcq",
        prompt: "When we got to the cinema, the film ___ .",
        options: ["already started", "has already started", "had already started", "was already start"],
        answer: 2,
        explain: "Il film è iniziato **prima** del nostro arrivo (passato): serve il past perfect **had already started**.",
      },
      {
        type: "fill",
        prompt: "I didn't recognise him because he ___ (grow) a beard.",
        answers: ["had grown", "'d grown"],
        hint: "(grow)",
        explain: "Farsi crescere la barba è avvenuto **prima** di non riconoscerlo: past perfect **had grown**.",
      },
      {
        type: "judge",
        sentence: "She had lived in Paris in 2005.",
        isCorrect: false,
        correction: "She lived in Paris in 2005.",
        explain: "Non c'è un secondo momento passato di riferimento: basta il past simple. Il past perfect non serve solo perché il fatto è lontano.",
      },
      {
        type: "mcq",
        prompt: "I ___ such a beautiful place before I visited Norway.",
        options: ["never saw", "had never seen", "have never seen", "never had see"],
        answer: 1,
        explain: "Esperienza fino a un momento del passato (il viaggio in Norvegia): **had never seen**.",
      },
      {
        type: "fill",
        prompt: "By the time the police arrived, the thieves ___ (escape).",
        answers: ["had escaped", "'d escaped"],
        hint: "(escape)",
        explain: "*By the time* + past simple indica il momento di riferimento; la fuga è avvenuta prima: **had escaped**.",
      },
      {
        type: "order",
        words: ["The", "shop", "had", "closed", "when", "I", "got", "there."],
        translation: "Il negozio aveva chiuso quando sono arrivato.",
        explain: "Azione precedente al past perfect (**had closed**), momento di riferimento al past simple (**got**).",
      },
      {
        type: "judge",
        sentence: "After she had finished her homework, she watched TV.",
        isCorrect: true,
        explain: "Corretta: il past perfect sottolinea che i compiti sono venuti prima. Con *after* sarebbe corretto anche *after she finished*.",
      },
      {
        type: "match",
        prompt: "Abbina ogni frase al suo significato.",
        pairs: [
          ["When I arrived, she left.", "Lei è uscita dopo il mio arrivo."],
          ["When I arrived, she had left.", "Lei era già uscita."],
          ["I'd finished.", "I had finished."],
          ["I'd finish.", "I would finish."],
        ],
        explain: "Past simple + past simple = azioni in sequenza; past perfect = azione già conclusa. *'d* + participio = had; *'d* + forma base = would.",
      },
      {
        type: "fill",
        prompt: "___ you ever driven a car before you took lessons?",
        answers: ["Had"],
        explain: "Domanda al past perfect: **Had + soggetto + participio**, riferita a prima di un momento passato (le lezioni).",
      },
      {
        type: "mcq",
        prompt: "He was nervous on the plane because he ___ before.",
        options: ["didn't fly", "hasn't flown", "wasn't flying", "hadn't flown"],
        answer: 3,
        explain: "Prima di quel volo passato non aveva mai volato: past perfect negativo **hadn't flown**.",
      },
      {
        type: "mcq",
        prompt: "Emma couldn't pay for lunch because she ___ her purse at home.",
        options: ["has left", "had left", "was leaving", "leaves"],
        answer: 1,
        explain: "Ha lasciato il borsellino a casa **prima** del momento passato del pranzo: past perfect **had left**.",
      },
      {
        type: "mcq",
        prompt: "When I phoned Daniel, he ___ already gone to bed.",
        options: ["has", "was", "did", "had"],
        answer: 3,
        explain: "Era già andato a letto prima della telefonata: past perfect, cioè **had** + participio (*gone*).",
      },
      {
        type: "mcq",
        prompt: "By the time I ___ at the party, most people had gone home.",
        options: ["arrived", "had arrived", "have arrived", "was arrive"],
        answer: 0,
        explain: "Dopo **by the time** va il momento di riferimento, al past simple (**arrived**); l'azione precedente è al past perfect (*had gone*).",
      },
      {
        type: "mcq",
        prompt: "In the sentence \"She'd already left\", 'd means:",
        options: ["would", "had", "did", "could"],
        answer: 1,
        explain: "*'d* seguito da un **participio** (*left*) è **had**. Se fosse seguito dalla forma base (*She'd leave*) sarebbe *would*.",
      },
      {
        type: "fill",
        prompt: "Chiara ___ (never / travel) by plane before her trip to Canada.",
        answers: ["had never travelled", "had never traveled", "'d never travelled", "'d never traveled"],
        hint: "(never / travel)",
        explain: "Esperienza mancante fino a un momento del passato (il viaggio in Canada): **had never travelled** (*traveled* in inglese americano).",
      },
      {
        type: "fill",
        prompt: "The concert ___ (just / finish) when it started to pour with rain.",
        answers: ["had just finished", "'d just finished"],
        hint: "(just / finish)",
        explain: "Il concerto era **appena** finito prima che iniziasse a piovere: **had just finished**. *Just* va tra *had* e il participio.",
      },
      {
        type: "fill",
        prompt: "___ they already eaten when you got there?",
        answers: ["Had"],
        explain: "Domanda al past perfect: **Had + soggetto + participio**. Chiede se l'azione era già avvenuta prima del tuo arrivo.",
      },
      {
        type: "fill",
        prompt: "After the kids ___ (go) to sleep, we opened a bottle of wine.",
        answers: ["had gone", "'d gone", "went"],
        hint: "(go)",
        explain: "Con **after** l'ordine delle azioni è già chiaro: vanno bene sia **had gone** sia *went*.",
      },
      {
        type: "order",
        words: ["I", "had", "forgotten", "my", "password,", "so", "I", "couldn't", "log", "in."],
        translation: "Avevo dimenticato la password, quindi non sono riuscito ad accedere.",
        explain: "Prima ha dimenticato la password (**had forgotten**), poi non è riuscito ad accedere (past simple *couldn't*).",
      },
      {
        type: "order",
        words: ["They", "had", "already", "sold", "all", "the", "tickets", "by", "Friday."],
        alternatives: ["By Friday they had already sold all the tickets."],
        translation: "Entro venerdì avevano già venduto tutti i biglietti.",
        explain: "**by + momento passato** indica una scadenza: l'azione era già conclusa prima, quindi past perfect **had already sold**.",
      },
      {
        type: "judge",
        sentence: "By the time we arrived, the match has already finished.",
        isCorrect: false,
        correction: "By the time we arrived, the match had already finished.",
        explain: "Il racconto è al passato (*arrived*): l'azione precedente va al past perfect **had finished**, non al present perfect.",
      },
      {
        type: "judge",
        sentence: "They had just sat down to eat when the doorbell rang.",
        isCorrect: true,
        explain: "Corretta: si erano **appena** seduti (past perfect con *just*) quando il campanello ha suonato (past simple).",
      },
      {
        type: "judge",
        sentence: "When the teacher came in, the students stopped talking.",
        isCorrect: true,
        explain: "Corretta: due azioni in **sequenza** (prima entra l'insegnante, poi gli studenti smettono), quindi past simple + past simple. Il past perfect qui cambierebbe il senso.",
      },
      {
        type: "match",
        prompt: "Abbina ogni situazione alla sua causa.",
        pairs: [
          ["I wasn't hungry", "because I'd had a huge breakfast."],
          ["The garden looked perfect", "because Dad had cut the grass."],
          ["He failed the test", "because he hadn't studied."],
          ["We missed the start", "because the bus had been late."],
        ],
        explain: "La causa è avvenuta **prima** della situazione passata, quindi va al past perfect (*had had, had cut, hadn't studied, had been*).",
      },
      {
        type: "match",
        prompt: "Abbina ogni frase al suo significato.",
        pairs: [
          ["When she called, I had eaten.", "Ho mangiato prima della chiamata."],
          ["When she called, I ate.", "Ho mangiato dopo la chiamata."],
          ["When she called, I was eating.", "Stavo mangiando durante la chiamata."],
        ],
        explain: "Past perfect = azione **già conclusa**; past simple = azione **successiva**; past continuous = azione **in corso** in quel momento.",
      },
    ],
  },

  // 4) ZERO E FIRST CONDITIONAL
  {
    id: "b1-zero-first-conditional",
    level: "B1",
    title: "Zero e first conditional",
    subtitle: "Verità generali e possibilità reali: if, unless, when, as soon as",
    icon: "🔀",
    minutes: 15,
    tags: ["conditional", "zero conditional", "first conditional", "if", "unless", "when", "as soon as", "periodo ipotetico"],
    theory: [
      {
        type: "text",
        body: "I **condizionali** in inglese hanno schemi fissi. Lo **zero conditional** descrive fatti sempre veri; il **first conditional** descrive situazioni **reali e possibili nel futuro**.",
      },
      {
        type: "rule",
        title: "Zero conditional: sempre vero",
        body: "**If + present simple, present simple.** Leggi scientifiche, abitudini, conseguenze automatiche. Qui *if* equivale a **when** (ogni volta che): *If you heat ice, it melts.*",
      },
      {
        type: "rule",
        title: "First conditional: possibilità reale nel futuro",
        body: "**If + present simple, will + verbo.** Condizione probabile, conseguenza futura: If it **rains** tomorrow, we**'ll stay** at home. Nella frase principale si possono usare anche **can, may, might, should** o l'imperativo.",
      },
      {
        type: "formula",
        parts: ["If + present simple,", "will / won't + forma base"],
      },
      {
        type: "examples",
        items: [
          { en: "If you ==mix== red and white, you ==get== pink.", it: "Se mescoli rosso e bianco, ottieni il rosa." },
          { en: "If I ==see== Anna, I =='ll tell== her.", it: "Se vedo Anna, glielo dico." },
          { en: "==Unless== you ==hurry==, you'll miss the bus.", it: "Se non ti sbrighi, perderai l'autobus." },
          { en: "I'll call you ==as soon as== I ==land==.", it: "Ti chiamo appena atterro." },
          { en: "If you're cold, ==close== the window.", it: "Se hai freddo, chiudi la finestra." },
        ],
      },
      {
        type: "warning",
        body: "L'errore più comune: mettere **will** dopo *if*. ✗ *If it will rain, we'll stay home* → If it **rains**, we'll stay home. Lo stesso vale dopo **when, as soon as, unless, before, after, until**: sempre il **present**, anche se il senso è futuro (in italiano diciamo \"quando arriverò\", in inglese when I **arrive**).",
      },
      {
        type: "table",
        title: "Congiunzioni utili",
        headers: ["Congiunzione", "Significato", "Esempio"],
        rows: [
          ["unless", "se non, a meno che", "I won't go unless you come."],
          ["when", "quando (è certo che succederà)", "When I get home, I'll cook."],
          ["as soon as", "appena", "As soon as she arrives, we'll start."],
          ["until", "finché (non)", "I'll wait until you finish."],
        ],
      },
      {
        type: "compare",
        left: { label: "if (forse succede)", items: ["If I see him, I'll tell him.", "Non so se lo vedrò."] },
        right: { label: "when (succederà di sicuro)", items: ["When I see him, I'll tell him.", "So che lo vedrò."] },
      },
      {
        type: "warning",
        body: "**Unless** ha già valore negativo: ✗ *Unless you don't study, you'll fail* → *Unless you study, you'll fail* = If you **don't** study, you'll fail.",
      },
      {
        type: "tip",
        body: "La frase con *if* può stare prima o dopo. Se viene **prima**, si mette la **virgola**: *If you need help, call me.* / *Call me if you need help.*",
      },
    ],
    exercises: [
      {
        type: "mcq",
        prompt: "If you heat water to 100°C, it ___ .",
        options: ["boils", "will boil", "boiled", "would boil"],
        answer: 0,
        explain: "È una legge scientifica, sempre vera: zero conditional, present simple **boils**.",
      },
      {
        type: "fill",
        prompt: "If it ___ (rain) tomorrow, we'll cancel the picnic.",
        answers: ["rains"],
        hint: "(rain)",
        explain: "Dopo *if* nel first conditional si usa il **present simple**, anche se il riferimento è futuro: **rains**.",
      },
      {
        type: "mcq",
        prompt: "I'll text you as soon as I ___ at the hotel.",
        options: ["will arrive", "arrive", "arrived", "am arrive"],
        answer: 1,
        explain: "Dopo **as soon as** con valore futuro si usa il present simple: **arrive**.",
      },
      {
        type: "judge",
        sentence: "If you will study hard, you will pass the exam.",
        isCorrect: false,
        correction: "If you study hard, you will pass the exam.",
        explain: "Mai *will* nella frase con *if* (con valore di condizione): serve il present simple **study**.",
      },
      {
        type: "fill",
        prompt: "You won't get in ___ you have a ticket.",
        answers: ["unless"],
        explain: "Il senso è \"se non hai il biglietto\": **unless** = if ... not. Il verbo resta affermativo (*have*).",
      },
      {
        type: "order",
        words: ["I", "will", "call", "you", "when", "I", "get", "home."],
        translation: "Ti chiamo quando arrivo a casa.",
        explain: "Frase principale con **will**, frase con **when** al present simple (*get*), anche se il senso è futuro.",
      },
      {
        type: "judge",
        sentence: "Unless you leave now, you'll be late.",
        isCorrect: true,
        explain: "Corretta: *unless you leave* = *if you don't leave*. Il verbo dopo *unless* è affermativo.",
      },
      {
        type: "match",
        prompt: "Abbina le due metà delle frasi.",
        pairs: [
          ["If you press this button,", "the machine starts."],
          ["If she misses the train,", "she'll take a taxi."],
          ["Unless we leave now,", "we'll miss the start."],
          ["As soon as the film ends,", "we'll go for dinner."],
        ],
        explain: "Zero conditional per un fatto automatico (*starts*), first conditional con *will* per conseguenze future.",
      },
      {
        type: "mcq",
        prompt: "Which sentence is correct?",
        options: ["Unless you don't hurry, we'll be late.", "If you won't hurry, we'll be late.", "If you don't hurry, we'll be late.", "Unless you won't hurry, we're late."],
        answer: 2,
        explain: "**If you don't hurry** è corretto. *Unless* non si usa con una negazione (sarebbe *Unless you hurry*) e *will* non va dopo *if*.",
      },
      {
        type: "fill",
        prompt: "I'll wait here until you ___ (come) back.",
        answers: ["come"],
        hint: "(come)",
        explain: "Anche dopo **until** con valore futuro si usa il present simple: **come**.",
      },
      {
        type: "mcq",
        prompt: "If you leave your phone in the cold, the battery ___ faster.",
        options: ["would drain", "drains", "drained", "draining"],
        answer: 1,
        explain: "Conseguenza automatica, sempre vera: zero conditional con il present simple **drains** in entrambe le parti.",
      },
      {
        type: "mcq",
        prompt: "We'll go to the beach tomorrow unless it ___ cold.",
        options: ["will be", "isn't", "is", "won't be"],
        answer: 2,
        explain: "*Unless* = if ... not: \"se **non** fa freddo\". Il verbo dopo *unless* è affermativo e al present: **is**.",
      },
      {
        type: "mcq",
        prompt: "If you see Martina, ___ her I said hello.",
        options: ["tell", "you told", "telling", "would tell"],
        answer: 0,
        explain: "Nella frase principale del first conditional si può usare l'**imperativo**: **tell** her.",
      },
      {
        type: "mcq",
        prompt: "I'm not sure yet, but if I finish early, I ___ join you at the pub.",
        options: ["would", "am", "did", "might"],
        answer: 3,
        explain: "Possibilità reale ma incerta (*I'm not sure*): al posto di *will* si usa **might**. *Would* appartiene al second conditional.",
      },
      {
        type: "fill",
        prompt: "Before you ___ (leave) the office tonight, please switch off the lights.",
        answers: ["leave"],
        hint: "(leave)",
        explain: "Anche dopo **before** con valore futuro si usa il present simple: **leave**, non *will leave*.",
      },
      {
        type: "fill",
        prompt: "If Luca ___ (not / arrive) soon, we'll start without him.",
        answers: ["doesn't arrive", "does not arrive"],
        hint: "(not / arrive)",
        explain: "Nella frase con *if* va il present simple, qui negativo alla terza persona: **doesn't arrive**.",
      },
      {
        type: "fill",
        prompt: "Chocolate melts ___ you leave it in the sun.",
        answers: ["if", "when"],
        explain: "Zero conditional: fatto sempre vero, dove **if** e **when** hanno lo stesso significato (ogni volta che).",
      },
      {
        type: "fill",
        prompt: "If the supermarket is closed, I ___ (buy) the milk tomorrow morning.",
        answers: ["will buy", "'ll buy"],
        hint: "(buy)",
        explain: "Conseguenza futura di una condizione possibile: first conditional con **will buy**.",
      },
      {
        type: "order",
        words: ["If", "you", "need", "anything,", "just", "give", "me", "a", "call."],
        translation: "Se ti serve qualcosa, chiamami.",
        explain: "*If* + present simple, poi l'**imperativo** nella frase principale. La virgola separa le due parti perché la frase con *if* viene prima.",
      },
      {
        type: "order",
        words: ["What", "will", "you", "do", "if", "you", "miss", "the", "train?"],
        translation: "Cosa farai se perdi il treno?",
        explain: "Domanda al first conditional: **will** nella frase principale, present simple (*miss*) dopo *if*.",
      },
      {
        type: "judge",
        sentence: "When I will finish university, I'll look for a job in Berlin.",
        isCorrect: false,
        correction: "When I finish university, I'll look for a job in Berlin.",
        explain: "Dopo **when** con valore futuro si usa il present simple: **finish**. In italiano diciamo \"quando finirò\", ma in inglese *will* non va.",
      },
      {
        type: "judge",
        sentence: "Plants die if they don't get enough light.",
        isCorrect: true,
        explain: "Corretta: fatto generale, zero conditional con il present simple in entrambe le parti. La frase con *if* può stare anche dopo, senza virgola.",
      },
      {
        type: "judge",
        sentence: "Unless it doesn't stop raining, we'll stay inside.",
        isCorrect: false,
        correction: "Unless it stops raining, we'll stay inside.",
        explain: "**Unless** contiene già la negazione (= if ... not): il verbo dopo va all'affermativa, **stops**.",
      },
      {
        type: "match",
        prompt: "Abbina le due metà delle frasi.",
        pairs: [
          ["Don't open the oven", "until the timer rings."],
          ["I'll buy a new laptop", "when I get my first salary."],
          ["You'll feel better", "if you drink some water."],
          ["Our dog barks", "whenever someone rings the bell."],
        ],
        explain: "Dopo *until, when, if, whenever* si usa sempre il **present simple**, anche quando il senso è futuro.",
      },
      {
        type: "match",
        prompt: "Abbina la frase italiana alla traduzione corretta.",
        pairs: [
          ["Ti presto il libro se me lo chiedi.", "I'll lend you the book if you ask me."],
          ["Non ti presto il libro se non me lo chiedi.", "I won't lend you the book unless you ask me."],
          ["Ti presto il libro appena lo finisco.", "I'll lend you the book as soon as I finish it."],
          ["Ti presto il libro quando lo finisco.", "I'll lend you the book when I finish it."],
        ],
        explain: "*if* = se; *unless* = se non; *as soon as* = appena; *when* = quando. Dopo tutte queste congiunzioni il verbo resta al present.",
      },
    ],
  },

  // 5) SECOND CONDITIONAL
  {
    id: "b1-second-conditional",
    level: "B1",
    title: "Second conditional",
    subtitle: "If I were you... situazioni immaginarie e improbabili",
    icon: "💭",
    minutes: 14,
    tags: ["second conditional", "if I were", "would", "periodo ipotetico", "ipotesi", "consigli", "congiuntivo"],
    theory: [
      {
        type: "text",
        body: "Il **second conditional** corrisponde al nostro \"**se + congiuntivo imperfetto, condizionale presente**\" (*se avessi tempo, viaggerei*). Descrive situazioni **immaginarie, irreali o poco probabili** nel presente o nel futuro.",
      },
      {
        type: "formula",
        parts: ["If + past simple,", "would / wouldn't + forma base"],
      },
      {
        type: "rule",
        title: "Il passato che non è passato",
        body: "Dopo *if* si usa il **past simple**, ma il significato è **presente o futuro**: If I **had** more money, I **would buy** a house. (non ho abbastanza soldi adesso). Nella frase principale, al posto di *would* si possono usare **could** (potrei) e **might** (forse).",
      },
      {
        type: "examples",
        items: [
          { en: "If I ==won== the lottery, I ==would travel== the world.", it: "Se vincessi alla lotteria, girerei il mondo." },
          { en: "If she ==lived== closer, we =='d see== each other more.", it: "Se abitasse più vicino, ci vedremmo di più." },
          { en: "If I ==were== you, I ==wouldn't accept== that job.", it: "Se fossi in te, non accetterei quel lavoro." },
          { en: "What ==would== you ==do== if you ==lost== your passport?", it: "Cosa faresti se perdessi il passaporto?" },
          { en: "If I ==knew== the answer, I ==could help== you.", it: "Se sapessi la risposta, potrei aiutarti." },
        ],
      },
      {
        type: "rule",
        title: "If I were...",
        body: "Con il verbo *be* si usa **were** per tutte le persone: *If I were, if he were, if it were*. Nell'inglese parlato informale si sente anche *If I was*, ma **If I were you** (per dare consigli) è la forma fissa e più corretta.",
      },
      {
        type: "compare",
        left: { label: "First conditional (reale)", items: ["If I have time, I'll help you.", "È possibile che io abbia tempo."] },
        right: { label: "Second conditional (improbabile)", items: ["If I had time, I'd help you.", "Non ho tempo, o è improbabile."] },
      },
      {
        type: "warning",
        body: "Mai *would* nella frase con *if*: ✗ *If I would have money, I would buy it* → If I **had** money, I would buy it. Gli italiani sbagliano perché traducono il condizionale in entrambe le parti.",
      },
      {
        type: "warning",
        body: "**'d** + forma base = **would**: *I'd go* = I would go. Non confonderlo con *I'd gone* (= I had gone).",
      },
      {
        type: "tip",
        body: "Per chiedere consigli e darne, **If I were you, I'd...** è una delle espressioni più utili in assoluto: *If I were you, I'd talk to your boss.*",
      },
    ],
    exercises: [
      {
        type: "mcq",
        prompt: "If my sister ___ more free time, she would learn to play the piano.",
        options: ["had", "has", "would have", "will have"],
        answer: 0,
        explain: "Second conditional: dopo *if* serve il **past simple** (*had*), mai *would*.",
      },
      {
        type: "fill",
        prompt: "If I ___ (be) you, I'd apologise to her.",
        answers: ["were", "was"],
        hint: "(be)",
        explain: "Nella formula per dare consigli si usa **were** per tutte le persone. *Was* è accettato nel parlato informale.",
      },
      {
        type: "mcq",
        prompt: "What would you do if you ___ a snake in your garden?",
        options: ["find", "will find", "found", "would find"],
        answer: 2,
        explain: "Situazione immaginaria: *if* + past simple **found**, *would* nella domanda principale.",
      },
      {
        type: "fill",
        prompt: "If we lived in the countryside, we ___ (have) a dog.",
        answers: ["would have", "'d have"],
        hint: "(have)",
        explain: "Nella frase principale del second conditional: **would + forma base**, quindi *would have*.",
      },
      {
        type: "judge",
        sentence: "We would travel more if we would have more money.",
        isCorrect: false,
        correction: "We would travel more if we had more money.",
        explain: "Anche quando la if-clause viene dopo, al suo interno non si usa *would*: serve il past simple **had**.",
      },
      {
        type: "judge",
        sentence: "If it were warmer, we could eat outside.",
        isCorrect: true,
        explain: "Corretta: *were* per ogni persona con *be*, e **could** al posto di *would* per esprimere possibilità.",
      },
      {
        type: "order",
        words: ["If", "I", "were", "you,", "I", "would", "take", "the", "job."],
        translation: "Se fossi in te, accetterei il lavoro.",
        explain: "Formula per consigliare: **If I were you, I would** + forma base.",
      },
      {
        type: "match",
        prompt: "Abbina ogni frase al tipo di situazione.",
        pairs: [
          ["If I win tomorrow, I'll celebrate.", "possibile, reale"],
          ["If I won a million, I'd retire.", "immaginaria, improbabile"],
          ["If you freeze water, it becomes ice.", "sempre vera"],
        ],
        explain: "First conditional = possibile; second = immaginario; zero = verità generale.",
      },
      {
        type: "mcq",
        prompt: "I don't have a car, so I can't drive you. Which sentence means the same?",
        options: ["If I have a car, I'll drive you.", "If I would have a car, I drove you.", "If I had a car, I will drive you.", "If I had a car, I would drive you."],
        answer: 3,
        explain: "La situazione presente è irreale (non ho l'auto): second conditional **If I had..., I would...**.",
      },
      {
        type: "fill",
        prompt: "She ___ (not / be) so tired if she went to bed earlier.",
        answers: ["wouldn't be", "would not be"],
        hint: "(not / be)",
        explain: "Frase principale negativa del second conditional: **wouldn't + forma base**.",
      },
      {
        type: "mcq",
        prompt: "If I ___ how to cook, I'd invite you all for dinner.",
        options: ["know", "would know", "knew", "had known"],
        answer: 2,
        explain: "Situazione immaginaria nel presente (non so cucinare): dopo *if* va il past simple **knew**.",
      },
      {
        type: "mcq",
        prompt: "If I were you, I ___ that email right now. Wait until you've calmed down.",
        options: ["don't send", "wouldn't send", "won't send", "didn't send"],
        answer: 1,
        explain: "Consiglio con **If I were you**: nella frase principale serve **would/wouldn't** + forma base.",
      },
      {
        type: "mcq",
        prompt: "Which sentence describes an imaginary situation?",
        options: ["If it snows, the schools close.", "If it snows tomorrow, we'll build a snowman.", "When it snows, I stay at home.", "If it snowed in July, people would be shocked."],
        answer: 3,
        explain: "Neve a luglio è una situazione **irreale**: second conditional (*snowed ... would be*). Le altre sono zero o first conditional.",
      },
      {
        type: "mcq",
        prompt: "What ___ you say if a famous actor asked you out?",
        options: ["will", "would", "do", "did"],
        answer: 1,
        explain: "Ipotesi improbabile (*asked* al past simple): nella domanda principale serve **would**.",
      },
      {
        type: "fill",
        prompt: "If we ___ (not / have) so much homework, we could go to the cinema.",
        answers: ["didn't have", "did not have"],
        hint: "(not / have)",
        explain: "Dopo *if* nel second conditional: past simple, qui negativo **didn't have**. Il significato è presente (abbiamo tanti compiti).",
      },
      {
        type: "fill",
        prompt: "If Giorgio ___ (be) taller, he might play basketball.",
        answers: ["were", "was"],
        hint: "(be)",
        explain: "Con *be* nel second conditional si preferisce **were** per tutte le persone; *was* è accettato nel parlato informale.",
      },
      {
        type: "fill",
        prompt: "I ___ (buy) that jacket if it weren't so expensive.",
        answers: ["would buy", "'d buy", "could buy"],
        hint: "(buy)",
        explain: "Frase principale del second conditional: **would buy** (o *could buy*). La condizione è irreale: la giacca è cara.",
      },
      {
        type: "fill",
        prompt: "If you could live anywhere in the world, where ___ you choose?",
        answers: ["would"],
        explain: "Ipotesi immaginaria: nella domanda principale **would** + forma base (*choose*).",
      },
      {
        type: "order",
        words: ["Would", "you", "move", "abroad", "if", "you", "had", "the", "chance?"],
        translation: "Ti trasferiresti all'estero se ne avessi la possibilità?",
        explain: "Domanda al second conditional: **Would + soggetto + forma base**, poi *if* + past simple (*had*).",
      },
      {
        type: "order",
        words: ["If", "I", "had", "a", "garden,", "I", "would", "grow", "tomatoes."],
        translation: "Se avessi un giardino, coltiverei pomodori.",
        explain: "*If* + past simple (**had**), virgola, poi **would** + forma base (*grow*).",
      },
      {
        type: "judge",
        sentence: "If I would know her number, I would call her.",
        isCorrect: false,
        correction: "If I knew her number, I would call her.",
        explain: "Errore tipico: condizionale in entrambe le parti. Dopo *if* serve il past simple **knew**.",
      },
      {
        type: "judge",
        sentence: "If I were rich, I wouldn't work so hard.",
        isCorrect: true,
        explain: "Corretta: *were* per la prima persona dopo *if*, e **wouldn't** + forma base nella principale.",
      },
      {
        type: "judge",
        sentence: "She could run faster if she trained every day.",
        isCorrect: true,
        explain: "Corretta: *could* al posto di *would* indica una **possibilità**; la frase con *if* può stare dopo, con il past simple *trained*.",
      },
      {
        type: "match",
        prompt: "Abbina ogni situazione reale all'ipotesi corrispondente.",
        pairs: [
          ["I don't speak Japanese.", "If I spoke Japanese, I'd work in Tokyo."],
          ["The flat is too small.", "If it were bigger, we'd get a dog."],
          ["I'm always tired.", "If I slept more, I'd have more energy."],
          ["We live far from the sea.", "If we lived near it, we'd swim every day."],
        ],
        explain: "Il second conditional immagina il **contrario** della realtà presente: presente reale → *if* + past simple.",
      },
      {
        type: "match",
        prompt: "Abbina ogni problema al consiglio più adatto.",
        pairs: [
          ["I've got a terrible headache.", "If I were you, I'd take a painkiller."],
          ["My laptop keeps crashing.", "If I were you, I'd reinstall the system."],
          ["I can't fall asleep at night.", "If I were you, I'd switch off screens before bed."],
        ],
        explain: "**If I were you, I'd** + forma base è la formula fissa per dare consigli.",
      },
    ],
  },

  // 6) PASSIVO PRESENT E PAST SIMPLE
  {
    id: "b1-passive-present-past",
    level: "B1",
    title: "Il passivo: present e past simple",
    subtitle: "is made, was built: quando conta l'azione, non chi la fa",
    icon: "🏗️",
    minutes: 14,
    tags: ["passive", "passivo", "be + participle", "by", "was built", "is made", "forma passiva"],
    theory: [
      {
        type: "text",
        body: "Nella forma **passiva** il soggetto della frase **subisce** l'azione. Si usa quando **chi fa l'azione è sconosciuto, ovvio o poco importante**, oppure quando vogliamo mettere in primo piano l'oggetto.",
      },
      {
        type: "formula",
        parts: ["Soggetto", "+ be (am/is/are/was/were)", "+ participio passato", "(+ by + agente)"],
      },
      {
        type: "table",
        title: "Da attivo a passivo",
        headers: ["Tempo", "Attivo", "Passivo"],
        rows: [
          ["Present simple", "They make cars here.", "Cars are made here."],
          ["Present simple", "Someone cleans the office.", "The office is cleaned."],
          ["Past simple", "Shakespeare wrote Hamlet.", "Hamlet was written by Shakespeare."],
          ["Past simple", "They built these houses in 1900.", "These houses were built in 1900."],
        ],
      },
      {
        type: "examples",
        items: [
          { en: "English ==is spoken== all over the world.", it: "L'inglese è parlato in tutto il mondo." },
          { en: "My bike ==was stolen== last night.", it: "Mi hanno rubato la bici ieri sera." },
          { en: "The Mona Lisa ==was painted== ==by== Leonardo.", it: "La Gioconda fu dipinta da Leonardo." },
          { en: "==Are== the rooms ==cleaned== every day?", it: "Le camere vengono pulite ogni giorno?" },
        ],
      },
      {
        type: "rule",
        title: "Quando usare by",
        body: "Si aggiunge **by + agente** solo se l'informazione è **utile o nuova**: *The film was directed by Sorrentino.* Non si usa se l'agente è ovvio o generico (*by people, by someone, by them*): *My car was stolen by someone* è inutilmente pesante, meglio *My car was stolen.*",
      },
      {
        type: "tip",
        body: "In italiano spesso usiamo il **si impersonale** o la terza plurale dove l'inglese usa il passivo: \"*Qui si parla inglese*\" → English **is spoken** here; \"*Mi hanno rubato il portafoglio*\" → My wallet **was stolen**.",
      },
      {
        type: "warning",
        body: "Non dimenticare il verbo **be**: ✗ *The house built in 1920* → The house **was** built in 1920. E attenzione ai **participi irregolari**: *write → written, steal → stolen, speak → spoken, make → made*.",
      },
      {
        type: "warning",
        body: "Il verbo *be* concorda con il **nuovo soggetto**: The letters **were** sent (plurale), The letter **was** sent (singolare).",
      },
      {
        type: "compare",
        left: { label: "Attivo: conta chi agisce", items: ["Marco broke the window.", "Everyone loves this song."] },
        right: { label: "Passivo: conta cosa succede", items: ["The window was broken.", "This song is loved by everyone."] },
      },
    ],
    exercises: [
      {
        type: "mcq",
        prompt: "Coffee ___ in Brazil and Colombia.",
        options: ["grows", "is grown", "was grow", "is growing"],
        answer: 1,
        explain: "Il caffè non coltiva sé stesso: viene coltivato. Fatto generale al presente: **is grown**.",
      },
      {
        type: "fill",
        prompt: "The Colosseum ___ (build) nearly 2,000 years ago.",
        answers: ["was built"],
        hint: "(build)",
        explain: "Azione passata e soggetto singolare: past simple passivo **was built**.",
      },
      {
        type: "mcq",
        prompt: "These photos ___ by my grandfather in the 1960s.",
        options: ["were taken", "was taken", "are taken", "took"],
        answer: 0,
        explain: "Soggetto plurale (*photos*) e tempo passato: **were taken**.",
      },
      {
        type: "fill",
        prompt: "Our house ___ (not / clean) every day.",
        answers: ["isn't cleaned", "is not cleaned"],
        hint: "(not / clean)",
        explain: "Present simple passivo negativo: **isn't cleaned** (soggetto singolare *our house*).",
      },
      {
        type: "judge",
        sentence: "My phone was stealed yesterday.",
        isCorrect: false,
        correction: "My phone was stolen yesterday.",
        explain: "*Steal* è irregolare: il participio è **stolen**. Nota che non serve aggiungere *by someone*: il passivo si usa proprio quando non si sa chi è stato.",
      },
      {
        type: "judge",
        sentence: "The Harry Potter books were written by J.K. Rowling.",
        isCorrect: true,
        explain: "Corretta: *by J.K. Rowling* è un'informazione importante, quindi l'agente si esprime.",
      },
      {
        type: "order",
        words: ["Italian", "is", "spoken", "in", "parts", "of", "Switzerland."],
        translation: "L'italiano si parla in alcune zone della Svizzera.",
        explain: "Present simple passivo: **is + spoken** (participio di *speak*).",
      },
      {
        type: "match",
        prompt: "Abbina la frase attiva alla forma passiva.",
        pairs: [
          ["They sell stamps here.", "Stamps are sold here."],
          ["Someone opened the door.", "The door was opened."],
          ["They invited us.", "We were invited."],
          ["People use this room for meetings.", "This room is used for meetings."],
        ],
        explain: "L'oggetto attivo diventa soggetto passivo; *be* si coniuga nel tempo della frase attiva.",
      },
      {
        type: "fill",
        prompt: "When ___ the telephone invented?",
        answers: ["was"],
        explain: "Domanda al past simple passivo: **When + was + soggetto + participio**.",
      },
      {
        type: "mcq",
        prompt: "Which sentence is correct?",
        options: ["The letter sent yesterday.", "The letter was send yesterday.", "The letter is sent yesterday.", "The letter was sent yesterday."],
        answer: 3,
        explain: "Serve **was** + participio **sent**. *Yesterday* esclude il presente; senza *be* non è passivo.",
      },
      {
        type: "mcq",
        prompt: "Millions of messages ___ on WhatsApp every minute.",
        options: ["send", "is sent", "are sent", "sent"],
        answer: 2,
        explain: "I messaggi non si inviano da soli: passivo. Fatto generale al presente e soggetto plurale: **are sent**.",
      },
      {
        type: "mcq",
        prompt: "The old bridge ___ by a flood in 1966.",
        options: ["was destroyed", "destroyed", "is destroyed", "were destroyed"],
        answer: 0,
        explain: "Il ponte subisce l'azione, nel 1966: past simple passivo, soggetto singolare **was destroyed**.",
      },
      {
        type: "mcq",
        prompt: "Which sentence sounds most natural?",
        options: ["My wallet was stolen by someone on the tram.", "My wallet stolen on the tram.", "My wallet was stolen on the tram.", "My wallet is stolen on the tram yesterday."],
        answer: 2,
        explain: "Chi l'ha rubato è sconosciuto: l'agente *by someone* è inutile. **My wallet was stolen** è la forma naturale; senza *was* non è passivo.",
      },
      {
        type: "mcq",
        prompt: "___ the windows cleaned last week?",
        options: ["Was", "Did", "Are", "Were"],
        answer: 3,
        explain: "Domanda al past simple passivo con soggetto plurale (*the windows*): **Were** + soggetto + participio. Non si usa *did*.",
      },
      {
        type: "fill",
        prompt: "Pizza Margherita ___ (invent) in Naples.",
        answers: ["was invented"],
        hint: "(invent)",
        explain: "Fatto storico concluso, soggetto singolare: past simple passivo **was invented**.",
      },
      {
        type: "fill",
        prompt: "These trainers ___ (make) in Vietnam.",
        answers: ["are made", "were made"],
        hint: "(make)",
        explain: "Soggetto plurale: **are made** (fatto generale) o *were made* (produzione passata). *Make* ha il participio irregolare *made*.",
      },
      {
        type: "fill",
        prompt: "The exam results ___ (not / publish) yesterday because of a technical problem.",
        answers: ["weren't published", "were not published"],
        hint: "(not / publish)",
        explain: "*Yesterday* e soggetto plurale: past simple passivo negativo **weren't published**.",
      },
      {
        type: "fill",
        prompt: "Our car was repaired ___ a mechanic from the next village.",
        answers: ["by"],
        explain: "Per indicare chi compie l'azione (l'agente) si usa **by**. Qui l'informazione è utile, quindi si esprime.",
      },
      {
        type: "order",
        words: ["Where", "was", "this", "photo", "taken?"],
        translation: "Dove è stata scattata questa foto?",
        explain: "Domanda al passivo: **Where + was + soggetto + participio** (*taken*, da *take*).",
      },
      {
        type: "order",
        words: ["Breakfast", "is", "served", "from", "seven", "to", "ten."],
        translation: "La colazione viene servita dalle sette alle dieci.",
        explain: "Present simple passivo per un fatto abituale: **is served**. Chi la serve non importa.",
      },
      {
        type: "judge",
        sentence: "The museum visited by thousands of tourists every year.",
        isCorrect: false,
        correction: "The museum is visited by thousands of tourists every year.",
        explain: "Manca il verbo **be**: senza *is* la frase non ha un verbo principale. Passivo = *be* + participio.",
      },
      {
        type: "judge",
        sentence: "In Italy is eaten a lot of pasta.",
        isCorrect: false,
        correction: "A lot of pasta is eaten in Italy.",
        explain: "Calco del \"si mangia\" italiano. In inglese il soggetto va **prima** del verbo: l'oggetto dell'azione (*a lot of pasta*) diventa soggetto.",
      },
      {
        type: "judge",
        sentence: "Most of the damage was caused by the strong wind.",
        isCorrect: true,
        explain: "Corretta: past simple passivo con *was* (soggetto *most of the damage*, singolare) e agente importante introdotto da **by**.",
      },
      {
        type: "match",
        prompt: "Abbina la frase attiva alla forma passiva corretta.",
        pairs: [
          ["The chef cooks the fish.", "The fish is cooked by the chef."],
          ["The chef cooked the fish.", "The fish was cooked by the chef."],
          ["They grow rice here.", "Rice is grown here."],
          ["Somebody broke the vase.", "The vase was broken."],
        ],
        explain: "*be* prende il tempo del verbo attivo: *cooks* → **is cooked**, *cooked* → **was cooked**. Con agenti generici (*they, somebody*) non si mette *by*.",
      },
      {
        type: "match",
        prompt: "Abbina la frase italiana alla traduzione corretta.",
        pairs: [
          ["Qui si accettano carte di credito.", "Credit cards are accepted here."],
          ["Ci hanno invitati al matrimonio.", "We were invited to the wedding."],
          ["L'hanno arrestato ieri.", "He was arrested yesterday."],
          ["In Svizzera si parlano quattro lingue.", "Four languages are spoken in Switzerland."],
        ],
        explain: "Il *si* impersonale e la terza persona plurale generica italiana diventano spesso un **passivo** in inglese.",
      },
    ],
  },

  // 7) REPORTED SPEECH BASE
  {
    id: "b1-reported-speech",
    level: "B1",
    title: "Reported speech",
    subtitle: "Say o tell? Backshift dei tempi e domande riportate",
    icon: "🗣️",
    minutes: 16,
    tags: ["reported speech", "discorso indiretto", "say", "tell", "backshift", "indirect questions", "domande indirette"],
    theory: [
      {
        type: "text",
        body: "Il **reported speech** (discorso indiretto) serve a riferire ciò che qualcuno ha detto. Quando il verbo introduttivo è al passato (*said, told, asked*), i tempi verbali di solito **fanno un passo indietro** (backshift), proprio come in italiano.",
      },
      {
        type: "rule",
        title: "Say o tell?",
        body: "**tell** vuole sempre **la persona** a cui si parla: She **told me** (that) she was tired. **say** non vuole la persona (se c'è, serve *to*): She **said** (that) she was tired. / She **said to me** (that) she was tired. *That* è facoltativo.",
      },
      {
        type: "table",
        title: "Backshift dei tempi",
        headers: ["Discorso diretto", "Discorso indiretto"],
        rows: [
          ["present simple: \"I like it.\"", "past simple: he said he liked it"],
          ["present continuous: \"I'm working.\"", "past continuous: she said she was working"],
          ["past simple / present perfect: \"I saw / have seen it.\"", "past perfect: he said he had seen it"],
          ["will: \"I'll help.\"", "would: she said she would help"],
          ["can: \"I can swim.\"", "could: he said he could swim"],
          ["must: \"I must go.\"", "had to: she said she had to go"],
        ],
      },
      {
        type: "examples",
        items: [
          { en: "\"I'm tired.\" → She ==said== she ==was== tired.", it: "Ha detto che era stanca." },
          { en: "\"We'll call you.\" → They ==told me== they ==would== call me.", it: "Mi hanno detto che mi avrebbero chiamato." },
          { en: "\"Where do you live?\" → He asked me where ==I lived==.", it: "Mi ha chiesto dove abitavo." },
          { en: "\"Are you coming?\" → She asked ==if== I ==was== coming.", it: "Mi ha chiesto se venivo." },
        ],
      },
      {
        type: "rule",
        title: "Domande riportate",
        body: "Nelle domande indirette l'ordine è quello di una **frase affermativa** (soggetto + verbo), **senza do/does/did** e senza punto interrogativo. Domande con *Wh-*: si ripete la parola interrogativa. Domande sì/no: si usa **if** o **whether**.",
      },
      {
        type: "warning",
        body: "Errori tipici: ✗ *He said me* → He **told** me / He **said** to me. ✗ *She asked me where did I live* → She asked me where **I lived**. ✗ *He asked me what was my name* → He asked me what **my name was**.",
      },
      {
        type: "table",
        title: "Altri cambiamenti",
        headers: ["Diretto", "Indiretto"],
        rows: [
          ["now", "then"],
          ["today", "that day"],
          ["tomorrow", "the next day / the following day"],
          ["yesterday", "the day before / the previous day"],
          ["here", "there"],
        ],
      },
      {
        type: "tip",
        body: "Se ciò che è stato detto è **ancora vero**, il backshift è facoltativo: He said he **lives** / **lived** in Rome (ci vive ancora). Se il verbo introduttivo è al presente (*She says...*), non si cambia il tempo.",
      },
      {
        type: "rule",
        title: "Ordini e richieste",
        body: "Per riportare ordini e richieste si usa **tell / ask + persona + to + verbo**: \"Sit down!\" → He told me **to sit** down. \"Don't be late.\" → She told us **not to be** late.",
      },
    ],
    exercises: [
      {
        type: "mcq",
        prompt: "She ___ me that she was moving to Spain.",
        options: ["said", "spoke", "told", "asked"],
        answer: 2,
        explain: "C'è la persona (*me*) subito dopo il verbo: serve **told**. *Said* vorrebbe *said to me*.",
      },
      {
        type: "fill",
        prompt: "\"I am hungry.\" → Tom said that he ___ hungry.",
        answers: ["was"],
        explain: "Backshift: il present simple *am* diventa past simple **was**.",
      },
      {
        type: "fill",
        prompt: "\"I will help you.\" → She said she ___ help me.",
        answers: ["would", "'d"],
        explain: "Backshift: **will** diventa **would**.",
      },
      {
        type: "mcq",
        prompt: "\"Where do you work?\" → He asked me ___ .",
        options: ["where did I work", "where I worked", "where do I work", "where I did work"],
        answer: 1,
        explain: "Domanda indiretta: ordine affermativo (soggetto + verbo) senza *do/did*, con backshift: **where I worked**.",
      },
      {
        type: "judge",
        sentence: "He said me that he was busy.",
        isCorrect: false,
        correction: "He told me that he was busy.",
        explain: "*Say* non regge direttamente la persona. Con *me* serve **told** (oppure *said to me*).",
      },
      {
        type: "order",
        words: ["She", "asked", "me", "if", "I", "was", "coming."],
        translation: "Mi ha chiesto se venivo.",
        explain: "Domanda sì/no riportata: **if** + soggetto + verbo, senza inversione.",
      },
      {
        type: "judge",
        sentence: "The teacher told us not to use our phones.",
        isCorrect: true,
        explain: "Corretta: ordine negativo riportato con **tell + persona + not to + verbo**.",
      },
      {
        type: "match",
        prompt: "Abbina il discorso diretto a quello indiretto.",
        pairs: [
          ["\"I can swim.\"", "He said he could swim."],
          ["\"I've finished.\"", "He said he had finished."],
          ["\"I must go.\"", "He said he had to go."],
          ["\"I'm leaving tomorrow.\"", "He said he was leaving the next day."],
        ],
        explain: "can → could; present perfect → past perfect; must → had to; tomorrow → the next day.",
      },
      {
        type: "fill",
        prompt: "\"What is your name?\" → She asked me what my name ___ .",
        answers: ["was"],
        explain: "Nella domanda indiretta il verbo va dopo il soggetto (*my name*) e fa backshift: **was**.",
      },
      {
        type: "mcq",
        prompt: "\"Did you see the match?\" → Paul asked me ___ .",
        options: ["that I saw the match?", "did I see the match", "if had I seen the match", "if I had seen the match"],
        answer: 3,
        explain: "Domanda sì/no: **if** + ordine affermativo; il past simple diventa past perfect: **if I had seen the match**.",
      },
      {
        type: "mcq",
        prompt: "My boss ___ that the meeting was cancelled.",
        options: ["told", "said", "told to", "spoke"],
        answer: 1,
        explain: "Non c'è la persona a cui si parla, quindi **said**. *Told* vorrebbe un complemento (*told us*).",
      },
      {
        type: "mcq",
        prompt: "\"Please turn the music down.\" → My neighbour asked me ___ the music down.",
        options: ["turn", "turning", "that I turn", "to turn"],
        answer: 3,
        explain: "Richiesta riportata: **ask + persona + to + verbo**: *asked me to turn*.",
      },
      {
        type: "mcq",
        prompt: "\"Why are you crying?\" → He asked me why ___ .",
        options: ["was I crying", "I was crying", "I cried", "did I cry"],
        answer: 1,
        explain: "Domanda indiretta: ordine affermativo (soggetto + verbo) e backshift del present continuous: **I was crying**.",
      },
      {
        type: "mcq",
        prompt: "\"I met Laura at the station.\" → Luca said he ___ Laura at the station.",
        options: ["had met", "has met", "meets", "would meet"],
        answer: 0,
        explain: "Backshift: il past simple *met* diventa past perfect **had met** (nel parlato si sente anche *met*).",
      },
      {
        type: "fill",
        prompt: "\"I can't come to the party.\" → Irene said she ___ come to the party.",
        answers: ["couldn't", "could not"],
        explain: "Backshift: **can't** diventa **couldn't**.",
      },
      {
        type: "fill",
        prompt: "\"Don't touch the paintings!\" → The guard told the children ___ touch the paintings.",
        answers: ["not to"],
        explain: "Ordine negativo riportato: **tell + persona + not to + verbo**.",
      },
      {
        type: "fill",
        prompt: "\"Is the museum open on Mondays?\" → I asked the receptionist ___ the museum was open on Mondays.",
        answers: ["if", "whether"],
        explain: "Domanda sì/no riportata: si introduce con **if** o **whether**, seguiti dall'ordine affermativo.",
      },
      {
        type: "fill",
        prompt: "\"I must finish this today.\" → My dad said he ___ to finish it that day.",
        answers: ["had"],
        explain: "Nel discorso indiretto **must** diventa **had to**; anche *today* cambia in *that day*.",
      },
      {
        type: "order",
        words: ["He", "asked", "me", "where", "I", "had", "parked", "the", "car."],
        translation: "Mi ha chiesto dove avevo parcheggiato la macchina.",
        explain: "Domanda indiretta: *where* + soggetto + verbo, senza inversione né *did*. Il past simple diventa past perfect.",
      },
      {
        type: "order",
        words: ["They", "told", "us", "to", "wait", "outside."],
        translation: "Ci hanno detto di aspettare fuori.",
        explain: "Ordine riportato: **tell + persona + to + verbo**.",
      },
      {
        type: "judge",
        sentence: "She asked me where was the station.",
        isCorrect: false,
        correction: "She asked me where the station was.",
        explain: "Nelle domande indirette non c'è inversione: prima il soggetto (*the station*), poi il verbo (**was**).",
      },
      {
        type: "judge",
        sentence: "He said to me that he didn't like horror films.",
        isCorrect: true,
        explain: "Corretta: con *say* la persona è introdotta da **to** (*said to me*), e il present *don't like* diventa *didn't like*.",
      },
      {
        type: "judge",
        sentence: "Nadia told me she would call the next day.",
        isCorrect: true,
        explain: "Corretta: *tell* + persona; *will* diventa **would** e *tomorrow* diventa **the next day**.",
      },
      {
        type: "match",
        prompt: "Abbina il discorso diretto a quello indiretto.",
        pairs: [
          ["\"I'm cooking.\"", "She said she was cooking."],
          ["\"I cooked.\"", "She said she had cooked."],
          ["\"I'll cook.\"", "She said she would cook."],
          ["\"I can cook.\"", "She said she could cook."],
        ],
        explain: "Backshift: present continuous → past continuous; past simple → past perfect; will → would; can → could.",
      },
      {
        type: "match",
        prompt: "Abbina l'inizio alla fine corretta.",
        pairs: [
          ["He told", "us a funny story."],
          ["He said", "that he was sorry."],
          ["He asked", "whether we were ready."],
        ],
        explain: "*tell* vuole la persona (*told us*); *say* no (*said that*); *ask* introduce una domanda (*whether*).",
      },
    ],
  },

  // 8) RELATIVE CLAUSES DEFINING
  {
    id: "b1-defining-relative-clauses",
    level: "B1",
    title: "Relative clauses (defining)",
    subtitle: "who, which, that, whose, where: le frasi che identificano",
    icon: "🔗",
    minutes: 15,
    tags: ["relative clauses", "who", "which", "that", "whose", "where", "pronomi relativi", "che"],
    theory: [
      {
        type: "text",
        body: "Le **defining relative clauses** danno un'informazione **essenziale** per capire di chi o di cosa stiamo parlando. Senza di esse la frase non è chiara. In italiano corrispondono a frasi introdotte da **che, cui, il cui, dove**.",
      },
      {
        type: "table",
        title: "I pronomi relativi",
        headers: ["Pronome", "Si usa per", "Esempio"],
        rows: [
          ["who", "persone", "The man who called you is my uncle."],
          ["which", "cose, animali", "The book which I bought is great."],
          ["that", "persone o cose (più informale)", "The car that he drives is new."],
          ["whose", "possesso (il cui, la cui)", "That's the girl whose dad is a pilot."],
          ["where", "luoghi (dove, in cui)", "This is the hotel where we stayed."],
        ],
      },
      {
        type: "examples",
        items: [
          { en: "A nurse is someone ==who== looks after patients.", it: "Un infermiere è qualcuno che si prende cura dei pazienti." },
          { en: "The phone ==that== I bought last week has stopped working.", it: "Il telefono che ho comprato la settimana scorsa ha smesso di funzionare." },
          { en: "I know a man ==whose== wife speaks six languages.", it: "Conosco un uomo la cui moglie parla sei lingue." },
          { en: "That's the restaurant ==where== we had our first date.", it: "Quello è il ristorante del nostro primo appuntamento." },
        ],
      },
      {
        type: "rule",
        title: "Quando si può omettere il pronome",
        body: "Se il pronome è **oggetto** del verbo della relativa (cioè dopo c'è un **altro soggetto**), si può omettere: The book (that) **I** bought ✔. Se è **soggetto** (subito dopo c'è il verbo), **non** si può omettere: The man **who called** you (non ✗ *The man called you is...*).",
      },
      {
        type: "compare",
        left: { label: "Pronome soggetto: obbligatorio", items: ["The girl who lives next door...", "The bus that goes to the airport...", "(segue subito il verbo)"] },
        right: { label: "Pronome oggetto: omettibile", items: ["The girl (who) I met...", "The film (that) we watched...", "(segue un soggetto)"] },
      },
      {
        type: "warning",
        body: "Non ripetere il pronome dopo la relativa: ✗ *The man who I met him was nice* → *The man (who) I met was nice.* In italiano non si dice \"che l'ho incontrato\", e nemmeno in inglese.",
      },
      {
        type: "warning",
        body: "Non usare **what** come relativo dopo un nome: ✗ *The film what we saw* → The film **that/which** we saw. *What* significa \"ciò che\" e non ha un nome davanti: I don't know **what** you mean.",
      },
      {
        type: "tip",
        body: "Con le preposizioni, nell'inglese di tutti i giorni la preposizione va **alla fine**: the person (who) I spoke **to**; the house (that) I grew up **in**. La forma *the house in which I grew up* è formale.",
      },
    ],
    exercises: [
      {
        type: "mcq",
        prompt: "A dentist is a person ___ looks after your teeth.",
        options: ["who", "which", "whose", "where"],
        answer: 0,
        explain: "Riferito a una persona e soggetto del verbo *looks*: **who** (va bene anche *that*, non tra le opzioni).",
      },
      {
        type: "fill",
        prompt: "This is the village ___ my grandmother was born.",
        answers: ["where", "in which"],
        explain: "Luogo in cui: **where** (oppure la forma formale *in which*).",
      },
      {
        type: "mcq",
        prompt: "I met a woman ___ son plays for Juventus.",
        options: ["who", "whose", "that", "which"],
        answer: 1,
        explain: "Possesso (il cui figlio): **whose**.",
      },
      {
        type: "judge",
        sentence: "The film we watched last night was really boring.",
        isCorrect: true,
        explain: "Corretta: il pronome (*that/which*) è oggetto di *watched*, perché segue il soggetto *we*: si può omettere.",
      },
      {
        type: "judge",
        sentence: "The woman lives upstairs is a doctor.",
        isCorrect: false,
        correction: "The woman who lives upstairs is a doctor.",
        explain: "Il pronome è soggetto di *lives*: non si può omettere. Serve **who** (o *that*).",
      },
      {
        type: "fill",
        prompt: "Is this the key ___ opens the garage?",
        answers: ["that", "which"],
        explain: "Riferito a una cosa e soggetto di *opens*: **that** o **which**.",
      },
      {
        type: "order",
        words: ["The", "man", "who", "fixed", "my", "car", "was", "very", "friendly."],
        translation: "L'uomo che ha riparato la mia auto era molto gentile.",
        explain: "La relativa **who fixed my car** va subito dopo il nome a cui si riferisce (*the man*).",
      },
      {
        type: "match",
        prompt: "Abbina l'inizio della frase al pronome giusto.",
        pairs: [
          ["The shop ___ I work", "where"],
          ["The student ___ bag was stolen", "whose"],
          ["The teacher ___ helped me", "who"],
          ["The laptop ___ broke", "which"],
        ],
        explain: "Luogo = where; possesso = whose; persona soggetto = who; cosa soggetto = which.",
      },
      {
        type: "mcq",
        prompt: "In which sentence can you leave out the relative pronoun?",
        options: ["The girl who sings in the band is my cousin.", "The bus that goes to the centre is late.", "The cake that you made was delicious.", "The dog which bit me was huge."],
        answer: 2,
        explain: "Solo in **The cake that you made** il pronome è oggetto (segue il soggetto *you*): *The cake you made was delicious.*",
      },
      {
        type: "fill",
        prompt: "Do you remember the name of the hotel ___ we stayed at?",
        answers: ["that", "which"],
        explain: "La preposizione *at* è alla fine, quindi il relativo è oggetto della preposizione: **that/which** (o omesso). *Where* non va bene perché *at* è già presente.",
      },
      {
        type: "mcq",
        prompt: "The painting ___ was stolen from the gallery has been found.",
        options: ["who", "whose", "which", "where"],
        answer: 2,
        explain: "Riferito a una cosa (*the painting*) e soggetto di *was stolen*: **which** (o *that*).",
      },
      {
        type: "mcq",
        prompt: "Is there a shop near here ___ sells phone chargers?",
        options: ["that", "what", "where", "whose"],
        answer: 0,
        explain: "Il pronome è soggetto di *sells* e si riferisce a una cosa: **that** (o *which*). *Where* non va, perché il negozio è chi vende, non il luogo in cui.",
      },
      {
        type: "mcq",
        prompt: "That's the singer ___ songs I can't stop listening to.",
        options: ["who", "who's", "whose", "which"],
        answer: 2,
        explain: "Le canzoni **del** cantante: possesso, quindi **whose**. Attenzione a non confonderlo con *who's* (= who is).",
      },
      {
        type: "mcq",
        prompt: "Which sentence is correct?",
        options: ["The jacket what I bought is too small.", "The jacket I bought it is too small.", "The jacket who I bought is too small.", "The jacket I bought is too small."],
        answer: 3,
        explain: "Il pronome è oggetto (segue *I*), quindi si può omettere: **The jacket I bought**. *What* non è un relativo dopo un nome e *it* non va ripetuto.",
      },
      {
        type: "fill",
        prompt: "A vegetarian is someone ___ doesn't eat meat.",
        answers: ["who", "that"],
        explain: "Riferito a una persona e soggetto di *doesn't eat*: **who** (o *that*). Qui non si può omettere.",
      },
      {
        type: "fill",
        prompt: "I've lost the umbrella ___ you lent me.",
        answers: ["that", "which"],
        explain: "Riferito a una cosa: **that** o **which**. Essendo oggetto di *lent*, nel parlato si potrebbe anche omettere.",
      },
      {
        type: "fill",
        prompt: "Do you know a café ___ we can sit outside?",
        answers: ["where"],
        explain: "Luogo in cui si fa qualcosa: **where**. La relativa ha già un soggetto (*we*) e nessuna preposizione alla fine.",
      },
      {
        type: "fill",
        prompt: "The boy ___ bike you borrowed wants it back.",
        answers: ["whose"],
        explain: "La bici **del** ragazzo: possesso, quindi **whose** + nome.",
      },
      {
        type: "order",
        words: ["The", "people", "we", "met", "on", "holiday", "were", "from", "Canada."],
        translation: "Le persone che abbiamo conosciuto in vacanza erano canadesi.",
        explain: "Il pronome relativo è omesso perché è oggetto di *met* (segue il soggetto *we*).",
      },
      {
        type: "order",
        words: ["Is", "this", "the", "street", "where", "you", "grew", "up?"],
        translation: "È questa la strada dove sei cresciuto?",
        explain: "**where** introduce una relativa di luogo, subito dopo il nome a cui si riferisce (*the street*).",
      },
      {
        type: "judge",
        sentence: "The book that I lent you it was very expensive.",
        isCorrect: false,
        correction: "The book that I lent you was very expensive.",
        explain: "Non si ripete il pronome (*it*) dopo la relativa: il soggetto è già *the book*.",
      },
      {
        type: "judge",
        sentence: "She's the colleague who her husband works at the bank.",
        isCorrect: false,
        correction: "She's the colleague whose husband works at the bank.",
        explain: "Per il possesso (il cui marito) serve **whose**, non *who her*.",
      },
      {
        type: "judge",
        sentence: "The man I was talking to is our new neighbour.",
        isCorrect: true,
        explain: "Corretta: pronome oggetto omesso e preposizione **to** alla fine, come nell'inglese di tutti i giorni.",
      },
      {
        type: "match",
        prompt: "Completa ogni definizione.",
        pairs: [
          ["A pilot is a person", "who flies planes."],
          ["A kitchen is a room", "where people cook."],
          ["A key is an object", "which opens a lock."],
          ["An orphan is a child", "whose parents have died."],
        ],
        explain: "who = persone; where = luoghi; which = cose; whose = possesso.",
      },
      {
        type: "match",
        prompt: "Abbina l'espressione italiana alla traduzione corretta.",
        pairs: [
          ["la ragazza che ho conosciuto", "the girl I met"],
          ["la ragazza che mi ha chiamato", "the girl who called me"],
          ["la ragazza il cui padre è medico", "the girl whose father is a doctor"],
          ["la città dove è nata", "the city where she was born"],
        ],
        explain: "Pronome oggetto omettibile (*the girl I met*); pronome soggetto obbligatorio (*who called*); *whose* per il possesso; *where* per il luogo.",
      },
    ],
  },

  // 9) GERUNDIO VS INFINITO
  {
    id: "b1-gerund-infinitive",
    level: "B1",
    title: "Gerundio o infinito?",
    subtitle: "enjoy doing, want to do e i verbi che cambiano significato",
    icon: "🎯",
    minutes: 16,
    tags: ["gerund", "infinitive", "-ing", "to", "gerundio", "infinito", "stop", "remember"],
    theory: [
      {
        type: "text",
        body: "Quando un verbo è seguito da un altro verbo, in inglese il secondo può essere alla forma **-ing** (gerund) o **to + forma base** (infinito). Non c'è una regola logica universale: dipende dal **primo verbo**, quindi conviene imparare i gruppi.",
      },
      {
        type: "table",
        title: "I gruppi principali",
        headers: ["+ -ing", "+ to + verbo"],
        rows: [
          ["enjoy, mind, finish", "want, need, hope"],
          ["avoid, suggest, keep", "decide, plan, promise"],
          ["can't stand, don't mind", "agree, refuse, offer"],
          ["practise, miss, imagine", "learn, manage, afford"],
          ["give up, look forward to", "would like, would love"],
        ],
      },
      {
        type: "rule",
        title: "Dopo le preposizioni: sempre -ing",
        body: "Dopo **qualsiasi preposizione** (*in, at, of, about, without, before, after*) il verbo va in **-ing**: I'm interested **in learning** Chinese. She left **without saying** goodbye. Attenzione a **look forward to**: *to* è una preposizione, quindi I look forward **to seeing** you.",
      },
      {
        type: "examples",
        items: [
          { en: "I ==enjoy cooking== for my friends.", it: "Mi piace cucinare per i miei amici." },
          { en: "We ==decided to stay== at home.", it: "Abbiamo deciso di restare a casa." },
          { en: "==Swimming== is good for your back.", it: "Nuotare fa bene alla schiena. (gerundio come soggetto)" },
          { en: "I went to the shop ==to buy== some milk.", it: "Sono andato al negozio per comprare il latte. (scopo)" },
        ],
      },
      {
        type: "rule",
        title: "Verbi che cambiano significato",
        body: "**stop, remember, forget, try** possono andare con entrambe le forme, ma il significato **cambia**. Guarda la tabella qui sotto.",
      },
      {
        type: "table",
        headers: ["Verbo", "+ -ing", "+ to"],
        rows: [
          ["stop", "smettere: I stopped smoking. (non fumo più)", "fermarsi per: I stopped to smoke. (mi sono fermato per fumare)"],
          ["remember", "ricordare un fatto passato: I remember meeting her.", "ricordarsi di fare: Remember to lock the door."],
          ["forget", "dimenticare un fatto passato: I'll never forget seeing the Alps.", "dimenticarsi di fare: I forgot to call him."],
          ["try", "provare come esperimento: Try adding salt.", "sforzarsi, tentare: I tried to open it, but I couldn't."],
        ],
      },
      {
        type: "warning",
        body: "Per esprimere uno **scopo** si usa **to**, non *for*: ✗ *I came here for learn English* → I came here **to learn** English. E dopo *would like* serve sempre *to*: ✗ *I would like going* → I**'d like to go**.",
      },
      {
        type: "tip",
        body: "**like, love, hate, prefer, start, begin, continue** accettano entrambe le forme quasi senza differenza: *I love reading / to read.* Nell'inglese americano *to* è un po' più frequente con *like/love*.",
      },
      {
        type: "warning",
        body: "Non confondere **I'm used to** / **look forward to** (preposizione, + -ing) con l'infinito: ✗ *I look forward to hear from you* → I look forward to **hearing** from you.",
      },
    ],
    exercises: [
      {
        type: "mcq",
        prompt: "I really enjoy ___ in the mountains.",
        options: ["walking", "to walk", "walk", "to walking"],
        answer: 0,
        explain: "**Enjoy** è sempre seguito dalla forma **-ing**: *enjoy walking*.",
      },
      {
        type: "fill",
        prompt: "They promised ___ (help) us with the move.",
        answers: ["to help"],
        hint: "(help)",
        explain: "**Promise** vuole l'infinito con *to*: *promised to help*.",
      },
      {
        type: "mcq",
        prompt: "He stopped ___ because it was bad for his health.",
        options: ["to smoke", "smoke", "smoking", "smoked"],
        answer: 2,
        explain: "*Stop + -ing* = smettere di fare qualcosa. Il motivo (fa male alla salute) indica che ha smesso: **smoking**.",
      },
      {
        type: "fill",
        prompt: "Don't forget ___ (buy) some bread on your way home.",
        answers: ["to buy"],
        hint: "(buy)",
        explain: "*Forget + to* = dimenticarsi di fare qualcosa che si deve fare: **to buy**.",
      },
      {
        type: "judge",
        sentence: "I'm looking forward to see you next week.",
        isCorrect: false,
        correction: "I'm looking forward to seeing you next week.",
        explain: "In *look forward to*, **to** è una preposizione: il verbo che segue va in **-ing**.",
      },
      {
        type: "judge",
        sentence: "I remember visiting this museum when I was a child.",
        isCorrect: true,
        explain: "Corretta: *remember + -ing* = avere il ricordo di un'azione passata.",
      },
      {
        type: "order",
        words: ["She", "left", "without", "saying", "goodbye", "to", "anyone."],
        translation: "È andata via senza salutare nessuno.",
        explain: "Dopo la preposizione **without** il verbo va in **-ing**: *without saying*.",
      },
      {
        type: "match",
        prompt: "Abbina ogni frase al suo significato.",
        pairs: [
          ["I stopped to eat.", "Mi sono fermato per mangiare."],
          ["I stopped eating.", "Ho smesso di mangiare."],
          ["I tried to open the jar.", "Ho cercato di aprire il barattolo (con fatica)."],
          ["Try opening the window.", "Prova ad aprire la finestra (e vedi se aiuta)."],
        ],
        explain: "*stop to* = fermarsi per; *stop -ing* = smettere. *try to* = sforzarsi; *try -ing* = fare un tentativo per vedere il risultato.",
      },
      {
        type: "mcq",
        prompt: "I went to the library ___ for my exam.",
        options: ["for studying", "for study", "studying", "to study"],
        answer: 3,
        explain: "Per esprimere lo **scopo** si usa l'infinito con *to*: **to study**. *For + verbo* è un errore tipico degli italiani.",
      },
      {
        type: "fill",
        prompt: "Would you mind ___ (close) the door, please?",
        answers: ["closing"],
        hint: "(close)",
        explain: "**Mind** è seguito dalla forma **-ing**: *Would you mind closing...?*",
      },
      {
        type: "mcq",
        prompt: "We can't afford ___ a new car this year.",
        options: ["buying", "to buy", "buy", "for buying"],
        answer: 1,
        explain: "**Afford** è seguito dall'infinito con *to*: *can't afford to buy*.",
      },
      {
        type: "mcq",
        prompt: "Have you finished ___ the report?",
        options: ["to write", "write", "writing", "for writing"],
        answer: 2,
        explain: "**Finish** è seguito dalla forma **-ing**: *finished writing*.",
      },
      {
        type: "mcq",
        prompt: "I'm thinking ___ a Spanish course next year.",
        options: ["to do", "do", "of do", "about doing"],
        answer: 3,
        explain: "Dopo una **preposizione** (*about, of*) il verbo va in **-ing**: *thinking about doing*.",
      },
      {
        type: "mcq",
        prompt: "I hope you remembered ___ the cat this morning.",
        options: ["to feed", "feeding", "feed", "fed"],
        answer: 0,
        explain: "*Remember + to* = ricordarsi di fare qualcosa che si deve fare: **to feed**. *Remember + -ing* significa avere il ricordo di un'azione passata.",
      },
      {
        type: "fill",
        prompt: "Paula suggested ___ (take) a taxi because it was late.",
        answers: ["taking"],
        hint: "(take)",
        explain: "**Suggest** è seguito dalla forma **-ing**: *suggested taking*.",
      },
      {
        type: "fill",
        prompt: "They refused ___ (pay) for the broken glass.",
        answers: ["to pay"],
        hint: "(pay)",
        explain: "**Refuse** vuole l'infinito con *to*: *refused to pay*.",
      },
      {
        type: "fill",
        prompt: "I'm really bad at ___ (remember) people's names.",
        answers: ["remembering"],
        hint: "(remember)",
        explain: "Dopo la preposizione **at** il verbo va in **-ing**: *bad at remembering*.",
      },
      {
        type: "fill",
        prompt: "If the radio doesn't work, try ___ (change) the batteries.",
        answers: ["changing"],
        hint: "(change)",
        explain: "*Try + -ing* = fare un tentativo per vedere se risolve il problema: **try changing**.",
      },
      {
        type: "order",
        words: ["Learning", "a", "new", "language", "takes", "a", "lot", "of", "time."],
        translation: "Imparare una nuova lingua richiede molto tempo.",
        explain: "Il **gerundio** può fare da soggetto della frase: *Learning a new language* (in italiano usiamo l'infinito).",
      },
      {
        type: "order",
        words: ["I", "would", "like", "to", "book", "a", "table", "for", "two."],
        translation: "Vorrei prenotare un tavolo per due.",
        explain: "**Would like** è sempre seguito da **to** + forma base.",
      },
      {
        type: "judge",
        sentence: "He avoided to answer my question.",
        isCorrect: false,
        correction: "He avoided answering my question.",
        explain: "**Avoid** è seguito dalla forma **-ing**, mai dall'infinito.",
      },
      {
        type: "judge",
        sentence: "She gave up eating meat two years ago.",
        isCorrect: true,
        explain: "Corretta: **give up** (smettere) è seguito dalla forma **-ing**.",
      },
      {
        type: "judge",
        sentence: "We stopped to buy petrol on the way to Florence.",
        isCorrect: true,
        explain: "Corretta: *stop + to* = fermarsi **per** fare qualcosa. Si sono fermati per fare benzina.",
      },
      {
        type: "match",
        prompt: "Abbina ogni frase al suo significato.",
        pairs: [
          ["I remember locking the door.", "Ho il ricordo di aver chiuso la porta."],
          ["Remember to lock the door.", "Ricordati di chiudere la porta."],
          ["I forgot to lock the door.", "Mi sono dimenticato di chiudere la porta."],
          ["I'll never forget meeting you.", "Non dimenticherò mai il nostro incontro."],
        ],
        explain: "*remember/forget + -ing* = ricordo di un fatto passato; *remember/forget + to* = ricordarsi o dimenticarsi di fare qualcosa.",
      },
      {
        type: "match",
        prompt: "Abbina la frase italiana alla traduzione corretta.",
        pairs: [
          ["Sono venuto per aiutarti.", "I came to help you."],
          ["Grazie per avermi aiutato.", "Thanks for helping me."],
          ["Ho smesso di aiutarlo.", "I stopped helping him."],
          ["Mi sono fermato ad aiutarlo.", "I stopped to help him."],
        ],
        explain: "Scopo = **to**; dopo la preposizione *for* = **-ing**; *stop -ing* = smettere; *stop to* = fermarsi per.",
      },
    ],
  },

  // 10) USED TO / WOULD / BE USED TO / GET USED TO
  {
    id: "b1-used-to",
    level: "B1",
    title: "Used to, would, be/get used to",
    subtitle: "Abitudini passate ed essere abituati: forme simili, significati diversi",
    icon: "🔁",
    minutes: 16,
    tags: ["used to", "would", "be used to", "get used to", "abitudini", "essere abituato", "past habits"],
    theory: [
      {
        type: "text",
        body: "Queste espressioni si somigliano molto, ma hanno significati diversi. **used to + verbo** parla del passato (\"una volta facevo\"); **be used to / get used to + -ing** parlano dell'essere o del diventare **abituati** a qualcosa.",
      },
      {
        type: "rule",
        title: "used to + forma base: abitudini e stati passati",
        body: "Indica qualcosa che era vero o abituale nel passato e **ora non lo è più**. Corrisponde spesso all'**imperfetto** italiano: I **used to play** football. = Giocavo a calcio (ora non più). Funziona sia con azioni sia con stati (*I used to have long hair*).",
      },
      {
        type: "formula",
        parts: ["Soggetto", "+ used to", "+ forma base"],
      },
      {
        type: "table",
        title: "Forme di used to",
        headers: ["Affermativa", "Negativa", "Domanda"],
        rows: [
          ["I used to live in Milan.", "I didn't use to live in Milan.", "Did you use to live in Milan?"],
          ["She used to be shy.", "She didn't use to be shy.", "Did she use to be shy?"],
        ],
      },
      {
        type: "rule",
        title: "would: solo azioni ripetute",
        body: "**would + forma base** può sostituire *used to* per **azioni ripetute** nel passato, soprattutto nei racconti: Every summer we **would go** to the beach. **Non** si usa per gli **stati**: ✗ *I would have a dog* → I **used to have** a dog.",
      },
      {
        type: "rule",
        title: "be used to / get used to + -ing",
        body: "**be used to** = essere abituato: I**'m used to getting** up early. **get used to** = abituarsi (processo): You'll soon **get used to driving** on the left. Qui *to* è una **preposizione**, quindi segue un **nome** o un verbo in **-ing**.",
      },
      {
        type: "examples",
        items: [
          { en: "I ==used to== ==smoke==, but I gave up.", it: "Fumavo, ma ho smesso." },
          { en: "When I was a kid, my dad ==would read== me a story every night.", it: "Da bambino mio padre mi leggeva una storia ogni sera." },
          { en: "She ==is used to working== nights.", it: "È abituata a lavorare di notte." },
          { en: "I can't ==get used to== the cold weather here.", it: "Non riesco ad abituarmi al freddo di qui." },
        ],
      },
      {
        type: "warning",
        body: "Errori tipici: ✗ *I am used to get up early* → I'm used to **getting** up early. ✗ *I use to go to the gym* (per il presente) → I **usually go** to the gym. Per le abitudini **presenti** si usa *usually* + present simple, non *use to*.",
      },
      {
        type: "warning",
        body: "Nella negativa e nella domanda, dopo *did* si scrive **use** (senza d): Did you **use** to...? / I didn't **use** to...",
      },
      {
        type: "compare",
        left: { label: "used to + verbo base (passato)", items: ["I used to live alone.", "= Vivevo da solo (ora no)."] },
        right: { label: "be used to + -ing (abitudine)", items: ["I'm used to living alone.", "= Sono abituato a vivere da solo."] },
      },
    ],
    exercises: [
      {
        type: "mcq",
        prompt: "When I was younger, I ___ play the violin, but I stopped at 15.",
        options: ["use to", "used to", "am used to", "was used to"],
        answer: 1,
        explain: "Abitudine passata che ora non esiste più: **used to** + forma base.",
      },
      {
        type: "fill",
        prompt: "I'm not used to ___ (drive) on the left.",
        answers: ["driving"],
        hint: "(drive)",
        explain: "Dopo **be used to** (to è preposizione) si usa la forma **-ing**: *driving*.",
      },
      {
        type: "mcq",
        prompt: "Which sentence is NOT correct?",
        options: ["I would have a cat when I was a child.", "We would go camping every summer.", "I used to have a cat when I was a child.", "We used to go camping every summer."],
        answer: 0,
        explain: "*Would* non si usa per gli **stati** (*have* = possedere): serve *I used to have a cat*.",
      },
      {
        type: "fill",
        prompt: "___ you use to walk to school when you were a child?",
        answers: ["Did"],
        explain: "Domanda con *used to*: **Did + soggetto + use to** + verbo.",
      },
      {
        type: "judge",
        sentence: "I didn't used to like vegetables.",
        isCorrect: false,
        correction: "I didn't use to like vegetables.",
        explain: "Dopo **didn't** il verbo va alla forma base: **use to**, senza *d*.",
      },
      {
        type: "judge",
        sentence: "After a few weeks, she got used to living in a big city.",
        isCorrect: true,
        explain: "Corretta: **get used to + -ing** esprime il processo di abituarsi.",
      },
      {
        type: "order",
        words: ["He", "is", "used", "to", "working", "long", "hours."],
        translation: "È abituato a lavorare molte ore.",
        explain: "**be used to + -ing**: *is used to working*.",
      },
      {
        type: "match",
        prompt: "Abbina ogni espressione al suo significato.",
        pairs: [
          ["I used to swim.", "Nuotavo (ora non più)."],
          ["I'm used to swimming.", "Sono abituato a nuotare."],
          ["I'm getting used to swimming.", "Mi sto abituando a nuotare."],
          ["I usually swim.", "Di solito nuoto."],
        ],
        explain: "*used to* = passato; *be used to* = essere abituato; *get used to* = abituarsi; *usually* = abitudine presente.",
      },
      {
        type: "fill",
        prompt: "Don't worry, you'll soon get used to ___ (wear) glasses.",
        answers: ["wearing"],
        hint: "(wear)",
        explain: "**get used to** + **-ing**: *get used to wearing*.",
      },
      {
        type: "mcq",
        prompt: "My grandfather ___ us sweets every Sunday when we visited him.",
        options: ["use to give", "was used to give", "is used to giving", "would give"],
        answer: 3,
        explain: "Azione **ripetuta** nel passato, in un racconto: **would give** (anche *used to give* sarebbe corretto). Le altre forme sono sbagliate.",
      },
      {
        type: "mcq",
        prompt: "There ___ be a cinema in this street, but now it's a supermarket.",
        options: ["would", "used to", "was used to", "use to"],
        answer: 1,
        explain: "Stato passato che ora non esiste più: **used to**. *Would* non si usa per gli stati (*there was / there were*).",
      },
      {
        type: "mcq",
        prompt: "I've lived in Scotland for a year, but I still can't ___ the weather.",
        options: ["used to", "use to", "get used to", "be use to"],
        answer: 2,
        explain: "Il processo di abituarsi: **get used to** + nome (*the weather*).",
      },
      {
        type: "mcq",
        prompt: "\"Did you use to wear glasses?\" \"No, I ___ .\"",
        options: ["wasn't", "didn't", "usedn't", "don't"],
        answer: 1,
        explain: "La domanda è costruita con *did*, quindi la risposta breve è **No, I didn't**.",
      },
      {
        type: "mcq",
        prompt: "Farmers ___ getting up before sunrise.",
        options: ["are used to", "used to", "use to", "would"],
        answer: 0,
        explain: "Dopo *getting* (forma -ing) serve **be used to** = essere abituati. *Used to* vorrebbe la forma base (*used to get up*).",
      },
      {
        type: "fill",
        prompt: "My brother ___ (used to / have) long hair, but now he's bald.",
        answers: ["used to have"],
        hint: "(used to / have)",
        explain: "Stato passato che non è più vero: **used to have**. Con gli stati non si può usare *would*.",
      },
      {
        type: "fill",
        prompt: "Where did you ___ go on holiday when you were a child?",
        answers: ["use to"],
        explain: "Nella domanda, dopo *did*, si scrive **use to** (senza *d*).",
      },
      {
        type: "fill",
        prompt: "It took me months to get used to ___ (speak) English at work.",
        answers: ["speaking"],
        hint: "(speak)",
        explain: "In **get used to**, *to* è una preposizione: segue la forma **-ing**, *speaking*.",
      },
      {
        type: "fill",
        prompt: "When we were kids, we ___ climb trees in the park every afternoon.",
        answers: ["would", "used to", "'d"],
        explain: "Azione **ripetuta** nel passato: vanno bene sia **would** sia *used to*.",
      },
      {
        type: "order",
        words: ["I", "didn't", "use", "to", "like", "coffee."],
        translation: "Prima non mi piaceva il caffè.",
        explain: "Negativa: **didn't use to** + forma base. Dopo *didn't* si scrive *use* senza *d*.",
      },
      {
        type: "order",
        words: ["Are", "you", "used", "to", "the", "noise", "yet?"],
        translation: "Ti sei già abituato al rumore?",
        explain: "**be used to** + nome: domanda con inversione di *are* e soggetto.",
      },
      {
        type: "judge",
        sentence: "I use to go jogging every morning.",
        isCorrect: false,
        correction: "I usually go jogging every morning.",
        explain: "Per le abitudini **presenti** non esiste *use to*: si usa **usually** + present simple.",
      },
      {
        type: "judge",
        sentence: "We're slowly getting used to eat dinner later.",
        isCorrect: false,
        correction: "We're slowly getting used to eating dinner later.",
        explain: "In *get used to*, **to** è una preposizione: il verbo che segue va in **-ing** (*eating*).",
      },
      {
        type: "judge",
        sentence: "My grandparents would sit in the garden for hours every summer.",
        isCorrect: true,
        explain: "Corretta: **would** per un'azione ripetuta nel passato, tipico dei racconti.",
      },
      {
        type: "match",
        prompt: "Abbina ogni frase al suo significato.",
        pairs: [
          ["There used to be a bakery here.", "C'era un panificio qui (ora non più)."],
          ["I'm used to the noise.", "Il rumore non mi dà più fastidio."],
          ["I'm getting used to the noise.", "Pian piano mi sto abituando al rumore."],
          ["I used to hate noise.", "Una volta odiavo il rumore."],
        ],
        explain: "*used to* = passato che non è più vero; *be used to* = essere abituato; *get used to* = abituarsi (processo).",
      },
      {
        type: "match",
        prompt: "Abbina ogni domanda alla risposta più logica.",
        pairs: [
          ["Did you use to play any sports?", "Yes, I played rugby at school."],
          ["Are you used to the spicy food yet?", "Not really, it still burns my mouth."],
          ["What would you do on rainy days as a kid?", "We'd build forts out of cushions."],
          ["Do you still live in Genoa?", "No, but I used to."],
        ],
        explain: "*Did you use to...?* chiede di abitudini passate; *be used to* dell'essere abituati; *would* racconta azioni ripetute; *I used to* è una risposta breve.",
      },
    ],
  },
  // PHRASAL VERBS
  {
    "id": "b1-phrasal-verbs-basics",
    "level": "B1",
    "title": "Phrasal verbs: i più comuni",
    "subtitle": "get up, turn off, look after: verbo + particella e dove mettere il pronome",
    "icon": "🔤",
    "minutes": 15,
    "tags": [
      "phrasal verbs",
      "verbi frasali",
      "particella",
      "separabili",
      "inseparabili",
      "look for",
      "give up",
      "turn off",
      "get up"
    ],
    "theory": [
      {
        "type": "text",
        "body": "Un **phrasal verb** è un verbo seguito da una **particella** (*up, off, out, in, on, away...*): insieme formano un significato nuovo, che spesso **non si deduce dalle parti**. *Give up* non è \"dare su\": vuol dire **arrendersi** o **smettere**. Sono frequentissimi nell'inglese di tutti i giorni, più dei verbi \"colti\" che in italiano useremmo (si dice *put off* più spesso di *postpone*)."
      },
      {
        "type": "rule",
        "title": "Separabili e inseparabili",
        "body": "Molti phrasal verbs con **complemento oggetto** sono **separabili**: il nome può stare in mezzo o dopo la particella (*turn off the light* / *turn the light off*). Ma con un **pronome** (*it, them, him, her, me, us*) il pronome va **sempre in mezzo**: *turn it off*, non ✗ *turn off it*. Altri sono **inseparabili**: verbo e particella restano uniti, anche con un pronome (*look after the kids* / *look after them*). Senza oggetto (**intransitivi**) non c'è nulla da separare: *Wake up! She got up late.*"
      },
      {
        "type": "table",
        "title": "I più comuni",
        "headers": [
          "Phrasal verb",
          "Significato",
          "Esempio"
        ],
        "rows": [
          [
            "get up",
            "alzarsi",
            "I get up at seven."
          ],
          [
            "wake up",
            "svegliarsi",
            "He woke up late."
          ],
          [
            "sit down",
            "sedersi",
            "Please sit down."
          ],
          [
            "turn on / turn off",
            "accendere / spegnere",
            "Turn off the TV."
          ],
          [
            "put on / take off",
            "indossare / togliere",
            "Put on your coat."
          ],
          [
            "look for",
            "cercare",
            "I'm looking for my keys."
          ],
          [
            "look after",
            "occuparsi di",
            "She looks after her sister."
          ],
          [
            "give up",
            "arrendersi, smettere",
            "Don't give up!"
          ],
          [
            "come back",
            "tornare",
            "When will you come back?"
          ],
          [
            "find out",
            "scoprire",
            "I found out the truth."
          ]
        ]
      },
      {
        "type": "examples",
        "title": "In contesto",
        "items": [
          {
            "en": "I ==get up== at seven every day.",
            "it": "Mi alzo alle sette ogni giorno."
          },
          {
            "en": "It's dark. Can you ==turn== the light ==on==?",
            "it": "È buio. Puoi accendere la luce?"
          },
          {
            "en": "Your shoes are dirty. ==Take them off==.",
            "it": "Hai le scarpe sporche. Toglile."
          },
          {
            "en": "She ==looks after== her little brother.",
            "it": "Si occupa del fratellino."
          },
          {
            "en": "I'm ==looking for== a new job.",
            "it": "Sto cercando un nuovo lavoro."
          }
        ]
      },
      {
        "type": "compare",
        "left": {
          "label": "Separabili (oggetto in mezzo)",
          "items": [
            "turn the light off",
            "put your coat on",
            "pick the kids up",
            "give it up"
          ]
        },
        "right": {
          "label": "Inseparabili (uniti)",
          "items": [
            "look after the kids",
            "look for my keys",
            "get on the bus",
            "run into an old friend"
          ]
        }
      },
      {
        "type": "warning",
        "body": "Errore tipico: il pronome **dopo** la particella. ✗ *Turn off it* → **Turn it off**. ✗ *Pick up them* → **Pick them up**. Con il pronome, nei phrasal verbs separabili, si mette sempre in mezzo."
      },
      {
        "type": "warning",
        "body": "Non tradurre alla lettera: *look for* (**cercare**) non è *look at* (**guardare**); *give up* (**arrendersi**) non è *give* (**dare**). Cambia la particella, cambia il significato."
      },
      {
        "type": "tip",
        "body": "Impara i phrasal verbs **dentro una frase**, come blocchi (*turn it off*, *look after the kids*), non in liste di parole sole. Nella pronuncia l'accento cade di solito sulla **particella**: *turn ON*, *give UP*."
      }
    ],
    "exercises": [
      {
        "type": "mcq",
        "prompt": "It's dark in here. Can you ___ the light?",
        "options": [
          "turn on",
          "turn off",
          "give up",
          "find out"
        ],
        "answer": 0,
        "explain": "Con il buio si **accende** la luce: *turn on*. *Turn off* la spegnerebbe."
      },
      {
        "type": "mcq",
        "prompt": "I can't find my glasses. I'm ___ them.",
        "options": [
          "looking for",
          "looking after",
          "looking at",
          "looking up"
        ],
        "answer": 0,
        "explain": "**Look for** = cercare. *Look after* = occuparsi di, *look at* = guardare."
      },
      {
        "type": "mcq",
        "prompt": "She ___ her little brother while her parents are at work.",
        "options": [
          "looks after",
          "looks for",
          "looks at",
          "looks up"
        ],
        "answer": 0,
        "explain": "**Look after** = occuparsi di qualcuno. È inseparabile: *looks after him*."
      },
      {
        "type": "mcq",
        "prompt": "It's cold outside. ___ your coat.",
        "options": [
          "Put on",
          "Take off",
          "Give up",
          "Turn off"
        ],
        "answer": 0,
        "explain": "**Put on** = indossare. Il suo contrario è *take off* (togliere)."
      },
      {
        "type": "mcq",
        "prompt": "I don't know the result yet. I'll ___ tomorrow.",
        "options": [
          "find out",
          "look after",
          "put on",
          "sit down"
        ],
        "answer": 0,
        "explain": "**Find out** = scoprire, venire a sapere."
      },
      {
        "type": "mcq",
        "prompt": "Don't ___! You're almost there.",
        "options": [
          "give up",
          "get up",
          "take off",
          "come back"
        ],
        "answer": 0,
        "explain": "**Give up** = arrendersi, rinunciare."
      },
      {
        "type": "mcq",
        "prompt": "What time do you usually ___ in the morning?",
        "options": [
          "get up",
          "sit down",
          "put on",
          "look for"
        ],
        "answer": 0,
        "explain": "**Get up** = alzarsi dal letto. Senza oggetto: niente da separare."
      },
      {
        "type": "mcq",
        "prompt": "The lights are still on. Please ___.",
        "options": [
          "turn them off",
          "turn off them",
          "off turn them",
          "turn them of"
        ],
        "answer": 0,
        "explain": "Con un **pronome** il phrasal verb separabile si spezza: *turn them off*, mai ✗ *turn off them*."
      },
      {
        "type": "mcq",
        "prompt": "These shoes are dirty. ___ before you come in.",
        "options": [
          "Take them off",
          "Take off them",
          "Off take them",
          "Take them of"
        ],
        "answer": 0,
        "explain": "Il pronome *them* va **in mezzo**: *take them off*."
      },
      {
        "type": "fill",
        "prompt": "Please ___ down and relax.",
        "answers": [
          "sit"
        ],
        "hint": "sedersi",
        "explain": "**Sit down** = sedersi."
      },
      {
        "type": "fill",
        "prompt": "I usually wake ___ at six.",
        "answers": [
          "up"
        ],
        "explain": "**Wake up** = svegliarsi."
      },
      {
        "type": "fill",
        "prompt": "She gave ___ smoking last year.",
        "answers": [
          "up"
        ],
        "explain": "**Give up** + -ing = smettere di fare qualcosa."
      },
      {
        "type": "fill",
        "prompt": "Can you look ___ my dog while I'm away?",
        "answers": [
          "after"
        ],
        "hint": "occuparsi di",
        "explain": "**Look after** = occuparsi di, badare a."
      },
      {
        "type": "fill",
        "prompt": "I'm looking ___ a new flat in the city centre.",
        "answers": [
          "for"
        ],
        "hint": "cercare",
        "explain": "**Look for** = cercare."
      },
      {
        "type": "fill",
        "prompt": "Take ___ your shoes, please.",
        "answers": [
          "off"
        ],
        "hint": "togliere",
        "explain": "**Take off** = togliere (un capo di abbigliamento). Il contrario è *put on*."
      },
      {
        "type": "order",
        "words": [
          "Turn",
          "it",
          "off",
          "before",
          "you",
          "leave."
        ],
        "translation": "Spegnilo prima di uscire.",
        "explain": "**Turn off** è separabile: con il pronome *it* va in mezzo, *turn it off*."
      },
      {
        "type": "order",
        "words": [
          "She",
          "looks",
          "after",
          "her",
          "grandmother",
          "every",
          "day."
        ],
        "translation": "Si prende cura di sua nonna ogni giorno.",
        "explain": "**Look after** resta unito: *looks after her grandmother*."
      },
      {
        "type": "order",
        "words": [
          "I",
          "found",
          "out",
          "the",
          "truth",
          "yesterday."
        ],
        "translation": "Ho scoperto la verità ieri.",
        "explain": "**Find out** = scoprire. Qui verbo e particella restano uniti."
      },
      {
        "type": "judge",
        "sentence": "Turn off it, please.",
        "isCorrect": false,
        "correction": "Turn it off, please.",
        "explain": "Con un pronome la particella va **dopo** il pronome: *turn it off*."
      },
      {
        "type": "judge",
        "sentence": "She looks after her sister.",
        "isCorrect": true,
        "explain": "Corretta: *look after* = occuparsi di, e resta unito."
      },
      {
        "type": "judge",
        "sentence": "I'm looking for my phone.",
        "isCorrect": true,
        "explain": "Corretta: *look for* = cercare."
      },
      {
        "type": "judge",
        "sentence": "Pick up them from school.",
        "isCorrect": false,
        "correction": "Pick them up from school.",
        "explain": "Il pronome *them* va in mezzo: *pick them up*."
      },
      {
        "type": "judge",
        "sentence": "Put on it, it's cold.",
        "isCorrect": false,
        "correction": "Put it on, it's cold.",
        "explain": "Con un pronome: *put it on*."
      },
      {
        "type": "match",
        "prompt": "Abbina il phrasal verb al significato.",
        "pairs": [
          [
            "give up",
            "arrendersi"
          ],
          [
            "look for",
            "cercare"
          ],
          [
            "look after",
            "occuparsi di"
          ],
          [
            "find out",
            "scoprire"
          ]
        ],
        "explain": "Quattro phrasal verbs di base: cambia la particella e cambia il significato."
      },
      {
        "type": "match",
        "prompt": "Abbina le coppie di contrari.",
        "pairs": [
          [
            "turn on",
            "turn off"
          ],
          [
            "put on",
            "take off"
          ],
          [
            "sit down",
            "stand up"
          ],
          [
            "go out",
            "stay in"
          ]
        ],
        "explain": "Molti phrasal verbs hanno un contrario: basta cambiare la particella."
      }
    ]
  },
];
