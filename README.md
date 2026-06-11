# BlissFlower 🌸

BlissFlower is a modern flower shop web application developed using React.js. The application provides users with an interactive e-commerce experience including product browsing, bouquet customization, authentication, shopping cart management, checkout functionality, chatbot support, and automated testing.

The project was also used as a case study for evaluating modern UI testing approaches using Playwright, AI-powered testing techniques, and MCP-based testing experiments.

## Features

* Responsive user interface
* User registration and login
* Product browsing and filtering
* Custom bouquet creation
* Shopping cart management
* Checkout process
* Contact page
* Dashboard functionality
* Chatbot integration
* Traditional UI testing
* AI-powered testing
* MCP-based testing experiments

## Technologies Used

### Frontend

* React.js
* JavaScript
* HTML5
* CSS3

### Testing

* Playwright
* MCP Testing
* AI-Powered Testing

### Development Tools

* Node.js
* npm
* Visual Studio Code

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
├── package-lock.json
├── playwright.config.js
└── README.md
```

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/emiramus/BlissFlower.git
cd BlissFlower
npm install
```

## Running the Application

Start the development server:

```bash
npm start
```

The application will run at:

```text
http://localhost:3000
```

## Running Automated Tests

### Run All Tests

```bash
npx playwright test
```

### Run Traditional Tests

```bash
npx playwright test tests/traditional
```

### Run AI/MCP Tests

```bash
npx playwright test tests/ai-mcp
```

### Generate HTML Report

```bash
npx playwright show-report
```

## Test Coverage

The automated test suite covers:

* Homepage functionality
* User registration
* User login
* Navigation features
* Product browsing
* Shopping cart operations
* Checkout workflow
* Chatbot interactions
* Dashboard functionality
* End-to-end customer journeys

## Results

A total of 58 automated test cases were executed successfully using Playwright.

| Metric       | Value    |
| ------------ | -------- |
| Total Tests  | 58       |
| Passed Tests | 58       |
| Failed Tests | 0        |
| Browser      | Chromium |

## Author

**Emira Mustafa**
Software Testing and Analysis
South East European University
June 2026
