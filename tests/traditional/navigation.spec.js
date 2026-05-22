const { test, expect } = require('@playwright/test');

test.describe('Traditional Navigation Tests', () => {

  test('TC-NAV-001: Navigation bar is visible on all pages', async ({ page }) => {

    await page.goto('http://localhost:3000');

    await expect(page.locator('.navbar'))
      .toBeVisible();

    await page.goto('http://localhost:3000/products');

    await expect(page.locator('.navbar'))
      .toBeVisible();

    await page.goto('http://localhost:3000/contact');

    await expect(page.locator('.navbar'))
      .toBeVisible();

    await page.goto('http://localhost:3000/login');

    await expect(page.locator('.navbar'))
      .toBeVisible();
  });

  test('TC-NAV-002: Clicking logo navigates to home page', async ({ page }) => {

    await page.goto('http://localhost:3000/products');

    await page.locator('.nav-logo a').click();

    await expect(page)
      .toHaveURL('http://localhost:3000/');
  });

  test('TC-NAV-003: Shop link navigates to products page', async ({ page }) => {

    await page.goto('http://localhost:3000');

    await page.getByRole('link', {
      name: /shop/i
    }).click();

    await expect(page)
      .toHaveURL(/products/);
  });

  test('TC-NAV-004: Contact link navigates to contact page', async ({ page }) => {

    await page.goto('http://localhost:3000');

    await page.getByRole('link', {
      name: /contact/i
    }).click();

    await expect(page)
      .toHaveURL(/contact/);
  });

  test('TC-NAV-005: Login link navigates to login page', async ({ page }) => {

    await page.goto('http://localhost:3000');

    await page.getByRole('link', {
      name: /login/i
    }).click();

    await expect(page)
      .toHaveURL(/login/);
  });

  test('TC-NAV-006: Register link navigates to register page', async ({ page }) => {

    await page.goto('http://localhost:3000/login');

    await page.getByRole('link', {
      name: /register/i
    }).first().click();

    await expect(page)
      .toHaveURL(/register/);
  });

});