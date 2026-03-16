import { Page, Locator, expect } from "@playwright/test";
import { BaseScreen } from "@apps/easyrpa/screens";

export class HomeScreen extends BaseScreen {
  constructor(page: Page) {
    super(page);
  }

  private get mainHeader(): Locator {
    return this.page.getByText("EasyRPA Control Server");
  }

  protected async waitForKeyElements(): Promise<void> {
    await this.navigationMenu.waitForVisible();
    await expect(this.mainHeader).toBeVisible();
  }

  async getHeadingText(): Promise<string> {
    return (await this.mainHeader.textContent())?.trim() ?? "";
  }
}
