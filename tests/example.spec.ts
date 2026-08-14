import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://e-commerce.betterbytesvn.com/');

  // Expect a title "E-commerce site for automation testing" a substring.
  await expect(page).toHaveTitle(/E-commerce site for automation testing/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://e-commerce.betterbytesvn.com/');

  // Click the My account.
  await page.getByRole('link', { name: 'My account' }).click();

  // Expects page to have a heading with the name of My account.
  await expect(page.getByRole('heading', { name: 'My account' })).toBeVisible();
});
