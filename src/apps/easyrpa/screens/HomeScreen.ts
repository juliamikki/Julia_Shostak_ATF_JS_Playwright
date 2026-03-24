import { Page, Locator } from "@playwright/test";
import { BaseScreen } from "@apps/easyrpa/screens";

export class HomeScreen extends BaseScreen {
  constructor(page: Page) {
    super(page);
  }

  public get mainHeader(): Locator {
    return this.page.getByText("EasyRPA Control Server");
  }
}
