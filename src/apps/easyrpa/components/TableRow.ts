import { Locator } from '@playwright/test';
import { BaseComponent, Dialog } from '@apps/easyrpa/components';
import { Checkbox, Button } from '@apps/easyrpa/elements';

export class TableRow extends BaseComponent {
  constructor(locator: Locator) {
    super(locator.page(), locator);
  }

  private get checkbox(): Checkbox {
    return new Checkbox(this.root.getByRole('checkbox'));
  }

  private get deleteButton(): Button {
    return new Button(this.root.locator(`[aria-label="Delete"] button`));
  }

  async check(): Promise<void> {
    await this.checkbox.check();
  }

  async clickDelete(): Promise<Dialog> {
    await this.deleteButton.click();

    const dialog = new Dialog(this.root.page());
    await dialog.waitForVisible();
    return dialog;
  }
}
