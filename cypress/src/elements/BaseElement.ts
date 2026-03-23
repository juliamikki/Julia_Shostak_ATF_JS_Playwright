export abstract class BaseElement {
  
  protected readonly locator: Cypress.Chainable<JQuery<HTMLElement>>;

  constructor(locator: Cypress.Chainable<JQuery<HTMLElement>>) {
    this.locator = locator;
  }

  click(): Cypress.Chainable<JQuery<HTMLElement>> {
    return this.locator.click();
  }

  isVisible(): Cypress.Chainable<boolean> {
    return this.locator.then($el => $el.is(":visible"));
  }

  isEnabled(): Cypress.Chainable<boolean> {
    return this.locator.then($el => !$el.is(":disabled"));
  }
}