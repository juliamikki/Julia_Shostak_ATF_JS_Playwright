import { test, expect } from "@playwright/test";
import { HomeScreen } from "@apps/onliner/screens";
import { LoginModal } from "@apps/onliner/components";
import { envOnliner } from "@config/env";

test.describe("Onliner login", () => {
  let homeScreen: HomeScreen;
  let loginModal: LoginModal;

  test.beforeEach(async ({ page }) => {
    homeScreen = new HomeScreen(page);
    loginModal = new LoginModal(page);

    await homeScreen.goToBaseUrl(envOnliner.baseUrl);
    await homeScreen.header.clickLogin();
  });

  test("invalid  credentials login shows error message", async ({ page }) => {
    await loginModal.loginWithCreds("wrong user", "wrong password");

    const errorMessage = await loginModal.getErrorMessage();
    expect(errorMessage).toBe("Неверный логин или пароль");
  });

  test("valid credentials login shows captcha", async ({ page }) => {
    await loginModal.loginWithCreds(envOnliner.credentials.username, envOnliner.credentials.password);

    const captchaText = await page.locator(".auth-form__title_condensed-other").textContent();
    expect(captchaText).toBe("Помогите нам улучшить безопасность");
  });
});
