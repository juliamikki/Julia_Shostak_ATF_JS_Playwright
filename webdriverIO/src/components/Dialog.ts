import { expect } from "@wdio/globals";
import { BaseComponent } from "#components";
import { Button } from "#elements";

export class Dialog extends BaseComponent {
  static readonly Contents = {
    deleteHeading: "Please, confirm your action",
    deleteMessage: "Are you sure you want to delete selected automation process?",
  };

  constructor() {
    super(() => $("[role='dialog']"));
  }

  private button(name: string): Button {
    return new Button(() => this.root.$(`//button[text()='${name}']`));
  }

  private heading(text: string) {
    return this.root.$(`//h2[text()='${text}']`);
  }

  private message(text: string) {
    return this.root.$(`//p[text()='${text}']`);
  }

  async confirmDelete(): Promise<void> {
    await this.button("Delete").click();
  }

  async cancel(): Promise<void> {
    await this.button("Cancel").click();
  }

  async expectContent(heading: string, message: string): Promise<void> {
    await expect(this.heading(heading)).toBeDisplayed();
    await expect(this.message(message)).toBeDisplayed();
  }
}
