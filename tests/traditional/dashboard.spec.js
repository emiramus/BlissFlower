const { test, expect } = require('@playwright/test');

test.describe('Traditional Dashboard Tests', () => {

  test.beforeEach(async ({ page }) => {

    await page.goto('http://localhost:3000/login');

    await page.fill('input[name="email"]', 'test@blissflower.com');

    await page.fill('input[name="password"]', '123456');

    await page.click('button[type="submit"]');

    await page.waitForTimeout(2000);
  });

  test('TC-DASH-001: Dashboard loads after login', async ({ page }) => {

    await expect(page.locator('.dashboard-header h1'))
      .toContainText('Welcome back');
  });

  test('TC-DASH-002: Dashboard statistics are visible', async ({ page }) => {

    await expect(page.locator('.stat-card').first())
      .toBeVisible();

    await expect(page.getByText('Orders').first())
      .toBeVisible();

    await expect(page.getByText('Wishlist').first())
      .toBeVisible();
  });

  test('TC-DASH-003: Recent orders section is visible', async ({ page }) => {

    await expect(page.locator('.recent-orders h2'))
      .toContainText('Recent Orders');
  });

});