import confetti from 'canvas-confetti';
import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { IArrow, IBack, IClock, IClose, IMic, ISpeaker } from '../components/Icons';
import { Rich } from '../components/Rich';
import { Counter, LevelBadge, Page, SpeakButton, Stars } from '../components/ui';
import { lessonById } from '../data';
import { LEVELS, levelById } from '../data/levels';
import { SCENARIOS, scenarioById, scenariosByLevel } from '../data/speaking';
import type { SpeakingScenario, SpeakingTurn } from '../data/types';
import { canSpeak, sfx, speak } from '../lib/audio';
import { rise, stagger } from '../lib/motion';
import { alignWords, nearMisses, problemWords, tipsFor, type WordResult } from '../lib/pronunciation';
import { alignRepeat, checkReply, checkTargets, words } from '../lib/speech-eval';
import { starsFor, useStore } from '../lib/store';
import { speechSupported, useSpeech } from '../lib/useSpeech';
import { pct } from '../lib/utils';

/* ================= Elenco scenari ================= */

export function SpeakingHub() {
  const { state } = useStore();
  const done = SCENARIOS.filter((s) => state.speaking[s.id]).length;
  return (
    <Page>
      <div className="container">
        <motion.div variants={stagger} initial="hidden" animate="show" style={{ marginBottom: 10 }}>
          <motion.div variants={rise} className="eyebrow">
            Conversazione
          </motion.div>
          <motion.h1 variants={rise} style={{ fontSize: 'clamp(2.2rem,5vw,3.4rem)', fontWeight: 800, marginTop: 6 }}>
            <span className="gradient-text">Speaking</span> per ogni livello
          </motion.h1>
          <motion.p variants={rise} className="muted" style={{ maxWidth: 620 }}>
            Dialoghi in situazioni reali: ascolti il tuo interlocutore, rispondi a voce e ricevi subito un riscontro. {done > 0 && <strong>{done}/{SCENARIOS.length} completati.</strong>}
          </motion.p>
          {!speechSupported && (
            <motion.div variants={rise} className="tb warning" style={{ marginTop: 14 }}>
              <div className="tb-title">🎙️ Microfono non supportato da questo browser</div>
              <p>Puoi fare tutti i dialoghi scrivendo le risposte. Per parlare usa Chrome, Edge o Safari.</p>
            </motion.div>
          )}
        </motion.div>
        {LEVELS.map((lv) => {
          const list = scenariosByLevel(lv.id);
          if (!list.length) return null;
          return (
            <section key={lv.id} style={{ '--lv-from': lv.from, '--lv-to': lv.to } as CSSProperties}>
              <div className="section-title" style={{ marginTop: 40 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <LevelBadge id={lv.id} size={40} />
                  <div>
                    <div className="eyebrow eyebrow-lv" style={{ '--lv': lv.from } as CSSProperties}>
                      {lv.tagline}
                    </div>
                    <h2 style={{ fontSize: '1.4rem' }}>{lv.name}</h2>
                  </div>
                </div>
              </div>
              <ScenarioGrid list={list} />
            </section>
          );
        })}
      </div>
    </Page>
  );
}

export function ScenarioGrid({ list }: { list: SpeakingScenario[] }) {
  const { state } = useStore();
  return (
    <motion.div className="scenario-grid" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }}>
      {list.map((s) => {
        const p = state.speaking[s.id];
        return (
          <motion.div key={s.id} variants={rise} whileHover={{ y: -5 }}>
            <Link to={`/speaking/${s.id}`} className="card scenario-card">
              <div className="scenario-icon">{s.icon}</div>
              <div style={{ minWidth: 0, flex: 1 }}>
                <h3>{s.title}</h3>
                <p>{s.subtitle}</p>
                <div className="foot">
                  {p ? <Stars n={p.stars} /> : <span style={{ display: 'inline-flex', gap: 4, alignItems: 'center' }}><IClock width={14} height={14} /> {s.minutes} min</span>}
                  <span className="faint">🗣️ {s.partner.split(',')[0]}</span>
                </div>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

/* ================= Sessione di conversazione ================= */

interface Bubble {
  id: number;
  who: 'partner' | 'user' | 'note';
  text: string;
  it?: string;
  ok?: boolean;
}

interface TurnResult {
  points: number; // 0-1
}

export function SpeakingSession() {
  const { id = '' } = useParams();
  const loc = useLocation();
  const s = scenarioById(id);
  if (!s)
    return (
      <Page>
        <div className="container narrow">
          <div className="card empty-state">
            <div className="e">🔍</div>
            <h2>Dialogo non trovato</h2>
            <Link to="/speaking" className="btn btn-primary">
              Tutti i dialoghi
            </Link>
          </div>
        </div>
      </Page>
    );
  return <Session key={loc.key} s={s} />;
}

function Session({ s }: { s: SpeakingScenario }) {
  const [phase, setPhase] = useState<'intro' | 'talk' | 'done'>('intro');
  const [results, setResults] = useState<TurnResult[]>([]);
  if (phase === 'intro') return <Intro s={s} onStart={() => setPhase('talk')} />;
  if (phase === 'talk')
    return (
      <Talk
        s={s}
        onDone={(r) => {
          setResults(r);
          setPhase('done');
        }}
      />
    );
  return <Done s={s} results={results} />;
}

function Intro({ s, onStart }: { s: SpeakingScenario; onStart: () => void }) {
  const lv = levelById(s.level)!;
  return (
    <Page>
      <div className="container narrow">
        <Link to="/speaking" className="back">
          <IBack /> Tutti i dialoghi
        </Link>
        <motion.div className="lesson-header" variants={stagger} initial="hidden" animate="show">
          <motion.div variants={rise} className="emoji">
            {s.icon}
          </motion.div>
          <motion.div variants={rise} style={{ minWidth: 0 }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8, flexWrap: 'wrap' }}>
              <LevelBadge id={lv.id} size={28} />
              <span className="chip" style={{ padding: '4px 10px', fontSize: '.78rem' }}>
                🎙️ Speaking · {s.minutes} min
              </span>
            </div>
            <h1>{s.title}</h1>
            <div className="sub">{s.subtitle}</div>
          </motion.div>
        </motion.div>

        <div className="theory">
          <motion.div className="tb rule" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <div className="tb-title">📍 La situazione</div>
            <p>{s.context}</p>
            <p className="faint" style={{ marginTop: 8 }}>
              Parlerai con <strong style={{ color: 'var(--text)' }}>{s.partner}</strong>.
            </p>
          </motion.div>
          <motion.div className="tb" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <div className="tb-title">🎯 Obiettivi</div>
            <ul className="goals">
              {s.goals.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ul>
            {s.lessons.length > 0 && (
              <div className="faint" style={{ fontSize: '.88rem', marginTop: 10 }}>
                Grammatica collegata:{' '}
                {s.lessons.map((l, i) => (
                  <span key={l}>
                    {i > 0 && ', '}
                    <Link to={`/lesson/${l}`} className="link-btn">
                      {lessonById(l)?.title ?? l}
                    </Link>
                  </span>
                ))}
              </div>
            )}
          </motion.div>
          <motion.div className="tb" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <div className="tb-title">💬 Frasi utili</div>
            <div className="examples">
              {s.phrases.map((p) => (
                <div className="example" key={p.en}>
                  <SpeakButton text={p.en} />
                  <div className="body">
                    <div className="en">
                      <Rich text={p.en} />
                    </div>
                    <div className="it">{p.it}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div className="card cta-bar" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <div>
            <h3 style={{ fontSize: '1.2rem' }}>{speechSupported ? 'Tieni pronto il microfono' : 'Risponderai scrivendo'}</h3>
            <div className="muted" style={{ fontSize: '.9rem' }}>
              {speechSupported ? 'Il browser ti chiederà il permesso di usare il microfono. Puoi sempre scrivere la risposta.' : 'Questo browser non supporta il riconoscimento vocale.'}
            </div>
          </div>
          <button className="btn btn-primary" onClick={onStart}>
            Inizia il dialogo <IArrow />
          </button>
        </motion.div>
      </div>
    </Page>
  );
}

const partnerName = (s: SpeakingScenario) => s.partner.split(',')[0].trim();

function Talk({ s, onDone }: { s: SpeakingScenario; onDone: (r: TurnResult[]) => void }) {
  const navigate = useNavigate();
  const { state } = useStore();
  const [idx, setIdx] = useState(0);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [results, setResults] = useState<TurnResult[]>([]);
  const [autoplay, setAutoplay] = useState(true);
  const endRef = useRef<HTMLDivElement>(null);
  const dockRef = useRef<HTMLDivElement>(null);
  const [dockH, setDockH] = useState(360);
  const bid = useRef(0);

  // la chat lascia sempre spazio al pannello della risposta, qualunque sia la sua altezza
  useEffect(() => {
    const el = dockRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setDockH(el.offsetHeight));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const turn = s.turns[idx];

  const push = useCallback((b: Omit<Bubble, 'id'>) => setBubbles((x) => [...x, { ...b, id: ++bid.current }]), []);

  // battuta del partner all'inizio di ogni turno
  useEffect(() => {
    if (!turn) return;
    if (turn.type === 'reply') push({ who: 'partner', text: turn.partner, it: turn.partnerIt });
    if (turn.type === 'free') push({ who: 'partner', text: turn.question, it: turn.questionIt });
    const line = turn.type === 'reply' ? turn.partner : turn.type === 'free' ? turn.question : turn.en;
    if (autoplay && canSpeak) setTimeout(() => speak(line), 350);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [bubbles, idx, dockH]);

  useEffect(() => () => speechSynthesis?.cancel(), []);

  const complete = (r: TurnResult, userText?: string, ok?: boolean) => {
    if (userText) push({ who: 'user', text: userText, ok });
    const next = [...results, r];
    setResults(next);
    if (idx + 1 < s.turns.length) setIdx(idx + 1);
    else onDone(next);
  };

  const exit = () => {
    if (idx > 0 && !confirm('Vuoi uscire dal dialogo? Il punteggio di questa sessione andrà perso.')) return;
    navigate('/speaking');
  };

  const progress = pct(idx, s.turns.length);

  return (
    <div className="practice">
      <div className="practice-top">
        <div className="container narrow">
          <button className="icon-btn" onClick={exit} aria-label="Esci dal dialogo">
            <IClose />
          </button>
          <div className="progress">
            <motion.div animate={{ width: `${Math.max(3, progress)}%` }} transition={{ type: 'spring', stiffness: 120, damping: 20 }} />
          </div>
          <button className={`icon-btn ${autoplay ? '' : 'muted-btn'}`} onClick={() => setAutoplay(!autoplay)} aria-label={autoplay ? 'Disattiva lettura automatica' : 'Attiva lettura automatica'} title="Lettura automatica delle battute">
            <ISpeaker style={{ opacity: autoplay ? 1 : 0.35 }} />
          </button>
        </div>
      </div>

      <div className="chat container narrow" aria-live="polite" style={{ paddingBottom: dockH + 24 }}>
        <div className="chat-context">
          {s.icon} {s.context}
        </div>
        <AnimatePresence initial={false}>
          {bubbles.map((b) => (
            <motion.div key={b.id} className={`bubble-row ${b.who}`} initial={{ opacity: 0, y: 16, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ type: 'spring', stiffness: 380, damping: 28 }}>
              {b.who === 'partner' && <span className="bubble-avatar">{partnerName(s)[0]}</span>}
              <div className={`bubble ${b.who} ${b.ok === false ? 'weak' : ''}`}>
                {b.who === 'partner' && <div className="bubble-name">{partnerName(s)}</div>}
                <div className="bubble-text" lang="en">
                  <Rich text={b.text} />
                </div>
                {b.it && <BubbleTranslation it={b.it} />}
                {b.who === 'partner' && canSpeak && (
                  <button className="bubble-play" onClick={() => speak(b.text)} aria-label="Riascolta">
                    <ISpeaker width={15} height={15} />
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={endRef} style={{ height: 8 }} />
      </div>

      {turn && (
        <div className="turn-dock" ref={dockRef}>
          <div className="container narrow">
            <AnimatePresence mode="wait">
              <motion.div key={idx} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                {turn.type === 'repeat' && <RepeatTurn turn={turn} sound={state.sound} onComplete={complete} />}
                {turn.type === 'reply' && <ReplyTurn turn={turn} sound={state.sound} onComplete={complete} />}
                {turn.type === 'free' && <FreeTurn turn={turn} sound={state.sound} onComplete={complete} />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
}

function BubbleTranslation({ it }: { it: string }) {
  const [show, setShow] = useState(false);
  return (
    <button className="bubble-it" onClick={() => setShow(!show)}>
      {show ? it : '🇮🇹 Traduci'}
    </button>
  );
}

type Complete = (r: TurnResult, userText?: string, ok?: boolean) => void;

/* ---------- Input voce / tastiera ---------- */

function VoiceInput({ onText, continuous, disabled, maxSeconds, placeholder }: { onText: (t: string) => void; continuous?: boolean; disabled?: boolean; maxSeconds?: number; placeholder?: string }) {
  const sp = useSpeech();
  const [typing, setTyping] = useState(!speechSupported);
  const [typed, setTyped] = useState('');
  const [left, setLeft] = useState<number | null>(null);

  useEffect(() => {
    if (!sp.listening || !maxSeconds) return setLeft(null);
    setLeft(maxSeconds);
    const t0 = Date.now();
    const iv = setInterval(() => {
      const l = Math.max(0, maxSeconds - Math.floor((Date.now() - t0) / 1000));
      setLeft(l);
      if (l === 0) sp.stop();
    }, 250);
    return () => clearInterval(iv);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sp.listening, maxSeconds]);

  const toggle = () => {
    if (sp.listening) return sp.stop();
    sp.start({ continuous, onEnd: (t) => t.trim() && onText(t) });
  };

  if (typing)
    return (
      <form
        className="type-answer"
        onSubmit={(e) => {
          e.preventDefault();
          if (typed.trim()) {
            onText(typed.trim());
            setTyped('');
          }
        }}
      >
        {continuous ? (
          <textarea value={typed} onChange={(e) => setTyped(e.target.value)} placeholder={placeholder ?? 'Scrivi la tua risposta in inglese…'} rows={3} disabled={disabled} autoCapitalize="sentences" spellCheck={false} />
        ) : (
          <input value={typed} onChange={(e) => setTyped(e.target.value)} placeholder={placeholder ?? 'Scrivi la tua risposta in inglese…'} disabled={disabled} autoComplete="off" autoCapitalize="sentences" spellCheck={false} enterKeyHint="send" />
        )}
        <div style={{ display: 'flex', gap: 8 }}>
          {speechSupported && (
            <button type="button" className="btn btn-ghost" onClick={() => setTyping(false)} aria-label="Usa il microfono">
              <IMic />
            </button>
          )}
          <button className="btn btn-primary" disabled={disabled || !typed.trim()} style={{ flex: 1 }}>
            Invia
          </button>
        </div>
      </form>
    );

  return (
    <div className="voice">
      <div className={`live-transcript ${sp.transcript ? '' : 'empty'}`}>{sp.transcript || (sp.listening ? 'Ti ascolto…' : placeholder ?? 'Premi il microfono e parla in inglese')}</div>
      {sp.error && <div className="form-msg err">{sp.error}</div>}
      <div className="voice-row">
        <button type="button" className="link-btn" onClick={() => setTyping(true)}>
          ⌨️ Scrivi
        </button>
        <motion.button
          type="button"
          className={`mic ${sp.listening ? 'on' : ''}`}
          onClick={toggle}
          disabled={disabled}
          whileTap={{ scale: 0.92 }}
          aria-label={sp.listening ? 'Ferma la registrazione' : 'Parla'}
        >
          {sp.listening && (
            <>
              <span className="ring r1" />
              <span className="ring r2" />
            </>
          )}
          {sp.listening ? <span className="stop-square" /> : <IMic width={30} height={30} />}
        </motion.button>
        <span className="faint" style={{ fontSize: '.85rem', fontWeight: 700, minWidth: 44, textAlign: 'right' }}>
          {left !== null ? `${left}s` : sp.listening ? 'REC' : ''}
        </span>
      </div>
    </div>
  );
}

/* ---------- Ripeti ---------- */

function RepeatTurn({ turn, sound, onComplete }: { turn: Extract<SpeakingTurn, { type: 'repeat' }>; sound: boolean; onComplete: Complete }) {
  const [res, setRes] = useState<ReturnType<typeof alignRepeat> | null>(null);
  const [detail, setDetail] = useState<WordResult[]>([]);
  const [best, setBest] = useState(0);
  const [said, setSaid] = useState('');
  const [slow, setSlow] = useState(false);
  const pass = res && res.score >= 80;

  const evaluate = (t: string) => {
    const r = alignRepeat(turn.en, t);
    setRes(r);
    setDetail(alignWords(turn.en, t));
    setSaid(t);
    setBest((b) => Math.max(b, r.score));
    if (sound) (r.score >= 80 ? sfx.correct : sfx.wrong)();
  };

  return (
    <div className="card turn-card">
      <div className="ex-type">🔁 Ascolta e ripeti</div>
      <div className="repeat-line" lang="en">
        {res ? (
          detail.map((w, i) => (
            <motion.span
              key={i}
              className={`w-${w.status}`}
              role={w.status !== 'ok' && canSpeak ? 'button' : undefined}
              onClick={w.status !== 'ok' && canSpeak ? () => speak(w.word, { rate: 0.6 }) : undefined}
              style={w.status !== 'ok' && canSpeak ? { cursor: 'pointer' } : undefined}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
            >
              {w.word}{' '}
            </motion.span>
          ))
        ) : (
          <Rich text={turn.en} />
        )}
      </div>
      <div className="faint" style={{ fontSize: '.9rem', marginBottom: 12 }}>
        {turn.it}
      </div>
      {canSpeak && (
        <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
          <button className="btn btn-ghost btn-sm" onClick={() => speak(turn.en)}>
            <ISpeaker width={16} height={16} /> Ascolta
          </button>
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => {
              setSlow(true);
              speak(turn.en, { rate: 0.7, onEnd: () => setSlow(false) });
            }}
          >
            🐢 {slow ? 'Lento…' : 'Lento'}
          </button>
        </div>
      )}
      {res && (
        <motion.div className={`form-msg ${pass ? 'ok' : 'err'}`} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 12 }}>
          {pass ? `Ottima pronuncia: ${res.score}% delle parole riconosciute.` : `${res.score}% delle parole riconosciute. Rosso: non capita. Arancione: quasi giusta. Tocca una parola per riascoltarla.`}
        </motion.div>
      )}
      {res && <PronunciationTips words={problemWords(detail)} />}
      {pass ? (
        <button className="btn btn-good btn-block" onClick={() => onComplete({ points: best / 100 }, said, true)}>
          Continua
        </button>
      ) : (
        <>
          <VoiceInput onText={evaluate} placeholder="Premi il microfono e ripeti la frase" />
          {res && (
            <button className="link-btn skip" onClick={() => onComplete({ points: best / 100 }, said, false)}>
              Vai avanti comunque
            </button>
          )}
        </>
      )}
    </div>
  );
}

function PronunciationTips({ words: list }: { words: WordResult[] }) {
  if (!list.length) return null;
  return (
    <div className="tips-box">
      {list.map((w) => {
        const tips = tipsFor(w.word);
        return (
          <div key={w.word} className="tip-row">
            <div className="tip-head">
              <strong className={`w-${w.status}`}>{w.word}</strong>
              {w.heard && <span className="faint"> · ho capito «{w.heard}»</span>}
              {!w.heard && <span className="faint"> · non l'ho sentita</span>}
              {canSpeak && (
                <button type="button" className="speak-btn" aria-label={`Ascolta ${w.word}`} onClick={() => speak(w.word, { rate: 0.6 })}>
                  <ISpeaker width={15} height={15} />
                </button>
              )}
            </div>
            {tips.map((t) => (
              <div key={t} className="tip-text">
                {t}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

/** "Forse volevi dire…": parole capite male che somigliano a quelle attese, con i consigli per pronunciarle. */
function NearMissTips({ said, refs }: { said: string; refs: string[] }) {
  const misses = nearMisses(said, refs);
  if (!misses.length) return null;
  return (
    <div className="tips-box" style={{ marginBottom: 12 }}>
      {misses.map((m) => (
        <div key={m.expected} className="tip-row">
          <div className="tip-head">
            <span>
              Forse volevi dire <strong>«{m.expected}»</strong>
            </span>
            <span className="faint"> · ho capito «{m.said}»</span>
            {canSpeak && (
              <button type="button" className="speak-btn" aria-label={`Ascolta ${m.expected}`} onClick={() => speak(m.expected, { rate: 0.6 })}>
                <ISpeaker width={15} height={15} />
              </button>
            )}
          </div>
          {tipsFor(m.expected, 1).map((t) => (
            <div key={t} className="tip-text">
              {t}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

/* ---------- Rispondi ---------- */

function ReplyTurn({ turn, sound, onComplete }: { turn: Extract<SpeakingTurn, { type: 'reply' }>; sound: boolean; onComplete: Complete }) {
  const [tries, setTries] = useState(0);
  const [last, setLast] = useState<{ text: string; ok: boolean; groups: boolean[] } | null>(null);
  const [showModel, setShowModel] = useState(false);
  const points = (n: number) => (n <= 1 ? 1 : n === 2 ? 0.75 : 0.5);

  const evaluate = (t: string) => {
    const r = checkReply(t, turn.keywords, turn.answers);
    const n = tries + 1;
    setTries(n);
    setLast({ text: t, ok: r.ok, groups: r.groups });
    if (sound) (r.ok ? sfx.correct : sfx.wrong)();
  };

  return (
    <div className="card turn-card">
      <div className="ex-type">💬 Tocca a te</div>
      <div className="task">{turn.task}</div>
      {turn.tip && (
        <div className="hint" style={{ marginBottom: 12 }}>
          💡 <Rich text={turn.tip} />
        </div>
      )}

      <AnimatePresence mode="wait">
        {last && (
          <motion.div key={tries} className={`form-msg ${last.ok ? 'ok' : 'err'}`} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 12 }}>
            <div style={{ fontWeight: 700 }}>
              {last.ok ? 'Perfetto, risposta efficace!' : tries === 1 ? 'Non ci siamo ancora: rileggi il compito e riprova.' : 'Quasi. Prova a includere:'}
            </div>
            <div style={{ fontWeight: 500, marginTop: 4, color: 'var(--text-2)' }}>Hai detto: “{last.text}”</div>
            <NearMissTips said={last.text} refs={[...turn.answers, ...turn.keywords.flat()]} />
            {!last.ok && tries >= 2 && (
              <div className="kw-list">
                {turn.keywords.map((g, i) => (
                  <span key={i} className={`kw ${last.groups[i] ? 'ok' : ''}`}>
                    {last.groups[i] ? '✓' : '＋'} {g[0]}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {(showModel || (last && !last.ok && tries >= 3) || last?.ok) && (
        <motion.div className="model-answers" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="eyebrow" style={{ marginBottom: 6 }}>
            {last?.ok ? 'Altri modi per dirlo' : 'Risposte possibili'}
          </div>
          {turn.answers.map((a) => (
            <div key={a} className="model-line">
              <SpeakButton text={a} />
              <span>{a}</span>
            </div>
          ))}
        </motion.div>
      )}

      {last?.ok ? (
        <button className="btn btn-good btn-block" onClick={() => onComplete({ points: points(tries) }, last.text, true)}>
          Continua
        </button>
      ) : (
        <>
          <VoiceInput onText={evaluate} />
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, marginTop: 6 }}>
            {!showModel && tries < 3 ? (
              <button className="link-btn skip" onClick={() => setShowModel(true)}>
                Mostra un esempio
              </button>
            ) : (
              <span />
            )}
            {(tries >= 2 || showModel) && (
              <button className="link-btn skip" onClick={() => onComplete({ points: 0 }, last?.text ?? '…', false)}>
                Salta
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

/* ---------- Parla liberamente ---------- */

function FreeTurn({ turn, sound, onComplete }: { turn: Extract<SpeakingTurn, { type: 'free' }>; sound: boolean; onComplete: Complete }) {
  const [said, setSaid] = useState<string | null>(null);
  const used = useMemo(() => (said ? checkTargets(said, turn.targets) : []), [said, turn.targets]);
  const nWords = said ? words(said).length : 0;
  const minWords = Math.round(turn.seconds * 0.8);
  const points = said ? 0.6 * (used.filter((u) => u.used).length / Math.max(1, used.length)) + 0.4 * Math.min(1, nWords / minWords) : 0;

  return (
    <div className="card turn-card">
      <div className="ex-type">🎤 Parla liberamente · {turn.seconds} secondi</div>
      <div className="task">{turn.task}</div>
      <div className="kw-list" style={{ marginBottom: 12 }}>
        {turn.targets.map((t, i) => (
          <span key={t.label} className={`kw ${said && used[i]?.used ? 'ok' : ''}`}>
            {said ? (used[i]?.used ? '✓' : '✗') : '•'} {t.label}
          </span>
        ))}
      </div>
      {said === null ? (
        <VoiceInput
          continuous
          maxSeconds={turn.seconds}
          placeholder="Premi il microfono e parla: si ferma da solo allo scadere del tempo"
          onText={(t) => {
            setSaid(t);
            if (sound) sfx.correct();
          }}
        />
      ) : (
        <>
          <div className="form-msg ok" style={{ marginBottom: 12, color: 'var(--text)' }}>
            <div style={{ fontWeight: 700, color: 'var(--good)' }}>
              {nWords} parole · {used.filter((u) => u.used).length}/{used.length} strutture usate
            </div>
            <div style={{ fontWeight: 500, marginTop: 6 }}>“{said}”</div>
          </div>
          <NearMissTips said={said} refs={[turn.model, ...turn.targets.flatMap((t) => t.patterns)]} />
          <div className="model-answers">
            <div className="eyebrow" style={{ marginBottom: 6 }}>
              Risposta modello
            </div>
            <div className="model-line">
              <SpeakButton text={turn.model} />
              <span>{turn.model}</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn btn-ghost" onClick={() => setSaid(null)}>
              Riprova
            </button>
            <button className="btn btn-good" style={{ flex: 1 }} onClick={() => onComplete({ points }, said, true)}>
              Termina il dialogo
            </button>
          </div>
        </>
      )}
    </div>
  );
}

/* ---------- Risultato ---------- */

function Done({ s, results }: { s: SpeakingScenario; results: TurnResult[] }) {
  const { finishSpeaking, addXp, state } = useStore();
  const score = Math.round((results.reduce((a, r) => a + r.points, 0) / Math.max(1, results.length)) * 100);
  const [out, setOut] = useState({ stars: starsFor(score), improved: false, xp: 0 });
  const recorded = useRef(false);

  useEffect(() => {
    if (recorded.current) return; // una sola registrazione anche con i doppi effetti in sviluppo
    recorded.current = true;
    const r = finishSpeaking(s.id, score);
    const xp = Math.round(score / 10) * 3 + 15;
    addXp(xp);
    setOut({ ...r, xp });
    if (state.sound) sfx.win();
    if (score >= 70 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) confetti({ particleCount: 120, spread: 90, origin: { y: 0.6 } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const list = scenariosByLevel(s.level);
  const next = list[list.findIndex((x) => x.id === s.id) + 1];

  return (
    <main className="container narrow result">
      <div className="big-stars">
        {[0, 1, 2].map((i) => (
          <motion.span key={i} initial={{ scale: 0, rotate: -180, opacity: 0 }} animate={{ scale: 1, rotate: 0, opacity: i < out.stars ? 1 : 0.18 }} transition={{ delay: 0.3 + i * 0.25, type: 'spring', stiffness: 260, damping: 14 }} style={{ filter: i < out.stars ? 'drop-shadow(0 8px 20px rgba(255,190,60,.55))' : 'grayscale(1)' }}>
            ⭐
          </motion.span>
        ))}
      </div>
      <h1>
        <span className="gradient-text">{score >= 90 ? 'Conversazione eccellente!' : score >= 70 ? 'Ottimo dialogo!' : score >= 50 ? 'Buon lavoro!' : 'Continua ad allenarti'}</span>
      </h1>
      <p className="muted">{score >= 70 ? 'Te la cavi bene in questa situazione.' : 'Riascolta le risposte modello e riprova: la fluidità arriva con la ripetizione.'}</p>
      <div className="score-grid">
        <div className="card">
          <div className="v">
            <Counter to={score} />%
          </div>
          <div className="l">punteggio</div>
        </div>
        <div className="card">
          <div className="v">
            +<Counter to={out.xp} />
          </div>
          <div className="l">XP</div>
        </div>
        <div className="card">
          <div className="v">{s.turns.length}</div>
          <div className="l">battute</div>
        </div>
      </div>
      <div className="actions">
        {next ? (
          <Link to={`/speaking/${next.id}`} className="btn btn-primary">
            Prossimo: {next.title} →
          </Link>
        ) : (
          <Link to="/speaking" className="btn btn-primary">
            Tutti i dialoghi
          </Link>
        )}
        <Link to={`/speaking/${s.id}`} className="btn btn-ghost">
          Riprova
        </Link>
      </div>
    </main>
  );
}
