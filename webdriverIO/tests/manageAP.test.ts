import automationProcessData from "./test-data/automationProcess.js";
import { envEasyRPA } from "#config/env";
import { AutomationProcessesScreen, HomeScreen, LoginScreen } from "#screens";

describe("Manage automation processes (AP)", () => {
  let loginScreen: LoginScreen;
  let homeScreen: HomeScreen;
  let automationProcessesScreen: AutomationProcessesScreen;

  beforeEach(async () => {
    loginScreen = new LoginScreen();
    homeScreen = new HomeScreen();
    automationProcessesScreen = new AutomationProcessesScreen();

    await loginScreen.goToBaseUrl(envEasyRPA.baseUrl);
    await loginScreen.loginWithCreds(
      envEasyRPA.credentials.username,
      envEasyRPA.credentials.password,
    );
    await homeScreen.waitForReady();
    await homeScreen.navigationMenu.openMenu();
    await homeScreen.navigationMenu.goToModule("Automation Processes");
    await automationProcessesScreen.createAutomationProcess(
      automationProcessData.newAP,
    );
    await automationProcessesScreen.goBackToList();
  });

  it("should delete AP via check and delete in row", async () => {
    await homeScreen.navigationMenu.openMenu();
    await homeScreen.navigationMenu.goToModule("Automation Processes");
    //fix: the header checkbox is checked:
    await automationProcessesScreen.deleteAPInRow(automationProcessData.newAP);
    await automationProcessesScreen.table.expectRowNotToExist(
      automationProcessData.newAP.name,
    );
  });

  it.skip("should delete AP via search name, check first, delete in row", async () => {
    await homeScreen.navigationMenu.openMenu();
    await homeScreen.navigationMenu.goToModule("Automation Processes");
    await automationProcessesScreen.deleteAPviaSearchAndCheckFirst(
      automationProcessData.newAP,
    );
    await automationProcessesScreen.table.expectToBeEmpty();
  });

  it.skip("should delete AP via search name, check all, delete in page header", async () => {
    await homeScreen.navigationMenu.openMenu();
    await homeScreen.navigationMenu.goToModule("Automation Processes");
    await automationProcessesScreen.deleteAPviaSearchAndCheckAll(
      automationProcessData.newAP,
    );
    await automationProcessesScreen.table.expectToBeEmpty();
  });
});
