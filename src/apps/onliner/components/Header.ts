import { Page } from "@playwright/test";
import { BaseComponent } from "@apps/onliner/components";
import { Button } from "@apps/onliner/elements";


export class Header extends BaseComponent {
  readonly loginButton: Button;

  constructor(page: Page) {
    const root = page.locator(".g-top");
    super(page, root);

    this.loginButton = new Button(this.root.locator(".auth-bar__item--text"));
  }

  async clickLogin(): Promise<void> {
    await this.loginButton.click();
  }
}
