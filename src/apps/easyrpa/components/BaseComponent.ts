import { expect, Page, Locator } from "@playwright/test";

export abstract class BaseComponent {
  protected page: Page;
  protected root: Locator;

  constructor(page: Page, root: Locator) {
    this.page = page;
    this.root = root;
  }

  async waitForVisible(): Promise<void> {
    await expect(this.root).toBeVisible();
  }
}
