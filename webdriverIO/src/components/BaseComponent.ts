import type { ChainablePromiseElement } from "webdriverio";

type ResolvedElement = ChainablePromiseElement<WebdriverIO.Element>;
type ElementResolver = () => ResolvedElement;

export abstract class BaseComponent {
  protected readonly rootLocator: ElementResolver;

  constructor(rootLocator: ElementResolver) {
    this.rootLocator = rootLocator;
  }

  protected get root(): ResolvedElement {
    return this.rootLocator();
  }

  async waitForVisible(timeout = 5000): Promise<void> {
    await this.root.waitForDisplayed({ timeout });
  }
}
