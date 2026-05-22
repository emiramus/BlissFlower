const { test, expect } = require('@playwright/test');

test.describe('Traditional Register Tests', () => {

  test.beforeEach(async ({ page }) => {

    await page.goto('http://localhost:3000/register');
  });

  test('TC-REG-001: Register page loads correctly', async ({ page }) => {

    await expect(page.locator('.auth-card h2'))
      .toContainText('Join BlissFlower');

    await expect(page.locator('input[name="fullName"]'))
      .toBeVisible();

    await expect(page.locator('input[name="email"]'))
      .toBeVisible();

    await expect(page.locator('input[name="password"]'))
      .toBeVisible();

    await expect(page.locator('input[name="confirmPassword"]'))
      .toBeVisible();
  });

  test('TC-REG-002: Error appears for empty fields', async ({ page }) => {

    await page.click('button[type="submit"]');

    await expect(page.locator('.error-message'))
      .toBeVisible();
  });

  test('TC-REG-003: Error appears when passwords do not match', async ({ page }) => {

    await page.fill('input[name="fullName"]', 'Test User');

    await page.fill('input[name="email"]', 'test@test.com');

    await page.fill('input[name="password"]', '123456');

    await page.fill('input[name="confirmPassword"]', '654321');

    await page.click('button[type="submit"]');

    await expect(page.locator('.error-message'))
      .toContainText('do not match');
  });

  test('TC-REG-004: Error appears for short password', async ({ page }) => {

    await page.fill('input[name="fullName"]', 'Test User');

    await page.fill('input[name="email"]', 'test@test.com');

    await page.fill('input[name="password"]', '123');

    await page.fill('input[name="confirmPassword"]', '123');

    await page.click('button[type="submit"]');

    await expect(page.locator('.error-message'))
      .toContainText('at least 6 characters');
  });

  test('TC-REG-005: Successful registration redirects to dashboard', async ({ page }) => {

    const uniqueEmail = `test@blissflower.com`;

    await page.fill('input[name="fullName"]', 'Test User');

    await page.fill('input[name="email"]', uniqueEmail);

    await page.fill('input[name="password"]', 'Test123456');

    await page.fill('input[name="confirmPassword"]', 'Test123456');

    await page.click('button[type="submit"]');

    await page.waitForTimeout(2000);

    await expect(page)
      .toHaveURL(/dashboard/);
  });

});