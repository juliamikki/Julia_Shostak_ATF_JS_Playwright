import { expect } from '@wdio/globals';
import { BaseComponent } from '#components';
import { Button } from '#elements';
import { AutomationProcessesScreen } from '#screens';

export class NavigationMenu extends BaseComponent {
  constructor() {
    super('.MuiDrawer-paper');
  }

  private get arrow(): Button {
    return new Button(this.root.$('#arrow_icon'));
  }

  private get arrowIcon(): ChainablePromiseElement {
    return this.root.$('#arrow_icon svg');
  }

  private module(name: string) {
    return this.root.$(`.//a[.//span[text()='${name}']]`);
  }

  //to be extended:
  private screens = { 'Automation Processes': AutomationProcessesScreen };

  async goToModule(moduleName: keyof NavigationMenu['screens']): Promise<void> {
    await this.module(moduleName).waitForClickable();
    await this.module(moduleName).click();
    const ScreenClass = this.screens[moduleName];
    await new ScreenClass().waitForReady();
  }

  async isExpanded(): Promise<boolean> {
    const state = await this.arrowIcon.getAttribute('data-testid');
    return state === 'ChevronLeftIcon';
  }

  async openMenu(): Promise<void> {
    await this.waitForDisplayed();
    if (!(await this.isExpanded())) {
      await this.arrow.click();
      await expect(this.arrowIcon).toHaveAttribute('data-testid', 'ChevronLeftIcon');
    }
  }

  async closeMenu(): Promise<void> {
    await this.waitForDisplayed();
    if (await this.isExpanded()) {
      await this.arrow.click();
      await expect(this.arrowIcon).toHaveAttribute('data-testid', 'ChevronRightIcon');
    }
  }
}
