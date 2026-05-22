const { test, expect } = require('@playwright/test');

test.describe('MCP Model Context Protocol Tests', () => {

  test.setTimeout(60000);

  test('MCP-001: User can navigate and add product to cart', async ({ page }) => {

    await page.goto('http://localhost:3000');

    await page.getByRole('link', {
      name: /shop|products/i
    }).click();

    await page.waitForTimeout(1000);

    const product = page.locator('.product-card').first();

    const productName = await product.locator('h3').textContent();

    expect(productName).toBeTruthy();

    await product.getByRole('button', {
      name: 'Add to Cart'
    }).click();

    await page.waitForTimeout(500);

    const cartVisible = await page.locator('.cart-sidebar').isVisible();

    expect(cartVisible).toBeTruthy();
  });

  test('MCP-002: User can log in with semantic selectors', async ({ page }) => {

    await page.goto('http://localhost:3000/login');

    const emailField = page.getByPlaceholder(/email/i);

    const passwordField = page.getByPlaceholder(/password/i);

    const loginButton = page.getByRole('button', {
      name: /login/i
    });

    await expect(emailField).toBeVisible();

    await expect(passwordField).toBeVisible();

    await expect(loginButton).toBeVisible();

    await emailField.fill('test@blissflower.com');

    await passwordField.fill('Test123456');

    await loginButton.click();

    await page.waitForTimeout(2000);

    const dashboardVisible = await page.locator('.dashboard').isVisible();

    expect(dashboardVisible).toBeTruthy();
  });
});