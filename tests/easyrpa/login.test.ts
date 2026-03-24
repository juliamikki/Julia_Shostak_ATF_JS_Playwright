import { test, expect } from '@fixtures/easyrpa.fixture';
import { LoginScreen } from '@apps/easyrpa/screens';
import { envEasyRPA } from '@config/env';

test.describe('EasyRPA Login Feature', () => {
  test('shows error for invalid credentials', async ({ page }) => {
    const loginScreen = new LoginScreen(page);
    await loginScreen.goToBaseUrl(envEasyRPA.baseUrl);
    await loginScreen.loginWithCreds('wrong user', 'wrong password');
    await expect(loginScreen.errorMessage).toHaveText('Invalid credentials for user');
  });

  test('redirects to home screen on valid credentials', async ({ homeScreen }) => {
    await expect(homeScreen.mainHeader).toBeVisible();
  });
});
