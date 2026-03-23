import { expect } from "@wdio/globals";
import { envEasyRPA } from "#config/env";
import { HomeScreen, LoginScreen } from "#screens";

describe.skip("EasyRPA Login Feature", () => {
  let loginScreen: LoginScreen;
  let homeScreen: HomeScreen;

  beforeEach(async () => {
    loginScreen = new LoginScreen();
    await loginScreen.goToBaseUrl(envEasyRPA.baseUrl);
  });

  it("shows error for invalid credentials", async () => {
    await loginScreen.loginWithCreds("wrong user", "wrong password");
    await loginScreen.waitForReady();
    await expect(await loginScreen.getErrorMessage()).toBe("Invalid credentials for user");
  });

  it("redirects to home screen on valid credentials", async () => {
    await loginScreen.loginWithCreds(envEasyRPA.credentials.username, envEasyRPA.credentials.password);

    homeScreen = new HomeScreen();
    await homeScreen.waitForReady();
    await expect(await homeScreen.getHeadingText()).toBe("EasyRPA Control Server");
  });
});
