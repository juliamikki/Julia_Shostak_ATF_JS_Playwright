import { Page, Locator, expect } from '@playwright/test';
import { BaseComponent } from '@apps/easyrpa/components';
import { Button } from '@apps/easyrpa/elements';

export class Dialog extends BaseComponent {
  static readonly Contents = {
    deleteHeading: 'Please, confirm your action',
    deleteMessage: 'Are you sure you want to delete selected automation process?'
  };

  constructor(page: Page) {
    super(page.getByRole('dialog'));
  }

  private get heading(): Locator {
    return this.root.getByRole('heading');
  }

  private get message(): Locator {
    return this.root.locator('#confirm-modal-description');
  }

  private button(name: string): Button {
    return new Button(this.root.getByRole('button', { name }));
  }

  async clickButton(name: string): Promise<void> {
    await this.button(name).click();
  }

  async expectContent(headingText: string, messageText: string): Promise<void> {
    await expect(this.heading).toHaveText(headingText);
    await expect(this.message).toHaveText(messageText);
  }
}
