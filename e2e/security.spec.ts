import { expect, test } from '@playwright/test';

// La politica di sicurezza dei contenuti (CSP) in index.html non deve bloccare nulla nei percorsi normali.
test('nessuna violazione della CSP nei percorsi principali', async ({ page }) => {
  const problems: string[] = [];
  page.on('console', (m) => /Content Security Policy|Refused to/i.test(m.text()) && problems.push(m.text()));
  page.on('pageerror', (e) => problems.push(String(e)));
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /Quanto tempo vuoi studiare/ })).toBeVisible();
  await page.getByRole('button', { name: 'Salta' }).click();
  for (const path of ['/levels', '/lesson/a1-to-be', '/lesson/a1-to-be/practice', '/speaking', '/profile', '/account', '/test']) {
    await page.goto(path);
    await page.waitForLoadState('networkidle');
  }
  expect(problems).toEqual([]);
});

test('il tema viene applicato prima del disegno (script esterno consentito dalla CSP)', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('er-theme', 'light'));
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
});
