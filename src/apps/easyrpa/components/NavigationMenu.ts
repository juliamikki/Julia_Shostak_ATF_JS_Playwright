import { Page, expect } from "@playwright/test";
import { BaseComponent } from "@apps/easyrpa/components";
import { Button } from "@apps/easyrpa/elements";

export class NavigationMenu extends BaseComponent {
  readonly arrowIcon: Button;

  constructor(page: Page) {
    const root = page.locator(".MuiDrawer-paper");
    super(page, root);

    this.arrowIcon = new Button(this.root.locator("#arrow_icon"));
  }

  async openMenu(): Promise<void> {
    await this.arrowIcon.click();
    await this.waitUntilExpanded();
  }

  async waitUntilExpanded(): Promise<void> {
    await expect(this.root.locator('[data-testid="ChevronLeftIcon"]')).toBeVisible();
  }

  async waitUntilCollapsed(): Promise<void> {
    await expect(this.root.locator('[data-testid="ChevronRightIcon"]')).toBeVisible();
  }

  async goToModule(moduleName : string) {
    await this.root.getByRole('link', { name: moduleName }).click();
  }
}

// async isMenuExpanded() : Promise<boolean> {
//   return await this.arrowIcon.locator.locator('[data-testid="ChevronLeftIcon"]').isVisible();
// }

//  async isMenuCollapsed() : Promise<boolean> {
//   return await this.arrowIcon.locator.locator('[data-testid="ChevronRightIcon"]').isVisible();
// }
