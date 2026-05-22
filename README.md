# BlissFlower 🌸

BlissFlower is a modern flower shop web application built with React.  
The project includes bouquet customization, authentication, shopping cart, checkout system, chatbot integration, and automated testing using Playwright and AI-powered testing approaches.

## Features

- Responsive UI design
- Login & Registration system
- Product browsing
- Custom bouquet creation
- Shopping cart & checkout
- Contact & dashboard pages
- ChatBot integration
- Traditional automated testing
- AI-powered testing
- MCP-based testing experiments

## Technologies Used

- React.js
- JavaScript
- CSS
- Node.js
- Playwright
- MCP / AI Testing

## Project Structure

```bash
BlissFlower/
│
├── public/
├── src/
│   ├── components/
│   ├── App.js
│   ├── index.js
│   ├── App.css
│   └── index.css
│
├── tests/
│   ├── traditional/
│   ├── ai-mcp/
│   └── comparison/
│
├── reports/
├── playwright-report/
├── package.json
├── playwright.config.js
└── README.md
```

## Installation

```bash
git clone https://github.com/emiramus/BlissFlower.git
cd BlissFlower
npm install
```

## Run Project

```bash
npm start
```

## Run Tests

### Run all tests

```bash
npx playwright test
```

### Run traditional tests

```bash
npx playwright test tests/traditional
```

### Run AI/MCP tests

```bash
npx playwright test tests/ai-mcp
```
