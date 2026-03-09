import { Page } from "@playwright/test";
import { BaseScreen } from "@apps/easyrpa/screens";

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

  async createAutomationProcess(data: AutomationProcessData) {
    await this.button("Create New").click();
    await this.waitForHeader("New Automation Process");

    await this.input("Name").fill(data.name);
    await this.input("Module Class").fill(data.moduleClass);
    await this.input("Group Id").fill(data.groupId);
    await this.input("Artifact Id").fill(data.artifactId);
    await this.input("Version Id").fill(data.versionId);

    await this.button("Create New").click();
    await this.message().expectText("New automation process was successfully created!");
  }
}
