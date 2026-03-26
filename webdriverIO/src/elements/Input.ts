import { BaseElement } from '#elements';

export class Input extends BaseElement {
  async fill(value: string): Promise<void> {
    await this.element.waitForDisplayed();
    await this.element.setValue(value);
  }
}
