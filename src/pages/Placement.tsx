import confetti from 'canvas-confetti';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { IArrow, IClose } from '../components/Icons';
import { Rich } from '../components/Rich';
import { LevelBadge, Page } from '../components/ui';
import { lessonById, lessonsByLevel } from '../data';
import { LEVELS, levelById } from '../data/levels';
import { placement } from '../data/placement';
import { MAX_QUESTIONS, buildDeck, nextLevel, placementResult, recommend, type Answered } from '../lib/placement';
import { track } from '../lib/analytics';
import { sfx } from '../lib/audio';
import { useStore } from '../lib/store';
import { shuffle } from '../lib/utils';
import type { PlacementQuestion } from '../data/types';

export function Placement() {
  const { state, setPlacement, addXp } = useStore();
  const [phase, setPhase] = useState<'intro' | 'quiz' | 'done'>('intro');
  const [picked, setPicked] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Answered[]>([]);

  // domande mescolate per livello, opzioni mescolate per domanda; la prossima dipende dalle risposte
  const deck = useMemo(() => {
    const d = buildDeck(placement);
    return Object.fromEntries(Object.entries(d).map(([l, qs]) => [l, qs.map((q) => ({ ...q, order: shuffle(q.options.map((_, k) => k)) }))])) as Record<string, (PlacementQuestion & { order: number[] })[]>;
  }, []);
  const q = useMemo(() => {
    const lv = nextLevel(answers);
    if (!lv) return null;
    return deck[lv][answers.filter((a) => a.level === lv).length] ?? null;
  }, [answers, deck]);
  const i = answers.length;

  const choose = (k: number) => {
    if (picked !== null || !q) return;
    setPicked(k);
    if (state.sound) sfx.tap();
    setTimeout(() => {
      const nextAnswers = [...answers, { level: q.level, ok: k === q.answer, lesson: q.lesson }];
      setPicked(null);
      setAnswers(nextAnswers);
      if (!nextLevel(nextAnswers)) finish(nextAnswers);
    }, 380);
  };

  const finish = (ans: Answered[]) => {
    const result = placementResult(ans);
    track('placement_done', { level: result, questions: ans.length });
    setPlacement(result);
    addXp(30);
    setPhase('done');
    if (state.sound) sfx.win();
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) confetti({ particleCount: 140, spread: 100, origin: { y: 0.55 } });
  };

  useEffect(() => {
    if (phase !== 'quiz') return;
    const onKey = (e: KeyboardEvent) => {
      if (e.repeat) return;
      const n = Number(e.key);
      if (q && n >= 1 && n <= q.order.length) choose(q.order[n - 1]);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  if (phase === 'intro')
    return (
      <Page>
        <div className="container narrow">
          <motion.div className="card center-card" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <motion.div style={{ fontSize: '4rem' }} animate={{ rotate: [0, -10, 10, 0] }} transition={{ repeat: Infinity, duration: 3, repeatDelay: 1 }}>
              🎯
            </motion.div>
            <h1 style={{ fontSize: 'clamp(2rem,5vw,2.8rem)', fontWeight: 800, margin: '10px 0' }}>
              Test di <span className="gradient-text">livello</span>
            </h1>
            <p className="muted" style={{ maxWidth: 480, margin: '0 auto 24px' }}>
              Il test si adatta alle tue risposte: poche domande (di solito 6-10), che salgono o scendono di difficoltà tra A1 e C2. Rispondi d'istinto: se non conosci la risposta, scegli quella che ti sembra più naturale.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 26, flexWrap: 'wrap' }}>
              {LEVELS.map((l, k) => (
                <motion.span key={l.id} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 * k }}>
                  <LevelBadge id={l.id} size={44} />
                </motion.span>
              ))}
            </div>
            {state.placement && (
              <p className="faint" style={{ marginBottom: 16 }}>
                Risultato precedente: <strong style={{ color: 'var(--text)' }}>{state.placement}</strong>
              </p>
            )}
            <button className="btn btn-primary" onClick={() => setPhase('quiz')}>
              Inizia il test <IArrow />
            </button>
          </motion.div>
        </div>
      </Page>
    );

  if (phase === 'done') {
    const lv = levelById(state.placement ?? 'A1')!;
    const first = lessonsByLevel(lv.id)[0];
    const score = answers.filter((a) => a.ok).length;
    const recs = recommend(answers, lv.id).flatMap((r) => {
      const l = lessonById(r.lesson);
      return l ? [{ ...r, l }] : [];
    });
    return (
      <Page>
        <div className="container narrow">
          <motion.div className="card center-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="eyebrow">Il tuo livello stimato</div>
            <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 180, damping: 12, delay: 0.2 }} style={{ margin: '20px auto', width: 'fit-content' }}>
              <LevelBadge id={lv.id} size={120} />
            </motion.div>
            <h1 style={{ fontSize: 'clamp(2rem,5vw,2.8rem)', fontWeight: 800 }}>
              {lv.name} {lv.emoji}
            </h1>
            <p className="muted" style={{ maxWidth: 480, margin: '10px auto 8px' }}>
              {lv.description}
            </p>
            <p className="faint" style={{ marginBottom: 24 }}>
              {score} risposte corrette su {answers.length} · +30 XP
            </p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 26 }}>
              {LEVELS.map((l) => {
                const mine = answers.filter((a) => a.level === l.id);
                if (!mine.length) return null;
                const ok = mine.filter((a) => a.ok).length;
                return (
                  <div key={l.id} style={{ textAlign: 'center' }}>
                    <LevelBadge id={l.id} size={36} />
                    <div className="faint" style={{ fontSize: '.78rem', fontWeight: 700, marginTop: 4 }}>
                      {ok}/{mine.length}
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ textAlign: 'left', marginBottom: 26 }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: 10 }}>{recs.length ? 'Da rivedere prima di andare avanti' : 'Nessuna lacuna emersa'}</h3>
              {recs.length === 0 && <p className="muted">Hai risposto bene a tutto ciò che ti è stato chiesto fino al tuo livello. Parti dalle lezioni del livello {lv.id}.</p>}
              {recs.map(({ l, misses }) => (
                <Link key={l.id} to={`/lesson/${l.id}`} className="lesson-row" style={{ marginBottom: 8 }}>
                  <div className="lesson-node">{l.icon}</div>
                  <div className="info">
                    <h3>{l.title}</h3>
                    <div className="sub">
                      {misses === 1 ? '1 errore nel test' : `${misses} errori nel test`} · livello {l.level}
                    </div>
                  </div>
                  <div className="meta">
                    <IArrow width={18} />
                  </div>
                </Link>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
              {first && (
                <Link to={`/lesson/${first.id}`} className="btn btn-primary">
                  {recs.length ? `Poi le lezioni del livello ${lv.id}` : `Inizia dal livello ${lv.id}`} <IArrow />
                </Link>
              )}
              <Link to={`/level/${lv.id}`} className="btn btn-ghost">
                Vedi le lezioni
              </Link>
            </div>
          </motion.div>
        </div>
      </Page>
    );
  }

  if (!q) return null;
  const sentence = q.kind === 'sentence';
  const [before, after = ''] = q.prompt.split(/_{2,}/);
  return (
    <div className="practice">
      <div className="practice-top">
        <div className="container narrow">
          <Link to="/" className="icon-btn" aria-label="Esci dal test">
            <IClose />
          </Link>
          <div className="progress" style={{ height: 14 }}>
            <motion.div animate={{ width: `${Math.min(95, ((i + 1) / MAX_QUESTIONS) * 100)}%` }} transition={{ type: 'spring', stiffness: 120, damping: 20 }} />
          </div>
          <span className="faint" style={{ fontWeight: 700, fontSize: '.9rem', minWidth: 52, textAlign: 'right' }}>
            {i + 1}
          </span>
        </div>
      </div>
      <div className="practice-body">
        <div className="container narrow">
          <AnimatePresence mode="wait">
            <motion.div key={i} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.3 }}>
              <div className="ex-type">
                <LevelBadge id={q.level} size={24} /> Scegli l'opzione corretta
              </div>
              <h2 className="ex-prompt">
                <Rich text={before} />
                {!sentence && <span style={{ display: 'inline-block', minWidth: 80, borderBottom: '3px solid var(--accent)', margin: '0 6px' }}>&nbsp;</span>}
                <Rich text={after} />
              </h2>
              <div className="options">
                {q.order.map((k, n) => (
                  <motion.button key={k} className={`option ${picked === k ? 'selected' : ''}`} onClick={() => choose(k)} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: n * 0.05 }} whileTap={{ scale: 0.98 }}>
                    <span className="key">{n + 1}</span>
                    <Rich text={q.options[k]} />
                  </motion.button>
                ))}
              </div>
              <div style={{ textAlign: 'center', marginTop: 18 }}>
                <button className="btn btn-ghost btn-sm" onClick={() => choose(-1)} disabled={picked !== null}>
                  Non lo so 🤷
                </button>
              </div>
              <p className="faint" style={{ marginTop: 14, fontSize: '.85rem', textAlign: 'center' }}>
                Nessun feedback durante il test: il risultato arriva alla fine. Meglio "Non lo so" che tirare a indovinare.
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
