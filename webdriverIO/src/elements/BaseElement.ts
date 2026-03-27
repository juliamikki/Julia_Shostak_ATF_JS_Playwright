export abstract class BaseElement {
  protected readonly locator?: string;
  protected readonly rootLocator?: ChainablePromiseElement;

  constructor(locator: string | ChainablePromiseElement) {
    if (typeof locator === 'string') {
      this.locator = locator;
    } else {
      this.rootLocator = locator;
    }
  }

  protected get element() {
    return this.rootLocator ?? $(this.locator!);
  }

  async click(): Promise<void> {
    await this.element.waitForClickable();
    await this.element.click();
  }

  async isDisplayed(): Promise<boolean> {
    return this.element.isDisplayed();
  }

  async isEnabled(): Promise<boolean> {
    return this.element.isEnabled();
  }
}
