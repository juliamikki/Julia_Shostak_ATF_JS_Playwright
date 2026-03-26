import { Dialog, Message, TableRow } from '#components';
import { BaseScreen } from '#screens';

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

  private async deleteInPageHeader(): Promise<Dialog> {
    return this.clickDelete();
  }

  private async deleteInRow(row: TableRow): Promise<Dialog> {
    return row.clickButton('Delete');
  }

  private async confirmDeletion(dialog: Dialog): Promise<void> {
    await dialog.expectContent(Dialog.Contents.deleteHeading, Dialog.Contents.deleteMessage);
    await dialog.clickButton('Delete');
    await this.message.expectTextAndClose(Message.Contents.apDeleted);
  }

  async deleteAPInRow(data: AutomationProcessData): Promise<void> {
    const row = await this.table.getRowByCellValue(data.name);
    if (!row) {
      throw new Error(`No row with cell value [${data.name}] found.`);
    }
    await row.check();
    const dialog = await this.deleteInRow(row);
    await this.confirmDeletion(dialog);
  }

  async deleteAPviaSearchAndCheckFirst(data: AutomationProcessData): Promise<void> {
    await this.searchFor(data.name);

    const row = await this.table.getRowByIndex(0);
    await row.check();

    const dialog = await this.deleteInRow(row);
    await this.confirmDeletion(dialog);
  }

  async deleteAPviaSearchAndCheckAll(data: AutomationProcessData): Promise<void> {
    await this.searchFor(data.name);

    await this.table.getHeaderRow().check();

    const dialog = await this.deleteInPageHeader();
    await this.confirmDeletion(dialog);
  }
}
