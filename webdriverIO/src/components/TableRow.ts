import type { ChainablePromiseElement } from "webdriverio";
import { BaseComponent, Dialog } from "#components";
import { Button, Checkbox } from "#elements";

export class TableRow extends BaseComponent {
  constructor(rootLocator: () => ChainablePromiseElement<WebdriverIO.Element>) {
    super(rootLocator);
  }

  private get checkbox(): Checkbox {
    return new Checkbox(() => this.root.$(".MuiCheckbox-root"));
  }

  private get deleteButton(): Button {
    return new Button(() => this.root.$('//*[@aria-label="Delete"]//button | //*[@aria-label="Delete"]'));
  }

  async check(): Promise<void> {
    await this.checkbox.check();
  }

  async clickDelete(): Promise<Dialog> {
    await this.deleteButton.click();
    const dialog = new Dialog();
    await dialog.waitForVisible();
    return dialog;
  }
}
