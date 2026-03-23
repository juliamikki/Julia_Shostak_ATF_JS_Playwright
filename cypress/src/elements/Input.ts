import { BaseElement } from "@elements";

export class Input extends BaseElement {
  fill(value: string): Cypress.Chainable<JQuery<HTMLElement>> {
    return this.locator.type(value);
  }
}
