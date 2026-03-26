import { expect } from '@wdio/globals';
import { Dialog, Message, NavigationMenu, Table } from '#components';
import { Button, Input } from '#elements';

export abstract class BaseScreen {
  private readonly spinner: ChainablePromiseElement;
  private readonly search: Input;
  private readonly backToList: Button;
  readonly navigationMenu: NavigationMenu;
  readonly table: Table;
  protected headerText?: string;

  constructor() {
    this.spinner = $("[role='progressbar']");
    this.search = new Input($('#search_field'));
    this.backToList = new Button($("[data-testid='KeyboardBackspaceIcon']"));
    this.navigationMenu = new NavigationMenu();
    this.table = new Table();
  }

  protected button(buttonText: string): Button {
    return new Button($(`//button[p[text()='${buttonText}'] or text()='${buttonText}']`));
  }

  protected input(label: string): Input {
    return new Input($(`//label[text()='${label}']/following::input[1]`));
  }

  protected inputById(id: string): Input {
    return new Input($(`#${id}`));
  }

  protected get message(): Message {
    return new Message();
  }

  async searchFor(text: string): Promise<void> {
    await this.search.fill(text);
    await this.table.waitForTable();
    await this.table.waitForFiltering();
    await this.table.expectRowCount(1);
  }

  async goBackToList(): Promise<void> {
    await this.backToList.click();
    await this.waitForReady();
  }

  async clickDelete(): Promise<Dialog> {
    await this.button('Delete').click();
    const dialog = new Dialog();
    await dialog.waitForDisplayed();
    return dialog;
  }

  async waitForReady(): Promise<void> {
    await this.spinner.waitForDisplayed({ reverse: true, timeout: 20000 });
    if (this.headerText) {
      await this.expectHeader(this.headerText);
    }
  }

  protected async expectHeader(text: string): Promise<void> {
    const header = await $(`//h5[text()='${text}']`);
    await expect(header).toBeDisplayed();
  }
}
