import type { ChainablePromiseElement } from "webdriverio";

type ResolvedElement = ChainablePromiseElement<WebdriverIO.Element>;
type ElementResolver = () => ResolvedElement;

export abstract class BaseElement {
  protected readonly locator: ElementResolver;

  constructor(locator: ElementResolver) {
    this.locator = locator;
  }

  protected get element(): ResolvedElement {
    return this.locator();
  }

  async click(): Promise<void> {
    await this.element.waitForClickable();
    await this.element.click();
  }

  async isVisible(): Promise<boolean> {
    return this.element.isDisplayed();
  }

  async isEnabled(): Promise<boolean> {
    return this.element.isEnabled();
  }
}
