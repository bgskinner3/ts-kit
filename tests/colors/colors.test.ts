import {
  hexToRGB,
  validateRGB,
  getLuminance,
  isLumLessThan,
  isLumGreaterThan,
  isDarkColor,
  contrastTextColor,
  hexToRGBShorthand,
  interpolateColor,
  hexToHSL,
  hexToNormalizedRGB,
} from '../../src/lib/color';

describe('Color Utilities', () => {
  describe('hexToRGB', () => {
    it('parses hex with #', () => {
      expect(hexToRGB('#ff0000')).toEqual([255, 0, 0]);
    });

    it('parses hex without #', () => {
      expect(hexToRGB('00ff00')).toEqual([0, 255, 0]);
    });

    it('throws on invalid hex', () => {
      expect(() => hexToRGB('#zzz')).toThrow();
      expect(() => hexToRGB('12345')).toThrow();
    });
  });

  describe('validateRGB', () => {
    it('accepts rgb tuple', () => {
      expect(validateRGB([10, 20, 30])).toEqual([10, 20, 30]);
    });

    it('converts hex string', () => {
      expect(validateRGB('#0000ff')).toEqual([0, 0, 255]);
    });
  });

  describe('getLuminance', () => {
    it('computes luminance for white', () => {
      expect(getLuminance([255, 255, 255])).toBeCloseTo(1, 5);
    });

    it('computes luminance for black', () => {
      expect(getLuminance([0, 0, 0])).toBeCloseTo(0, 5);
    });

    it('accepts hex input', () => {
      expect(getLuminance('#ffffff')).toBeCloseTo(1, 5);
    });
  });

  describe('luminance comparisons', () => {
    it('isLumLessThan works', () => {
      expect(isLumLessThan('#000000', 0.2)).toBe(true);
    });

    it('isLumGreaterThan works', () => {
      expect(isLumGreaterThan('#ffffff', 0.5)).toBe(true);
    });

    it('detects dark colors', () => {
      expect(isDarkColor('#000000')).toBe(true);
      expect(isDarkColor('#ffffff')).toBe(false);
    });
  });

  describe('contrastTextColor', () => {
    it('returns tailwind classes by default', () => {
      expect(contrastTextColor('#ffffff')).toBe('text-black');
      expect(contrastTextColor('#000000')).toBe('text-white');
    });

    it('returns css colors in css mode', () => {
      expect(contrastTextColor('#ffffff', { mode: 'css' })).toBe('#000000');
      expect(contrastTextColor('#000000', { mode: 'css' })).toBe('#ffffff');
    });

    it('respects custom threshold', () => {
      const color = '#777777';

      expect(contrastTextColor(color, { threshold: 0.1 })).toBe('text-black');
    });
  });

  describe('hexToRGBShorthand', () => {
    it('expands shorthand hex', () => {
      expect(hexToRGBShorthand('#abc')).toEqual([170, 187, 204]);
    });

    it('handles hex without #', () => {
      expect(hexToRGBShorthand('fff')).toEqual([255, 255, 255]);
    });

    it('returns null for invalid input', () => {
      expect(hexToRGBShorthand('#abcd')).toBeNull();
    });
  });

  describe('interpolateColor', () => {
    it('interpolates halfway', () => {
      const result = interpolateColor(
        { r: 0, g: 0, b: 0 },
        { r: 255, g: 255, b: 255 },
        0.5,
      );

      expect(result).toBe('rgb(128, 128, 128)');
    });

    it('returns start color for factor 0', () => {
      const result = interpolateColor(
        { r: 10, g: 20, b: 30 },
        { r: 100, g: 200, b: 255 },
        0,
      );

      expect(result).toBe('rgb(10, 20, 30)');
    });

    it('returns end color for factor 1', () => {
      const result = interpolateColor(
        { r: 10, g: 20, b: 30 },
        { r: 100, g: 200, b: 255 },
        1,
      );

      expect(result).toBe('rgb(100, 200, 255)');
    });
  });

  describe('hexToHSL', () => {
    it('converts white correctly', () => {
      const hsl = hexToHSL('#ffffff');

      expect(hsl.l).toBeCloseTo(1);
      expect(hsl.s).toBeCloseTo(0);
    });

    it('converts black correctly', () => {
      const hsl = hexToHSL('#000000');

      expect(hsl.l).toBeCloseTo(0);
      expect(hsl.s).toBeCloseTo(0);
    });

    it('converts red correctly', () => {
      const { h, s, l } = hexToHSL('#ff0000');

      expect(h).toBeCloseTo(0);
      expect(s).toBeCloseTo(1);
      expect(l).toBeCloseTo(0.5);
    });
  });

  describe('hexToNormalizedRGB', () => {
    it('normalizes RGB values', () => {
      expect(hexToNormalizedRGB('#ff0000')).toEqual([1, 0, 0]);
    });

    it('normalizes white', () => {
      expect(hexToNormalizedRGB('#ffffff')).toEqual([1, 1, 1]);
    });

    it('normalizes black', () => {
      expect(hexToNormalizedRGB('#000000')).toEqual([0, 0, 0]);
    });
  });
  describe('isDarkColor', () => {
    test.each([
      ['#000000', true],
      ['#ffffff', false],
      ['#333333', true],
      ['#eeeeee', false],
    ])('%s dark detection', (color, expected) => {
      expect(isDarkColor(color)).toBe(expected);
    });
  });
});
