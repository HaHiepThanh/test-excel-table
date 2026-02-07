import { Injectable } from '@angular/core';
import { LuckysheetConfig, LuckysheetSheet, LuckysheetCellData } from '../models/luckysheet';

declare global {
  interface Window {
    luckysheet: any;
  }
}

@Injectable({
  providedIn: 'root'
})
export class LuckysheetService {

  constructor() { }

  create(config: LuckysheetConfig): void {
    if (this.isLuckysheetLoaded()) {
      // Default showinfobar to false if not specified
      const defaultConfig = { showinfobar: false, lang: 'en' };

      window.luckysheet.create({ ...defaultConfig, ...config });
    } else {
      console.error('Luckysheet library is not loaded. Make sure to include the CDN or local script.');
    }
  }

  getAllSheets(): LuckysheetSheet[] {
    return this.ensureLuckysheet() ? window.luckysheet.getAllSheets() : [];
  }

  getSheet(index: number = 0): LuckysheetSheet | null {
    const sheets = this.getAllSheets();
    return sheets.find(s => s.index == index || s.order == index) || null;
  }

  setCellValue(r: number, c: number, value: any, options?: any): void {
    if (this.ensureLuckysheet()) {
      window.luckysheet.setCellValue(r, c, value, options);
    }
  }

  getCellValue(r: number, c: number, options?: any): any {
    if (this.ensureLuckysheet()) {
      return window.luckysheet.getCellValue(r, c, options);
    }
    return null;
  }

  refresh(): void {
    if (this.ensureLuckysheet()) {
      window.luckysheet.refresh();
    }
  }

  exitEditMode(): void {
    if (this.ensureLuckysheet()) {
      window.luckysheet.exitEditMode();
    }
  }

  private isLuckysheetLoaded(): boolean {
    return typeof window !== 'undefined' && !!window.luckysheet;
  }

  private ensureLuckysheet(): boolean {
    if (!this.isLuckysheetLoaded()) {
      console.warn('Luckysheet is not initialized yet.');
      return false;
    }
    return true;
  }
}
