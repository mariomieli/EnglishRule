import { animate, motion, useInView, useMotionValue, useTransform } from 'framer-motion';
import { useEffect, useId, useRef, useState } from 'react';
import { levelById } from '../data/levels';
import { canSpeak, speak } from '../lib/audio';
import { plain } from '../lib/utils';
import { ISpeaker } from './Icons';

export function LevelBadge({ id, size = 48 }: { id: string; size?: number }) {
  const lv = levelById(id);
  return (
    <span
      className="level-badge"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.4,
        borderRadius: size * 0.3,
        background: `linear-gradient(135deg, ${lv?.from}, ${lv?.to})`,
        boxShadow: `0 8px 24px -8px ${lv?.from}`,
      }}
    >
      {id}
    </span>
  );
}

export function Stars({ n, total = 3 }: { n: number; total?: number }) {
  return (
    <span className="stars" aria-label={`${n} stelle su ${total}`}>
      {Array.from({ length: total }, (_, i) => (
        <span key={i} className={i < n ? '' : 'off'}>
          ⭐
        </span>
      ))}
    </span>
  );
}

export function ProgressRing({ value, size = 96, stroke = 9, from = '#8b6cff', to = '#ff4fa3', label }: { value: number; size?: number; stroke?: number; from?: string; to?: string; label?: string }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const id = `g${useId().replace(/:/g, '')}`;
  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }} aria-hidden>
        <defs>
          <linearGradient id={id}>
            <stop offset="0" stopColor={from} />
            <stop offset="1" stopColor={to} />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} stroke="var(--surface-2)" strokeWidth={stroke} fill="none" />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={`url(#${id})`}
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c * (1 - Math.min(1, value / 100)) }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', textAlign: 'center' }}>
        <div>
          <div className="display" style={{ fontWeight: 800, fontSize: size * 0.24 }}>
            <Counter to={value} />%
          </div>
          {label && <div style={{ fontSize: 11, color: 'var(--text-3)', fontWeight: 700 }}>{label}</div>}
        </div>
      </div>
    </div>
  );
}

export function Counter({ to, duration = 1.1 }: { to: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v).toLocaleString('it-IT'));
  const [txt, setTxt] = useState('0');
  useEffect(() => rounded.on('change', setTxt), [rounded]);
  useEffect(() => {
    if (!inView) return;
    const c = animate(mv, to, { duration, ease: [0.22, 1, 0.36, 1] });
    return () => c.stop();
  }, [inView, to, duration, mv]);
  return <span ref={ref}>{txt}</span>;
}

export function SpeakButton({ text }: { text: string }) {
  const [on, setOn] = useState(false);
  if (!canSpeak) return null;
  return (
    <button
      className={`speak-btn ${on ? 'on' : ''}`}
      aria-label="Ascolta la pronuncia"
      title="Ascolta"
      onClick={() => {
        speak(plain(text).replace(/_{2,}/g, 'blank'));
        setOn(true);
        setTimeout(() => setOn(false), 900);
      }}
    >
      <ISpeaker width={17} height={17} />
    </button>
  );
}

export function AnimatedBackground() {
  return (
    <div className="bg" aria-hidden>
      <div className="blob a" />
      <div className="blob b" />
      <div className="blob c" />
      <div className="grid" />
      <div className="noise" />
    </div>
  );
}

/** Contenitore di pagina con transizione in ingresso/uscita. */
export function Page({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.main
      className={className}
      initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.main>
  );
}
