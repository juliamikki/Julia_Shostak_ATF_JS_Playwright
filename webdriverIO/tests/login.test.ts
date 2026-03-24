import { expect } from "@wdio/globals";
import { envEasyRPA } from "#config/env";
import { HomeScreen, LoginScreen } from "#screens";

describe("EasyRPA Login Feature", () => {
  let loginScreen: LoginScreen;
  let homeScreen: HomeScreen;

  beforeEach(async () => {
    loginScreen = new LoginScreen();
    await loginScreen.goToBaseUrl(envEasyRPA.baseUrl);
  });

  it("shows error for invalid credentials", async () => {
    await loginScreen.loginWithCreds("wrong user", "wrong password");
    await expect(loginScreen.errorMessage).toHaveText("Invalid credentials for user");
  });

  it("redirects to home screen on valid credentials", async () => {
    await loginScreen.loginWithCreds(envEasyRPA.credentials.username, envEasyRPA.credentials.password);
    homeScreen = new HomeScreen();
    await expect(homeScreen.mainHeader).toHaveText("EasyRPA Control Server");
  });
});
