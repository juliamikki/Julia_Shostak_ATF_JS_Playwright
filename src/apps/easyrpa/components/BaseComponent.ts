import { Page, Locator, expect } from '@playwright/test';

export abstract class BaseComponent {
  protected readonly page: Page;
  protected readonly root: Locator;

  constructor(page: Page, root: Locator) {
    this.page = page;
    this.root = root;
  }

  //customizable wait for component:
  async waitForVisible(timeout = 5000): Promise<void> {
    await expect(this.root).toBeVisible({ timeout });
  }
}
