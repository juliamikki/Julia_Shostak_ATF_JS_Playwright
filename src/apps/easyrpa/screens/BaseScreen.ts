import { Page, Locator, expect } from "@playwright/test";
import {
  NavigationMenu,
  Message,
  Table,
  Dialog,
} from "@apps/easyrpa/components";
import { Button, Input } from "@apps/easyrpa/elements";

export abstract class BaseScreen {
  protected readonly page: Page;
  private readonly spinner: Locator;
  private readonly search: Input;
  private readonly backToList: Button;
  readonly navigationMenu: NavigationMenu;
  readonly table: Table;
  protected header?: string;

  constructor(page: Page) {
    this.page = page;
    this.spinner = this.page.getByRole("progressbar");
    this.search = new Input(this.page.locator("#search_field"));
    this.backToList = new Button(this.page.getByTestId("KeyboardBackspaceIcon"));
    this.navigationMenu = new NavigationMenu(page);
    this.table = new Table(page);
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

  protected get message(): Message {
    return new Message(this.page);
  }

  async searchFor(text: string): Promise<void> {
    await this.search.fill(text);
    await this.spinner.waitFor({ state: "detached" });
    await this.table.expectRowCount(1);
  }

  async goBackToList(): Promise<void> {
    await this.backToList.click();
    await this.waitForReady();
  }

  async clickDelete(): Promise<Dialog> {
    await this.button("Delete").click();
    const dialog = new Dialog(this.page);
    await dialog.waitForVisible();
    return dialog;
  }

  async waitForReady(): Promise<void> {
    await this.page.waitForLoadState("load");
    await this.spinner.waitFor({ state: "detached" });
    if (this.header) {
      await this.expectHeader(this.header);
    }
  }

  protected async expectHeader(text: string): Promise<void> {
    const header = this.page.getByRole("heading", { name: text, level: 5 });
    await expect(header).toBeVisible();
  }
}
