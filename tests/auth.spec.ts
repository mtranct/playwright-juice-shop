import { test, expect } from './fixtures';

test('user can log in with valid credentials', async ({ homePage, page }) => {
  await homePage.openLoginPage();
  await page.locator('#email').fill('admin@juice-sh.op');
  await page.locator('#password').fill('admin123');
  await page.locator('#loginButton').click();

  await expect(page).toHaveURL(/\/(#\/)?(search)?$/);
});

test('invalid password shows an error message', async ({ homePage, page }) => {
  await homePage.openLoginPage();
  await page.locator('#email').fill('admin@juice-sh.op');
  await page.locator('#password').fill('wrong-password-123');
  await page.locator('#loginButton').click();

  await expect(page.locator('.error')).toBeVisible();
});