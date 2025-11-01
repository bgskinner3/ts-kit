import {
  isNumber,
  isInteger,
  isString,
  isNonEmptyString,
  isBoolean,
  isBigInt,
  isSymbol,
} from '../../src/utils';

describe('Primitive Type Guards', () => {
  describe('isNumber', () => {
    it('returns true for valid finite numbers', () => {
      expect(isNumber(0)).toBe(true);
      expect(isNumber(3.14)).toBe(true);
    });
    it('returns false for NaN, Infinity, and non-numbers', () => {
      expect(isNumber(NaN)).toBe(false);
      expect(isNumber(Infinity)).toBe(false);
      expect(isNumber('42')).toBe(false);
      expect(isNumber(undefined)).toBe(false);
    });
  });

  describe('isInteger', () => {
    it('returns true for integers only', () => {
      expect(isInteger(42)).toBe(true);
      expect(isInteger(-1)).toBe(true);
      expect(isInteger(3.14)).toBe(false);
    });
  });

  describe('isString', () => {
    it('returns true for strings only', () => {
      expect(isString('foo')).toBe(true);
      expect(isString(String(123))).toBe(true);
      expect(isString(123)).toBe(false);
    });
  });

  describe('isNonEmptyString', () => {
    it('returns true for non-empty trimmed strings', () => {
      expect(isNonEmptyString('foo')).toBe(true);
    });
    it('returns false for empty or whitespace-only strings', () => {
      expect(isNonEmptyString('')).toBe(false);
      expect(isNonEmptyString('   ')).toBe(false);
    });
  });

  describe('isBoolean', () => {
    it('returns true only for booleans', () => {
      expect(isBoolean(true)).toBe(true);
      expect(isBoolean(false)).toBe(true);
      expect(isBoolean(1)).toBe(false);
    });
  });

  describe('isBigInt', () => {
    it('returns true only for bigints', () => {
      expect(isBigInt(42n)).toBe(true);
      expect(isBigInt(BigInt('42'))).toBe(true);
      expect(isBigInt(42)).toBe(false);
    });
  });

  describe('isSymbol', () => {
    it('returns true only for symbols', () => {
      expect(isSymbol(Symbol('foo'))).toBe(true);
      expect(isSymbol('foo')).toBe(false);
    });
  });
});
