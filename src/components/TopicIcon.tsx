import type { ReactNode } from 'react';
import { topicOf, type TopicId } from '../data/topics';

const P = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;

const SHAPES: Record<TopicId, ReactNode> = {
  tempi: (
    <>
      <circle cx="12" cy="12" r="8.5" {...P} />
      <path d="M12 7v5l3.2 2" {...P} />
    </>
  ),
  frasi: (
    <>
      <path d="M4.5 5h15a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H9.5l-5 4V6a1 1 0 0 1 1-1z" {...P} />
      <path d="M8.5 9.5h7M8.5 12.5h4" {...P} />
    </>
  ),
  nomi: (
    <>
      <path d="M3.5 12.2V4.5h7.7l9.3 9.3-7.7 7.7z" {...P} />
      <circle cx="7.8" cy="8.8" r="1.3" fill="currentColor" />
    </>
  ),
  modali: (
    <>
      <path d="M4 7h8M17 7h3M4 12h3M12 12h8M4 17h9M18 17h2" {...P} />
      <circle cx="14.5" cy="7" r="2" {...P} />
      <circle cx="9.5" cy="12" r="2" {...P} />
      <circle cx="15.5" cy="17" r="2" {...P} />
    </>
  ),
  condizionali: (
    <>
      <circle cx="6" cy="5.5" r="2.2" {...P} />
      <circle cx="6" cy="18.5" r="2.2" {...P} />
      <circle cx="18" cy="7.5" r="2.2" {...P} />
      <path d="M6 7.7v8.6M18 9.7c0 4-3.5 5-8.6 5.4" {...P} />
    </>
  ),
  passivo: <path d="M4 8h14l-3.2-3.2M20 16H6l3.2 3.2" {...P} />,
  complesse: <path d="M9 4H7.5A2.5 2.5 0 0 0 5 6.5V9a2 2 0 0 1-2 2 2 2 0 0 1 2 2v2.5A2.5 2.5 0 0 0 7.5 18H9M15 4h1.5A2.5 2.5 0 0 1 19 6.5V9a2 2 0 0 0 2 2 2 2 0 0 0-2 2v2.5a2.5 2.5 0 0 1-2.5 2.5H15" {...P} />,
  confronti: (
    <>
      <path d="M12 4v16M7 20h10M5 7.5h14" {...P} />
      <path d="M5 7.5 2.5 13.5a2.5 2.5 0 0 0 5 0zM19 7.5l-2.5 6a2.5 2.5 0 0 0 5 0z" {...P} />
    </>
  ),
  preposizioni: (
    <>
      <path d="M12 21s7-6 7-11.2a7 7 0 1 0-14 0C5 15 12 21 12 21z" {...P} />
      <circle cx="12" cy="9.8" r="2.4" {...P} />
    </>
  ),
  stile: <path d="M11 3l1.9 5.5L18.5 10l-5.6 1.9L11 17.5l-1.9-5.6L3.5 10l5.6-1.5zM18.5 15.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z" {...P} />,
};

/** Icona dell'argomento (disegnata su una griglia comune, colore del testo). */
export function TopicIconById({ topic, size = 22 }: { topic: TopicId; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden focusable="false">
      {SHAPES[topic]}
    </svg>
  );
}

export function TopicIcon({ lessonId, size }: { lessonId: string; size?: number }) {
  return <TopicIconById topic={topicOf(lessonId).id} size={size} />;
}
