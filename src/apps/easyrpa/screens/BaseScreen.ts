import { expect, Page, Locator } from "@playwright/test";
import { NavigationMenu, Message, Table } from "@apps/easyrpa/components";
import { Button, Input } from "@apps/easyrpa/elements";

export abstract class BaseScreen {
  protected page: Page;
  private spinner: Locator;

  private search: Input;
  private backToList: Button;
  readonly navigationMenu: NavigationMenu;
  readonly table: Table;

  constructor(page: Page) {
    this.page = page;
    this.spinner = this.page.getByRole("progressbar");

    this.search = new Input(this.page.locator("#search_field"));
    this.backToList = new Button(
      this.page.getByText("Back to list", { exact: true }),
    );
    this.table = new Table(page);
    this.navigationMenu = new NavigationMenu(page);
  }

  protected button(buttonText: string): Button {
    return new Button(this.page.getByRole("button", { name: buttonText }));
  }

  protected input(label: string): Input {
    return new Input(this.page.getByLabel(label));
  }

  protected inputById(id: string): Input {
    return new Input(this.page.locator(`#${id}`));
  }
//TODO: ??
  protected locator(selector: string): Locator {
    return this.page.locator(selector);
  }

  protected get message(): Message {
    return new Message(this.page);
  }

  async searchFor(text: string): Promise<void> {
    await this.search.fill(text);
    await this.spinner.waitFor({ state: "detached" });
  }

  async goBackToList(): Promise<void> {
    this.backToList.click();
  }

  async waitForReady(): Promise<void> {
    //await this.page.waitForLoadState("networkidle");
    await this.spinner.waitFor({ state: "detached" });
    await this.waitForKeyElements();
  }

  protected async waitForKeyElements(): Promise<void> {}

  async waitForHeader(text: string): Promise<void> {
    const header = this.page.getByRole("heading", { name: text, level: 5 });
    await expect(header).toBeVisible();
  }
}
