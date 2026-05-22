// mcp-config.js
const { defineConfig } = require('@playwright/test');

module.exports = {
  // MCP Server configuration
  mcp: {
    server: {
      command: 'npx',
      args: ['@playwright/mcp'],
      env: {
        PLAYWRIGHT_HEADLESS: 'false',
      }
    }
  }
};