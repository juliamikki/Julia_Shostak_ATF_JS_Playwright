import { Page } from "@playwright/test";
import { BaseComponent } from "@apps/onliner/components";
import { Button } from "@apps/onliner/elements";

export class CookiesPopUp extends BaseComponent {
  readonly acceptCookiesButton: Button;

  constructor(page: Page) {
    const root = page.locator(".auth-popup");
    super(page, root);

    this.acceptCookiesButton = new Button(this.root.locator("#submit-button"));
  }

  async acceptCookies(): Promise<void> {
    await this.root.waitFor({ state: "visible" });
    await this.acceptCookiesButton.click();
    await this.root.waitFor({ state: "detached" });
  }
}
