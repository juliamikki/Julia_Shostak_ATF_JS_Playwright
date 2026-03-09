import { test, expect } from "@fixtures/easyrpa.fixture";
import { envEasyRPA } from "@config/env";

test.describe("EasyRPA Login Feature", () => {

  test.beforeEach(async ({ loginScreen }) => {
    await loginScreen.goToBaseUrl(envEasyRPA.baseUrl);
  });

  test.skip("shows error for invalid credentials", async ({ loginScreen }) => {
    await loginScreen.loginWithCreds("wrong user", "wrong password");
    await loginScreen.waitForPage();
    expect(await loginScreen.getErrorMessage()).toBe("Invalid credentials for user");
  });

  test.skip("redirects to home screen on valid credentials", async ({ loginScreen, homeScreen }) => {
    await loginScreen.loginWithCreds(envEasyRPA.credentials.username, envEasyRPA.credentials.password);
    await homeScreen.waitForPage();
    //expect(await homeScreen.getPageTitle()).toContain("EasyRPA");
  });
});
