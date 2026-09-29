import { expect, test, type Page } from '@playwright/test';

// Semina i progressi (lezione già fatta) così che le sessioni includano vari tipi di esercizio.
async function seed(page: Page) {
  await page.addInitScript(() => {
    if (localStorage.getItem('er-seeded')) return;
    localStorage.setItem('er-seeded', '1');
    const seen: Record<number, number> = {};
    for (let i = 0; i < 25; i++) seen[i] = i % 5; // varietà
    localStorage.setItem('er-doc', JSON.stringify({ owner: null, doc: { completed: { 'a1-to-be': { best: 80, stars: 2, attempts: 1, lastAt: 1 } }, theoryRead: {}, mistakes: {}, seen: { 'a1-to-be': seen }, xp: { '2026-01-01': { d: 10 } }, settings: { onboarded: { v: true, at: 1 }, advanceMs: { v: 0, at: 1 } } } }));
  });
}

/** Passa gli esercizi che non interessano (risposte qualsiasi) finché compare quello cercato. */
async function reachExercise(page: Page, wanted: '.match-grid' | '.order-bank') {
  for (let session = 0; session < 8; session++) {
    await page.goto('/lesson/a1-to-be/practice');
    for (let step = 0; step < 12; step++) {
      await expect(page.locator('.practice-body')).toBeVisible();
      if (await page.locator(wanted).count()) return true;
      if (await page.locator('.type-box').count()) {
        await page.locator('.type-box').fill('zzz qqq');
        await page.getByRole('button', { name: 'Verifica' }).click();
      } else if (await page.locator('.option').count()) await page.locator('.option').first().click();
      else if (await page.locator('.judge-btn').count()) await page.locator('.judge-btn').first().click();
      else if (await page.locator('.fill-input').count()) {
        await page.locator('.fill-input').fill('zzz');
        await page.getByRole('button', { name: 'Verifica' }).click();
      } else if (await page.locator('.order-bank').count() || (await page.locator('.match-grid').count())) {
        break; // è l'altro tipo: nuova sessione
      }
      await page.getByRole('button', { name: /Continua|Vedi risultato/ }).click();
      await expect(page.locator('.feedback')).toHaveCount(0);
      await page.waitForTimeout(450);
      if (await page.getByText(/Perfetto|Ottimo lavoro|Buon lavoro|Continua ad allenarti|Eccezionale/).count()) break;
    }
  }
  return false;
}

test('riordino usando solo la tastiera', async ({ page }) => {
  await seed(page);
  test.skip(!(await reachExercise(page, '.order-bank')), 'nessun esercizio di riordino nelle sessioni provate');
  const bank = page.locator('.order-bank button.tile');
  const n = await bank.count();
  for (let i = 0; i < n; i++) {
    await bank.first().focus();
    await page.keyboard.press('Enter');
  }
  await expect(page.getByRole('group', { name: 'La tua frase' }).locator('button')).toHaveCount(n);
  // una tessera messa nella frase si può togliere da tastiera, e ha un nome comprensibile
  const first = page.getByRole('group', { name: 'La tua frase' }).locator('button').first();
  await expect(first).toHaveAttribute('aria-label', /toglila dalla frase/);
  await first.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('group', { name: 'La tua frase' }).locator('button')).toHaveCount(n - 1);
  await bank.first().focus();
  await page.keyboard.press('Enter');
  await page.getByRole('button', { name: 'Verifica' }).focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('.feedback')).toBeVisible();
});

test('abbinamento usando solo la tastiera', async ({ page }) => {
  await seed(page);
  test.skip(!(await reachExercise(page, '.match-grid')), 'nessun abbinamento nelle sessioni provate');
  const cols = page.locator('.match-col');
  await expect(cols).toHaveCount(2);
  await expect(page.getByRole('group', { name: 'Prima colonna' })).toBeVisible();
  const left = cols.nth(0).locator('button');
  const right = cols.nth(1).locator('button');
  // ogni voce è un pulsante raggiungibile e attivabile: selezionandola cambia lo stato (aria-pressed)
  await left.first().focus();
  await page.keyboard.press('Enter');
  await expect(left.first()).toHaveAttribute('aria-pressed', 'true');
  await right.first().focus();
  await page.keyboard.press('Enter');
  // dopo il tentativo la selezione si azzera (giusto o sbagliato)
  await expect(left.first()).toHaveAttribute('aria-pressed', 'false');
});
