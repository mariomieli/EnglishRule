import { describe, expect, it } from 'vitest';
import { alignWords, nearMisses, problemWords, tipsFor } from '../lib/pronunciation';
import { alignRepeat, checkReply, checkTargets, normSpeech } from '../lib/speech-eval';

const ok = (c: boolean, m: string) => expect(c, m).toBe(true);

describe('valutazione del parlato e pronuncia', () => {
  it('valutazione del parlato e pronuncia', () => {
  ok(normSpeech("I'm 25, I can't swim") === ' i am twenty five i can not swim ' || normSpeech("I'm 25, I can't swim").includes('i am'), 'contrazioni');
  ok(normSpeech('I have 3 cats.') === ' i have three cats ', 'numeri');
  const kw = [['how much'], ['ticket', 'tickets']];
  ok(checkReply('How much is a ticket to London?', kw, []).ok, 'risposta valida');
  ok(checkReply('how much are the tickets', kw, []).ok, 'plurale');
  ok(!checkReply('Where is the station?', kw, []).ok, 'risposta non pertinente');
  ok(checkReply("I'd like a coffee please", [['would like', 'want'], ['coffee']], []).ok, "I'd = I would");
  ok(!checkReply('I like coffee', [['would like', 'want'], ['coffee']], []).ok, 'like senza would');
  ok(!checkReply('something', [['cat']], []).ok && !checkReply('category', [['cat']], []).ok, 'confini di parola');
  const r = alignRepeat('Nice to meet you, I am Paolo.', "nice to meet you I'm pablo");
  ok(r.score === 86, `ripeti: punteggio ${r.score}`);
  ok(r.hit.join() === 'true,true,true,true,true,true,false', 'parole evidenziate');
  ok(checkTargets('I used to live in Rome but now I have moved', [{ label: 'used to', patterns: ['used to'] }, { label: 'present perfect', patterns: ['have moved', 'have lived', 'has'] }]).every((x) => x.used), 'target');
  ok(normSpeech("If I'd known, I'd have told you").includes('if i had known i would have told'), "'d = had / would");
  ok(normSpeech("I'd need help").includes('i would need'), "I'd need");
  ok(normSpeech("It's here and she's been there").includes('it is here and she has been there'), "'s = is / has");
  ok(normSpeech("John's car").includes("john's car"), 'genitivo sassone intatto');
  {
    const w = alignWords('I think the ship is here', 'I sink the sheep is here');
    const by = Object.fromEntries(w.map((x) => [x.word, x]));
    ok(by.i.status === 'ok' && by.is.status === 'ok' && by.here.status === 'ok', 'parole giuste');
    ok(by.think.status === 'near' && by.think.heard === 'sink', `think/sink: ${JSON.stringify(by.think)}`);
    ok(by.ship.status === 'near' && by.ship.heard === 'sheep', 'ship/sheep vicine');
    const m = alignWords('Nice to meet you', 'nice meet you');
    ok(m.find((x) => x.word === 'to')?.status === 'miss' && m.filter((x) => x.status === 'ok').length === 3, 'parola saltata');
    const c = alignWords('I like coffee', 'I like banana');
    ok(c[2].status === 'miss' && c[2].heard === 'banana', 'parola sostituita');
    ok(alignWords('hello', '').every((x) => x.status === 'miss' && !x.heard), 'niente detto');
    ok(alignWords('', 'hello').length === 0, 'niente atteso');
    ok(tipsFor('think')[0].startsWith('th'), 'consiglio th');
    ok(tipsFor('hotel').some((t) => t.startsWith('h iniziale')), 'consiglio h');
    ok(tipsFor('wanted').some((t) => t.startsWith('-ed')), 'consiglio -ed');
    ok(tipsFor('dog').some((t) => t.startsWith('Consonante finale')), 'consiglio consonante finale');
    ok(problemWords(alignWords('the the cat', 'a a cat'), 3).length === 1, 'niente doppioni');
    ok(problemWords(alignWords('a b cat', 'x y z'), 3).every((r) => r.word.length > 1), 'niente parole da una lettera');
  }
  });

  it('parole quasi giuste nelle risposte libere', () => {
    const refs = ['I think it is a good idea', 'I would like a ticket'];
    expect(nearMisses('I sink it is a good idea', refs)).toEqual([{ said: 'sink', expected: 'think' }]);
    expect(nearMisses('I think it is a good idea', refs)).toEqual([]); // niente da segnalare
    expect(nearMisses('I would like a tickets please', refs).map((m) => m.said)).toContain('tickets');
    expect(nearMisses('banana', refs)).toEqual([]); // nessuna somiglianza
    expect(nearMisses('sink tickets liked', ['think ticket like'], 2)).toHaveLength(2); // rispetta il massimo
  });
});
