import { Locator } from "@playwright/test";

export class Input {
  private locator: Locator;

  constructor(locator: Locator) {
    this.locator = locator;
  }

  async fill(value: string): Promise<void> {
    await this.locator.fill(value);
  }
}
