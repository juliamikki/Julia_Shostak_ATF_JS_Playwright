import { expect } from '@wdio/globals';
import { BaseComponent } from '#components';
import { Button } from '#elements';

export class Dialog extends BaseComponent {
  static readonly Contents = {
    Delete: {
      heading: 'Please, confirm your action',
      message: 'Are you sure you want to delete selected automation process?',
      confirmButton: 'Delete'
    }
  };

  constructor() {
    super("[role='dialog']");
  }

  private button(name: string): Button {
    return new Button(this.root.$(`//button[text()='${name}']`));
  }

  private get heading(): ChainablePromiseElement {
    return this.root.$(`#confirm-modal-title`);
  }

  private get message(): ChainablePromiseElement {
    return this.root.$(`#confirm-modal-description`);
  }

  async confirm(dialogType: keyof typeof Dialog.Contents): Promise<void> {
    const content = Dialog.Contents[dialogType];
    await expect(this.heading).toHaveText(content.heading);
    await expect(this.message).toHaveText(content.message);
    await this.button(content.confirmButton).click();
  }
}
