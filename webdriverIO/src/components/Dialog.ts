import { expect } from '@wdio/globals';
import { BaseComponent } from '#components';
import { Button } from '#elements';

export class Dialog extends BaseComponent {
  static readonly Contents = {
    deleteHeading: 'Please, confirm your action',
    deleteMessage: 'Are you sure you want to delete selected automation process?'
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

  async clickButton(name: string): Promise<void> {
    await this.button(name).click();
  }

  async expectContent(heading: string, message: string): Promise<void> {
    await expect(this.heading).toHaveText(heading);
    await expect(this.message).toHaveText(message);
  }
}
