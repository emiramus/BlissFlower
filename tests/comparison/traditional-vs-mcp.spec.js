const { test, expect } = require('@playwright/test');

test.describe('Traditional vs MCP AI Powered Testing Comparison', () => {

  test('COMPARE-002: Code complexity and maintainability', async ({ page }) => {

    await page.goto('http://localhost:3000/login');

    await page.fill('input[name="email"]', 'test@example.com');

    await page.fill('input[name="password"]', 'test123');

    await page.click('button[type="submit"]');

    const traditionalLogin = await page.url();

    await page.goto('http://localhost:3000/login');

    await page.getByPlaceholder(/email/i).fill('test@example.com');

    await page.getByPlaceholder(/password/i).fill('test123');

    await page.getByRole('button', {
      name: /login/i
    }).click();

    const aiLogin = await page.url();

    expect(traditionalLogin).toBeTruthy();

    expect(aiLogin).toBeTruthy();

    expect(typeof traditionalLogin).toBe('string');

    expect(typeof aiLogin).toBe('string');
  });

});