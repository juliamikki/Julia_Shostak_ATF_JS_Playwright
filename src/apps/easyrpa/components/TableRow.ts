import { Locator } from "@playwright/test";
import { Checkbox, Button } from "@apps/easyrpa/elements";
import { Dialog } from "@apps/easyrpa/components";

export class TableRow {
  private locator: Locator;

  constructor(locator: Locator) {
    this.locator = locator;
  }

  private get checkbox(): Checkbox {
    return new Checkbox(this.locator.getByRole("checkbox"));
  }

  private get deleteButton(): Button {
    return new Button(this.locator.locator(`[aria-label="Delete"] button`));
  }

  async check() : Promise <void> {
    await this.checkbox.click();
  }

  async clickDelete(): Promise<Dialog> {
    await this.deleteButton.click();

    const dialog = new Dialog(this.locator.page());
    await dialog.waitForVisible();
    return dialog;
  }
}
