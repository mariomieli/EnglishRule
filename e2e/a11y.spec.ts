import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';

// Audit di accessibilità automatico (axe-core, regole WCAG 2 A/AA) sulle pagine principali, in tema chiaro e scuro.
const PAGES = ['/', '/levels', '/level/A1', '/lesson/a1-to-be', '/lesson/a1-to-be/practice', '/review', '/profile', '/speaking', '/test', '/account'];

async function skipOnboarding(page: Page) {
  await page.goto('/');
  await page.getByRole('button', { name: 'Salta' }).click();
}

for (const scheme of ['light', 'dark'] as const) {
  test.describe(`tema ${scheme}`, () => {
    test.use({ colorScheme: scheme });
    for (const path of PAGES) {
      test(`${path}`, async ({ page }) => {
        await skipOnboarding(page);
        await page.goto(path);
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(2600); // animazioni di ingresso (i traguardi arrivano a cascata)
        const res = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
        const msg = res.violations.map((v) => `${v.id} (${v.impact}): ${v.help}\n${v.nodes.slice(0, 4).map((n) => '   ' + n.target.join(' ') + ' | ' + (n.any[0]?.message ?? n.all[0]?.message ?? '')).join('\n')}`).join('\n');
        expect(res.violations, msg).toEqual([]);
      });
    }
  });
}
