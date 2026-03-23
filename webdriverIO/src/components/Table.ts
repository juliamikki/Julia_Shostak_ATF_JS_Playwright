import { expect } from "@wdio/globals";
import { BaseComponent, TableRow } from "#components";

export class Table extends BaseComponent {
  constructor() {
    super(() => $(".MuiTable-stickyHeader"));
  }

  private async rowElements(): Promise<WebdriverIO.Element[]> {
    const tbody = await this.root.$("tbody");
    const rows = await tbody.$$("tr");
    const visibleRows: WebdriverIO.Element[] = [];

    for (const row of rows) {
      if (await row.isDisplayed()) {
        visibleRows.push(row);
      }
    }

    return visibleRows;
  }

  getHeaderRow(): TableRow {
    return new TableRow(() => this.root.$("thead"));
  }

  getRowByIndex(index: number): TableRow {
    return new TableRow(() => this.root.$(`tbody tr:nth-of-type(${index + 1})`));
  }

  getRowByCellValue(value: string): TableRow {
    return new TableRow(() => this.root.$(`//tbody//tr[.//td/a[text()='${value}']]`));
  }

  async waitForTable(): Promise<void> {
    const spinner = $("[role='progressbar']");
    await spinner.waitForExist({ reverse: true, timeout: 20000 });
    await expect(this.root.$("tbody")).toBeDisplayed();
  }

  async expectToBeEmpty(): Promise<void> {
    await this.expectRowCount(0);
  }

  async expectRowCount(count: number): Promise<void> {
    const rows = await this.rowElements();
    expect(rows.length).toBe(count);
  }

  async expectRowNotToExist(value: string): Promise<void> {
    await expect(this.root.$(`//tbody//tr[.//td/a[text()='${value}']]`)).not.toExist();
  }
}
