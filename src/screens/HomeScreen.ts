import { Page } from "@playwright/test";
import { BaseScreen } from "@screens";
import { Header, CookiesPopUp } from "@components";
import { env } from "configs/env";

export class HomeScreen extends BaseScreen {
  readonly header: Header;
  readonly cookies : CookiesPopUp;

  constructor(page: Page) {
    super(page);
    this.header = new Header(page);
    this.cookies = new CookiesPopUp(page);
  }

  async goToBaseUrl(): Promise<void> {
    await this.page.goto(env.baseUrl);
  }
}
