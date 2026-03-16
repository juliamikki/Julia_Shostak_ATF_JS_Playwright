import { Locator } from "@playwright/test";

export class Checkbox {
    //TODO: unify click for Checkbox and Button 
    // (do I need separate classes for them?)
  private locator: Locator;

  constructor(locator: Locator) {
    this.locator = locator;
  }

  async click(): Promise<void> {
    await this.locator.click();
  }
}
