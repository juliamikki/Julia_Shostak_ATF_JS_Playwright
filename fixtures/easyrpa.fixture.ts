import { test as base } from "@playwright/test";
import { LoginScreen, HomeScreen, AutomationProcessesScreen } from "@apps/easyrpa/screens";

type EasyRPAFixtures = {
  loginScreen: LoginScreen;
  homeScreen: HomeScreen;
  automationProcessesScreen: AutomationProcessesScreen;
};

export const test = base.extend<EasyRPAFixtures>({
  loginScreen: async ({ page }, use) => {
    await use(new LoginScreen(page));
  },
  homeScreen: async ({ page }, use) => {
    await use(new HomeScreen(page));
  },
  automationProcessesScreen: async ({ page }, use) => {
    await use(new AutomationProcessesScreen(page));
  },
});

export { expect } from "@playwright/test";
