const { test, expect } = require('@playwright/test');

test.describe('Traditional Create Bouquet Tests', () => {

  test.beforeEach(async ({ page }) => {

    await page.goto('http://localhost:3000/login');

    await page.fill('input[name="email"]', 'test@blissflower.com');

    await page.fill('input[name="password"]', '123456');

    await page.click('button[type="submit"]');

    await page.waitForTimeout(1500);

    await page.goto('http://localhost:3000/create-bouquet');
  });

  test('TC-BOUQ-001: Create bouquet page loads', async ({ page }) => {

    await expect(page.locator('.single-header h1'))
      .toContainText('Create Your Bouquet');

    await expect(page.locator('.flowers-grid'))
      .toBeVisible();
  });

  test('TC-BOUQ-002: User can add flowers to bouquet', async ({ page }) => {

    const flowerCount = await page.locator('.flower-item').count();

    expect(flowerCount).toBeGreaterThan(0);

    await page.locator('.flower-item').first().click();

    await page.waitForTimeout(300);

    const selectedFlowers = await page.locator('.selected-item').count();

    expect(selectedFlowers).toBe(1);
  });

  test('TC-BOUQ-003: User can add multiple flowers', async ({ page }) => {

    await page.locator('.flower-item').first().click();

    await page.waitForTimeout(300);

    await page.locator('.flower-item').nth(1).click();

    await page.waitForTimeout(300);

    const selectedFlowers = await page.locator('.selected-item').count();

    expect(selectedFlowers).toBe(2);
  });

  test('TC-BOUQ-004: User can save bouquet with name', async ({ page }) => {

    await page.locator('.flower-item').first().click();

    await page.fill('.name-input', 'Test Bouquet');

    await page.locator('.btn-save').click();

    await page.waitForTimeout(1000);

    await expect(page.locator('.toast-message'))
      .toBeVisible();
  });

});