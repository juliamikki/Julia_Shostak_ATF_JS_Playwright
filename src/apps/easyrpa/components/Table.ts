import { Page, Locator, expect } from '@playwright/test';
import { BaseComponent, TableRow } from '@apps/easyrpa/components';

export class Table extends BaseComponent {
  private readonly spinner: Locator;

  constructor(page: Page) {
    const root = page.locator('.MuiTable-stickyHeader');
    super(page, root);
    this.spinner = this.page.getByRole('progressbar');
  }

  private get rows(): Locator {
    return this.root.locator('tbody').getByRole('row');
  }

  private rowLocatorByCellValue(value: string): Locator {
    return this.rows.filter({
      has: this.page.getByRole('cell', { name: value, exact: true })
    });
  }

  getHeaderRow(): TableRow {
    return new TableRow(this.root.locator('thead'));
  }

  getRowByIndex(index: number): TableRow {
    const row = this.rows.nth(index + 1);
    return new TableRow(row);
  }

  getRowByCellValue(value: string): TableRow {
    return new TableRow(this.rowLocatorByCellValue(value));
  }

  async expectRowToExist(value: string): Promise<void> {
    await expect(this.rowLocatorByCellValue(value)).toHaveCount(1);
  }

  async expectRowNotToExist(value: string): Promise<void> {
    await expect(this.rowLocatorByCellValue(value)).toHaveCount(0);
  }

  async expectRowCount(count: number): Promise<void> {
    const visibleRows = this.rows.filter({ visible: true });
    await expect(visibleRows).toHaveCount(count);
  }

  async expectToBeEmpty(): Promise<void> {
    await this.expectRowCount(0);
  }
}
