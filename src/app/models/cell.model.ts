export interface LuckysheetCell {
  r: number;
  c: number;
  v: LuckysheetCellValue | string | number | null;
}

export interface LuckysheetCellValue {
  v: string | number | null; // Original value
  m?: string | number; // Display value
  ct?: LuckysheetCellType; // Cell type
  f?: string; // Formula

  bg?: string; // Background color
  ff?: string; // Font family
  fc?: string; // Font color
  bl?: 0 | 1; // Bold
  it?: 0 | 1; // Italic
  fs?: number; // Font size
  cl?: 0 | 1; // Cancelline (strikethrough)
  un?: 0 | 1; // Underline
  vt?: 0 | 1 | 2; // Vertical alignment (0: middle, 1: top, 2: bottom)
  ht?: 0 | 1 | 2; // Horizontal alignment (0: center, 1: left, 2: right)
  tr?: number; // Text rotation
  tb?: 0 | 1 | 2; // Text wrap (0: truncation, 1: overflow, 2: wrap)

  // Merge
  mc?: { r: number; c: number; rs?: number; cs?: number };

  // Note/Comment
  ps?: {
    left: number;
    top: number;
    width: number;
    height: number;
    value: string;
    isshow: boolean;
  };
}

export interface LuckysheetCellType {
  fa: string; // Format definition
  t: 'g' | 'n' | 'd' | 's' | 'b' | 'inlineStr'; // type: general, number, date, string, boolean
}
