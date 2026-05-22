const { test, expect } = require('@playwright/test');

test.describe('Traditional Checkout Tests', () => {

  test.beforeEach(async ({ page }) => {

    await page.goto('http://localhost:3000/login');

    await page.fill('input[name="email"]', 'test@blissflower.com');

    await page.fill('input[name="password"]', '123456');

    await page.click('button[type="submit"]');

    await page.waitForTimeout(1000);

    await page.goto('http://localhost:3000/products');

    await page.locator('.product-card')
      .first()
      .getByRole('button', { name: 'Add to Cart' })
      .click();

    await page.waitForTimeout(500);

    await page.locator('.cart-sidebar .btn-primary').click();

    await page.waitForTimeout(500);
  });

  test('TC-CHECK-001: Checkout page loads correctly', async ({ page }) => {

    await expect(page.locator('.checkout-header h1'))
      .toContainText('Checkout');

    await expect(page.locator('.checkout-form'))
      .toBeVisible();

    await expect(page.locator('.order-summary'))
      .toBeVisible();
  });

  test('TC-CHECK-002: Form validation works', async ({ page }) => {

    await page.click('button[type="submit"]');

    await expect(page.locator('.field-error').first())
      .toBeVisible();
  });

  test('TC-CHECK-003: Order summary shows cart items', async ({ page }) => {

    await expect(page.locator('.order-item').first())
      .toBeVisible();

    await expect(page.locator('.order-grand-total'))
      .toBeVisible();
  });

  test('TC-CHECK-004: User can fill and submit checkout form', async ({ page }) => {

    await page.fill('input[name="fullName"]', 'Test User');

    await page.fill('input[name="email"]', 'test@checkout.com');

    await page.fill('input[name="phone"]', '070123456');

    await page.fill('input[name="address"]', '8 Mars Boulevard, Skopje');

    await page.click('button[type="submit"]');

    await page.waitForTimeout(2000);

    await expect(page.locator('.checkout-success'))
      .toBeVisible();
  });

});