import { Page, Locator, expect } from "@playwright/test";
import { BaseComponent, TableRow } from "@apps/easyrpa/components";

export class Table extends BaseComponent {
  private readonly spinner: Locator;

  constructor(page: Page) {
    const root = page.locator(".MuiTable-stickyHeader");
    super(page, root);
    this.spinner = this.page.getByRole("progressbar");
  }

  private get rows(): Locator {
    return this.root.locator("tbody").getByRole("row");
  }

  getHeaderRow(): TableRow {
    return new TableRow(this.root.locator("thead"));
  }

  getRowByIndex(index: number): TableRow {
    const row = this.rows.nth(index + 1);
    return new TableRow(row);
  }

  getRowByCellValue(value: string): TableRow {
    const row = this.rows.filter({
      has: this.page.getByRole("cell", { name: value, exact: true }),
    });
    return new TableRow(row);
  }

  async waitForTable(): Promise<void> {
    await this.spinner.waitFor({ state: "detached" });
    await expect(this.root.locator("tbody")).toBeVisible();
  }

  async expectToBeEmpty(): Promise<void> {
    this.expectRowCount(0);
  }

  async expectRowCount(count: number): Promise<void> {
    const dataRows = this.rows.filter({ visible: true });
    await expect(dataRows).toHaveCount(count);
  }

  async expectRowNotToExist(value: string): Promise<void> {
    const row = this.rows.filter({ has: this.page.getByRole("cell", { name: value, exact: true })});
    await expect(row).toHaveCount(0);
  }
}
