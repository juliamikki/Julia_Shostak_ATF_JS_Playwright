import { Page, Locator, expect } from "@playwright/test";
import { BaseComponent } from "@apps/easyrpa/components";
import { Button } from "@apps/easyrpa/elements";

export class NavigationMenu extends BaseComponent {
  constructor(page: Page) {
    super(page, page.locator(".MuiDrawer-paper"));
  }

  private get arrow(): Button {
    return new Button(this.root.locator("#arrow_icon"));
  }

  private get expandedIcon(): Locator {
    return this.root.getByTestId("ChevronLeftIcon");
  }

  private get collapsedIcon(): Locator {
    return this.root.getByTestId("ChevronRightIcon");
  }

  private module(name: string): Locator {
    return this.root.getByRole("link", { name });
  }

  async goToModule(moduleName: string): Promise<void> {
    await this.module(moduleName).click();
  }

  private async isExpanded(): Promise<boolean> {
    return await this.expandedIcon.isVisible();
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
    await expect(this.expandedIcon).toBeVisible();
  }

  async waitUntilCollapsed(): Promise<void> {
    await expect(this.collapsedIcon).toBeVisible();
  }
}
