import { useCallback, useEffect, useRef, useState } from 'react';

// Web Speech API: Chrome, Edge, Safari (anche iOS). Firefox non la supporta: si usa la tastiera.
interface Recognition extends EventTarget {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((e: { resultIndex: number; results: ArrayLike<{ isFinal: boolean; 0: { transcript: string } }> }) => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  onend: (() => void) | null;
}

const Ctor: (new () => Recognition) | undefined =
  typeof window !== 'undefined' ? ((window as unknown as { SpeechRecognition?: new () => Recognition; webkitSpeechRecognition?: new () => Recognition }).SpeechRecognition ?? (window as unknown as { webkitSpeechRecognition?: new () => Recognition }).webkitSpeechRecognition) : undefined;

export const speechSupported = !!Ctor;

const ERR: Record<string, string> = {
  'not-allowed': 'Accesso al microfono negato. Consentilo dalle impostazioni del browser oppure scrivi la risposta.',
  'service-not-allowed': 'Il riconoscimento vocale non è disponibile. Scrivi la risposta.',
  'no-speech': 'Non ho sentito nulla. Avvicinati al microfono e riprova.',
  'audio-capture': 'Nessun microfono trovato. Puoi scrivere la risposta.',
  network: 'Il riconoscimento vocale richiede la connessione a internet.',
};

/** Riconoscimento vocale in inglese con trascrizione in tempo reale. */
export function useSpeech() {
  const rec = useRef<Recognition | null>(null);
  const finalText = useRef('');
  const interimText = useRef('');
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const onDone = useRef<((text: string) => void) | null>(null);

  const stop = useCallback(() => rec.current?.stop(), []);

  const start = useCallback((opts: { continuous?: boolean; onEnd?: (text: string) => void } = {}) => {
    if (!Ctor) return;
    rec.current?.abort();
    speechSynthesis?.cancel();
    const r = new Ctor();
    r.lang = 'en-GB';
    r.continuous = !!opts.continuous;
    r.interimResults = true;
    r.maxAlternatives = 1;
    finalText.current = '';
    interimText.current = '';
    onDone.current = opts.onEnd ?? null;
    setTranscript('');
    setError(null);
    r.onresult = (e) => {
      let interim = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const res = e.results[i];
        if (res.isFinal) finalText.current += res[0].transcript + ' ';
        else interim += res[0].transcript;
      }
      interimText.current = interim;
      setTranscript((finalText.current + interim).trim());
    };
    r.onerror = (e) => {
      if (e.error !== 'aborted') setError(ERR[e.error] ?? 'Errore del microfono. Riprova o scrivi la risposta.');
    };
    r.onend = () => {
      setListening(false);
      rec.current = null;
      // alcuni browser non "finalizzano" l'ultimo pezzo quando si ferma il microfono
      const text = (finalText.current + interimText.current).trim();
      setTranscript(text);
      onDone.current?.(text);
    };
    rec.current = r;
    try {
      r.start();
      setListening(true);
    } catch {
      setError('Impossibile avviare il microfono.');
    }
  }, []);

  useEffect(() => () => rec.current?.abort(), []);

  return { listening, transcript, error, start, stop, setTranscript };
}
