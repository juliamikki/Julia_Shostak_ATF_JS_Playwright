import { Page } from '@playwright/test';
import { BaseScreen } from '@apps/easyrpa/screens';
import { Dialog, Message } from '@apps/easyrpa/components';

export type AutomationProcessData = {
  name: string;
  moduleClass: string;
  groupId: string;
  artifactId: string;
  versionId: string;
};

export class AutomationProcessesScreen extends BaseScreen {
  protected header = 'Automation Processes';

  constructor(page: Page) {
    super(page);
  }

  async createAutomationProcess(data: AutomationProcessData): Promise<void> {
    await this.button('Create New').click();
    await this.expectHeader('New Automation Process');

    await this.input('Name').fill(data.name);
    await this.input('Module Class').fill(data.moduleClass);
    await this.input('Group Id').fill(data.groupId);
    await this.input('Artifact Id').fill(data.artifactId);
    await this.input('Version Id').fill(data.versionId);

    await this.button('Create New').click();
    await this.message.expectTextAndClose(Message.Contents.apCreated);
  }

  async deleteAutomationProcess(
    data: AutomationProcessData,
    options?: { search?: boolean; checkAll?: boolean; rowIndex?: number }
  ): Promise<void> {
    if (options?.search) {
      await this.searchFor(data.name);
    }

    if (options?.checkAll) {
      await this.table.getHeaderRow().check();
      const dialog = await this.clickDelete();
      await this.confirmDeletion(dialog);
      return;
    }

    const row =
      options?.rowIndex === undefined
        ? this.table.getRowByCellValue(data.name)
        : this.table.getRowByIndex(options.rowIndex);
    await row.check();

    const dialog = await row.clickDelete();
    await this.confirmDeletion(dialog);
  }

  private async confirmDeletion(dialog: Dialog): Promise<void> {
    await dialog.expectContent(Dialog.Contents.deleteHeading, Dialog.Contents.deleteMessage);
    await dialog.clickButton('Delete');
    await this.message.expectTextAndClose(Message.Contents.apDeleted);
  }
}
