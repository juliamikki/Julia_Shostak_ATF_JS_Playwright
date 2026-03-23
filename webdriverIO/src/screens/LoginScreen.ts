import { browser } from "@wdio/globals";
import { BaseScreen } from "#screens";

export class LoginScreen extends BaseScreen {
  private get errorMessage() {
    return $(".error-block-text");
  }

  async goToBaseUrl(baseUrl: string): Promise<void> {
    await browser.url(baseUrl);
  }

  async loginWithCreds(username: string, password: string): Promise<void> {
    await this.inputById("input_username").fill(username);
    await this.inputById("input_password").fill(password);
    await this.button("Log In").click();
  }

  async getErrorMessage(): Promise<string> {
    const message = await this.errorMessage.getText();
    return message.trim();
  }
}
