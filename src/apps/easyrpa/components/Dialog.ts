import { Page, expect } from "@playwright/test";
import { BaseComponent } from "@apps/easyrpa/components";
import { Button } from "@apps/easyrpa/elements";

export class Dialog extends BaseComponent {
  static readonly Contents = {
    deleteHeading: "Please, confirm your action",
    deleteMessage: "Are you sure you want to delete selected automation process?"
  };

  constructor(page: Page) {
    super(page, page.getByRole("dialog"));
  }

  private button(name: string): Button {
    return new Button(this.root.getByRole("button", { name }));
  }

  async confirmDelete(): Promise<void> {
    await this.button("Delete").click();
  }

  async cancel(): Promise<void> {
    await this.button("Cancel").click();
  }

  async expectContent(heading: string, message: string): Promise<void> {
    await expect(this.root.getByRole("heading", { name: heading })).toBeVisible();
    await expect(this.root.getByText(message)).toBeVisible();
  }
}
