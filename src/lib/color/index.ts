import { REGEX_CONSTANTS } from '../../constants';
import { TRGB, TCssRGB } from '../../types';
import { isString } from '../guards';
import { assertIsRGBTuple } from '../validations';

export const hexToRGB = (hex: string): TRGB => {
  const normalized = hex.startsWith('#') ? hex.slice(1) : hex;

  if (!REGEX_CONSTANTS.hexColor.test(normalized)) {
    throw new Error(`Invalid hex color: "${hex}"`);
  }

  const r = parseInt(normalized.slice(0, 2), 16);
  const g = parseInt(normalized.slice(2, 4), 16);
  const b = parseInt(normalized.slice(4, 6), 16);

  return [r, g, b];
};

export const validateRGB = (input: TRGB | string): TRGB => {
  if (isString(input)) return hexToRGB(input);
  assertIsRGBTuple(input);
  return input satisfies TRGB;
};

export const getLuminance = (rgb: TRGB | string): number => {
  const [r, g, b] = validateRGB(rgb);

  const transform = (channel: number) => {
    const c = channel / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };

  return 0.2126 * transform(r) + 0.7152 * transform(g) + 0.0722 * transform(b);
};

/**  @see {@link ColorUtilsDocs.isLumLessThan} */
export const isLumLessThan = (
  color: TRGB | string,
  threshold: number,
): boolean => getLuminance(validateRGB(color)) < threshold;

/**  @see {@link ColorUtilsDocs.isDarkColor} */
export const isDarkColor = (color: TRGB | string): boolean =>
  isLumLessThan(color, 0.179);

/**  @see {@link ColorUtilsDocs.isLumGreaterThan} */
export const isLumGreaterThan = (
  color: TRGB | string,
  threshold: number,
): boolean => getLuminance(validateRGB(color)) > threshold;

/**  @see {@link ColorUtilsDocs.contrastTextColor} */
export const contrastTextColor = (
  color: TRGB | string,
  options?: {
    mode?: 'tailwind' | 'css';
    threshold?: number;
  },
): string => {
  const { mode = 'tailwind', threshold = 0.179 } = options ?? {};
  const isLight = isLumGreaterThan(color, threshold);

  if (mode === 'css') {
    return isLight ? '#000000' : '#ffffff';
  }

  // Default: Tailwind-compatible class names
  return isLight ? 'text-black' : 'text-white';
};

/**  @see {@link ColorUtilsDocs.hexToRGBShorthand} */
export const hexToRGBShorthand = (
  hex: string,
): [number, number, number] | null => {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const fullHex = hex.replace(
    shorthandRegex,
    (_m, r, g, b) => r + r + g + g + b + b,
  );

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
  if (!result) return null;

  return [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16),
  ];
};

/**  @see {@link ColorUtilsDocs.interpolateColor} */
export const interpolateColor = (
  start: { r: number; g: number; b: number },
  end: { r: number; g: number; b: number },
  factor: number,
): TCssRGB => {
  const result = {
    r: Math.round(start.r + (end.r - start.r) * factor),
    g: Math.round(start.g + (end.g - start.g) * factor),
    b: Math.round(start.b + (end.b - start.b) * factor),
  };

  return `rgb(${result.r}, ${result.g}, ${result.b})`;
};
/**  @see {@link ColorUtilsDocs.hexToHSL} */
export function hexToHSL(hex: string): { h: number; s: number; l: number } {
  // Convert hex to RGB and normalize to [0,1]
  const [r, g, b] = hexToRGB(hex).map((v) => v / 255);

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;

  let h = 0;
  let s = 0;
  const d = max - min;

  if (d !== 0) {
    // Calculate saturation
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    // Calculate hue
    if (max === r) {
      h = ((g - b) / d + (g < b ? 6 : 0)) * 60;
    } else if (max === g) {
      h = ((b - r) / d + 2) * 60;
    } else if (max === b) {
      h = ((r - g) / d + 4) * 60;
    }
  }

  return { h, s, l };
}
/**  @see {@link ColorUtilsDocs.hexToNormalizedRGB} */
export const hexToNormalizedRGB = (hex: string): [number, number, number] => {
  const [r, g, b] = hexToRGB(hex); // returns 0–255
  return [r / 255, g / 255, b / 255];
};
export const ColorUtils = {
  interpolateColor,
  hexToRGBShorthand,
  contrastTextColor,
  isDarkColor,
  isLumGreaterThan,
  isLumLessThan,
  getLuminance,
  validateRGB,
  hexToRGB,
} as const;
