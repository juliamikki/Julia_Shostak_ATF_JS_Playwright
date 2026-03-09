import { Page } from "@playwright/test";
import { BaseScreen } from "@apps/easyrpa/screens";

export class HomeScreen extends BaseScreen {
  constructor(page: Page) {
    super(page);
  }

  async waitForKeyElements(): Promise<void> {
    await this.navigationMenu.waitForVisible();
    await this.page.locator("#root .MuiGrid-item").first().waitFor({ state: "visible" });
    const headerTextLocator = this.page.locator('p', { hasText: 'EasyRPA Control Server' });
    await headerTextLocator.waitFor({ state: 'visible'});
  }
}
