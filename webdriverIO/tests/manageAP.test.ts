import apData from './test-data/automationProcess.js';
import { envEasyRPA } from '#config/env';
import { AutomationProcessesScreen, HomeScreen, LoginScreen } from '#screens';

describe('Manage automation processes (AP)', () => {
  let loginScreen: LoginScreen;
  let homeScreen: HomeScreen;
  let automationProcessesScreen: AutomationProcessesScreen;

  beforeEach(async () => {
    loginScreen = new LoginScreen();
    homeScreen = new HomeScreen();
    automationProcessesScreen = new AutomationProcessesScreen();

    await loginScreen.goToBaseUrl(envEasyRPA.baseUrl);
    await loginScreen.loginWithCreds(envEasyRPA.credentials.username, envEasyRPA.credentials.password);
    await homeScreen.navigationMenu.openMenu();
    await homeScreen.navigationMenu.goToModule('Automation Processes');
    await automationProcessesScreen.createAutomationProcess(apData.newAP);
    await automationProcessesScreen.goBackToList();
    await automationProcessesScreen.table.expectRowToExist(apData.newAP.name);
  });

  it('should delete AP via check and delete in row', async () => {
    await homeScreen.navigationMenu.openMenu();
    await homeScreen.navigationMenu.goToModule('Automation Processes');
    await automationProcessesScreen.deleteAPInRow(apData.newAP);
    await automationProcessesScreen.table.expectRowNotToExist(apData.newAP.name);
  });

  it('should delete AP via search name, check first, delete in row', async () => {
    await homeScreen.navigationMenu.openMenu();
    await homeScreen.navigationMenu.goToModule('Automation Processes');
    await automationProcessesScreen.deleteAPviaSearchAndCheckFirst(apData.newAP);
    await automationProcessesScreen.table.expectToBeEmpty();
  });

  it('should delete AP via search name, check all, delete in page header', async () => {
    await homeScreen.navigationMenu.openMenu();
    await homeScreen.navigationMenu.goToModule('Automation Processes');
    await automationProcessesScreen.deleteAPviaSearchAndCheckAll(apData.newAP);
    await automationProcessesScreen.table.expectToBeEmpty();
  });
});
