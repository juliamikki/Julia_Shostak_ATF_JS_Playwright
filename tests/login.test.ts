import { test, expect } from "@playwright/test";
import { HomeScreen } from "@screens";
import { LoginModal } from "@components";
import { env } from "configs/env";

test.describe("Onliner login", async () => {
  let homeScreen: HomeScreen;
  let loginModal: LoginModal;

  test.beforeEach(async ({ page }) => {
    homeScreen = new HomeScreen(page);
    loginModal = new LoginModal(page);

    await homeScreen.goToBaseUrl();
    await homeScreen.header.clickLogin();
  });

  test("invalid login shows error message", async ({ page }) => {
    await loginModal.loginWithCredentials("wrong user", "wrong password");

    const text = (await loginModal.getErrorMessageText()).trim();
    expect(text).toBe("Неверный логин или пароль");
  });

  test("valid login shows captcha", async ({ page }) => {
    await loginModal.loginWithCredentials(env.credentials.username,env.credentials.password);
    
    const captchaText = (await page.locator(".auth-form__title_condensed-other").textContent())
    expect(captchaText).toBe("Помогите нам улучшить безопасность");
  });
});
