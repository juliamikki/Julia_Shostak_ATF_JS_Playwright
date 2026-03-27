import apData from './test-data/automationProcess.js';
import { envEasyRPA } from '#config/env';
import { AutomationProcessesScreen, HomeScreen, LoginScreen } from '#screens';

describe('Manage automation processes (AP)', () => {
  let loginScreen: LoginScreen;
  let homeScreen: HomeScreen;
  let apScreen: AutomationProcessesScreen;

  beforeEach(async () => {
    loginScreen = new LoginScreen();
    homeScreen = new HomeScreen();
    apScreen = new AutomationProcessesScreen();

    await loginScreen.goToBaseUrl(envEasyRPA.baseUrl);
    await loginScreen.loginWithCreds(envEasyRPA.credentials.username, envEasyRPA.credentials.password);
    await homeScreen.navigationMenu.openMenu();
    await homeScreen.navigationMenu.goToModule('Automation Processes');
    await apScreen.createAutomationProcess(apData.newAP);
    await apScreen.goBackToList();
    await apScreen.table.expectRowToExist(apData.newAP.name);
  });

  it('should delete AP via check and delete in row', async () => {
    await homeScreen.navigationMenu.openMenu();
    await homeScreen.navigationMenu.goToModule('Automation Processes');
    await apScreen.deleteAutomationProcess(apData.newAP);
    await apScreen.table.expectRowNotToExist(apData.newAP.name);
  });

  it('should delete AP via search name, check first, delete in row', async () => {
    await homeScreen.navigationMenu.openMenu();
    await homeScreen.navigationMenu.goToModule('Automation Processes');
    await apScreen.deleteAutomationProcess(apData.newAP, { search: true, rowIndex: 0 });
    await apScreen.table.expectToBeEmpty();
  });

  it('should delete AP via search name, check all, delete in page header', async () => {
    await homeScreen.navigationMenu.openMenu();
    await homeScreen.navigationMenu.goToModule('Automation Processes');
    await apScreen.deleteAutomationProcess(apData.newAP, { search: true, checkAll: true });
    await apScreen.table.expectToBeEmpty();
  });
});
