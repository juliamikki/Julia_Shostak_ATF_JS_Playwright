import { expect } from '@wdio/globals';
import { BaseComponent, TableRow } from '#components';

export class Table extends BaseComponent {
  private readonly spinner: ChainablePromiseElement;

  constructor() {
    super('.MuiTable-stickyHeader');
    this.spinner = $("[role='progressbar']");
  }

  private async getRows(): Promise<WebdriverIO.Element[]> {
    const rows = await $$('.MuiTable-stickyHeader tbody tr');
    return rows.slice(1); // skip hidden first row
  }

  getHeaderRow(): TableRow {
    return new TableRow(this.root.$('thead tr'));
  }

  async getRowByIndex(index: number): Promise<TableRow> {
    const rows = await this.getRows();
    if (rows.length == 0) {
      throw new Error(`Row index [${index}] not found in the table. The table is empty.`);
    }
    if (index >= rows.length) {
      throw new Error(`Row index [${index}] not found in the table; total rows: ${rows.length}.`);
    }
    return new TableRow(rows[index]);
  }

  private async findRowElementByCellValue(value: string): Promise<WebdriverIO.Element | null> {
    const rows = await this.getRows();
    for (const row of rows) {
      const cells = await row.$$('td');
      for (const cell of cells) {
        const text = await cell.getText();
        if (text === value) {
          return row;
        }
      }
    }
    return null;
  }

  private async findRowByCellValue(value: string): Promise<TableRow | null> {
    const row = await this.findRowElementByCellValue(value);
    return row ? new TableRow(row) : null;
  }

  async getRowByCellValue(value: string): Promise<TableRow> {
    const row = await this.findRowElementByCellValue(value);
    if (!row) {
      throw new Error(`No row with cell value [${value}] found.`);
    }
    return new TableRow(row);
  }

  async expectRowToExist(value: string): Promise<void> {
    const row = await this.getRowByCellValue(value);
    await expect(row.element).toBeDisplayed();
  }

  async expectRowNotToExist(value: string): Promise<void> {
    const row = await this.findRowByCellValue(value);
    await expect(row).toBeNull();
  }

  async expectRowCount(count: number): Promise<void> {
    const rows = await this.getRows();
    expect(rows).toHaveLength(count);
  }

  async expectToBeEmpty(): Promise<void> {
    await this.expectRowCount(0);
  }

  async waitForTable(): Promise<void> {
    await this.spinner.waitForDisplayed({ reverse: true, timeout: 10000 });
    await expect(this.root.$('tbody')).toBeDisplayed();
  }

  async waitForFiltering(): Promise<void> {
    const initialCount = (await this.getRows()).length;
    (await browser.waitUntil(async () => {
      const newCount = (await this.getRows()).length;
      return newCount !== initialCount;
    }),
      {
        timeout: 5000,
        timeoutMsg: 'Table filtering did not change row count.'
      });
  }
}
