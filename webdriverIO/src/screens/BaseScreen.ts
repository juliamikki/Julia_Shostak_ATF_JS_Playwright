import { browser, expect } from "@wdio/globals";
import { Dialog, Message, NavigationMenu, Table } from "#components";
import { Button, Input } from "#elements";

export abstract class BaseScreen {
  private readonly search: Input;
  private readonly backToList: Button;
  readonly navigationMenu: NavigationMenu;
  readonly table: Table;

  constructor() {
    this.search = new Input(() => $("#search_field"));
    //this.backToList = new Button(() => $("//div[*[@data-testid='KeyboardBackspaceIcon']]"));
    this.backToList = new Button(() => $("[data-testid='KeyboardBackspaceIcon']"));
    this.navigationMenu = new NavigationMenu();
    this.table = new Table();
  }

  protected button(buttonText: string): Button {
    return new Button(() => $(`//button[p[text()='${buttonText}'] or text()='${buttonText}']`));
  }

  protected input(label: string): Input {
    return new Input(() => $(`//label[text()='${label}']/following::input[1]`));
  }

  protected inputById(id: string): Input {
    return new Input(() => $(`#${id}`));
  }

  protected get message(): Message {
    return new Message();
  }

  async searchFor(text: string): Promise<void> {
    await this.search.fill(text);
    await this.waitForSpinner();
    await this.table.expectRowCount(1);
  }

  async goBackToList(): Promise<void> {
    await this.backToList.click();
    await this.waitForReady();
  }

  async clickDelete(): Promise<Dialog> {
    await this.button("Delete").click();
    const dialog = new Dialog();
    await dialog.waitForVisible();
    return dialog;
  }

  async waitForReady(): Promise<void> {
    await browser.waitUntil(async () => (await browser.execute(() => document.readyState)) === "complete", {
      timeout: 20000,
      timeoutMsg: "Page did not finish loading in time.",
    });
    await this.waitForSpinner();
    await this.waitForKeyElements();
  }

  protected async waitForKeyElements(): Promise<void> {}

  protected async waitForHeader(text: string): Promise<void> {
    await expect($(`//h5[text()='${text}']`)).toBeDisplayed();
  }

  private async waitForSpinner(): Promise<void> {
    const spinner = $("[role='progressbar']");
    await spinner.waitForExist({ reverse: true, timeout: 20000 });
  }
}
