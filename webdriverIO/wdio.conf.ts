import allure from '@wdio/allure-reporter';

export const config: WebdriverIO.Config = {
  runner: 'local',
  maxInstances: 1,
  capabilities: [
    {
      maxInstances: 1,
      browserName: 'chrome',
      'goog:chromeOptions': {
        args: ['--start-maximized']
      }
    }
  ],
  specs: ['./tests/*.test.ts'],
  exclude: [],
  logLevel: 'error',
  bail: 0,
  waitforTimeout: 20000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  services: ['chromedriver'],
  framework: 'mocha',
  reporters: ['spec', ['allure', { outputDir: 'reports/allure-results' }]],
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000
  },
  autoCompileOpts: {
    autoCompile: true,
    tsNodeOpts: {
      project: './tsconfig.json',
      transpileOnly: true,
      files: true
    } as any
  },
  before: async () => {
    await browser.maximizeWindow();
  },
  afterTest: async (_test, _context, { passed }) => {
    if (!passed) {
      const screenshot = await browser.takeScreenshot();
      allure.addAttachment('Test Failure Screenshot', Buffer.from(screenshot, 'base64'), 'image/png');
    }
    await browser.reloadSession();
  }
  // afterCommand: async function (commandName, _args, _result, _error) {
  //   const commandsToCapture = ['click', 'setValue', 'url'];
  //   if (commandsToCapture.includes(commandName)) {
  //     const screenshot = await browser.takeScreenshot();
  //     allure.addAttachment(`Screenshot after ${commandName}`, Buffer.from(screenshot, 'base64'), 'image/png');
  //   }
  // }
};
