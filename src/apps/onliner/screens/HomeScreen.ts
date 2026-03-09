import { Page } from "@playwright/test";
import { BaseScreen } from "@apps/onliner/screens";
import { Header, CookiesPopUp } from "@apps/onliner/components";
import { envOnliner } from "@config/env";

export class HomeScreen extends BaseScreen {
  readonly header: Header;
  readonly cookies: CookiesPopUp;

  constructor(page: Page) {
    super(page);
    this.header = new Header(page);
    this.cookies = new CookiesPopUp(page);
  }

  async goToBaseUrl(baseUrl: string): Promise<void> {
    await this.page.goto(baseUrl);
  }
}
