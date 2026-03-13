import {
  hexToNormalizedRGB,
  hexToHSL,
  interpolateColor,
  hexToRGBShorthand,
  contrastTextColor,
  isLumGreaterThan,
  isDarkColor,
  isLumLessThan,
  getLuminance,
  validateRGB,
  hexToRGB,
} from './color';

const ColorUtils = {
  hexToNormalizedRGB,
  hexToHSL,
  interpolateColor,
  hexToRGBShorthand,
  contrastTextColor,
  isLumGreaterThan,
  isDarkColor,
  isLumLessThan,
  getLuminance,
  validateRGB,
  hexToRGB,
} as const;

export {
  hexToNormalizedRGB,
  hexToHSL,
  interpolateColor,
  hexToRGBShorthand,
  contrastTextColor,
  isLumGreaterThan,
  isDarkColor,
  isLumLessThan,
  getLuminance,
  validateRGB,
  hexToRGB,
  ColorUtils,
};
