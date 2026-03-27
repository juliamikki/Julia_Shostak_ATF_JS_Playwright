export abstract class BaseComponent {
  protected readonly locator?: string;
  protected readonly rootLocator?: ChainablePromiseElement | WebdriverIO.Element;

  constructor(root: string | ChainablePromiseElement | WebdriverIO.Element) {
    if (typeof root === 'string') {
      this.locator = root;
    } else {
      this.rootLocator = root;
    }
  }

  protected get root(): ChainablePromiseElement | WebdriverIO.Element {
    return this.rootLocator ?? $(this.locator!);
  }

  async waitForDisplayed(timeout = 5000): Promise<void> {
    await (this.root as ChainablePromiseElement).waitForDisplayed({ timeout });
  }
}
