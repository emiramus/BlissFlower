const { test, expect } = require('@playwright/test');

test.describe('Traditional Products and Cart Tests', () => {

  test.beforeEach(async ({ page }) => {

    await page.goto('http://localhost:3000/products');
  });

  test('TC-PROD-001: Products page loads with products', async ({ page }) => {

    await expect(page.locator('.products-grid'))
      .toBeVisible();

    const productCount = await page.locator('.product-card').count();

    expect(productCount).toBeGreaterThan(0);
  });

  test('TC-PROD-002: Filter buttons are visible and functional', async ({ page }) => {

    const filters = [
      'All',
      'Flowers',
      'Chocolates',
      'Wines',
      'Gift Sets'
    ];

    for (const filter of filters) {

      const button = page.getByRole('button', {
        name: filter
      });

      await expect(button)
        .toBeVisible();
    }

    await page.getByRole('button', {
      name: 'Flowers'
    }).click();

    await page.waitForTimeout(500);

    const products = await page.locator('.product-card').count();

    expect(products).toBeGreaterThan(0);
  });

  test('TC-PROD-003: Add to cart button adds item to cart', async ({ page }) => {

    const addButton = page.locator('.product-card')
      .first()
      .getByRole('button', {
        name: 'Add to Cart'
      });

    await addButton.click();

    await page.waitForTimeout(500);

    await expect(page.locator('.cart-sidebar'))
      .toBeVisible();

    await expect(page.locator('.cart-message'))
      .toBeVisible();

    await expect(page.locator('.cart-message'))
      .toContainText('added to cart');
  });

  test('TC-PROD-004: Quantity selector works correctly', async ({ page }) => {

    const qtyValue = page.locator('.product-card')
      .first()
      .locator('.qty-value');

    const initialQty = await qtyValue.textContent();

    await page.locator('.product-card')
      .first()
      .locator('.qty-btn')
      .nth(1)
      .click();

    const increasedQty = await qtyValue.textContent();

    expect(Number(increasedQty))
      .toBe(Number(initialQty) + 1);

    await page.locator('.product-card')
      .first()
      .locator('.qty-btn')
      .nth(0)
      .click();

    const decreasedQty = await qtyValue.textContent();

    expect(Number(decreasedQty))
      .toBe(Number(initialQty));
  });

  test('TC-PROD-005: Remove button removes item from cart', async ({ page }) => {

    const addButton = page.locator('.product-card')
      .first()
      .getByRole('button', {
        name: 'Add to Cart'
      });

    await addButton.click();

    await page.waitForTimeout(500);

    await page.locator('.remove-btn').click();

    await page.waitForTimeout(500);

    const cartVisible = await page.locator('.cart-sidebar')
      .isVisible();

    expect(cartVisible)
      .toBe(false);
  });

  test('TC-PROD-006: Cart shows correct total', async ({ page }) => {

    const addButton = page.locator('.product-card')
      .first()
      .getByRole('button', {
        name: 'Add to Cart'
      });

    await addButton.click();

    await page.waitForTimeout(500);

    const cartTotal = await page.locator('.cart-total')
      .textContent();

    expect(cartTotal)
      .toContain('den');
  });

});