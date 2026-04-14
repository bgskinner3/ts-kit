// ===========================
// ===========================
// COLOR TYPES / AUDITOR
// ===========================
// ===========================
type TContrastStatus = 'PASS' | 'FAIL' | 'LARGE_TEXT_ONLY';
type TAuditMetaData = { hex: string };
type TContrastReport = {
  ratio: number;
  status: TContrastStatus;
  isAA: boolean;
  isAAA: boolean;
  isAALargeText: boolean;
  // Metadata for debugging
  colors: {
    foreground: TAuditMetaData;
    background: TAuditMetaData;
  };
};
type TRGB = readonly [r: number, g: number, b: number];
type TRGBTuple = [number, number, number];
type TCssRGB = `rgb(${number}, ${number}, ${number})`;

export type { TRGB, TRGBTuple, TCssRGB, TContrastReport, TContrastStatus };
