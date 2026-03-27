import { BaseElement } from '#elements';

export class Checkbox extends BaseElement {
  async check(): Promise<void> {
    if (!(await this.element.isSelected())) {
      await this.click();
    }
  }

  async uncheck(): Promise<void> {
    if (await this.element.isSelected()) {
      await this.click();
    }
  }
}
