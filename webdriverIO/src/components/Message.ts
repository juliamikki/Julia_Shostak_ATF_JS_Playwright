import { expect } from '@wdio/globals';
import { BaseComponent } from '#components';
import { Button } from '#elements';

export class Message extends BaseComponent {
  static readonly Contents = {
    apCreated: 'New automation process was successfully created!',
    apDeleted: 'Automation process was successfully deleted!'
  };

  constructor() {
    super("[role='alert']");
  }

  private get closeButton(): Button {
    return new Button(this.root.$('.SnackbarItem-action'));
  }

  async expectTextAndClose(messageText: string): Promise<void> {
    await expect(this.root).toHaveText(messageText);
    await this.closeButton.click();
  }
}
