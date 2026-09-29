import { expect, test } from '@playwright/test';

test('primo avvio: onboarding fino alla prima lezione', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /Quanto tempo vuoi studiare/ })).toBeVisible();
  await page.getByRole('button', { name: /10 minuti al giorno/ }).click();
  await page.getByRole('button', { name: 'Continua' }).click();
  await page.getByRole('button', { name: /Parto da zero/ }).click();
  await page.getByRole('button', { name: 'Continua' }).click();
  await expect(page.getByRole('heading', { name: /Si parte dal livello A1/ })).toBeVisible();
  await page.getByRole('button', { name: /Inizia la prima lezione/ }).click();
  await expect(page).toHaveURL(/\/lesson\/a1-/);
  // dopo l'onboarding non ricompare
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /Quanto tempo vuoi studiare/ })).toHaveCount(0);
});

test('salta l\'onboarding e fai un esercizio con feedback', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Salta' }).click();
  await page.goto('/lesson/a1-to-be/practice');
  // scegliamo la prima opzione qualunque sia il tipo: se non è a scelta multipla il test sale ai tipi testuali
  const option = page.locator('.option').first();
  await expect(option).toBeVisible();
  await option.click();
  await page.getByRole('button', { name: 'Verifica' }).click();
  await expect(page.locator('.feedback')).toBeVisible();
  await expect(page.getByRole('button', { name: /Continua|Vedi risultato/ })).toBeVisible();
});

test('test di livello adattivo: si conclude con un livello', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Salta' }).click();
  await page.goto('/test');
  await page.getByRole('button', { name: /Inizia il test/ }).click();
  // "Non lo so" sempre: il test scende ad A1 e finisce in pochi passi
  for (let i = 0; i < 20; i++) {
    const done = page.getByText('Il tuo livello stimato');
    if (await done.isVisible()) break;
    await page.getByRole('button', { name: /Non lo so/ }).click();
    await page.waitForTimeout(450);
  }
  await expect(page.getByText('Il tuo livello stimato')).toBeVisible();
  await expect(page.getByRole('heading', { name: /Principiante/ })).toBeVisible();
});

test('ripasso: vuoto all\'inizio e navigazione di base', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Salta' }).click();
  await page.goto('/review');
  await expect(page.getByRole('heading', { name: 'Tutto pulito!' })).toBeVisible();
  await page.goto('/profile');
  await expect(page.getByRole('heading', { name: /profilo/ })).toBeVisible();
  await expect(page.getByText(/Traguardi/)).toBeVisible();
});
