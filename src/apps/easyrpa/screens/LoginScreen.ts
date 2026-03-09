import { Page, Locator } from "@playwright/test";
import { BaseScreen } from "@apps/easyrpa/screens";
import { Input, Button } from "@apps/easyrpa/elements";

export class LoginScreen extends BaseScreen {
  readonly usernameInput: Input;
  readonly passwordInput: Input;
  readonly submitButton: Button;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);

    this.usernameInput = new Input(this.page.locator("#input_username"));
    this.passwordInput = new Input(this.page.locator("#input_password"));
    this.submitButton = new Button(this.page.locator('[type="submit"]'));
    this.errorMessage = this.page.locator(".error-block-text");
  }

  

  async goToBaseUrl(baseUrl: string): Promise<void> {
    await this.page.goto(baseUrl);
  }
  
  async loginWithCreds(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async getErrorMessage(): Promise<string> {
    const message = await this.errorMessage.textContent();
    return message?.trim() ?? "";
  }
}
