import { Page, expect } from "@playwright/test";
import { BaseScreen } from "@apps/easyrpa/screens";
import { Dialog, Message } from "@apps/easyrpa/components";

export type AutomationProcessData = {
  name: string;
  moduleClass: string;
  groupId: string;
  artifactId: string;
  versionId: string;
};

export class AutomationProcessesScreen extends BaseScreen {
  constructor(page: Page) {
    super(page);
  }

  protected async waitForKeyElements(): Promise<void> {
    await this.waitForHeader("Automation Processes");
  }

  async createAutomationProcess(data: AutomationProcessData) {
    await this.button("Create New").click();
    await this.waitForHeader("New Automation Process");

    await this.input("Name").fill(data.name);
    await this.input("Module Class").fill(data.moduleClass);
    await this.input("Group Id").fill(data.groupId);
    await this.input("Artifact Id").fill(data.artifactId);
    await this.input("Version Id").fill(data.versionId);

    await this.button("Create New").click();
    await this.message.expectTextAndClose(Message.Contents.apCreated)
  }

  async deleteAutomationProcess(data: AutomationProcessData) {
    await this.searchFor(data.name);
    await this.table.getRowByCellValue(data.name).check();
    const dialog = await this.table.getRowByCellValue(data.name).clickDelete();
    await dialog.expectContent(Dialog.Contents.deleteHeading, Dialog.Contents.deleteMessage);
    await dialog.confirmDelete();
    await this.message.expectTextAndClose(Message.Contents.apDeleted);
    await this.table.expectToBeEmpty();
  }
}
