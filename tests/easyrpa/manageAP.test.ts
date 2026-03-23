import { test } from "@fixtures/easyrpa.fixture";
import apData from "./test-data/automationProcess.json" assert { type: "json" };

test.describe("Manage automation processes (AP)", () => {

  test.beforeEach("create a new AP", async ({ homeScreen, automationProcessesScreen }) => {
      await homeScreen.navigationMenu.openMenu();
      await homeScreen.navigationMenu.goToModule("Automation Processes");
      await automationProcessesScreen.createAutomationProcess(apData.newAP);
      await automationProcessesScreen.goBackToList();
      //TODO: should the assert be here?
    },
  );

  test("should delete AP via check and delete in row", async ({ homeScreen, automationProcessesScreen }) => {
    await homeScreen.navigationMenu.openMenu();
    await homeScreen.navigationMenu.goToModule("Automation Processes");
    await automationProcessesScreen.deleteAPInRow(apData.newAP);
    await automationProcessesScreen.table.expectRowNotToExist(apData.newAP.name);
  });

  test("should delete AP via search name, check first, delete in row", async ({ homeScreen, automationProcessesScreen }) => {
    await homeScreen.navigationMenu.openMenu();
    await homeScreen.navigationMenu.goToModule("Automation Processes");
    await automationProcessesScreen.deleteAPviaSearchAndCheckFirst(apData.newAP);
    await automationProcessesScreen.table.expectToBeEmpty();
  });

  test("should delete AP via search name, check all, delete in page header", async({ homeScreen, automationProcessesScreen }) => {
    await homeScreen.navigationMenu.openMenu();
    await homeScreen.navigationMenu.goToModule("Automation Processes");
    //TODO: is it ok to have complicated methods like this in PO? or better to move the logic in test?
    await automationProcessesScreen.deleteAPviaSearchAndCheckAll(apData.newAP);
    await automationProcessesScreen.table.expectToBeEmpty();
  });
});
