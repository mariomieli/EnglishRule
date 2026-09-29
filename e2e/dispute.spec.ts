import { expect, test, type Page } from '@playwright/test';

// Semina i progressi così che nella sessione compaiano gli esercizi derivati (dettato, traduzione, correzione).
async function seed(page: Page) {
  await page.addInitScript(() => {
    if (localStorage.getItem('er-seeded')) return;
    localStorage.setItem('er-seeded', '1');
    const seen: Record<number, number> = {};
    for (let i = 0; i < 25; i++) seen[i] = 5;
    localStorage.setItem('er-doc', JSON.stringify({ owner: null, doc: { completed: { 'a1-to-be': { best: 80, stars: 2, attempts: 1, lastAt: 1 } }, theoryRead: {}, mistakes: {}, seen: { 'a1-to-be': seen }, xp: { '2026-01-01': { d: 10 } }, settings: { onboarded: { v: true, at: 1 }, advanceMs: { v: 0, at: 1 } } } }));
  });
}

test('traduzione rifiutata: si può contestare e conta come giusta', async ({ page }) => {
  await seed(page);
  for (let attempt = 0; attempt < 6; attempt++) {
    await page.goto('/lesson/a1-to-be/practice');
    for (let step = 0; step < 14; step++) {
      await expect(page.locator('.practice-body')).toBeVisible();
      if (await page.locator('.ex-source').count()) {
        await page.locator('.type-box').fill('zzz qqq');
        await page.getByRole('button', { name: 'Verifica' }).click();
        await expect(page.locator('.feedback.bad')).toBeVisible();
        await page.getByRole('button', { name: /La mia risposta è giusta/ }).click();
        await expect(page.locator('.feedback.good')).toBeVisible();
        await expect(page.getByText('Va bene, la conto giusta!')).toBeVisible();
        return;
      }
      if (await page.locator('.type-box').count()) {
        await page.locator('.type-box').fill('zzz qqq');
        await page.getByRole('button', { name: 'Verifica' }).click();
      } else if (await page.locator('.option').count()) await page.locator('.option').first().click();
      else if (await page.locator('.judge-btn').count()) await page.locator('.judge-btn').first().click();
      else if (await page.locator('.fill-input').count()) {
        await page.locator('.fill-input').fill('zzz');
        await page.getByRole('button', { name: 'Verifica' }).click();
      } else if (await page.locator('.order-bank .tile').count()) {
        while (await page.locator('.order-bank button.tile').count()) await page.locator('.order-bank button.tile').first().click();
        await page.getByRole('button', { name: 'Verifica' }).click();
      } else break; // abbinamento: si riparte con una nuova sessione
      await page.getByRole('button', { name: /Continua|Vedi risultato/ }).click();
      await expect(page.locator('.feedback')).toHaveCount(0);
      await page.waitForTimeout(500); // fine dell'animazione tra un esercizio e l'altro
      if (await page.getByText(/Perfetto|Ottimo lavoro|Buon lavoro|Continua ad allenarti|Eccezionale/).count()) break;
    }
  }
  throw new Error('nessun esercizio di traduzione trovato in 6 sessioni');
});

test('impostazioni: con "Manuale" si resta sulla risposta giusta finché non si preme Continua', async ({ page }) => {
  const { a1 } = await import('../src/data/lessons/a1');
  const first = a1.find((l) => l.id === 'a1-to-be')!.exercises[0];
  test.skip(first.type !== 'mcq', 'il primo esercizio non è a scelta multipla');
  if (first.type !== 'mcq') return;
  await page.addInitScript(() => {
    localStorage.setItem('er-doc', JSON.stringify({ owner: null, doc: { completed: {}, theoryRead: {}, mistakes: {}, seen: {}, xp: { '2026-01-01': { d: 10 } }, settings: { onboarded: { v: true, at: 1 }, advanceMs: { v: 0, at: 1 } } } }));
  });
  await page.goto('/lesson/a1-to-be/practice');
  await page.locator('.option', { hasText: first.options[first.answer].replace(/\*/g, '') }).first().click();
  await expect(page.locator('.feedback.good')).toBeVisible();
  await page.waitForTimeout(2000); // con l'avanzamento automatico sarebbe già passato
  await expect(page.locator('.feedback.good')).toBeVisible();
  await page.getByRole('button', { name: 'Continua' }).click();
  await expect(page.locator('.feedback')).toHaveCount(0);
});
