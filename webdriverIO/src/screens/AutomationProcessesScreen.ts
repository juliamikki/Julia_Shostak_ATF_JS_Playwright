import { BaseScreen } from '#screens';
import { Message } from '#components';

export type AutomationProcessData = {
  name: string;
  moduleClass: string;
  groupId: string;
  artifactId: string;
  versionId: string;
};

export class AutomationProcessesScreen extends BaseScreen {
  protected headerText = 'Automation Processes';

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
      await this.deleteAndConfirm();
      await this.message.expectTextAndClose(Message.Contents.apDeleted);
      return;
    }

    const row =
      options?.rowIndex === undefined
        ? await this.table.getRowByCellValue(data.name)
        : await this.table.getRowByIndex(options?.rowIndex);
    await row.check();

    await row.deleteAndConfirm();
    await this.message.expectTextAndClose(Message.Contents.apDeleted);
  }
}
