import { expect } from '@wdio/globals';
import { BaseComponent, TableRow } from '#components';

export class Table extends BaseComponent {
  private readonly spinner: ChainablePromiseElement;

  constructor() {
    super('.MuiTable-stickyHeader');
    this.spinner = $("[role='progressbar']");
  }

  private async getRows(): Promise<WebdriverIO.ElementArray> {
    let rows = await $$('.MuiTable-stickyHeader tbody tr');
    rows.shift(); //removes first hidden row of the table
    return rows;
  }

  getHeaderRow(): TableRow {
    return new TableRow(this.root.$('thead tr'));
  }

  async getRowByIndex(index: number): Promise<TableRow> {
    const rows = await this.getRows();
    if (rows.length == 0) {
      throw new Error(`Row index [${index}] does not exist in the table. The table is empty.`);
    }
    if (index >= rows.length) {
      throw new Error(`Row index [${index}] does not exist in the table; total rows: ${rows.length}.`);
    }
    return new TableRow(rows[index]);
  }

  async getRowByCellValue(value: string): Promise<TableRow | null> {
    const rows = await this.getRows();
    for (const row of rows) {
      const cells = await row.$$('td');
      for (const cell of cells) {
        const text = await cell.getText();
        if (text === value) {
          return new TableRow(row);
        }
      }
    }
    return null;
  }

  async expectRowToExist(value: string): Promise<void> {
    const row = await this.getRowByCellValue(value);
    if (!row) throw new Error(`No row with cell value [${value}] found.`);
    await expect(row.element).toBeDisplayed();
  }

  async expectRowNotToExist(value: string): Promise<void> {
    const row = await this.getRowByCellValue(value);
    if (row) throw new Error(`Row with cell value [${value}] exists but should not.`);
    await expect(row).toBeNull();
  }

  async expectRowCount(count: number): Promise<void> {
    const rows = await this.getRows();
    expect(rows.length).toBe(count);
  }

  async expectToBeEmpty(): Promise<void> {
    await this.expectRowCount(0);
  }

  async waitForTable(): Promise<void> {
    await this.spinner.waitForDisplayed({ reverse: true, timeout: 5000 });
    await expect(this.root.$('tbody')).toBeDisplayed();
  }

  async waitForFiltering(): Promise<void> {
    const initialCount = (await this.getRows()).length;
    await browser.waitUntil(async () => {
      const newCount = (await this.getRows()).length;
      return newCount !== initialCount;
    });
  }
}
