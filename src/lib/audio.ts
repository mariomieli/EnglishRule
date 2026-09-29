let ctx: AudioContext | null = null;

function tone(freqs: number[], dur = 0.12, type: OscillatorType = 'sine', gain = 0.08) {
  try {
    ctx ??= new AudioContext();
    const t0 = ctx.currentTime;
    freqs.forEach((f, i) => {
      const o = ctx!.createOscillator();
      const g = ctx!.createGain();
      o.type = type;
      o.frequency.value = f;
      const s = t0 + i * dur * 0.8;
      g.gain.setValueAtTime(0, s);
      g.gain.linearRampToValueAtTime(gain, s + 0.015);
      g.gain.exponentialRampToValueAtTime(0.0001, s + dur * 1.6);
      o.connect(g).connect(ctx!.destination);
      o.start(s);
      o.stop(s + dur * 1.8);
    });
  } catch {
    /* audio non disponibile */
  }
}

export const sfx = {
  correct: () => tone([660, 880], 0.1, 'triangle'),
  wrong: () => tone([220, 180], 0.14, 'sawtooth', 0.04),
  tap: () => tone([520], 0.04, 'sine', 0.03),
  win: () => tone([523, 659, 784, 1047], 0.13, 'triangle', 0.07),
};

let voice: SpeechSynthesisVoice | null | undefined;

function pickVoice() {
  if (voice !== undefined) return voice;
  const vs = speechSynthesis.getVoices();
  if (!vs.length) return null;
  voice =
    vs.find((v) => v.lang === 'en-GB' && /natural|premium|enhanced|google/i.test(v.name)) ??
    vs.find((v) => v.lang === 'en-GB') ??
    vs.find((v) => v.lang.startsWith('en')) ??
    null;
  return voice;
}

export const canSpeak = typeof window !== 'undefined' && 'speechSynthesis' in window;

export function speak(text: string) {
  if (!canSpeak) return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'en-GB';
  u.rate = 0.95;
  const v = pickVoice();
  if (v) u.voice = v;
  speechSynthesis.speak(u);
}
