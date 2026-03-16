import { test, expect } from "@fixtures/easyrpa.fixture";
import apData from "./test-data/automationProcess.json" assert { type: "json" }; 


test.describe("Manage automation processes", () => {

  test("should create a new automation process", async ({ homeScreen, automationProcessesScreen }) => {
    await homeScreen.navigationMenu.openMenu();
    await homeScreen.navigationMenu.goToModule("Automation Processes");
    await automationProcessesScreen.waitForReady();
    await automationProcessesScreen.createAutomationProcess(apData.newAP);
    await automationProcessesScreen.goBackToList();
    await automationProcessesScreen.waitForReady();
    await automationProcessesScreen.deleteAutomationProcess(apData.newAP);
  });
});
