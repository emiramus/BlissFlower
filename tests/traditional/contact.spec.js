const { test, expect } = require('@playwright/test');

test.describe('Traditional Contact Tests', () => {

  test.beforeEach(async ({ page }) => {

    await page.goto('http://localhost:3000/contact');
  });

  test('TC-CONTACT-001: Contact page loads correctly', async ({ page }) => {

    await expect(page.locator('.contact-hero h1'))
      .toContainText('Get in Touch');

    await expect(page.locator('form'))
      .toBeVisible();
  });

  test('TC-CONTACT-002: Contact methods are visible', async ({ page }) => {

    await expect(page.getByText('Visit Us').first())
      .toBeVisible();

    await expect(page.getByText('Call Us').first())
      .toBeVisible();

    await expect(page.getByText('Email Us').first())
      .toBeVisible();
  });

  test('TC-CONTACT-003: Error appears for empty form submission', async ({ page }) => {

    await page.click('button[type="submit"]');

    await expect(page.locator('.error').first())
      .toBeVisible();
  });

  test('TC-CONTACT-004: User can submit valid contact form', async ({ page }) => {

    await page.fill('input[name="name"]', 'Test User');

    await page.fill('input[name="email"]', 'test@test.com');

    await page.fill(
      'textarea[name="message"]',
      'This is a test message that is long enough for validation'
    );

    await page.click('button[type="submit"]');

    await expect(page.locator('.success-message'))
      .toBeVisible();
  });

});