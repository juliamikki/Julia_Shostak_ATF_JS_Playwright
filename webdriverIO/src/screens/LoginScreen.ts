import { browser } from '@wdio/globals';
import { BaseScreen } from '#screens';
import { Button, Input } from '#elements';

export class LoginScreen extends BaseScreen {
  private get loginButton(): Button {
    return new Button($("button[type='submit']"));
  }

  public get errorMessage(): ChainablePromiseElement {
    return $('.error-block-text');
  }

  async goToBaseUrl(baseUrl: string): Promise<void> {
    await browser.url(baseUrl);
  }

  async loginWithCreds(username: string, password: string): Promise<void> {
    await this.inputById('input_username').fill(username);
    await this.inputById('input_password').fill(password);
    await this.loginButton.click();
    await this.waitForReady();
  }
}
