import { expect, test, type Page } from '@playwright/test';

// Le statistiche anonime partono solo con il cloud configurato: senza, questi test si saltano.
async function setup(page: Page) {
  const sent: string[] = [];
  await page.route('**/rest/v1/events', async (route) => {
    sent.push(route.request().postData() ?? '');
    await route.fulfill({ status: 201, body: '' });
  });
  await page.goto('/');
  await page.getByRole('button', { name: 'Salta' }).click();
  return sent;
}

test('gli eventi sono anonimi e si possono disattivare', async ({ page }) => {
  const sent = await setup(page);
  await page.goto('/profile');
  await expect(page.getByRole('heading', { name: /profilo/ })).toBeVisible();
  const toggle = page.getByRole('switch', { name: 'Statistiche anonime' });
  test.skip(!(await toggle.isVisible().catch(() => false)), 'cloud non configurato in questo ambiente');

  // attive: avviare una lezione e uscire spedisce lesson_start e session_abandon, senza identificativi
  await page.goto('/lesson/a1-to-be/practice');
  await expect(page.locator('.option').first()).toBeVisible();
  page.once('dialog', (d) => d.accept());
  await page.getByRole('button', { name: 'Esci dalla sessione' }).click();
  await page.evaluate(() => Object.defineProperty(document, 'visibilityState', { value: 'hidden', configurable: true }));
  await page.evaluate(() => document.dispatchEvent(new Event('visibilitychange')));
  await expect.poll(() => sent.length).toBeGreaterThan(0);
  const rows = sent.flatMap((s) => JSON.parse(s) as { name: string; session: string; props: Record<string, unknown> }[]);
  expect(rows.map((r) => r.name)).toEqual(expect.arrayContaining(['lesson_start', 'session_abandon']));
  for (const r of rows) expect(Object.keys(r).sort()).toEqual(['app', 'name', 'props', 'session']);
  expect(JSON.stringify(rows)).not.toMatch(/@|user|email|token/i);

  // disattivate: nessuna nuova richiesta
  await page.goto('/profile');
  await page.getByRole('switch', { name: 'Statistiche anonime' }).click();
  const before = sent.length;
  await page.goto('/lesson/a1-to-be/practice');
  await expect(page.locator('.option').first()).toBeVisible();
  await page.evaluate(() => document.dispatchEvent(new Event('visibilitychange')));
  await page.waitForTimeout(500);
  expect(sent.length).toBe(before);
});
