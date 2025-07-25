# condulit-dojo

A Playwright-based end-to-end and API testing suite for the Conduit demo application.

## Project Structure

```
.
├── src/
│   ├── pages/         # Page Object Models for UI automation
│   ├── types/         # TypeScript type definitions
│   └── utils/         # Utility functions and test data generators
├── tests/
│   ├── e2e/           # End-to-end Playwright test specs
│   ├── api-tests/     # API test specs
│   └── testdata/      # Static test data (e.g., articles)
├── playwright.config.ts   # Playwright configuration
├── package.json           # Project dependencies and scripts
└── README.md
```

## Getting Started

1. **Install dependencies:**

   ```sh
   npm install
   ```

2. **Run all tests:**

   ```sh
   npx playwright test
   ```

3. **View test reports:**
   ```sh
   npx playwright show-report
   ```

## Features

- Playwright with TypeScript for browser and API automation
- Page Object Model pattern for maintainable UI tests
- API and UI test coverage
- Test data generation utilities

## Resources
