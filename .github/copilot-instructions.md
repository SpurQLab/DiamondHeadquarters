Purpose
This file guides AI coding agents to be immediately productive in this repository. It focuses on the real, discoverable patterns, commands, and files an agent will need to read, run, and change safely.

Quick commands
- **Install playwright browsers:** `npm run playwright:install`
- **Run TypeScript feature suite:** `npm test` (uses `cucumber-js` + `ts-node` via `package.json`)
- **Run smoke suite:** `npm run test:smoke`
- **Run Java suite (if working on Java code):** `mvn test` from repo root

High-level architecture (what to know fast)
- This repo contains a Playwright + Cucumber TypeScript test suite driven by `cucumber-js` (`package.json`) and also includes Java/Maven artifacts (`pom.xml`, README) from the upstream OrangeHRM framework. Focus on the TypeScript tests unless asked to work on the Java side.
- Browser automation is Playwright; Playwright is launched directly from the custom World in [src/support/world.ts](src/support/world.ts#L1-L120) and configured as headless by default.
- Feature files live at repository root `features/` (not under `src/test/resources`), e.g. [features/Divine_Essence_Women_Ring.feature](features/Divine_Essence_Women_Ring.feature#L1).
- Page objects live under [src/pages](src/pages/RingsandiPage.ts#L1-L10). Steps are in [src/steps](src/steps/RingsandiSteps.ts#L1-L20). Hooks and world lifecycle are in [src/support](src/support/hooks.ts#L1-L40) and [src/support/world.ts](src/support/world.ts#L1-L80).

Project-specific conventions and patterns
- Navigation & waits: prefer `page.goto(..., { waitUntil: 'load', timeout: 60000 })` and explicit short `waitForTimeout` calls. See [src/pages/RingsandiPage.ts](src/pages/RingsandiPage.ts#L1-L20) for examples.
- Resilient locators: use `locator(...).first()` and defensive `count()` checks before interacting (common across page objects).
- Parsing content: product weights are extracted by running regex against `page.content()` rather than strictly querying DOM fields. See `getMetalWeight` and `getStoneWeight` in [src/pages/RingsandiPage.ts](src/pages/RingsandiPage.ts#L120-L220).
- Test-result logging: tests append results to CSV using [src/utils/TestResultLogger.ts](src/utils/TestResultLogger.ts#L1-L80). CSVs are written to `test-output/csv` with filenames matching the product pattern `PRODUCTCODE-<size>NO.csv`.
- Excel-backed expected values: `ExcelDataReader` looks for Excel files at `test-data/<productCode>/<productCode>-<size>NO.xlsx` or `src/test/resources/data`. See [src/utils/ExcelDataReader.ts](src/utils/ExcelDataReader.ts#L1-L40).
- Hard-coded product context: many hooks and steps reference product code `R-0502-F1` (see [src/steps/RingsandiSteps.ts](src/steps/RingsandiSteps.ts#L1-L10) and [src/support/hooks.ts](src/support/hooks.ts#L1-L40)). Be careful when changing product-level defaults; update hooks/tests consistently.

Integration points & external dependencies
- Playwright: runtime dependency installed via `npm` and browsers installed with `npm run playwright:install`.
- xlsx (sheet reading): used by `ExcelDataReader` to read expected values from Excel files located under `test-data`.
- Cucumber publisher/attachments: hooks attach screenshots to steps; the CI may expect cucumber publisher artifacts.

Developer workflows and debugging
- Local quick iteration (TypeScript):

  1. `npm ci` or `npm install`
  2. `npm run playwright:install` (one time to download browsers)
  3. `npm test` to run all feature files

- If working on Playwright issues, enable verbose output by adding logs in [src/support/world.ts](src/support/world.ts#L1-L80) or run Node with debug flags as needed. The world logs browser lifecycle to console.
- Screenshots and HTML on failures are saved to `test-output/screenshots` by hooks in [src/support/hooks.ts](src/support/hooks.ts#L1-L60).

What to watch for (gotchas)
- There are two parallel ecosystems in this repo (Java/Maven and Node/TS). Don't assume changes in one will affect the other unless you confirm cross-build logic in CI.
- Many file paths and names are literal (product codes, CSV/XLSX filename conventions). If you add a new product or size, mirror naming used by `ExcelDataReader` and `TestResultLogger`.
- Hooks initialize CSVs with a specific product and ring size (`BeforeAll` in [src/support/hooks.ts](src/support/hooks.ts#L1-L30)). Update that carefully.

Example targeted edits an AI agent may be asked to make
- Update a locator in `RingsandiPage` and run the related feature: change selector, run `npm test` and inspect `test-output/screenshots` for failures.
- Add a new Excel-backed test: place `TESTCODE-<size>NO.xlsx` under `test-data/TESTCODE/`, add feature example row, and ensure `ExcelDataReader` can find the file.

If you need more detail
- Ask to expand any of these areas (run commands, CI config, or add example feature-to-step edits). If some behavior depends on external systems (SpurQuality), include credentials or environment notes before attempting uploads.

Please review — which areas should I expand (CI, Java integration, or data conventions)?
