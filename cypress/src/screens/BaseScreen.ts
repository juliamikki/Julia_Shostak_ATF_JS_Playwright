import { Button, Input } from "@elements";

export abstract class BaseScreen {

  protected spinner = cy.get('[role="progressbar"]');
  private search = new Input(cy.get("#search_field"));
  private backToList = new Button(cy.get('[data-testid="KeyboardBackspaceIcon"]'));

//   protected button(buttonText: string) {
//   return new Button(cy.contains("button", buttonText));
//   }

  protected button(buttonText: string): Button {
  const xpath = `//button[p[text()='${buttonText}'] or text()='${buttonText}']`;
  return new Button(cy.xpath(xpath));
}

  protected input(label: string) {
    return new Input(cy.get(`label:contains("${label}")`).invoke("attr", "for").then(id => cy.get(`#${id}`))));
  }

  protected inputById(id: string) {
    return new Input(cy.get(`#${id}`));
  }

  waitForReady() {
    cy.document().its("readyState").should("eq", "complete");
    this.waitForSpinner();
    this.waitForKeyElements();
  }

  protected waitForKeyElements() {
    // Optional override in subclasses
  }

  protected waitForHeader(text: string) {
    cy.get("h5").contains(text).should("be.visible");
  }

  private waitForSpinner() {
    this.spinner.should("not.exist");
  }
}