import { Page, Locator } from "@playwright/test";
import { Button, Input } from "@elements";
import { BaseComponent } from "@components";

export class LoginModal extends BaseComponent {
  readonly usernameInput: Input;
  readonly passwordInput: Input;
  readonly loginButton: Button;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    const root = page.locator(".auth-form");
    super(page, root);

    this.usernameInput = new Input(this.root.locator('input[type="text"]'));
    this.passwordInput = new Input(this.root.locator('input[type="password"]'));
    this.loginButton = new Button(this.root.locator('button[type="submit"]'));
    this.errorMessage = this.root.locator(".auth-form__description_error");
  }

  async loginWithCredentials(username: string, password: string): Promise<void> {
    await this.usernameInput.set(username);
    await this.passwordInput.set(password);
    await this.loginButton.click();
  }

  async getErrorMessageText(): Promise<string> {
    const text = await this.errorMessage.textContent();
    if (text === null) {
      return "";
    }
    return text;
    //return (await this.errorMessage.textContent()) ?? '';
    //?? '' -> means that if the result is null or undefined, return '' instead
  }
}
