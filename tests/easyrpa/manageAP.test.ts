import { test, expect } from "@fixtures/easyrpa.fixture";
import { envEasyRPA } from "@config/env";

test.describe("Manage automation processes", () => {
  test.beforeEach(async ({ loginScreen }) => {
    await loginScreen.goToBaseUrl(envEasyRPA.baseUrl);
    await loginScreen.loginWithCreds(
      envEasyRPA.credentials.username,
      envEasyRPA.credentials.password,
    );
  });

  //TODO: store test data in json format 
  test("should create a new automation process", async ({ homeScreen, automationProcessesScreen }) => {
    await homeScreen.navigationMenu.waitForVisible();
    await homeScreen.navigationMenu.openMenu();
    await homeScreen.navigationMenu.goToModule("Automation Processes");
    await automationProcessesScreen.waitForHeader("Automation Processes");
    await automationProcessesScreen.createAutomationProcess({
      name: "[Test] Automation Process",
      moduleClass: "eu.ibagroup.easyrpa.taskexecution.ExecuteDemoAp",
      groupId: "eu.ibagroup",
      artifactId: "kb-short-samples",
      versionId: "3.2.0",
    });


  });


});
