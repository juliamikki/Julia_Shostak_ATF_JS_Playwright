import { expect } from "@wdio/globals";
import { BaseScreen } from "#screens";

export class HomeScreen extends BaseScreen {
  private get mainHeader() {
    return $("//p[text()='EasyRPA Control Server']");
  }

  protected override async waitForKeyElements(): Promise<void> {
    await this.navigationMenu.waitForVisible();
    await expect(this.mainHeader).toBeDisplayed();
  }

  async getHeadingText(): Promise<string> {
    const text = await this.mainHeader.getText();
    return text.trim();
  }
}
