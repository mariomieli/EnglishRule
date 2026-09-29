import { Fragment, type ReactNode } from 'react';

/** Rende il markup inline dei contenuti: **grassetto**, *corsivo*, ==evidenziato==. */
export function Rich({ text }: { text: string }) {
  return <>{parse(text)}</>;
}

const TOKEN = /(\*\*[^*]+\*\*|==[^=]+==|\*[^*\s][^*]*\*)/g;

function parse(text: string): ReactNode[] {
  return text.split(TOKEN).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) return <strong key={i}>{parse(part.slice(2, -2))}</strong>;
    if (part.startsWith('==') && part.endsWith('==') && part.length > 4) return <mark key={i}>{part.slice(2, -2)}</mark>;
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) return <em key={i}>{part.slice(1, -1)}</em>;
    return <Fragment key={i}>{part}</Fragment>;
  });
}

/** Paragrafi separati da riga vuota o "\n". */
export function RichBlock({ text }: { text: string }) {
  return (
    <>
      {text.split(/\n+/).map((p, i) => (
        <p key={i}>
          <Rich text={p} />
        </p>
      ))}
    </>
  );
}
