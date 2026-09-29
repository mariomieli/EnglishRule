import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { Exercise } from '../data/types';
import { canSpeak, sfx, speak } from '../lib/audio';
import { evaluate, type Answer } from '../lib/grading';
import { shuffle, shuffleDifferent } from '../lib/utils';
import { Rich } from './Rich';
import { SpeakButton } from './ui';

interface Props<T extends Exercise> {
  ex: T;
  answer: Answer;
  setAnswer: (a: Answer) => void;
  checked: boolean;
}

export function ExerciseView(p: Props<Exercise>) {
  const { ex } = p;
  switch (ex.type) {
    case 'mcq':
      return <Mcq {...p} ex={ex} />;
    case 'fill':
      return <Fill {...p} ex={ex} />;
    case 'order':
      return <Order {...p} ex={ex} />;
    case 'judge':
      return <Judge {...p} ex={ex} />;
    case 'match':
      return <Match {...p} ex={ex} />;
    case 'listen':
      return <Listen {...p} ex={ex} />;
    case 'translate':
      return <Translate {...p} ex={ex} />;
    case 'correct':
      return <Correct {...p} ex={ex} />;
  }
}

const shake = { x: [0, -10, 10, -7, 7, -3, 0], transition: { duration: 0.45 } };
const pop = { scale: [1, 1.04, 1], transition: { duration: 0.35 } };

/* ---------------- Scelta multipla ---------------- */

function Mcq({ ex, answer, setAnswer, checked }: Props<Extract<Exercise, { type: 'mcq' }>>) {
  // mescola le opzioni una volta sola, mantenendo l'indice originale
  const order = useMemo(() => shuffle(ex.options.map((_, i) => i)), [ex]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.repeat) return;
      if (checked || e.metaKey || e.ctrlKey) return;
      const n = Number(e.key);
      if (n >= 1 && n <= order.length) {
        sfx.tap();
        setAnswer(order[n - 1]);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [checked, order, setAnswer]);

  return (
    <>
      <h2 className="ex-prompt">
        <Rich text={ex.prompt.replace(/_{2,}/g, '_____')} />
      </h2>
      <div className="options" role="radiogroup">
        {order.map((oi, k) => {
          const sel = answer === oi;
          const cls = checked ? (oi === ex.answer ? 'correct' : sel ? 'wrong' : '') : sel ? 'selected' : '';
          return (
            <motion.button
              key={oi}
              role="radio"
              aria-checked={sel}
              className={`option ${cls}`}
              disabled={checked}
              onClick={() => {
                sfx.tap();
                setAnswer(oi);
              }}
              initial={{ opacity: 0, y: 14 }}
              animate={checked && cls === 'wrong' ? { opacity: 1, y: 0, ...shake } : checked && cls === 'correct' ? { opacity: 1, y: 0, ...pop } : { opacity: 1, y: 0 }}
              transition={{ delay: checked ? 0 : 0.05 * k }}
              whileTap={checked ? undefined : { scale: 0.98 }}
            >
              <span className="key">{k + 1}</span>
              <span lang="en">
                <Rich text={ex.options[oi]} />
              </span>
            </motion.button>
          );
        })}
      </div>
    </>
  );
}

/* ---------------- Completamento ---------------- */

function Fill({ ex, answer, setAnswer, checked }: Props<Extract<Exercise, { type: 'fill' }>>) {
  const ref = useRef<HTMLInputElement>(null);
  const [before, after = ''] = ex.prompt.split(/_{2,}/);
  const val = typeof answer === 'string' ? answer : '';
  const ok = checked && evaluate(ex, val);

  useEffect(() => {
    // su mobile evitiamo di aprire la tastiera in automatico
    if (window.matchMedia('(pointer: fine)').matches) ref.current?.focus({ preventScroll: true });
  }, []);

  const width = Math.max(5, val.length + 2, ...ex.answers.map((a) => Math.min(a.length, 14)));

  return (
    <>
      <div className="fill-sentence" lang="en">
        <Rich text={before} />
        <motion.input
          ref={ref}
          className={`fill-input ${checked ? (ok ? 'correct' : 'wrong') : ''}`}
          style={{ width: `${width}ch` }}
          value={val}
          onChange={(e) => setAnswer(e.target.value)}
          disabled={checked}
          aria-label="Risposta"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          enterKeyHint="done"
          animate={checked && !ok ? shake : checked ? pop : undefined}
        />
        <Rich text={after} />
      </div>
      {ex.hint && (
        <div className="hint">
          💡 <Rich text={ex.hint} />
        </div>
      )}
    </>
  );
}

/* ---------------- Riordina ---------------- */

function Order({ ex, setAnswer, checked }: Props<Extract<Exercise, { type: 'order' }>>) {
  const tokens = useMemo(() => shuffleDifferent(ex.words.map((w, i) => ({ id: i, w }))), [ex]);
  // salviamo gli id delle tessere; il parent riceve le parole
  const [ids, setIds] = useState<number[]>([]);

  useEffect(() => {
    setAnswer(ids.length ? ids.map((i) => ex.words[i]) : null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids]);

  const ok = checked && evaluate(ex, ids.map((i) => ex.words[i]));
  const toggle = (id: number) => {
    if (checked) return;
    sfx.tap();
    setIds((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));
  };

  return (
    <LayoutGroup>
      {ex.translation && (
        <h2 className="ex-prompt" style={{ fontSize: 'clamp(1.2rem,3vw,1.6rem)' }}>
          “{ex.translation}”
        </h2>
      )}
      <motion.div lang="en" role="group" aria-label="La tua frase" className={`order-answer ${checked ? (ok ? 'correct' : 'wrong') : ''}`} animate={checked && !ok ? shake : undefined}>
        {ids.map((id) => (
          <motion.button layout layoutId={`t${id}`} key={id} className="tile" aria-label={`${ex.words[id]}: toglila dalla frase`} onClick={() => toggle(id)} disabled={checked} transition={{ type: 'spring', stiffness: 500, damping: 35 }}>
            {ex.words[id]}
          </motion.button>
        ))}
        {ids.length === 0 && <span className="faint" style={{ padding: '10px 6px', fontWeight: 600 }}>Tocca le parole nell'ordine giusto</span>}
      </motion.div>
      <div className="order-bank" lang="en" role="group" aria-label="Parole disponibili">
        {tokens.map((t) =>
          ids.includes(t.id) ? (
            <span key={t.id} className="tile-ghost">
              {t.w}
            </span>
          ) : (
            <motion.button layout layoutId={`t${t.id}`} key={t.id} className="tile" onClick={() => toggle(t.id)} disabled={checked} whileTap={{ scale: 0.94 }} transition={{ type: 'spring', stiffness: 500, damping: 35 }}>
              {t.w}
            </motion.button>
          ),
        )}
      </div>
    </LayoutGroup>
  );
}

/* ---------------- Giusta o sbagliata ---------------- */

function Judge({ ex, answer, setAnswer, checked }: Props<Extract<Exercise, { type: 'judge' }>>) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.repeat) return;
      if (checked) return;
      if (e.key === '1') setAnswer(true);
      if (e.key === '2') setAnswer(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [checked, setAnswer]);

  const btn = (v: boolean, label: string, icon: string, k: number) => {
    const sel = answer === v;
    const cls = checked ? (v === ex.isCorrect ? 'correct' : sel ? 'wrong' : '') : sel ? 'selected' : '';
    return (
      <motion.button
        className={`judge-btn ${cls}`}
        disabled={checked}
        onClick={() => {
          sfx.tap();
          setAnswer(v);
        }}
        whileTap={{ scale: 0.97 }}
        animate={checked && cls === 'wrong' ? shake : undefined}
        aria-pressed={sel}
      >
        <span style={{ fontSize: '1.3rem' }}>{icon}</span> {label} <kbd className="hide-mobile">{k}</kbd>
      </motion.button>
    );
  };

  return (
    <>
      <motion.div lang="en" className="judge-sentence" initial={{ rotateX: -40, opacity: 0 }} animate={{ rotateX: 0, opacity: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'center' }}>
          <SpeakButton text={ex.sentence} />
          <span>
            <Rich text={ex.sentence} />
          </span>
        </div>
      </motion.div>
      <div className="judge-btns">
        {btn(true, 'Corretta', '✅', 1)}
        {btn(false, 'Sbagliata', '❌', 2)}
      </div>
    </>
  );
}

/* ---------------- Abbina ---------------- */

function Match({ ex, setAnswer, checked }: Props<Extract<Exercise, { type: 'match' }>>) {
  const left = useMemo(() => shuffle(ex.pairs.map((_, i) => i)), [ex]);
  const right = useMemo(() => shuffleDifferent(ex.pairs.map((_, i) => i)), [ex]);
  const [selL, setSelL] = useState<number | null>(null);
  const [selR, setSelR] = useState<number | null>(null);
  const [done, setDone] = useState<number[]>([]);
  const [wrong, setWrong] = useState<[number, number] | null>(null);
  const mistakes = useRef(0);

  useEffect(() => {
    if (selL === null || selR === null) return;
    if (selL === selR) {
      sfx.correct();
      const nd = [...done, selL];
      setDone(nd);
      if (nd.length === ex.pairs.length) setAnswer({ mistakes: mistakes.current });
    } else {
      sfx.wrong();
      mistakes.current++;
      setWrong([selL, selR]);
      setTimeout(() => setWrong(null), 550);
    }
    setSelL(null);
    setSelR(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selL, selR]);

  const item = (side: 'L' | 'R', i: number, k: number) => {
    const isDone = done.includes(i);
    const sel = side === 'L' ? selL === i : selR === i;
    const isWrong = wrong && (side === 'L' ? wrong[0] === i : wrong[1] === i);
    return (
      <motion.button
        key={side + i}
        className={`match-item ${isDone ? 'done' : isWrong ? 'wrong' : sel ? 'selected' : ''}`}
        aria-pressed={sel}
        aria-label={isDone ? `${ex.pairs[i][side === 'L' ? 0 : 1].replace(/\*/g, '')}, già abbinata` : undefined}
        disabled={isDone || checked}
        onClick={() => {
          sfx.tap();
          if (side === 'L') setSelL(selL === i ? null : i);
          else setSelR(selR === i ? null : i);
        }}
        initial={{ opacity: 0, x: side === 'L' ? -20 : 20 }}
        animate={isWrong ? { opacity: 1, x: [0, -8, 8, -5, 5, 0] } : isDone ? { opacity: 0.6, x: 0, scale: [1, 1.05, 1] } : { opacity: 1, x: 0 }}
        transition={{ delay: isWrong || isDone ? 0 : k * 0.05 }}
        whileTap={{ scale: 0.97 }}
      >
        <Rich text={ex.pairs[i][side === 'L' ? 0 : 1]} />
      </motion.button>
    );
  };

  return (
    <>
      <h2 className="ex-prompt">
        <Rich text={ex.prompt} />
      </h2>
      <div className="match-grid">
        <div className="match-col" role="group" aria-label="Prima colonna">
          {left.map((i, k) => item('L', i, k))}
        </div>
        <div className="match-col" role="group" aria-label="Seconda colonna">
          {right.map((i, k) => item('R', i, k))}
        </div>
      </div>
      <AnimatePresence>
        {done.length === ex.pairs.length && !checked && (
          <motion.p role="status" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="muted" style={{ textAlign: 'center', marginTop: 18, fontWeight: 600 }}>
            {mistakes.current === 0 ? 'Perfetto! Tutte le coppie al primo colpo.' : `Completato con ${mistakes.current} ${mistakes.current === 1 ? 'errore' : 'errori'}.`}
          </motion.p>
        )}
      </AnimatePresence>
    </>
  );
}

/* ---------------- Dettato, traduzione, correzione ---------------- */

function TypeBox({ value, onChange, checked, ok, placeholder, autoFocus }: { value: string; onChange: (v: string) => void; checked: boolean; ok: boolean; placeholder?: string; autoFocus?: boolean }) {
  const ref = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    // su mobile evitiamo di aprire la tastiera in automatico
    if (autoFocus && window.matchMedia('(pointer: fine)').matches) ref.current?.focus({ preventScroll: true });
  }, [autoFocus]);
  return (
    <motion.textarea
      ref={ref}
      lang="en"
      className={`type-box ${checked ? (ok ? 'correct' : 'wrong') : ''}`}
      value={value}
      rows={2}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value.replace(/\n/g, ' '))}
      onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
      disabled={checked}
      aria-label="Risposta"
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="off"
      spellCheck={false}
      animate={checked && !ok ? shake : checked ? pop : undefined}
    />
  );
}

function Listen({ ex, answer, setAnswer, checked }: Props<Extract<Exercise, { type: 'listen' }>>) {
  const val = typeof answer === 'string' ? answer : '';
  const ok = checked && evaluate(ex, val);
  useEffect(() => {
    const t = setTimeout(() => speak(ex.text), 350);
    return () => {
      clearTimeout(t);
      if (canSpeak) speechSynthesis.cancel();
    };
  }, [ex]);
  return (
    <>
      <h2 className="ex-prompt">Ascolta la frase e scrivila</h2>
      <div className="listen-row">
        <button className="listen-btn" onClick={() => speak(ex.text)} aria-label="Riascolta">
          🔊
        </button>
        <button className="btn btn-ghost btn-sm" onClick={() => speak(ex.text, { rate: 0.6 })}>
          🐢 Più lento
        </button>
      </div>
      <TypeBox value={val} onChange={setAnswer} checked={checked} ok={ok} placeholder="Scrivi quello che senti" autoFocus />
    </>
  );
}

function Translate({ ex, answer, setAnswer, checked }: Props<Extract<Exercise, { type: 'translate' }>>) {
  const val = typeof answer === 'string' ? answer : '';
  const ok = checked && evaluate(ex, val);
  return (
    <>
      <h2 className="ex-prompt">Traduci in inglese</h2>
      <p className="ex-source">“{ex.it}”</p>
      <TypeBox value={val} onChange={setAnswer} checked={checked} ok={ok} placeholder="Scrivi la frase in inglese" autoFocus />
      <div className="hint" style={{ marginTop: 10 }}>
        💡 Maiuscole e punteggiatura non contano; puoi usare le forme contratte (I'm) o piene (I am).
      </div>
    </>
  );
}

function Correct({ ex, answer, setAnswer, checked }: Props<Extract<Exercise, { type: 'correct' }>>) {
  // si parte dalla frase sbagliata: basta modificarla
  const started = useRef(false);
  useEffect(() => {
    if (!started.current) {
      started.current = true;
      setAnswer(ex.sentence);
    }
  }, [ex, setAnswer]);
  const val = typeof answer === 'string' ? answer : ex.sentence;
  const ok = checked && evaluate(ex, val);
  return (
    <>
      <h2 className="ex-prompt">C'è un errore: correggi la frase</h2>
      <TypeBox value={val} onChange={setAnswer} checked={checked} ok={ok} autoFocus />
      <div className="hint" style={{ marginTop: 10 }}>
        💡 Modifica il testo qui sopra e riscrivi la frase giusta.
      </div>
    </>
  );
}
