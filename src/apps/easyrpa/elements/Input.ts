import { BaseElement } from '@apps/easyrpa/elements';

export class Input extends BaseElement {
  async fill(value: string): Promise<void> {
    await this.locator.fill(value);
  }
}
