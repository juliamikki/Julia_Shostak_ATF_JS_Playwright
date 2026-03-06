import { Page } from "@playwright/test";

export abstract class BaseScreen {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }
}
