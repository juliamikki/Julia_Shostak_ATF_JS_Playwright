import { Locator } from '@playwright/test';
import { BaseComponent, Dialog } from '@apps/easyrpa/components';
import { Checkbox, Button } from '@apps/easyrpa/elements';

export class TableRow extends BaseComponent {
  constructor(locator: Locator) {
    super(locator);
  }

  private get checkbox(): Checkbox {
    return new Checkbox(this.root.getByRole('checkbox'));
  }

  private button(name: string): Button {
    return new Button(this.root.locator(`[aria-label='${name}'] button`));
  }

  async check(): Promise<void> {
    await this.checkbox.check();
  }

  async clickDelete(): Promise<Dialog> {
    await this.button('Delete').click();
    const dialog = new Dialog(this.root.page());
    await dialog.waitForVisible();
    return dialog;
  }
}
