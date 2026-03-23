import { Page, Locator } from "@playwright/test";
import { BaseScreen } from "@apps/easyrpa/screens";

export class LoginScreen extends BaseScreen {
  constructor(page: Page) {
    super(page);
  }

  public get errorMessage(): Locator {
    return this.page.locator(".error-block-text");
  }

  async goToBaseUrl(baseUrl: string): Promise<void> {
    await this.page.goto(baseUrl);
  }

  async loginWithCreds(username: string, password: string): Promise<void> {
    await this.inputById("input_username").fill(username);
    await this.inputById("input_password").fill(password);
    await this.button("Log In").click();
  }
}
