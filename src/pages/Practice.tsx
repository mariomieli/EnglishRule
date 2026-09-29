import confetti from 'canvas-confetti';
import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { ExerciseView } from '../components/Exercises';
import { evaluate, given, isComplete, solution, typeLabel, type Answer } from '../lib/grading';
import { IClose } from '../components/Icons';
import { Rich } from '../components/Rich';
import { Theory } from '../components/Theory';
import { Counter, Stars } from '../components/ui';
import { lessonById, nextLesson } from '../data';
import { useLesson, useLessons } from '../data/useLesson';
import { levelById } from '../data/levels';
import type { Exercise, Lesson } from '../data/types';
import { track } from '../lib/analytics';
import { canSpeak, sfx } from '../lib/audio';
import { reviewQueue, starsFor, today, useStore } from '../lib/store';
import { badgesOf, unlockedIds } from '../lib/badges';
import { pickExercises } from '../lib/pick';
import { pct } from '../lib/utils';

interface Item {
  lessonId: string;
  index: number;
  ex: Exercise;
  retry?: boolean;
}

const PRAISE = ['Ottimo!', 'Perfetto!', 'Esatto!', 'Bravissimo!', 'Grande!', 'Impeccabile!', 'Così si fa!'];
const OOPS = ['Non proprio.', 'Quasi!', 'Ops, non è così.', 'Riproviamo più tardi.'];
const pick = (a: string[]) => a[Math.floor(Math.random() * a.length)];

const usable = (e: Exercise) => e.type !== 'listen' || canSpeak;

function Loading({ failed }: { failed?: boolean }) {
  return (
    <main className="container narrow">
      <div className="card empty-state">
        <div className="e">{failed ? '📡' : '⏳'}</div>
        <h2>{failed ? 'Impossibile caricare la lezione' : 'Carico la lezione…'}</h2>
        {failed && (
          <>
            <p className="muted">Controlla la connessione e riprova.</p>
            <button className="btn btn-primary" style={{ marginTop: 12 }} onClick={() => location.reload()}>
              Riprova
            </button>
          </>
        )}
      </div>
    </main>
  );
}

export function LessonPractice() {
  const { id = '' } = useParams();
  const meta = lessonById(id);
  const { lesson, loading, failed } = useLesson(meta ? id : undefined);
  if (!meta) return <NotFound />;
  if (!lesson) return <Loading failed={!loading && failed} />;
  return <LessonSession lesson={lesson} />;
}

function LessonSession({ lesson }: { lesson: Lesson }) {
  const loc = useLocation();
  const { state, markSeen } = useStore();
  const firstTime = !state.completed[lesson.id];
  // 10 esercizi su 25: al primo tentativo la sequenza curata, poi i meno visti
  const items = useMemo<Item[]>(() => {
    return pickExercises(lesson.exercises, state.seen[lesson.id], firstTime, usable).map((index) => ({ lessonId: lesson.id, index, ex: lesson.exercises[index] }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lesson, loc.key]);
  const marked = useRef<Item[] | null>(null);
  useEffect(() => {
    if (!items.length || marked.current === items) return;
    marked.current = items;
    markSeen(lesson.id, items.map((i) => i.index));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);
  return <Session key={loc.key} items={items} mode="lesson" lessonId={lesson.id} title={lesson.title} />;
}

export function ReviewPractice() {
  const { state } = useStore();
  // congeliamo la lista all'avvio della sessione
  const [queue] = useState(() => reviewQueue(state).slice(0, 12));
  const { lessons, loading, failed } = useLessons(queue.map((m) => m.lessonId));
  const items = useMemo<Item[]>(
    () =>
      queue.flatMap((m) => {
        const ex = lessons[m.lessonId]?.exercises[m.index];
        return ex && usable(ex) ? [{ lessonId: m.lessonId, index: m.index, ex }] : [];
      }),
    [queue, lessons],
  );
  if (queue.length && !items.length && (loading || failed)) return <Loading failed={!loading && failed} />;
  if (!items.length)
    return (
      <main className="container narrow">
        <div className="card empty-state">
          <div className="e">🎉</div>
          <h2>Nessun errore da ripassare</h2>
          <p className="muted">Gli esercizi sbagliati finiscono qui automaticamente.</p>
          <Link to="/" className="btn btn-primary" style={{ marginTop: 12 }}>
            Torna alla home
          </Link>
        </div>
      </main>
    );
  return <Session items={items} mode="review" title="Ripasso errori" />;
}

function NotFound() {
  return (
    <main className="container narrow">
      <div className="card empty-state">
        <div className="e">🔍</div>
        <h2>Lezione non trovata</h2>
        <Link to="/" className="btn btn-primary" style={{ marginTop: 12 }}>
          Torna alla home
        </Link>
      </div>
    </main>
  );
}

function Session({ items, mode, lessonId, title }: { items: Item[]; mode: 'lesson' | 'review'; lessonId?: string; title: string }) {
  const navigate = useNavigate();
  const { state, addXp, finishLesson, recordAnswer, recordMistake, clearMistake } = useStore();
  const [queue, setQueue] = useState<Item[]>(items);
  const [pos, setPos] = useState(0);
  const [answer, setAnswer] = useState<Answer>(null);
  const [checked, setChecked] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [firstTry, setFirstTry] = useState(0);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [msg, setMsg] = useState('');
  const [rule, setRule] = useState(false);
  const [done, setDone] = useState<null | { score: number; xp: number; stars: number; improved: boolean; goal: boolean; seconds: number }>(null);
  const [floats, setFloats] = useState<{ id: number; x: number; y: number; n: number }[]>([]);
  const btnRef = useRef<HTMLButtonElement>(null);
  const startedAt = useRef(0);
  const [badgesBefore] = useState(() => unlockedIds(state));
  useEffect(() => {
    startedAt.current = Date.now();
    track(mode === 'review' ? 'review_start' : 'lesson_start', { lesson: lessonId ?? 'review', mode });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const item = queue[pos];
  const { lesson: ruleBody } = useLesson(item?.lessonId);
  const total = items.length;
  const progress = done ? 100 : pct(pos + (checked && correct ? 1 : 0), queue.length);

  const check = useCallback(() => {
    if (!item || checked || !isComplete(item.ex, answer)) return;
    const ok = evaluate(item.ex, answer);
    if (!item.retry) recordAnswer(item.lessonId, item.index, ok);
    setChecked(true);
    setCorrect(ok);
    if (ok) {
      if (state.sound) sfx.correct();
      setMsg(pick(PRAISE));
      if (!item.retry) {
        setFirstTry((n) => n + 1);
        const c = combo + 1;
        setCombo(c);
        setBestCombo((b) => Math.max(b, c));
        const r = btnRef.current?.getBoundingClientRect();
        const fid = Date.now();
        setFloats((f) => [...f, { id: fid, x: r ? r.left + r.width / 2 : window.innerWidth / 2, y: r ? r.top : window.innerHeight - 120, n: c >= 3 ? 15 : 10 }]);
        setTimeout(() => setFloats((f) => f.filter((x) => x.id !== fid)), 1100);
        clearMistake(item.lessonId, item.index);
      }
    } else {
      if (state.sound) sfx.wrong();
      setMsg(pick(OOPS));
      setCombo(0);
      if (!item.retry) {
        recordMistake(item.lessonId, item.index);
        track('exercise_wrong', { lesson: item.lessonId, index: item.index, type: item.ex.type });
        // in modalità lezione riproponiamo l'esercizio alla fine
        if (mode === 'lesson') setQueue((q) => [...q, { ...item, retry: true }]);
      }
    }
  }, [item, checked, answer, combo, mode, state.sound, clearMistake, recordMistake, recordAnswer]);

  const next = useCallback(() => {
    if (pos + 1 < queue.length) {
      setPos((p) => p + 1);
      setAnswer(null);
      setChecked(false);
      setRule(false);
      return;
    }
    // fine sessione
    const score = pct(firstTry, total);
    const perfect = score === 100;
    const xp = firstTry * 10 + (mode === 'lesson' ? 20 : 10) + (perfect ? 20 : 0);
    const before = state.xpByDay[today()] ?? 0;
    const goal = before < state.dailyGoal && before + xp >= state.dailyGoal;
    addXp(xp);
    track(mode === 'review' ? 'review_done' : 'lesson_done', { lesson: lessonId ?? 'review', score });
    let stars = starsFor(score);
    let improved = false;
    if (mode === 'lesson' && lessonId) ({ stars, improved } = finishLesson(lessonId, score));
    setDone({ score, xp, stars, improved, goal, seconds: Math.round((Date.now() - startedAt.current) / 1000) });
    if (state.sound) sfx.win();
    if (score >= 70) celebrate(score === 100);
  }, [pos, queue.length, firstTry, total, mode, lessonId, addXp, finishLesson, state.sound, state.xpByDay, state.dailyGoal]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.repeat) return;
      if (e.key !== 'Enter' || done) return;
      e.preventDefault();
      if (checked) next();
      else check();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [checked, check, next, done]);

  const exit = () => {
    if (!done && pos > 0 && !confirm('Vuoi davvero uscire? I progressi di questa sessione andranno persi.')) return;
    if (!done) track('session_abandon', { lesson: lessonId ?? 'review', pos, total });
    navigate(lessonId ? `/lesson/${lessonId}` : '/review');
  };

  if (done) return <Result {...done} badgesBefore={badgesBefore} total={total} firstTry={firstTry} bestCombo={bestCombo} mode={mode} lessonId={lessonId} />;
  if (!item) return null;

  const tl = typeLabel[item.ex.type];
  const sol = solution(item.ex);
  const mine = !correct && checked ? given(item.ex, answer) : null;
  const ruleLesson = lessonById(item.lessonId);
  const ruleBlocks = ruleBody?.theory.filter((b) => b.type === 'rule' || b.type === 'formula' || b.type === 'warning' || b.type === 'tip' || b.type === 'compare' || b.type === 'table') ?? [];

  return (
    <div className="practice">
      <div className="practice-top">
        <div className="container narrow">
          <button className="icon-btn" onClick={exit} aria-label="Esci dalla sessione">
            <IClose />
          </button>
          <div className="progress" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label={`Avanzamento: ${title}`}>
            <motion.div initial={false} animate={{ width: `${Math.max(3, progress)}%` }} transition={{ type: 'spring', stiffness: 120, damping: 20 }} />
          </div>
          <AnimatePresence mode="popLayout">
            <motion.div key={combo} className="combo" aria-hidden={combo < 2} initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: 1, opacity: combo >= 2 ? 1 : 0 }} exit={{ scale: 1.6, opacity: 0 }}>
              🔥 x{combo}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="practice-body">
        <div className="container narrow">
          <AnimatePresence mode="wait">
            <motion.div
              key={pos}
              initial={{ opacity: 0, x: 60, filter: 'blur(4px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: -60, filter: 'blur(4px)' }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="ex-type">
                <span>{tl.icon}</span> {tl.label}
                {item.retry && <span style={{ color: 'var(--warn)' }}>· secondo tentativo</span>}
                {mode === 'review' && <span className="faint">· {lessonById(item.lessonId)?.title}</span>}
              </div>
              <ExerciseView ex={item.ex} answer={answer} setAnswer={setAnswer} checked={checked} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <motion.div className={`practice-foot ${checked ? (correct ? 'good' : 'bad') : ''}`} layout>
        <div className="container narrow">
          <AnimatePresence mode="wait">
            {checked ? (
              <motion.div key="fb" className={`feedback ${correct ? 'good' : 'bad'}`} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} aria-live="polite">
                <motion.div className="badge" initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 400, damping: 15 }}>
                  {correct ? '✓' : '✗'}
                </motion.div>
                <div style={{ minWidth: 0 }}>
                  <h4>{msg}</h4>
                  {mine && (
                    <div className="answer mine">
                      Tu: <Rich text={mine} />
                    </div>
                  )}
                  {!correct && sol && (
                    <div className="answer">
                      Soluzione: <Rich text={sol} />
                    </div>
                  )}
                  <div className="explain">
                    <Rich text={item.ex.explain} />
                  </div>
                  {!correct && ruleBlocks.length > 0 && (
                    <button className="btn btn-ghost btn-sm" style={{ marginTop: 8 }} onClick={() => setRule(true)}>
                      📖 Rivedi la regola
                    </button>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div key="hint" className="faint hide-mobile" style={{ flex: 1, fontSize: '.85rem', fontWeight: 600 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                Premi <kbd>Invio</kbd> per verificare
                {item.ex.type === 'mcq' && (
                  <>
                    {' '}
                    · <kbd>1</kbd>-<kbd>{item.ex.options.length}</kbd> per scegliere
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
          <button ref={btnRef} className={`btn ${checked ? (correct ? 'btn-good' : 'btn-bad') : 'btn-primary'}`} onClick={checked ? next : check} disabled={!checked && !isComplete(item.ex, answer)}>
            {checked ? (pos + 1 < queue.length ? 'Continua' : 'Vedi risultato') : 'Verifica'}
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {rule && ruleLesson && (
          <motion.div className="rule-sheet-bg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setRule(false)}>
            <motion.div className="rule-sheet" role="dialog" aria-label={`Regola: ${ruleLesson.title}`} initial={{ y: 80 }} animate={{ y: 0 }} exit={{ y: 80 }} onClick={(e) => e.stopPropagation()}>
              <div className="rule-sheet-head">
                <h3>
                  {ruleLesson.icon} {ruleLesson.title}
                </h3>
                <button className="icon-btn" onClick={() => setRule(false)} aria-label="Chiudi">
                  <IClose />
                </button>
              </div>
              <Theory blocks={ruleBlocks} />
              <Link to={`/lesson/${ruleLesson.id}`} className="btn btn-ghost btn-sm" style={{ marginTop: 12 }}>
                Apri la lezione completa
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {floats.map((f) => (
          <motion.div key={f.id} className="xp-float" style={{ left: f.x, top: f.y }} initial={{ opacity: 0, y: 0, x: '-50%', scale: 0.6 }} animate={{ opacity: [0, 1, 1, 0], y: -90, scale: 1.1 }} transition={{ duration: 1.05, ease: 'easeOut' }}>
            +{f.n} XP
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

function celebrate(big: boolean) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const colors = ['#8b6cff', '#ff4fa3', '#ffb347', '#2ee6a6', '#38bdf8'];
  confetti({ particleCount: big ? 160 : 90, spread: 90, origin: { y: 0.6 }, colors });
  if (big) {
    setTimeout(() => confetti({ particleCount: 70, angle: 60, spread: 60, origin: { x: 0, y: 0.7 }, colors }), 250);
    setTimeout(() => confetti({ particleCount: 70, angle: 120, spread: 60, origin: { x: 1, y: 0.7 }, colors }), 400);
  }
}

function Result({ score, xp, stars, improved, goal, total, firstTry, bestCombo, mode, lessonId, seconds, badgesBefore }: { badgesBefore: Set<string>; score: number; xp: number; stars: number; improved: boolean; goal: boolean; total: number; firstTry: number; bestCombo: number; mode: 'lesson' | 'review'; lessonId?: string; seconds: number }) {
  const { state } = useStore();
  const newBadges = useMemo(() => badgesOf(state).filter((b) => b.ok && !badgesBefore.has(b.id)), [state, badgesBefore]);
  const lesson = lessonId ? lessonById(lessonId) : undefined;
  const nxt = lessonId ? nextLesson(lessonId) : undefined;
  const lv = lesson ? levelById(lesson.level) : undefined;
  const title = score === 100 ? 'Perfetto!' : score >= 90 ? 'Eccezionale!' : score >= 70 ? 'Ottimo lavoro!' : score >= 50 ? 'Buon lavoro!' : 'Continua ad allenarti';
  const sub =
    score >= 70
      ? 'Hai padroneggiato questo argomento.'
      : score >= 50
        ? 'Ci sei quasi: ripassa la teoria e riprova per ottenere più stelle.'
        : 'Rileggi la teoria con calma: gli errori sono già nella sezione Ripasso.';
  const mins = Math.floor(seconds / 60);

  return (
    <main className="container narrow result">
      <div className="big-stars">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            initial={{ scale: 0, rotate: -180, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: i < stars ? 1 : 0.18 }}
            transition={{ delay: 0.3 + i * 0.25, type: 'spring', stiffness: 260, damping: 14 }}
            style={{ filter: i < stars ? 'drop-shadow(0 8px 20px rgba(255,190,60,.55))' : 'grayscale(1)' }}
          >
            ⭐
          </motion.span>
        ))}
      </div>
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <span className="gradient-text">{title}</span>
      </motion.h1>
      <motion.p className="muted" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
        {mode === 'review' ? 'Sessione di ripasso completata.' : sub}
        {improved && mode === 'lesson' && score > 0 && <><br /><strong style={{ color: 'var(--good)' }}>Nuovo record personale!</strong></>}
      </motion.p>
      {goal && (
        <motion.div className="chip" style={{ margin: '18px auto 0', width: 'fit-content', borderColor: 'var(--accent-3)' }} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1, type: 'spring' }}>
          🎯 Obiettivo giornaliero raggiunto!
        </motion.div>
      )}
      {newBadges.map((b, i) => (
        <motion.div key={b.id} className="chip" style={{ margin: '12px auto 0', width: 'fit-content', borderColor: 'var(--accent-2)' }} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.2 + i * 0.2, type: 'spring' }}>
          {b.e} Nuovo traguardo: {b.t}
        </motion.div>
      ))}
      <motion.div className="score-grid" initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.1, delayChildren: 0.5 } } }}>
        {[
          { v: <><Counter to={score} />%</>, l: `${firstTry}/${total} al primo colpo` },
          { v: <>+<Counter to={xp} /></>, l: 'XP guadagnati' },
          { v: <>{bestCombo >= 2 ? `🔥${bestCombo}` : mins > 0 ? `${mins}m` : `${seconds}s`}</>, l: bestCombo >= 2 ? 'combo migliore' : 'tempo' },
        ].map((s, i) => (
          <motion.div key={i} className="card" variants={{ hidden: { opacity: 0, y: 20, scale: 0.9 }, show: { opacity: 1, y: 0, scale: 1 } }}>
            <div className="v">{s.v}</div>
            <div className="l">{s.l}</div>
          </motion.div>
        ))}
      </motion.div>
      <motion.div className="actions" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
        {mode === 'lesson' && lessonId && (
          <>
            {nxt && score >= 50 ? (
              <Link to={`/lesson/${nxt.id}`} className="btn btn-primary">
                Prossima: {nxt.title} →
              </Link>
            ) : (
              <Link to={`/lesson/${lessonId}`} className="btn btn-primary">
                Rivedi la teoria
              </Link>
            )}
            <Link to={`/lesson/${lessonId}/practice`} className="btn btn-ghost" onClick={() => window.scrollTo(0, 0)}>
              Riprova
            </Link>
            {lv && (
              <Link to={`/level/${lv.id}`} className="btn btn-ghost">
                Livello {lv.id}
              </Link>
            )}
          </>
        )}
        {mode === 'review' && (
          <Link to="/" className="btn btn-primary">
            Torna alla home
          </Link>
        )}
      </motion.div>
      {lesson && (
        <p className="faint" style={{ marginTop: 26, fontSize: '.85rem' }}>
          <Stars n={stars} /> &nbsp;3 stelle ≥ 90% · 2 stelle ≥ 70% · 1 stella ≥ 50%
        </p>
      )}
    </main>
  );
}
