import confetti from 'canvas-confetti';
import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { Link, Navigate, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { IArrow, IClose, ISpeaker } from '../components/Icons';
import { LevelBadge, Page } from '../components/ui';
import { levelById } from '../data/levels';
import type { LevelId } from '../data/types';
import type { VocabWord } from '../data/vocab/types';
import { canSpeak, sfx, speak } from '../lib/audio';
import { rise, stagger } from '../lib/motion';
import { useStore } from '../lib/store';
import { VOCAB_LEVELS, buildSession, loadVocab, overview, sameAnswer, spoken, statusOf, type Item } from '../lib/vocab';

const isLevel = (x?: string): x is LevelId => !!x && (VOCAB_LEVELS as string[]).includes(x);

function useWords(level: LevelId) {
  const [data, setData] = useState<{ level: LevelId; words: VocabWord[] } | null>(null);
  useEffect(() => {
    let live = true;
    void loadVocab(level).then((words) => live && setData({ level, words }));
    return () => {
      live = false;
    };
  }, [level]);
  return data?.level === level ? data.words : null;
}

const say = (w: VocabWord) => speak(spoken(w.en), { rate: 0.85 });

function Speak({ word, label = 'Ascolta' }: { word: VocabWord; label?: string }) {
  if (!canSpeak) return null;
  return (
    <button type="button" className="speak-btn" aria-label={`${label}: ${spoken(word.en)}`} onClick={() => say(word)}>
      <ISpeaker width={17} height={17} />
    </button>
  );
}

/* ================= Elenco e panoramica ================= */

export function VocabHub() {
  const { state } = useStore();
  const start: LevelId = state.placement && isLevel(state.placement) ? state.placement : 'A1';
  const [level, setLevel] = useState<LevelId>(start);
  const words = useWords(level);
  const lv = levelById(level)!;
  const [open, setOpen] = useState<string | null>(null);
  const [nowMs] = useState(() => Date.now());
  const ov = useMemo(() => (words ? overview(words, state.vocab, nowMs) : null), [words, state.vocab, nowMs]);
  const themes = useMemo(() => {
    const m = new Map<string, { id: string; title: string; words: VocabWord[] }>();
    for (const w of words ?? []) {
      if (!m.has(w.theme)) m.set(w.theme, { id: w.theme, title: w.themeTitle, words: [] });
      m.get(w.theme)!.words.push(w);
    }
    return [...m.values()];
  }, [words]);
  const todo = ov ? ov.due + ov.newToday : 0;

  return (
    <Page>
      <div className="container narrow" style={{ '--lv-from': lv.from, '--lv-to': lv.to } as CSSProperties}>
        <motion.div variants={stagger} initial="hidden" animate="show">
          <motion.div variants={rise} className="eyebrow">
            Ogni giorno parole nuove
          </motion.div>
          <motion.h1 variants={rise} style={{ fontSize: 'clamp(2.2rem,5vw,3.2rem)', fontWeight: 800, margin: '6px 0 10px' }}>
            <span className="gradient-text">Vocabolario</span>
          </motion.h1>
          <motion.p variants={rise} className="muted">
            Ogni giorno 5 parole nuove del tuo livello, più il ripasso di quelle che stai per dimenticare. Le parole sbagliate tornano presto, quelle sicure si diradano.
          </motion.p>
        </motion.div>

        <div className="vocab-tabs" role="tablist" aria-label="Livello">
          {VOCAB_LEVELS.map((l) => (
            <button key={l} role="tab" aria-selected={l === level} className={`vocab-tab ${l === level ? 'on' : ''}`} onClick={() => setLevel(l)}>
              <LevelBadge id={l} size={30} />
              <span>{levelById(l)?.name}</span>
            </button>
          ))}
        </div>

        {ov && (
          <motion.div className="card vocab-today" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <div className="vocab-today-main">
              <div className="eyebrow">Oggi</div>
              <div className="vocab-today-n">
                {todo > 0 ? (
                  <>
                    {ov.newToday > 0 && <span>{ov.newToday} nuove</span>}
                    {ov.newToday > 0 && ov.due > 0 && <span className="dot"> + </span>}
                    {ov.due > 0 && <span>{ov.due} da ripassare</span>}
                  </>
                ) : (
                  <span>Tutto fatto per oggi</span>
                )}
              </div>
              <div className="faint" style={{ fontSize: '.88rem' }}>
                {ov.known} conosciute · {ov.learning} in studio · {ov.fresh} da scoprire
              </div>
            </div>
            {todo > 0 ? (
              <Link to={`/vocab/${level}/practice`} className="btn btn-primary">
                Inizia <IArrow width={18} height={18} />
              </Link>
            ) : ov.fresh > 0 ? (
              <Link to={`/vocab/${level}/practice?extra=1`} className="btn btn-ghost">
                5 parole in più
              </Link>
            ) : null}
            <div className="vocab-bar" aria-hidden>
              <span className="k" style={{ width: `${(ov.known / ov.total) * 100}%` }} />
              <span className="l" style={{ width: `${(ov.learning / ov.total) * 100}%` }} />
            </div>
          </motion.div>
        )}

        <div className="vocab-themes">
          {!words && <p className="muted" style={{ padding: '30px 0' }}>Carico le parole…</p>}
          {themes.map((t) => {
            const done = t.words.filter((w) => statusOf(state.vocab[w.id]) === 'known').length;
            const seen = t.words.filter((w) => state.vocab[w.id]).length;
            const isOpen = open === t.id;
            return (
              <section key={t.id} className={`card vocab-theme ${isOpen ? 'open' : ''}`}>
                <button type="button" className="vocab-theme-head" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : t.id)}>
                  <span className="vocab-theme-title">{t.title}</span>
                  <span className="faint vocab-theme-n">
                    {seen}/{t.words.length}
                  </span>
                  <span className="vocab-mini" aria-hidden>
                    <span style={{ width: `${(done / t.words.length) * 100}%` }} />
                  </span>
                </button>
                {isOpen && (
                  <ul className="vocab-list">
                    {t.words.map((w) => {
                      const st = statusOf(state.vocab[w.id]);
                      return (
                        <li key={w.id} className={`vocab-row ${st}`}>
                          <span className="vocab-dot" title={st === 'known' ? 'Conosciuta' : st === 'learning' ? 'In studio' : 'Nuova'} />
                          <span className="vocab-word">
                            <strong>{w.en}</strong>
                            <span className="muted"> {w.it}</span>
                            <span className="faint vocab-ex">{w.ex}</span>
                          </span>
                          <Speak word={w} />
                        </li>
                      );
                    })}
                  </ul>
                )}
              </section>
            );
          })}
        </div>
      </div>
    </Page>
  );
}

/* ================= Sessione di studio ================= */

type Phase = 'intro' | 'ask' | 'right' | 'wrong';

export function VocabPractice() {
  const { level: param } = useParams();
  const extra = useSearchParams()[0].get('extra') === '1';
  const { key } = useLocation();
  if (!isLevel(param)) return <Navigate to="/vocab" replace />;
  // la chiave cambia a ogni navigazione: "5 parole in più" riparte con una sessione nuova
  return <Session key={key} level={param} extra={extra} />;
}

function Session({ level, extra }: { level: LevelId; extra: boolean }) {
  const words = useWords(level);
  if (!words) return <main className="container narrow" aria-busy="true"><p className="muted" style={{ textAlign: 'center', padding: '80px 0' }}>Carico…</p></main>;
  return <Run level={level} words={words} extra={extra} />;
}

function Run({ level, words, extra }: { level: LevelId; words: VocabWord[]; extra: boolean }) {
  const nav = useNavigate();
  const { state, recordVocab, addXp } = useStore();
  const lv = levelById(level)!;
  const [plan] = useState(() => buildSession(words, state.vocab, { extra }));
  const [queue, setQueue] = useState<Item[]>(plan);
  const [phase, setPhase] = useState<Phase>(() => (plan[0]?.isNew ? 'intro' : 'ask'));
  const [picked, setPicked] = useState<string | null>(null);
  const [typed, setTyped] = useState('');
  const [firstTry, setFirstTry] = useState(0);
  const [missed, setMissed] = useState<Set<string>>(() => new Set());
  const [done, setDone] = useState(false);
  const total = plan.length;
  const cur = queue[0];
  const timer = useRef<number | undefined>(undefined);
  const inputRef = useRef<HTMLInputElement>(null);
  const advanceMs = state.advanceMs;

  useEffect(() => () => window.clearTimeout(timer.current), []);
  useEffect(() => {
    if (phase === 'ask' && cur?.kind === 'type') inputRef.current?.focus();
  }, [phase, cur]);
  useEffect(() => {
    if (cur && (phase === 'intro' || (phase === 'ask' && cur.kind === 'to-it'))) say(cur.word);
  }, [cur, phase]);

  const next = useCallback(
    (wasWrong: boolean) => {
      window.clearTimeout(timer.current);
      setPicked(null);
      setTyped('');
      setQueue((q) => {
        const [first, ...rest] = q;
        const after = wasWrong ? [...rest, { ...first, isNew: false, kind: 'to-it' as const, options: first.options }] : rest;
        if (!after.length) {
          setDone(true);
          return after;
        }
        setPhase(after[0].isNew ? 'intro' : 'ask');
        return after;
      });
    },
    [],
  );

  const answer = (ok: boolean) => {
    if (!cur) return;
    const w = cur.word;
    const firstAttempt = !missed.has(w.id);
    if (ok) {
      sfx.correct();
      if (firstAttempt) {
        recordVocab(w.id, true);
        setFirstTry((n) => n + 1);
      }
      setPhase('right');
      timer.current = window.setTimeout(() => next(false), Math.max(advanceMs, 700));
    } else {
      sfx.wrong();
      if (firstAttempt) recordVocab(w.id, false);
      setMissed((m) => new Set(m).add(w.id));
      setPhase('wrong');
    }
  };

  const choose = (opt: string) => {
    if (phase !== 'ask' || !cur) return;
    setPicked(opt);
    const right = cur.kind === 'to-it' ? cur.word.it : spoken(cur.word.en);
    answer(opt === right);
  };

  useEffect(() => {
    if (!done) return;
    if (firstTry > 0) addXp(firstTry * 2);
    if (firstTry >= Math.ceil(total * 0.8)) void confetti({ particleCount: 70, spread: 70, origin: { y: 0.7 } });
    // solo una volta, alla fine
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done]);

  if (total === 0 || done)
    return (
      <Page>
        <div className="container narrow" style={{ textAlign: 'center', paddingTop: 70 }}>
          <div className="eyebrow">{total === 0 ? 'Niente da fare' : 'Sessione completata'}</div>
          <h1 style={{ fontSize: 'clamp(2rem,5vw,2.8rem)', fontWeight: 800, margin: '8px 0 12px' }}>
            {total === 0 ? 'Sei in pari' : <><span className="gradient-text">{firstTry}</span> su {total} al primo colpo</>}
          </h1>
          <p className="muted" style={{ maxWidth: 460, margin: '0 auto 26px' }}>
            {total === 0 ? 'Non ci sono parole da ripassare adesso. Torna più tardi, o scopri altre parole nuove.' : `+${firstTry * 2} XP. Le parole sbagliate torneranno a breve, le altre tra qualche giorno.`}
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/vocab" className="btn btn-primary">
              Torna al vocabolario
            </Link>
            {words.some((w) => !state.vocab[w.id]) && (
              <Link to={`/vocab/${level}/practice?extra=1`} className="btn btn-ghost">
                5 parole in più
              </Link>
            )}
          </div>
        </div>
      </Page>
    );

  if (!cur) return null;
  const w = cur.word;
  const answered = phase === 'right' || phase === 'wrong';
  const right = cur.kind === 'to-it' ? w.it : spoken(w.en);
  const progress = ((total - queue.length + (answered ? 0.5 : 0)) / total) * 100;

  return (
    <div className="practice vocab-run" style={{ '--lv-from': lv.from, '--lv-to': lv.to } as CSSProperties}>
        <div className="practice-top">
          <div className="container narrow">
            <button className="icon-btn" aria-label="Esci" onClick={() => nav('/vocab')}>
              <IClose width={20} height={20} />
            </button>
            <div className="progress" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100} aria-label="Avanzamento">
              <div style={{ width: `${progress}%` }} />
            </div>
            <span className="chip">{queue.length} rimaste</span>
          </div>
        </div>

        <div className="container narrow practice-body">
        <AnimatePresence mode="wait">
          <motion.div key={`${w.id}-${phase === 'intro' ? 'i' : 'q'}-${cur.kind}`} className="card vocab-card" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.22 }}>
            {phase === 'intro' ? (
              <>
                <div className="vocab-tag">Parola nuova</div>
                <div className="vocab-big">
                  {w.en} <Speak word={w} />
                </div>
                <div className="vocab-tr">{w.it}</div>
                <div className="vocab-sentence">
                  <div>{w.ex}</div>
                  <div className="faint">{w.exIt}</div>
                </div>
                <button className="btn btn-primary" style={{ marginTop: 22 }} onClick={() => setPhase('ask')} autoFocus>
                  Ho capito
                </button>
              </>
            ) : (
              <>
                <div className="vocab-tag">{cur.kind === 'to-it' ? 'Che cosa significa?' : cur.kind === 'to-en' ? 'Come si dice in inglese?' : 'Scrivilo in inglese'}</div>
                <div className="vocab-big">
                  {cur.kind === 'to-it' ? (
                    <>
                      {w.en} <Speak word={w} />
                    </>
                  ) : (
                    w.it
                  )}
                </div>
                {cur.kind === 'type' ? (
                  <form
                    className="vocab-type"
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!answered && typed.trim()) answer(sameAnswer(typed, w));
                    }}
                  >
                    <input ref={inputRef} value={typed} onChange={(e) => setTyped(e.target.value)} disabled={answered} autoCapitalize="none" autoCorrect="off" spellCheck={false} aria-label="La tua risposta in inglese" placeholder="Scrivi qui" />
                    {!answered && (
                      <button className="btn btn-primary" type="submit" disabled={!typed.trim()}>
                        Verifica
                      </button>
                    )}
                  </form>
                ) : (
                  <div className="vocab-options">
                    {cur.options.map((o) => (
                      <button key={o} className={`vocab-opt ${answered && o === right ? 'good' : ''} ${phase === 'wrong' && o === picked ? 'bad' : ''}`} disabled={answered} onClick={() => choose(o)}>
                        {o}
                      </button>
                    ))}
                  </div>
                )}
                {answered && (
                  <div className={`vocab-feedback ${phase}`} role="status">
                    {phase === 'right' ? <strong>Giusto!</strong> : <strong>La risposta è: {right}</strong>}
                    <div className="vocab-sentence">
                      <div>
                        {w.ex} <Speak word={{ ...w, en: w.ex }} label="Ascolta la frase" />
                      </div>
                      <div className="faint">{w.exIt}</div>
                    </div>
                    {phase === 'wrong' && (
                      <button className="btn btn-primary" style={{ marginTop: 14 }} onClick={() => next(true)} autoFocus>
                        Continua
                      </button>
                    )}
                  </div>
                )}
              </>
            )}
          </motion.div>
        </AnimatePresence>
        </div>
      </div>
  );
}
