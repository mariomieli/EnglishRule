import { motion, useScroll, useSpring } from 'framer-motion';
import { useEffect, type CSSProperties } from 'react';
import { Link, useParams } from 'react-router-dom';
import { IArrow, IBack, IClock } from '../components/Icons';
import { Theory } from '../components/Theory';
import { LevelBadge, Page, ProgressRing, Stars } from '../components/ui';
import { rise, stagger } from '../lib/motion';
import { lessonById, lessonsByLevel, nextLesson } from '../data';
import { useLesson } from '../data/useLesson';
import { LEVELS, levelById } from '../data/levels';
import { scenariosByLevel } from '../data/speaking';
import { ScenarioGrid } from './Speaking';
import { SESSION_SIZE } from '../lib/pick';
import { useStore } from '../lib/store';
import { pct } from '../lib/utils';
import { LevelCard } from './Home';

export function Levels() {
  const { state } = useStore();
  return (
    <Page>
      <div className="container">
        <motion.div variants={stagger} initial="hidden" animate="show" style={{ marginBottom: 28 }}>
          <motion.div variants={rise} className="eyebrow">
            Quadro Comune Europeo
          </motion.div>
          <motion.h1 variants={rise} style={{ fontSize: 'clamp(2.2rem,5vw,3.4rem)', fontWeight: 800, marginTop: 6 }}>
            Tutti i <span className="gradient-text">livelli</span>
          </motion.h1>
          <motion.p variants={rise} className="muted" style={{ maxWidth: 560 }}>
            Puoi aprire qualsiasi lezione quando vuoi. L'ordine consigliato va da A1 a C2: ogni livello dà per scontato quello precedente.
          </motion.p>
        </motion.div>
        <motion.div className="levels-grid" variants={stagger} initial="hidden" animate="show">
          {LEVELS.map((lv) => (
            <LevelCard key={lv.id} lv={lv} recommended={state.placement === lv.id} />
          ))}
        </motion.div>
      </div>
    </Page>
  );
}

export function LevelPage() {
  const { id = '' } = useParams();
  const lv = levelById(id);
  const { state } = useStore();
  if (!lv) return <Page><div className="container narrow"><div className="card empty-state"><div className="e">🧭</div><h2>Livello non trovato</h2><Link to="/levels" className="btn btn-primary">Tutti i livelli</Link></div></div></Page>;

  const lessons = lessonsByLevel(lv.id);
  const done = lessons.filter((l) => state.completed[l.id]).length;
  const firstTodo = lessons.findIndex((l) => !state.completed[l.id]);
  const vars = { '--lv-from': lv.from, '--lv-to': lv.to } as CSSProperties;

  return (
    <Page>
      <div className="container narrow" style={vars}>
        <Link to="/levels" className="back">
          <IBack /> Tutti i livelli
        </Link>
        <motion.div className="card level-hero" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(600px circle at 0% 0%, ${lv.from}30, transparent 60%)`, pointerEvents: 'none' }} />
          <LevelBadge id={lv.id} size={80} />
          <div className="grow">
            <div className="eyebrow eyebrow-lv" style={{ '--lv': lv.from } as CSSProperties}>
              {lv.tagline}
            </div>
            <h1>
              {lv.name} {lv.emoji}
            </h1>
            <p className="desc">{lv.description}</p>
          </div>
          <ProgressRing value={pct(done, lessons.length)} from={lv.from} to={lv.to} label={`${done}/${lessons.length}`} />
        </motion.div>

        <motion.div className="path" variants={stagger} initial="hidden" animate="show">
          <div className="path-line">
            <motion.div initial={{ height: 0 }} animate={{ height: `${pct(done, lessons.length)}%` }} transition={{ duration: 1.2, delay: 0.4 }} />
          </div>
          {lessons.map((l, i) => {
            const p = state.completed[l.id];
            const isNext = i === firstTodo;
            return (
              <motion.div key={l.id} variants={rise}>
                <Link to={`/lesson/${l.id}`} className="lesson-row" style={isNext ? { borderColor: lv.from, boxShadow: `0 0 0 1px ${lv.from}55, 0 12px 40px -18px ${lv.from}` } : undefined}>
                  <motion.div className={`lesson-node ${p ? 'done' : ''}`} whileHover={{ rotate: [0, -8, 8, 0], scale: 1.08 }} transition={{ duration: 0.4 }}>
                    {l.icon}
                    {p && <span className="check">✓</span>}
                  </motion.div>
                  <div className="info">
                    <div className="faint" style={{ fontSize: '.75rem', fontWeight: 700 }}>
                      LEZIONE {i + 1}
                      {isNext && <span style={{ color: lv.from }}> · CONSIGLIATA</span>}
                    </div>
                    <h3>{l.title}</h3>
                    <div className="sub">{l.subtitle}</div>
                  </div>
                  <div className="meta">
                    {p ? <Stars n={p.stars} /> : <span className="mins" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><IClock width={15} height={15} /> {l.minutes} min</span>}
                    <IArrow width={18} />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {scenariosByLevel(lv.id).length > 0 && (
          <>
            <div className="section-title">
              <div>
                <div className="eyebrow eyebrow-lv" style={{ '--lv': lv.from } as CSSProperties}>
                  Conversazione
                </div>
                <h2>🎙️ Speaking {lv.id}</h2>
              </div>
              <Link to="/speaking" className="muted hide-mobile" style={{ fontWeight: 600 }}>
                Tutti i dialoghi →
              </Link>
            </div>
            <ScenarioGrid list={scenariosByLevel(lv.id)} />
          </>
        )}
      </div>
    </Page>
  );
}

export function LessonPage() {
  const { id = '' } = useParams();
  const lesson = lessonById(id);
  const { lesson: body, failed } = useLesson(lesson ? id : undefined);
  const { state, markTheory } = useStore();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (!lesson || !body) return;
    // la teoria è "letta" quando si arriva in fondo alla pagina
    return scrollYProgress.on('change', (v) => v > 0.92 && markTheory(lesson.id));
  }, [lesson, body, scrollYProgress, markTheory]);

  if (!lesson) return <Page><div className="container narrow"><div className="card empty-state"><div className="e">🔍</div><h2>Lezione non trovata</h2><Link to="/levels" className="btn btn-primary">Tutti i livelli</Link></div></div></Page>;

  const lv = levelById(lesson.level)!;
  const prog = state.completed[lesson.id];
  const nxt = nextLesson(lesson.id);
  const counts = lesson.exerciseCount;

  return (
    <Page>
      <motion.div className="read-progress" style={{ scaleX }} />
      <div className="container narrow">
        <Link to={`/level/${lv.id}`} className="back">
          <IBack /> Livello {lv.id} · {lv.name}
        </Link>
        <motion.div className="lesson-header" variants={stagger} initial="hidden" animate="show">
          <motion.div variants={rise} className="emoji" whileHover={{ rotate: [0, -10, 10, 0] }}>
            {lesson.icon}
          </motion.div>
          <motion.div variants={rise} style={{ minWidth: 0 }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', marginBottom: 8 }}>
              <LevelBadge id={lv.id} size={28} />
              <span className="chip" style={{ padding: '4px 10px', fontSize: '.78rem' }}>
                <IClock width={14} height={14} /> {lesson.minutes} min
              </span>
              {prog && (
                <span className="chip" style={{ padding: '4px 10px', fontSize: '.78rem' }}>
                  <Stars n={prog.stars} /> {prog.best}%
                </span>
              )}
            </div>
            <h1>{lesson.title}</h1>
            <div className="sub">{lesson.subtitle}</div>
          </motion.div>
        </motion.div>

        {body ? (
          <Theory blocks={body.theory} />
        ) : (
          <div className="card empty-state" style={{ margin: '24px 0' }}>
            <div className="e">{failed ? '📡' : '⏳'}</div>
            <h3>{failed ? 'Impossibile caricare la lezione: controlla la connessione.' : 'Carico la teoria…'}</h3>
          </div>
        )}

        <motion.div className="card cta-bar" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div>
            <h3 style={{ fontSize: '1.3rem' }}>Pronto a metterti alla prova?</h3>
            <div className="muted" style={{ fontSize: '.92rem' }}>
              {Math.min(SESSION_SIZE, counts)} esercizi a sessione{counts > SESSION_SIZE ? `, pescati da ${counts} sempre diversi` : ''} · gli errori tornano alla fine
            </div>
          </div>
          <Link to={`/lesson/${lesson.id}/practice`} className="btn btn-primary">
            {prog ? 'Esercitati di nuovo' : 'Inizia gli esercizi'} <IArrow />
          </Link>
        </motion.div>

        {nxt && (
          <div style={{ marginTop: 18, display: 'flex', justifyContent: 'flex-end' }}>
            <Link to={`/lesson/${nxt.id}`} className="muted" style={{ fontWeight: 600, fontSize: '.92rem' }}>
              Lezione successiva: {nxt.title} →
            </Link>
          </div>
        )}
      </div>
    </Page>
  );
}
