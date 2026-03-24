import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",
  timeout: 40000, //test timeout - 30s by default

  expect: {
    timeout: 20000, //expect timeout - 5s by default
  },

  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  outputDir: "./reports/test-results",
  reporter: [
    ["html", { outputFolder: "reports/playwright-report", open: "never" }],
    ["allure-playwright", { resultsDir: "reports/allure-results" }],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on",
    headless: false,
    viewport: { width: 1960, height: 1280 },
    video: "off",
  },

  /* Configure projects for major browsers */
  projects: [
    /* ONLINER AUTH SETUP */
    {
      name: "onliner-setup",
      testMatch: "onliner/setup/setCookies.ts",
      use: { ...devices["Desktop Chrome"] },
    },

    /* ONLINER TESTS */
    {
      name: "onliner",
      testDir: "./tests/onliner",
      use: {
        ...devices["Desktop Chrome"],
        storageState: "tests/onliner/.auth/cookies.json",
      },
      dependencies: ["onliner-setup"],
      workers: 1,
    },

    /* EASYRPA TESTS */
    {
      name: "easyrpa-chromium",
      testDir: "./tests/easyrpa",
      use: {
        browserName: "chromium",
        channel: "chrome",
        ...devices["Desktop Chrome"],
      },
      workers: 1,
    },

    // {
    //   name: "easyrpa-firefox",
    //   testDir: "./tests/easyrpa",
    //   use: {
    //     browserName: "firefox",
    //     channel: "firefox",
    //     viewport: { width: 1280, height: 720 },
    //   },
    // },
    // {
    //   name: "Microsoft Edge",
    //   testDir: "./tests/easyrpa",
    //   use: {
    //     browserName: "chromium",
    //     channel: "msedge",
    //     ...devices["Desktop Chrome"],
    //   },
    // },

    /* Test against mobile viewports. */
    //  {
    //   name: "Mobile Chrome",
    //   testDir: "./tests/easyrpa",
    //   use: {
    //     ...devices["Pixel 5"],  // emulated Android Chrome
    //   },
    // },
    // {
    //   name: "Mobile Safari",
    //   testDir: "./tests/easyrpa",
    //   use: {
    //     ...devices["iPhone 15"], // emulated iOS Safari
    //   },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
