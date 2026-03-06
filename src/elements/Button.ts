import { Locator } from "@playwright/test";

export class Button {
  private locator: Locator;

  constructor(locator: Locator) {
    this.locator = locator;
  }

  async click(): Promise<void> {
    await this.locator.waitFor({ state: "visible" });
    await this.locator.click();
  }
}
