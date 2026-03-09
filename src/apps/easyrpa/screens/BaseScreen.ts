import { expect, Page, Locator } from "@playwright/test";
import { NavigationMenu } from "@apps/easyrpa/components";
import { Button, Input, Message } from "@apps/easyrpa/elements";

export abstract class BaseScreen {
  protected page: Page;
  private spinner: Locator;
  readonly navigationMenu: NavigationMenu;

  constructor(page: Page) {
    this.page = page;
    this.spinner = this.page.locator(".MuiCircularProgress-svg");
    this.navigationMenu = new NavigationMenu(page);
  }

  protected button(buttonText: string): Button {
    return new Button(this.page.getByRole("button", {name : buttonText}));
  }

  protected input(label: string): Input {
    return new Input(this.page.getByLabel(label));
  }

  protected message() : Message {
    return new Message(this.page);
  }
  // async clickButton(buttonText: string) {
  //   await this.button(buttonText).click();
  // }

  // async fillInput(label: string, value: string) {
  //   await this.input(label).fill(value);
  // }

  async waitForPage(timeout: number = 3000): Promise<void> {
    await this.page.waitForLoadState("networkidle");
    if ((await this.spinner.count()) > 0) {
      await this.spinner.waitFor({ state: "detached", timeout });
    }
    await this.waitForKeyElements();
  }

  protected async waitForKeyElements(): Promise<void> {}

  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  async waitForHeader(text: string) {
    const header = this.page.getByRole("heading", { name: text, level: 5 });
    await expect(header).toBeVisible();
  }
}
