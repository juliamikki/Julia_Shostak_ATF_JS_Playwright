import { expect } from "@wdio/globals";
import { BaseComponent } from "#components";
import { Button } from "#elements";

export class NavigationMenu extends BaseComponent {
  constructor() {
    super(() => $(".MuiDrawer-paper"));
  }

  private get arrow(): Button {
    return new Button(() => this.root.$("#arrow_icon"));
  }

  private get expandedIcon() {
    return this.root.$('[data-testid="ChevronLeftIcon"]');
  }

  private get collapsedIcon() {
    return this.root.$('[data-testid="ChevronRightIcon"]');
  }

  private module(name: string) {
    return this.root.$(`//a[div/span[text()='${name}']]`);
  }

  async goToModule(moduleName: "Automation Processes"): Promise<void> {
    await this.module(moduleName).click();

    if (moduleName === "Automation Processes") {
      const { AutomationProcessesScreen } = await import("../screens/AutomationProcessesScreen.js");
      await new AutomationProcessesScreen().waitForReady();
    }
  }

  async openMenu(): Promise<void> {
    await this.waitForVisible();
    if (!(await this.isExpanded())) {
      await this.arrow.click();
      await this.waitUntilExpanded();
    }
  }

  async closeMenu(): Promise<void> {
    await this.waitForVisible();
    if (await this.isExpanded()) {
      await this.arrow.click();
      await this.waitUntilCollapsed();
    }
  }

  async waitUntilExpanded(): Promise<void> {
    await expect(this.expandedIcon).toBeDisplayed();
  }

  async waitUntilCollapsed(): Promise<void> {
    await expect(this.collapsedIcon).toBeDisplayed();
  }

  private async isExpanded(): Promise<boolean> {
    return this.expandedIcon.isDisplayed();
  }
}
