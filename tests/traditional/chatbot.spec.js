const { test, expect } = require('@playwright/test');

test.describe('Traditional ChatBot Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('TC-CHAT-001: Chatbot button is visible', async ({ page }) => {

    await expect(page.locator('.chat-button')).toBeVisible();

    await expect(page.getByText('Need help?')).toBeVisible();
  });

  test('TC-CHAT-002: User can open chat window', async ({ page }) => {

    await page.locator('.chat-button').click();

    await expect(page.locator('.chat-window')).toBeVisible();

    await expect(page.locator('.chat-header h3')).toContainText('BlissFlower Assistant');
  });

  test('TC-CHAT-003: Welcome message is displayed', async ({ page }) => {

    await page.locator('.chat-button').click();

    const welcomeMessage = page.locator('.message.bot .message-bubble').first();

    await expect(welcomeMessage).toContainText('Welcome to BlissFlower');
  });

  test('TC-CHAT-004: User can type a message', async ({ page }) => {

    await page.locator('.chat-button').click();

    const inputField = page.locator('.chat-input input');

    await inputField.fill('Hello, I need help with flowers');

    await expect(inputField).toHaveValue('Hello, I need help with flowers');
  });

  test('TC-CHAT-005: User can send a message', async ({ page }) => {

    await page.locator('.chat-button').click();

    const inputField = page.locator('.chat-input input');

    await inputField.fill('What flowers do you have?');

    await page.locator('.chat-input button').click();

    const userMessage = page.locator('.message.user .message-bubble').last();

    await expect(userMessage).toContainText('What flowers do you have?');
  });

  test('TC-CHAT-006: Bot responds to user message', async ({ page }) => {

    await page.locator('.chat-button').click();

    const inputField = page.locator('.chat-input input');

    await inputField.fill('What flowers do you have?');

    await page.locator('.chat-input button').click();

    await page.waitForTimeout(2000);

    const botMessages = page.locator('.message.bot .message-bubble');

    await expect(botMessages.last()).toBeVisible();
  });

  test('TC-CHAT-007: Bot responds to flower question', async ({ page }) => {

    await page.locator('.chat-button').click();

    const inputField = page.locator('.chat-input input');

    await inputField.fill('What flowers do you have?');

    await page.locator('.chat-input button').click();

    await page.waitForTimeout(2000);

    const botResponse = page.locator('.message.bot .message-bubble').last();

    const responseText = await botResponse.textContent();

    expect(responseText?.toLowerCase()).toMatch(/rose|peony|sunflower|flower/i);
  });

  test('TC-CHAT-008: Bot responds to delivery question', async ({ page }) => {

    await page.locator('.chat-button').click();

    const inputField = page.locator('.chat-input input');

    await inputField.fill('What are your delivery options?');

    await page.locator('.chat-input button').click();

    await page.waitForTimeout(2000);

    const botResponse = page.locator('.message.bot .message-bubble').last();

    const responseText = await botResponse.textContent();

    expect(responseText?.toLowerCase()).toMatch(/delivery|free|same-day/i);
  });

  test('TC-CHAT-009: User can close chat window', async ({ page }) => {

    await page.locator('.chat-button').click();

    await expect(page.locator('.chat-window')).toBeVisible();

    await page.locator('.chat-close').click();

    await page.waitForTimeout(500);

    await expect(page.locator('.chat-button')).toBeVisible();

    await expect(page.locator('.chat-window')).not.toBeVisible();
  });

});