import { Locator, Page } from "@playwright/test";
import { expect } from "@playwright/test";

export class Message {
  private locator: Locator;

  constructor(page: Page) {
    this.locator = page.locator(".SnackbarItem-message");
  }

  async expectText(messageText: string) {
    await expect(this.locator).toHaveText(messageText);
  }
}
