import { Locator } from "@playwright/test";

export class Button {
  private locator: Locator;

  constructor(locator : Locator) {
    this.locator = locator;
  }

  // constructor(page: Page, buttonText: string) {
  //   this.locator = page.getByRole("button", { name: buttonText });
  // }

  async click(): Promise<void> {
    await this.locator.waitFor({ state: "visible" });
    await this.locator.click();
  }

  // async isEnabled(): Promise<boolean> {
  //   return await this.locator.isEnabled();
  // }
}
