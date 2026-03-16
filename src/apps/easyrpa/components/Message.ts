import { Page, expect } from "@playwright/test";
import { BaseComponent } from "@apps/easyrpa/components";
import { Button } from "@apps/easyrpa/elements";

export class Message extends BaseComponent {
  static readonly Contents = {
    apCreated: "New automation process was successfully created!",
    apDeleted: "Automation process was successfully deleted!",
  };

  constructor(page: Page) {
    super(page, page.getByRole("alert"));
  }

  private get closeButton(): Button {
    return new Button(this.root.getByTestId("CloseIcon"));
  }

  async expectTextAndClose(messageText: string): Promise<void> {
    await expect(this.root).toHaveText(messageText);
    await this.closeButton.click();
  }
}
