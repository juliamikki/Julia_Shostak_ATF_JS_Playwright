import { BaseComponent, Dialog } from '#components';
import { Button, Checkbox } from '#elements';

export class TableRow extends BaseComponent {
  constructor(rootLocator: string | ChainablePromiseElement | WebdriverIO.Element) {
    super(rootLocator);
  }

  public get element(): ChainablePromiseElement | WebdriverIO.Element {
    return this.root;
  }

  private get checkbox(): Checkbox {
    return new Checkbox(this.root.$('.MuiCheckbox-root'));
  }

  private button(name: string): Button {
    return new Button(this.root.$(`[aria-label='${name}'] button`));
  }

  async check(): Promise<void> {
    await this.checkbox.check();
  }

  async deleteAndConfirm(): Promise<void> {
    await this.button('Delete').click();
    const dialog = new Dialog();
    await dialog.waitForDisplayed();
    await dialog.confirm('Delete');
  }
}
