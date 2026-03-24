import { test as base } from "@playwright/test";
import { LoginScreen, HomeScreen, AutomationProcessesScreen } from "@apps/easyrpa/screens";
import { envEasyRPA } from "@config/env";

type EasyRPAFixtures = {
  homeScreen: HomeScreen;
  apScreen: AutomationProcessesScreen;
};

export const test = base.extend<EasyRPAFixtures>({

  homeScreen: async ({ page }, use) => {
    const loginScreen = new LoginScreen(page);
    await loginScreen.goToBaseUrl(envEasyRPA.baseUrl);
    await loginScreen.loginWithCreds(envEasyRPA.credentials.username, envEasyRPA.credentials.password);

    const homeScreen = new HomeScreen(page);
    await use(homeScreen);
  },

  apScreen: async ({ page }, use) => {
    const apScreen = new AutomationProcessesScreen(page)
    await use(apScreen);
  },
});

export { expect } from "@playwright/test";
