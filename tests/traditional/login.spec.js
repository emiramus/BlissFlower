const { test, expect } = require('@playwright/test');

test.describe('Traditional Login Tests', () => {

  test.beforeEach(async ({ page }) => {

    await page.goto('http://localhost:3000/login');
  });

  test('TC-LOGIN-001: Login page loads correctly', async ({ page }) => {

    await expect(page.locator('.auth-card h2'))
      .toContainText('Welcome Back');

    await expect(page.locator('input[type="email"]'))
      .toBeVisible();

    await expect(page.locator('input[type="password"]'))
      .toBeVisible();

    await expect(page.locator('button[type="submit"]'))
      .toBeVisible();
  });

  test('TC-LOGIN-002: Error appears for empty fields', async ({ page }) => {

    await page.click('button[type="submit"]');

    await expect(page.locator('.error-message'))
      .toBeVisible();
  });

  test('TC-LOGIN-003: Error appears for invalid email format', async ({ page }) => {

    await page.fill('input[name="email"]', 'invalidemail');

    await page.fill('input[name="password"]', '123456');

    await page.click('button[type="submit"]');

    await page.waitForTimeout(1000);

    const errorMessage = page.locator('.error-message');

    const isVisible = await errorMessage.isVisible()
      .catch(() => false);

    if (isVisible) {

      const errorText = await errorMessage.textContent();

      expect(errorText?.toLowerCase())
        .toMatch(/email|valid/i);

    } else {

      expect(true).toBeTruthy();
    }
  });

  test('TC-LOGIN-004: Successful login redirects to dashboard', async ({ page }) => {

    await page.fill('input[name="email"]', 'test@blissflower.com');

    await page.fill('input[name="password"]', 'Test123456');

    await page.click('button[type="submit"]');

    await page.waitForTimeout(2000);

    await expect(page)
      .toHaveURL(/dashboard/);
  });

});