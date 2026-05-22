const { test, expect } = require('@playwright/test');

test.describe('Traditional Homepage Tests', () => {

  test.beforeEach(async ({ page }) => {

    await page.goto('http://localhost:3000');
  });

  test('TC-HOME-001: Homepage loads correctly', async ({ page }) => {

    await expect(page.locator('.hero'))
      .toBeVisible();

    await expect(page.locator('.logo-text'))
      .toBeVisible();

    await expect(page.locator('.hero-content h1'))
      .toContainText('BlissFlower');
  });

  test('TC-HOME-002: Hero buttons are visible', async ({ page }) => {

    await expect(
      page.getByRole('button', { name: /shop now/i }).first()
    ).toBeVisible();

    await expect(
      page.getByRole('button', { name: /create your bouquet/i })
    ).toBeVisible();
  });

  test('TC-HOME-003: Featured collections are visible', async ({ page }) => {

    await expect(page.locator('.collection-card').first())
      .toBeVisible();

    await expect(page.getByText('Luxury Bouquets').first())
      .toBeVisible();

    await expect(page.getByText('Premium Chocolates').first())
      .toBeVisible();

    await expect(page.getByText('Fine Wines').first())
      .toBeVisible();
  });

  test('TC-HOME-004: Newsletter section is visible', async ({ page }) => {

    await expect(
      page.getByPlaceholder('Your email address')
    ).toBeVisible();

    await expect(
      page.getByRole('button', { name: 'Subscribe' })
    ).toBeVisible();
  });

  test('TC-HOME-005: Footer is visible', async ({ page }) => {

    await expect(page.locator('.footer'))
      .toBeVisible();

    await expect(page.locator('.footer-logo'))
      .toBeVisible();
  });

  test('TC-HOME-006: Shop Now button navigates to products', async ({ page }) => {

    await page.getByRole('button', {
      name: /shop now/i
    }).first().click();

    await expect(page)
      .toHaveURL(/products/);
  });

});