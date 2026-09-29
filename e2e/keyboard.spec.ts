import { expect, test } from '@playwright/test';

test('tastiera: link "Vai al contenuto" e sessione di esercizi senza mouse', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Salta' }).click();
  await page.goto('/lesson/a1-to-be/practice');
  await expect(page.locator('.option').first()).toBeVisible();

  // il primo Tab porta al link per saltare la navigazione (non c'è navigazione in modalità esercizi, ma il link esiste)
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Vai al contenuto' })).toBeFocused();

  // esercizio a scelta multipla: opzioni come gruppo di radio, scelta con i numeri, Invio per verificare e continuare
  await expect(page.getByRole('radiogroup')).toBeVisible();
  await page.keyboard.press('1');
  await expect(page.getByRole('radio', { checked: true })).toHaveCount(1);
  await page.keyboard.press('Enter');
  await expect(page.locator('.feedback')).toBeVisible();
  await expect(page.locator('.feedback')).toHaveAttribute('aria-live', 'polite');
  await page.keyboard.press('Enter');
  await expect(page.locator('.feedback')).toHaveCount(0);
});

test('tastiera: il focus è sempre visibile sui controlli', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Salta' }).click();
  await page.goto('/levels');
  await expect(page.locator('main')).toBeVisible();
  for (let i = 0; i < 6; i++) {
    await page.keyboard.press('Tab');
    const outline = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement;
      const cs = getComputedStyle(el);
      return { w: parseFloat(cs.outlineWidth), style: cs.outlineStyle, tag: el.tagName, shadow: cs.boxShadow };
    });
    expect(outline.style !== 'none' && outline.w >= 2, `nessun contorno di focus su ${outline.tag}`).toBe(true);
  }
});
