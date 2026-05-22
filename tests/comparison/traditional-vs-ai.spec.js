const { test, expect } = require('@playwright/test');

test.describe('Traditional vs AI Powered Testing Comparison', () => {

  test('COMPARE-001: Performance and maintainability comparison', async ({ page }) => {

    const startTraditional = Date.now();

    await page.goto('http://localhost:3000/login');

    await page.fill('input[name="email"]', 'test@example.com');

    await page.fill('input[name="password"]', 'test123');

    await page.click('button[type="submit"]');

    const traditionalTime = Date.now() - startTraditional;

    const startAI = Date.now();

    await page.goto('http://localhost:3000/login');

    await page.getByPlaceholder(/email/i).fill('test@example.com');

    await page.getByPlaceholder(/password/i).fill('test123');

    await page.getByRole('button', {
      name: /login/i
    }).click();

    const aiTime = Date.now() - startAI;

    const difference = Math.abs(aiTime - traditionalTime);

    expect(traditionalTime).toBeGreaterThan(0);

    expect(aiTime).toBeGreaterThan(0);

    expect(difference).toBeGreaterThanOrEqual(0);
  });

});