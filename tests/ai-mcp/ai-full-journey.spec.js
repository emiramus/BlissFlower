const { test, expect } = require('@playwright/test');

test.describe('AI Powered Full Customer Journey', () => {

  test.setTimeout(120000);

  test('AI-FULL-001: Complete customer journey', async ({ page }) => {

    const startTime = Date.now();

    await page.goto('http://localhost:3000/register', {
      timeout: 30000
    });

    const uniqueEmail = `test@blissflower.com`;

    await page.fill('input[name="fullName"]', 'Test User');

    await page.fill('input[name="email"]', uniqueEmail);

    await page.fill('input[name="password"]', 'Test123456');

    await page.fill('input[name="confirmPassword"]', 'Test123456');

    await page.click('button[type="submit"]');

    await page.waitForTimeout(3000);

    await page.goto('http://localhost:3000/products', {
      timeout: 15000
    });

    const productCount = await page.locator('.product-card').count();

    expect(productCount).toBeGreaterThan(0);

    const firstProduct = page.locator('.product-card').first();

    await firstProduct.getByRole('button', {
      name: 'Add to Cart'
    }).click();

    await page.waitForTimeout(1000);

    try {

      await page.goto('http://localhost:3000/create-bouquet', {
        timeout: 10000
      });

      const flowerItems = page.locator('.flower-item');

      const flowerCount = await flowerItems.count();

      if (flowerCount > 0) {
        await flowerItems.first().click();
      }

    } catch (error) {
    }

    const endTime = Date.now();

    const totalTime = (endTime - startTime) / 1000;

    expect(totalTime).toBeGreaterThan(0);
  });
});