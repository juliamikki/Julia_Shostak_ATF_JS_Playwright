import { test, expect } from "@fixtures/easyrpa.fixture";
import { envEasyRPA } from "@config/env";

test.describe("EasyRPA Login Feature", () => {

  test.beforeEach(async ({ loginScreen }) => {
    await loginScreen.goToBaseUrl(envEasyRPA.baseUrl);
  });

  test("shows error for invalid credentials", async ({ loginScreen }) => {
    await loginScreen.loginWithCreds("wrong user", "wrong password");
    await loginScreen.waitForReady();
    expect(await loginScreen.getErrorMessage()).toBe("Invalid credentials for user");
  });

  test("redirects to home screen on valid credentials", async ({ homeScreen }) => {
    await homeScreen.waitForReady();
    expect(await homeScreen.getHeadingText()).toEqual("EasyRPA Control Server");
  });
});
