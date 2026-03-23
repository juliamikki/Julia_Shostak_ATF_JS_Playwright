import { test, expect } from "@fixtures/easyrpa.fixture";

test.describe("EasyRPA Login Feature", () => {

  test("shows error for invalid credentials", async ({ loginScreen }) => {
    await loginScreen.loginWithCreds("wrong user", "wrong password");
    await expect(loginScreen.errorMessage).toHaveText("Invalid credentials for user");
  });

  //TODO: ask about fixtures: is that fine to pass here the homescreen, 
  // or in such a concise method the logic should be directly in the test? 
  test("redirects to home screen on valid credentials", async ({ homeScreen }) => {
    await expect(homeScreen.mainHeader).toHaveText("EasyRPA Control Server");
  });
});
