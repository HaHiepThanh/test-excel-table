export interface LuckysheetConfig {
  /** Container ID */
  container: string;
  /** Workbook name */
  title?: string;
  /** Language 'en', 'zh', 'es', 'zh_tw' */
  lang?: string;
  /** Unique workbook key */
  gridKey?: string;
  /** Load entire workbook URL */
  loadUrl?: string;
  /** Load other sheet data URL */
  loadSheetUrl?: string;
  /** Allow backend update */
  allowUpdate?: boolean;
  /** Update address */
  updateUrl?: string;
  /** Thumbnail update address */
  updateImageUrl?: string;
  /** Sheet data. If loadUrl is not set, this data is used. */
  data?: LuckysheetSheet[];
  /** Plugins array, e.g. ['chart'] */
  plugins?: string[];
  /** Default columns in empty sheet */
  column?: number;
  /** Default rows in empty sheet */
  row?: number;
  /** Format numbers > 4 digits as billions */
  autoFormatw?: boolean;
  /** Precision (decimals) */
  accuracy?: number;
  /** Allow copy operation */
  allowCopy?: boolean;
  /** Show toolbar */
  showtoolbar?: boolean;
  /** Customize toolbar configuration */
  showtoolbarConfig?: Record<string, boolean>;
  /** Show info bar (top) */
  showinfobar?: boolean;
  /** Show sheet bar (bottom) */
  showsheetbar?: boolean;
  /** Customize sheet bar */
  showsheetbarConfig?: Record<string, boolean>;
  /** Show statistic bar (count, etc) */
  showstatisticBar?: boolean;
  /** Customize statistic bar */
  showstatisticBarConfig?: Record<string, boolean>;
  /** Allow adding rows */
  enableAddRow?: boolean;
  /** Allow back to top */
  enableAddBackTop?: boolean;
  /** User info display */
  userInfo?: boolean | string | { userImage: string; userName: string };
  /** User menu items */
  userMenuItem?: Array<{ url: string; icon: string; name: string }>;
  /** Back button URL */
  myFolderUrl?: string;
  /** Device pixel ratio */
  devicePixelRatio?: number;
  /** Custom function buttons HTML */
  functionButton?: string;
  /** Auto indent config window */
  showConfigWindowResize?: boolean;
  /** Force refresh formulas */
  forceCalculation?: boolean;
  /** Custom right click menu for cells */
  cellRightClickConfig?: Record<string, boolean>;
  /** Custom right click menu for sheet tab */
  sheetRightClickConfig?: Record<string, boolean>;
  /** Row header width */
  rowHeaderWidth?: number;
  /** Column header height */
  columnHeaderHeight?: number;
  /** Show formula bar */
  sheetFormulaBar?: boolean;
  /** Default font size */
  defaultFontSize?: number;
  /** Limit sheet name length */
  limitSheetNameLength?: boolean;
  /** Max sheet name length */
  defaultSheetNameMaxLength?: number;
  /** Pager configuration */
  pager?: {
    pageIndex: number;
    pageSize: number;
    total: number;
    selectOption: number[];
  };
  /** Hook functions */
  hook?: LuckysheetHooks;
}

/**
 * Hook functions for events
 */
export interface LuckysheetHooks {
    cellEditBefore?: (range: any) => void;
    cellUpdateBefore?: (r: number, c: number, value: any, isRefresh: boolean) => boolean | void;
    cellUpdated?: (r: number, c: number, oldValue: any, newValue: any, isRefresh: boolean) => void;
    cellRenderBefore?: (cell: any, position: any, sheet: any, ctx: any) => boolean | void;
    cellRenderAfter?: (cell: any, position: any, sheet: any, ctx: any) => void;
    // Add other hooks as needed
}

/**
 * Definition of a single Worksheet.
 * https://dream-num.github.io/LuckysheetDocs/guide/sheet.html
 */
export interface LuckysheetSheet {
  /** Worksheet name */
  name: string;
  /** Worksheet color */
  color?: string;
  /** Worksheet index (unique key) */
  index?: string | number;
  /** Active status: 1 = active, 0 = inactive */
  status?: 0 | 1;
  /** Order in the tab bar */
  order?: number;
  /** Hiding status: 0 = show, 1 = hide */
  hide?: 0 | 1;
  /** Number of rows */
  row?: number;
  /** Number of columns */
  column?: number;
  /** Default row height (px) */
  defaultRowHeight?: number;
  /** Default column width (px) */
  defaultColWidth?: number;
  /**
   * Initialization data for cells.
   * Used for passing data into Luckysheet during creation.
   * After loading, `data` property is used.
   */
  celldata?: LuckysheetCellData[];
  /**
   * Sheet configuration (dimensions, merges, etc).
   */
  config?: LuckysheetSheetConfig;
  /** Horizontal scroll position */
  scrollLeft?: number;
  /** Vertical scroll position */
  scrollTop?: number;
  /** Saved selections */
  luckysheet_select_save?: LuckysheetSelection[];
  /** Calculation chain for formulas */
  calcChain?: any[];
  /** Is a pivot table */
  isPivotTable?: boolean;
  /** Pivot table settings */
  pivotTable?: any;
  /** Filter selection range */
  filter_select?: any;
  /** Filter settings */
  filter?: any;
  /** Alternate format settings */
  luckysheet_alternateformat_save?: any[];
  /** Custom alternate format settings */
  luckysheet_alternateformat_save_modelCustom?: any[];
  /** Conditional formatting settings */
  luckysheet_conditionformat_save?: any[];
  /** Frozen row/column settings */
  frozen?: LuckysheetFrozen;
  /** Chart configurations */
  chart?: any[];
  /** Zoom ratio (0-1) */
  zoomRatio?: number;
  /** Images in the sheet */
  image?: any[];
  /** Show grid lines: 1 = yes, 0 = no */
  showGridLines?: 0 | 1;
  /**
   * Runtime 2D array of cell data.
   * Populated from `celldata` during initialization.
   */
  data?: LuckysheetCell[][];
}

/**
 * Sparse cell data format used for initialization.
 */
export interface LuckysheetCellData {
  /** Row index (0-based) */
  r: number;
  /** Column index (0-based) */
  c: number;
  /** Cell value object or primitive */
  v: LuckysheetCell | string | number | null;
}

/**
 * The core Cell object structure.
 * https://dream-num.github.io/LuckysheetDocs/guide/cell.html
 */
export interface LuckysheetCell {
  /** Cell Type: fa = format, t = type (g=general, n=number, etc) */
  ct?: { fa: string; t: string };
  /** Background color (Hex) */
  bg?: string;
  /** Font family (0-12 index or string) */
  ff?: string | number;
  /** Font color (Hex) */
  fc?: string;
  /** Bold: 0 or 1 */
  bl?: 0 | 1;
  /** Italic: 0 or 1 */
  it?: 0 | 1;
  /** Font size (pt) */
  fs?: number;
  /** Cancelline (Strikethrough): 0 or 1 */
  cl?: 0 | 1;
  /** Underline: 0 or 1 (Note: unofficial, but common) */
  un?: 0 | 1;
  /** Vertical alignment: 0 middle, 1 up, 2 down */
  vt?: 0 | 1 | 2;
  /** Horizontal alignment: 0 center, 1 left, 2 right */
  ht?: 0 | 1 | 2;
  /** Merge cell info: { rs: rowSpan, cs: colSpan } */
  mc?: { rs: number; cs: number };
  /** Text rotation: 0=0, 1=45, 2=-45, 3=vertical, 4=90, 5=-90 */
  tr?: number;
  /** Text wrap: 0 truncation, 1 overflow, 2 word wrap */
  tb?: 0 | 1 | 2;
  /** Original value */
  v?: string | number | null;
  /** Display value (formatted) */
  m?: string | number | null;
  /** Formula string (e.g. "=SUM(A1:A10)") */
  f?: string;
  /** Postil (Comment) */
  ps?: { value: string; isShow: boolean };
}

/**
 * Sheet-specific configuration options.
 */
export interface LuckysheetSheetConfig {
  /** Merged cells. Key is "r_c", Value is merge info. */
  merge?: Record<string, LuckysheetMergeInfo>;
  /** Row heights. Key is row index. */
  rowlen?: Record<string, number>;
  /** Column widths. Key is column index. */
  columnlen?: Record<string, number>;
  /** Hidden rows. Key is row index, value is 0. */
  rowhidden?: Record<string, 0>;
  /** Hidden columns. Key is column index, value is 0. */
  colhidden?: Record<string, 0>;
  /** Border information */
  borderInfo?: LuckysheetBorderInfo[];
  /** Sheet protection/authority */
  authority?: any;
}

export interface LuckysheetMergeInfo {
  r: number;
  c: number;
  rs: number;
  cs: number;
}

/**
 * Border configuration.
 * Can be for a single cell or a range.
 */
export type LuckysheetBorderInfo =
  | {
      rangeType: "cell";
      value: {
        row_index: number;
        col_index: number;
        l?: LuckysheetBorderStyle;
        r?: LuckysheetBorderStyle;
        t?: LuckysheetBorderStyle;
        b?: LuckysheetBorderStyle;
      }
    }
  | {
      rangeType: "range";
      borderType: "border-left" | "border-right" | "border-top" | "border-bottom" | "border-all" | "border-outside" | "border-inside" | "border-horizontal" | "border-vertical" | "border-none";
      style: string;
      color: string;
      range: LuckysheetSelection[];
    };

export interface LuckysheetBorderStyle {
  /**
   * Border style index:
   * 1 Thin, 2 Hair, 3 Dotted, 4 Dashed, 5 DashDot, 6 DashDotDot,
   * 7 Double, 8 Medium, 9 MediumDashed, 10 MediumDashDot,
   * 11 MediumDashDotDot, 12 SlantedDashDot, 13 Thick
   */
  style: number;
  color: string;
}

export interface LuckysheetSelection {
  row: [number, number]; // [start, end]
  column: [number, number]; // [start, end]
}

export interface LuckysheetFrozen {
    type: 'row' | 'column' | 'both' | 'rangeRow' | 'rangeColumn' | 'rangeBoth' | 'cancel';
    range?: { row_focus: number; column_focus: number };
}
