# AGENTS.md

## Purpose
This repository is a Playwright-based automation framework for Easy Commission workflows. The file helps AI coding agents understand the project structure, common commands, and repository conventions.

## What this repo contains
- `tests/`: Playwright test specs.
- `fixtures/`: shared test fixtures, custom `test` extension, logger and page object setup.
- `pages/`: page object model classes.
- `pages/locators/`: locator files used by page objects.
- `utils/`: helper modules for environment selection and test data loading.
- `test-data/`: JSON fixtures for environments, users, and package data.
- `playwright.config.js`: Playwright configuration and browser project setup.

## How to run tests
Use npm scripts from the repository root.
- `npm test`
- `npm run test:headed`
- `npm run test:debug`
- `npm run test:test`
- `npm run test:stage`
- `npm run test:preprod`
- `npm run test:prod`
- `npm run report`

The environment is selected by `TEST_ENV`, which is consumed by `utils/configReader.js`.

## Key conventions
- Tests import `test` and `expect` from `fixtures/app.fixture.js`, not directly from `@playwright/test`.
- Page object classes live in `pages/*.page.js`.
- Locator definitions live in `pages/locators/*.locator.js` and are referenced by page objects.
- `fixtures/app.fixture.js` attaches failure screenshots under `reports/failure-screenshots`.
- `utils/configReader.js` reads `test-data/env/<env>.json` and `test-data/users.json`, `test-data/packageData.json`.
- `playwright.config.js` uses modern Playwright config but includes an older commented-out CommonJS sample.

## Recommendations for AI agents
- Preserve test fixtures and page object patterns when adding or refactoring tests.
- Keep the environment selection model based on `TEST_ENV` and JSON files.
- Verify the correct use of `loginPage`, `dashboardPage`, `agentPage`, `commissionPackagePage`, and `awardPage` fixtures.
- Avoid introducing new global environment loading patterns unless aligned with the existing `configReader` approach.

## Notes for `mcp` context
This project is a Playwright test automation repo, not a managed MCP server. Focus on helping the user extend or maintain the test framework and associated page object model.
