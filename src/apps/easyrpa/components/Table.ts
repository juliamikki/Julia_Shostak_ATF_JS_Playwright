import { Page, Locator, expect } from "@playwright/test";
import { BaseComponent, TableRow } from "@apps/easyrpa/components";

export class Table extends BaseComponent {
  private spinner: Locator;

  constructor(page: Page) {
    const root = page.locator(".MuiTable-stickyHeader");
    super(page, root);

    this.spinner = this.page.getByRole("progressbar");
  }

  getRowByCellValue(value: string): TableRow {
    const row = this.root
      .locator("tbody")
      .getByRole("row")
      .filter({
        has: this.page.getByRole("cell", { name: value, exact: true }),
      });
    return new TableRow(row);
  }

  getRowByIndex(index: number): TableRow {
    const row = this.root
      .locator("tbody")
      .getByRole("row")
      .nth(index + 1);
    return new TableRow(row);
  }

  getHeaderRow(): TableRow {
    return new TableRow(this.root.locator("thead"));
  }

  async waitForTable(): Promise<void> {
    await this.spinner.waitFor({ state: "detached" });
    await expect(this.root.locator("tbody")).toBeVisible();
  }

  async expectToBeEmpty(): Promise<void> {
    const rows = this.root.locator("tbody").getByRole("row");
    const dataRows = rows.filter({ hasNotText: "No Results Found" });
    await expect(dataRows).toHaveCount(0);
  }
}
