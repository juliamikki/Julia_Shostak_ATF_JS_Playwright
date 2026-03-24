import { test } from '@fixtures/easyrpa.fixture';
import apData from './test-data/automationProcess.json' assert { type: 'json' };

test.describe('Manage automation processes (AP)', () => {
  test.beforeEach('create a new AP', async ({ homeScreen, apScreen }) => {
    await homeScreen.navigationMenu.openMenu();
    await homeScreen.navigationMenu.goToModule('Automation Processes');
    await apScreen.createAutomationProcess(apData.newAP);
    await apScreen.goBackToList();
    await apScreen.table.expectRowToExist(apData.newAP.name);
  });

  test('should delete AP via check and delete in row', async ({ homeScreen, apScreen }) => {
    await homeScreen.navigationMenu.openMenu();
    await homeScreen.navigationMenu.goToModule('Automation Processes');
    await apScreen.deleteAutomationProcess(apData.newAP);
    await apScreen.table.expectRowNotToExist(apData.newAP.name);
  });

  test('should delete AP via search by name, check first, delete in row', async ({ homeScreen, apScreen }) => {
    await homeScreen.navigationMenu.openMenu();
    await homeScreen.navigationMenu.goToModule('Automation Processes');
    await apScreen.deleteAutomationProcess(apData.newAP, { search: true, rowIndex: 0 });
    await apScreen.table.expectToBeEmpty();
  });

  test('should delete AP via search by name, check all, delete in page header', async ({ homeScreen, apScreen }) => {
    await homeScreen.navigationMenu.openMenu();
    await homeScreen.navigationMenu.goToModule('Automation Processes');
    await apScreen.deleteAutomationProcess(apData.newAP, { search: true, checkAll: true });
    await apScreen.table.expectToBeEmpty();
  });
});
