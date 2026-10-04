# Playwright E2E Testing Implementation Guide

**Goal:** Set up comprehensive end-to-end testing with Playwright, including component tests, accessibility scanning, screenshot generation, and CI/CD integration.

## Setup & Configuration

### 1. Install Dependencies

```bash
npm install --save-dev @playwright/test @axe-core/playwright pixelmatch pngjs
```

### 2. Create `playwright.config.js`

Configure Playwright with the following settings:

- **Test directory:** `e2e`
- **Parallel execution:** `fullyParallel: true`
- **CI mode:** `forbidOnly: !!process.env.CI` (prevents `only()` in CI)
- **Retry behavior:** `retries: process.env.CI ? 1 : 0`
- **Reporters:** 
  - Local: `list`
  - CI: `github` and `html` (with `open: 'never'`)
- **Base URL:** `http://127.0.0.1:4173` (Vite preview server)
- **Service workers:** Block with `serviceWorkers: 'block'`
- **Timezone:** Set consistently to `America/New_York` via `timezoneId`
- **Trace:** Capture on failure with `trace: 'retain-on-failure'`
- **Browser:** Chromium at 1440x900 viewport for desktop tests
- **Web server:** Build and serve production build with `npm run build && npm run preview -- --host 127.0.0.1 --port 4173 --strictPort`

**Example `playwright.config.js`:**

```javascript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: 'e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: 'http://127.0.0.1:4173',
    serviceWorkers: 'block',
    timezoneId: 'America/New_York',
    trace: 'retain-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } } }],
  webServer: {
    command: 'npm run build && npm run preview -- --host 127.0.0.1 --port 4173 --strictPort',
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
```

### 3. Create Custom Fixtures (`e2e/fixtures.js`)

Custom fixtures ensure every test starts from a consistent state:

```javascript
import { test as base, expect } from '@playwright/test';

// Fixed time and clean app state, so every test starts from the same board
const NOW = new Date('2026-09-24T18:30:00-04:00');

export const test = base.extend({
  page: async ({ page }, provide) => {
    // Hide onboarding tips and local storage warnings
    await page.addInitScript(() => { 
      localStorage.setItem('app:hidetip', '1'); 
      localStorage.setItem('app:hidelocal', '1'); 
    });
    // Freeze time for consistent timestamps
    await page.clock.install({ time: NOW });
    // Navigate and wait for initial load
    await page.goto('/');
    await page.waitForLoadState('networkidle').catch(() => {});
    await provide(page);
  },
});

export { expect };
```

**Key practices:**
- Use `addInitScript()` to initialize state before page load
- Use `page.clock.install()` to freeze time at a consistent point
- Wait for `networkidle` to ensure app is fully initialized
- Use `.catch(() => {})` for non-critical waits (in case app doesn't make external requests)

## Test File Structure

### Import Pattern

Always import from custom fixtures, not the base package:

```javascript
import { test, expect } from './fixtures.js';
```

### Test Organization

Structure tests with helper functions and logical flow:

```javascript
const restBox = (page, d) => page.locator(`#rest-${d}`);

test('checking a card off counts it done, and unchecking undoes it', async ({ page }) => {
  const box = page.locator('#chk-A-d1s1');
  await expect(box).not.toBeChecked();
  await box.check();
  await expect(box).toBeChecked();
  await box.uncheck();
  await expect(box).not.toBeChecked();
});
```

### Common Interaction Patterns

| Pattern | Example |
|---------|---------|
| **Check/uncheck** | `await box.check()`, `await box.uncheck()` |
| **Click** | `await page.click('#tab-progress')` |
| **Text input** | `await page.fill('#input', 'value')` |
| **Dialog handling** | `page.once('dialog', d => d.accept())` or `d.dismiss()` |
| **Wait for state** | `await page.waitForLoadState('networkidle')` |
| **Wait for visual** | `await page.waitForTimeout(300)` (for animations) |

### Common Assertions

```javascript
expect(element).toBeChecked();
expect(element).not.toBeChecked();
expect(locator).toHaveCount(1);
expect(text).toContain('substring');
expect(element).toBeVisible();
expect(element).toBeDisabled();
```

## Accessibility Testing with Axe

### Setup

Import and configure Axe Core for Playwright:

```javascript
import AxeBuilder from '@axe-core/playwright';
import { test, expect } from './fixtures.js';

const scan = page => new AxeBuilder({ page })
  .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
  .analyze();
```

### Implementation Pattern

Test all major views/states for accessibility:

```javascript
for (const [name, tab] of [
  ['board', null], 
  ['progress', '#tab-progress'], 
  ['program editor', '#tab-program'],
  ['body', '#tab-body']
]) {
  test(`${name} has no accessibility violations`, async ({ page }) => {
    if (tab) { 
      await page.click(tab); 
      await page.waitForTimeout(300); 
    }
    const { violations } = await scan(page);
    expect(violations.map(v => `${v.id}: ${v.nodes.map(n => n.target.join(' ')).slice(0, 3).join(', ')}`))
      .toEqual([]);
  });
}
```

## Screenshot Generation for Documentation

### Create `tools/screenshots.mjs`

This script generates consistent screenshots for README and visual regression testing:

```javascript
import { chromium } from '@playwright/test';
import { execSync } from 'node:child_process';
import http from 'node:http';
import { readFile, mkdir } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const OUT = process.env.SHOT_OUT || join(ROOT, 'docs', 'images');
const NOW = new Date('2026-09-24T18:30:00-04:00'); // a Thursday
const DIST = join(ROOT, 'dist');
const TYPES = { 
  '.html':'text/html', '.css':'text/css', '.js':'text/javascript', 
  '.svg':'image/svg+xml', '.png':'image/png', '.json':'application/json',
  '.webmanifest':'application/manifest+json', '.woff2':'font/woff2' 
};

// Build the app
execSync('npm run build', { cwd: ROOT, stdio: 'inherit' });

// Static server for the built app
const server = http.createServer(async (req, res) => {
  try {
    let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    if (p.endsWith('/')) p += 'index.html';
    const dir = /^\/(tools|docs|public)\//.test(p) ? ROOT : DIST;
    const file = normalize(join(dir, p));
    if (!file.startsWith(dir)) { res.writeHead(403).end(); return; }
    const body = await readFile(file);
    res.writeHead(200, { 'content-type': TYPES[extname(file)] || 'application/octet-stream' }).end(body);
  } catch { res.writeHead(404).end(); }
});
await new Promise(r => server.listen(0, '127.0.0.1', r));
const BASE = `http://127.0.0.1:${server.address().port}`;

// Helper to open a new context with seed data
async function open({ width, height, dpr = 2, dark = false, mobile = false }) {
  const ctx = await browser.newContext({ 
    viewport: { width, height }, 
    deviceScaleFactor: dpr, 
    colorScheme: dark ? 'dark' : 'light',
    isMobile: mobile, 
    hasTouch: mobile, 
    timezoneId: 'America/New_York', 
    serviceWorkers: 'block' 
  });
  // Initialize with seed data
  await ctx.addInitScript(s => { 
    for (const [k, v] of Object.entries(s)) 
      localStorage.setItem(k, typeof v === 'string' ? v : JSON.stringify(v)); 
  }, seed);
  const page = await ctx.newPage();
  await page.clock.install({ time: NOW });
  await page.goto(BASE + '/');
  await page.waitForLoadState('networkidle').catch(() => {});
  await page.evaluate(() => document.fonts && document.fonts.ready);
  await page.waitForTimeout(300);
  return { ctx, page };
}

const shot = (page, name, opts = {}) => page.screenshot({ path: join(OUT, name), ...opts });

await mkdir(OUT, { recursive: true });

const browser = await chromium.launch();

// Desktop screenshots (light and dark)
for (const dark of [false, true]) {
  const { ctx, page } = await open({ width: 1440, height: 900, dpr: 1.5, dark });
  await shot(page, dark ? 'board-dark.png' : 'board.png');
  await ctx.close();
}

// Mobile screenshots with interactions
{
  const { ctx, page } = await open({ width: 390, height: 844, dpr: 2, mobile: true });
  await shot(page, 'mobile-board.png');
  await page.click('#log-B-d2s5-0');
  await page.waitForTimeout(200);
  await shot(page, 'mobile-log.png');
  await ctx.close();
}

await browser.close();
server.close();
console.log(`Screenshots written to ${OUT}`);
```

### Seed Data Pattern

Create realistic sample data representing different app states:

```javascript
const seed = {
  'app:config/main': config,
  'app:hidetip': '1',
  'app:hidelocal': '1'
};
// Add logs and week data
Object.entries(logs).forEach(([k, v]) => seed[`app:logs/${k}`] = { entries: v });
Object.entries(weeks).forEach(([k, v]) => seed[`app:weeks/${k}`] = v);
```

### Add npm Script

```json
{
  "scripts": {
    "screenshots": "node tools/screenshots.mjs"
  }
}
```

**Environment variable:** `SHOT_OUT=custom/path npm run screenshots` to write elsewhere

## CI/CD Integration

### GitHub Actions: Tests (`.github/workflows/test.yml`)

Run linting, unit tests, and E2E tests on every PR:

```yaml
name: Tests

on:
  pull_request:
  workflow_dispatch:

permissions:
  contents: read

concurrency:
  group: tests-${{ github.ref }}
  cancel-in-progress: true

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7
      - uses: actions/setup-node@v7
        with:
          node-version: 24
          cache: npm
      - run: npm ci
      - run: npm run lint
      - run: npm test

  e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7
      - uses: actions/setup-node@v7
        with:
          node-version: 24
          cache: npm
      - run: npm ci
      - run: npx playwright install --with-deps chromium
      - run: npm run e2e
      - uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: playwright-report
          path: |
            playwright-report
            test-results
          retention-days: 7
      - run: npm run build
      - uses: actions/upload-artifact@v4
        with:
          name: app-preview
          path: dist
          retention-days: 7
```

### GitHub Actions: Screenshots (`.github/workflows/screenshots.yml`)

Auto-generate and compare screenshots on feature branches:

```yaml
name: README screenshots

on:
  workflow_dispatch:
  pull_request:
    types: [opened, reopened]
  push:
    branches-ignore: [main, data]
    paths:
      - 'index.html'
      - 'src/**'
      - 'public/**'
      - 'package.json'
      - 'vite.config.js'
      - 'tools/**'
      - '.github/workflows/screenshots.yml'

permissions:
  contents: write
  pull-requests: write

concurrency:
  group: screenshots-${{ github.head_ref || github.ref }}
  cancel-in-progress: true

jobs:
  screenshots:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7
        with:
          fetch-depth: 0
      - uses: actions/setup-node@v7
        with:
          node-version: 24
          cache: npm
      - run: npm ci
      - run: npx playwright install --with-deps chromium
      - run: npm run screenshots
      # Compare with main and comment on PR...
      - name: Commit updated images
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "41898282+github-actions[bot]@users.noreply.github.com"
          git add docs/images
          if git diff --cached --quiet; then exit 0; fi
          git commit -m "Update README screenshots"
          git pull --rebase origin "${{ github.head_ref || github.ref_name }}"
          git push
```

## Best Practices

### 1. Test Independence

- Each test must start from the same initial state via fixtures
- Don't depend on test execution order
- Use unique selectors that don't change across runs

### 2. Stable Selectors

- Prefer IDs: `page.locator('#specific-id')`
- Use semantic HTML roles: `page.getByRole('button', { name: 'Submit' })`
- Avoid brittle class names that change with styling updates

### 3. Smart Waits

```javascript
// For network activity
await page.waitForLoadState('networkidle').catch(() => {});

// For visual animations
await page.waitForTimeout(300);

// For specific elements
await page.locator('.selector').waitFor({ state: 'visible' });
```

### 4. Accessibility-First Testing

- Run a11y scans on all major views
- Test both light and dark color schemes
- Use semantic selectors (roles, ARIA labels)
- Test keyboard navigation alongside mouse

### 5. Error Handling & Debugging

- **Traces:** Enabled on failure, available in HTML report for local debugging
- **Screenshots:** Playwright captures on failure automatically
- **Dialog handling:** Always explicitly accept/dismiss dialogs
- **Console errors:** Monitor via GitHub Actions logs

### 6. Performance Considerations

- Parallel test execution with `fullyParallel: true`
- Reuse built app in dev with `reuseExistingServer: !process.env.CI`
- Cache npm dependencies in CI with `cache: npm`

## Package.json Configuration

Add these scripts and dev dependencies:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "e2e": "playwright test",
    "screenshots": "node tools/screenshots.mjs"
  },
  "devDependencies": {
    "@axe-core/playwright": "^4.13.0",
    "@playwright/test": "^1.63.0",
    "pixelmatch": "^7.2.0",
    "pngjs": "^7.0.0"
  }
}
```

## Running Tests Locally

```bash
# Install dependencies (including browsers)
npm ci
npx playwright install

# Run all tests
npm test       # Unit tests
npm run e2e    # E2E tests
npm run lint   # Linting

# Run specific E2E test file
npx playwright test e2e/board.spec.js

# Generate screenshots
npm run screenshots

# Run tests with UI (debug mode)
npx playwright test --ui
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Tests timeout | Increase `timeout` in webServer config or `testTimeout` in projects |
| "Address already in use" | Set `reuseExistingServer: false` in CI |
| Service worker blocking | Already handled via `serviceWorkers: 'block'` in config |
| Timezone issues | Ensure consistent `timezoneId` and `page.clock.install()` |
| Flaky a11y tests | Run violations check multiple times, map violations clearly |

## References

- [Playwright Documentation](https://playwright.dev)
- [Axe Core for Playwright](https://github.com/dequelabs/axe-core-npm/blob/develop/packages/playwright)
- [WCAG 2.2 Standards](https://www.w3.org/WAI/WCAG22/quickref/)
