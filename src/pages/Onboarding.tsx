import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IArrow } from '../components/Icons';
import { LevelBadge, LogoLockup } from '../components/ui';
import { lessonsByLevel } from '../data';
import { LEVELS, levelById } from '../data/levels';
import type { LevelId } from '../data/types';
import { useStore } from '../lib/store';

const TIMES = [
  { min: 5, xp: 30, name: 'Rilassato', emoji: '🌿' },
  { min: 10, xp: 50, name: 'Regolare', emoji: '🚶' },
  { min: 15, xp: 100, name: 'Serio', emoji: '🏃' },
  { min: 25, xp: 150, name: 'Intenso', emoji: '🚀' },
];

type LevelChoice = LevelId | 'test';

/** Primo avvio: quanto tempo al giorno, da che livello partire, poi si comincia. */
export function Onboarding() {
  const { completeOnboarding, user, cloud } = useStore();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [goal, setGoal] = useState(50);
  const [level, setLevel] = useState<LevelChoice | null>(null);
  const [manual, setManual] = useState(false);

  const finish = (dest: string) => {
    completeOnboarding({ goal, level: level && level !== 'test' ? level : undefined });
    navigate(dest);
  };
  const next = () => {
    if (step === 1 && level === 'test') return finish('/test');
    setStep((s) => s + 1);
  };
  const chosen = level && level !== 'test' ? levelById(level) : undefined;
  const first = chosen ? lessonsByLevel(chosen.id)[0] : undefined;

  return (
    <main className="container narrow onboarding">
      <div style={{ marginBottom: 22 }}>
        <LogoLockup />
      </div>
      <div className="ob-dots" aria-label={`Passo ${step + 1} di 3`}>
        {[0, 1, 2].map((i) => (
          <span key={i} className={i <= step ? 'on' : ''} />
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.section key={step} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.3 }}>
          {step === 0 && (
            <>
              <div className="eyebrow">Benvenuto in EnglishRule</div>
              <h1 className="ob-title">
                Quanto tempo vuoi studiare <span className="gradient-text">ogni giorno</span>?
              </h1>
              <p className="muted">Sceglilo in base alla tua vita, non alle tue ambizioni: costanza batte intensità. Potrai cambiarlo quando vuoi dal profilo.</p>
              <div className="ob-options">
                {TIMES.map((t) => (
                  <button key={t.min} className={`ob-option ${goal === t.xp ? 'on' : ''}`} onClick={() => setGoal(t.xp)}>
                    <span className="e">{t.emoji}</span>
                    <span>
                      <strong>{t.min} minuti al giorno</strong>
                      <small>
                        {t.name} · obiettivo {t.xp} XP
                      </small>
                    </span>
                  </button>
                ))}
              </div>
            </>
          )}
          {step === 1 && (
            <>
              <div className="eyebrow">Il tuo punto di partenza</div>
              <h1 className="ob-title">
                Che <span className="gradient-text">livello</span> hai?
              </h1>
              <p className="muted">Non serve essere precisi: puoi sempre passare a un altro livello dalle lezioni.</p>
              <div className="ob-options">
                <button className={`ob-option ${level === 'A1' && !manual ? 'on' : ''}`} onClick={() => { setManual(false); setLevel('A1'); }}>
                  <span className="e">🌱</span>
                  <span>
                    <strong>Parto da zero</strong>
                    <small>Livello A1: le basi</small>
                  </span>
                </button>
                <button className={`ob-option ${level === 'test' ? 'on' : ''}`} onClick={() => { setManual(false); setLevel('test'); }}>
                  <span className="e">🎯</span>
                  <span>
                    <strong>Non lo so: fammi fare il test</strong>
                    <small>Circa 2 minuti, si adatta alle tue risposte</small>
                  </span>
                </button>
                <button className={`ob-option ${manual ? 'on' : ''}`} onClick={() => { setManual(true); setLevel(level && level !== 'test' && level !== 'A1' ? level : null); }}>
                  <span className="e">🧭</span>
                  <span>
                    <strong>So già qualcosa: scelgo io</strong>
                    <small>Da A2 a C2</small>
                  </span>
                </button>
              </div>
              {manual && (
                <div className="ob-levels">
                  {LEVELS.filter((l) => l.id !== 'A1').map((l) => (
                    <button key={l.id} className={`ob-level ${level === l.id ? 'on' : ''}`} onClick={() => setLevel(l.id)}>
                      <LevelBadge id={l.id} size={38} />
                      <span>
                        <strong>{l.name}</strong>
                        <small>{l.tagline}</small>
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
          {step === 2 && chosen && (
            <>
              <div className="eyebrow">Tutto pronto</div>
              <h1 className="ob-title">
                Si parte dal livello <span className="gradient-text">{chosen.id}</span>
              </h1>
              <div className="card" style={{ padding: 20, display: 'flex', alignItems: 'center', gap: 16, margin: '18px 0' }}>
                <LevelBadge id={chosen.id} size={64} />
                <div>
                  <strong>
                    {chosen.name} {chosen.emoji}
                  </strong>
                  <div className="muted" style={{ fontSize: '.92rem' }}>
                    {chosen.description}
                  </div>
                  <div className="faint" style={{ fontSize: '.85rem', marginTop: 6 }}>
                    Obiettivo: {TIMES.find((t) => t.xp === goal)?.min ?? 10} minuti al giorno ({goal} XP)
                  </div>
                </div>
              </div>
              <p className="muted">Ogni lezione ha la teoria e 10 esercizi. Quello che sbagli torna in "Ripasso" al momento giusto.</p>
            </>
          )}
        </motion.section>
      </AnimatePresence>

      <div className="ob-actions">
        {step === 2 ? (
          <button className="btn btn-primary" onClick={() => finish(first ? `/lesson/${first.id}` : '/')}>
            Inizia la prima lezione <IArrow />
          </button>
        ) : (
          <button className="btn btn-primary" onClick={next} disabled={step === 1 && !level}>
            {step === 1 && level === 'test' ? 'Inizia il test' : 'Continua'} <IArrow />
          </button>
        )}
        <div className="ob-links">
          {step > 0 && (
            <button className="link-btn" onClick={() => setStep(step - 1)}>
              Indietro
            </button>
          )}
          {cloud && !user && (
            <Link to="/account" className="link-btn">
              Ho già un account
            </Link>
          )}
          <button className="link-btn" onClick={() => finish('/')}>
            Salta
          </button>
        </div>
      </div>
    </main>
  );
}
