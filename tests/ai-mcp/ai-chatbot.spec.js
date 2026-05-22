const { test, expect } = require('@playwright/test');

test.describe('AI Powered ChatBot Tests', () => {

  test.setTimeout(60000);

  test('AI-CHAT-001: User can interact with chatbot', async ({ page }) => {

    await page.goto('http://localhost:3000');

    await page.getByText('Need help?').click();

    await expect(page.locator('.chat-window')).toBeVisible();

    await page.getByPlaceholder('Type your message...').fill('What flowers do you sell?');

    await page.getByRole('button', { name: 'Send →' }).click();

    await page.waitForTimeout(2000);

    const botResponse = page.locator('.message.bot .message-bubble').last();

    const responseText = await botResponse.textContent();

    expect(responseText?.toLowerCase()).toMatch(/rose|peony|flower/i);
  });

  test('AI-CHAT-002: User can ask different chatbot questions', async ({ page }) => {

    await page.goto('http://localhost:3000');

    await page.getByText('Need help?').click();

    const questions = [
      { text: 'Delivery options?', expected: /delivery|same-day|free/i },
      { text: 'Chocolate prices', expected: /price|den|cost/i },
      { text: 'Gift sets', expected: /gift|set|romantic/i },
      { text: 'Contact information', expected: /contact|phone|email/i }
    ];

    for (const question of questions) {

      const input = page.getByPlaceholder('Type your message...');

      await input.fill(question.text);

      await page.getByRole('button', { name: 'Send →' }).click();

      await page.waitForTimeout(1500);

      const botResponse = page.locator('.message.bot .message-bubble').last();

      const responseText = await botResponse.textContent();

      expect(responseText?.toLowerCase()).toMatch(question.expected);
    }
  });
});