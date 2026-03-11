import {
  isInArray,
  isArrayOf,
  isKeyOfArray,
  isKeyOfObject,
  isRecordOf,
  hasDefinedKeys,
  isKeyInObject,
} from '../../src/lib/guards/composite';
import { isString, isNumber } from '../../src/lib/guards/primitives';

describe('Composite Type Guards', () => {
  describe('isInArray', () => {
    const check = isInArray(['a', 'b', 1]);
    it('returns true if value exists in the array', () => {
      expect(check('a')).toBe(true);
      expect(check(1)).toBe(true);
    });
    it('returns false if value is missing or undefined', () => {
      expect(check('c')).toBe(false);
      expect(check(undefined)).toBe(false);
    });
  });

  describe('isKeyOfObject', () => {
    const obj = { a: 1, b: 'two' };
    const check = isKeyOfObject(obj);
    it('returns true for valid keys', () => {
      expect(check('a')).toBe(true);
      expect(check('b')).toBe(true);
    });
    it('returns false for non-existent keys', () => {
      expect(check('c')).toBe(false);
      expect(check(123)).toBe(false);
    });
  });

  describe('isKeyInObject', () => {
    it('checks if a specific key exists in an unknown object', () => {
      const hasID = isKeyInObject('id');
      expect(hasID({ id: 100 })).toBe(true);
      expect(hasID({ name: 'foo' })).toBe(false);
      expect(hasID(null)).toBe(false);
    });
  });

  describe('isKeyOfArray', () => {
    const keys = ['id', 'name', 123] as const;
    const check = isKeyOfArray(keys);
    it('returns true if the value is one of the array elements', () => {
      expect(check('id')).toBe(true);
      expect(check(123)).toBe(true);
    });
    it('returns false otherwise', () => {
      expect(check('age')).toBe(false);
    });
  });

  describe('isArrayOf', () => {
    it('returns true if all elements pass the guard', () => {
      expect(isArrayOf(isString, ['a', 'b'])).toBe(true);
      expect(isArrayOf(isNumber, [1, 2, 3])).toBe(true);
    });
    it('returns false if any element fails or input is not an array', () => {
      expect(isArrayOf(isString, ['a', 1])).toBe(false);
      expect(isArrayOf(isString, 'not an array')).toBe(false);
    });
  });

  describe('isRecordOf', () => {
    it('returns true if all values in object pass the guard', () => {
      const obj = { x: 1, y: 2 };
      expect(isRecordOf(obj, isNumber)).toBe(true);
    });
    it('returns false if any value fails', () => {
      const obj = { x: 1, y: '2' };
      expect(isRecordOf(obj, isNumber)).toBe(false);
    });
  });

  describe('hasDefinedKeys', () => {
    type User = { id: number; name: string; age?: number };
    const isUser = hasDefinedKeys<User>(['id', 'name']);

    it('returns true when all required keys are present and defined', () => {
      expect(isUser({ id: 1, name: 'Alice' })).toBe(true);
      expect(isUser({ id: 1, name: 'Alice', age: 30 })).toBe(true);
    });

    it('returns false if a required key is missing or undefined', () => {
      expect(isUser({ id: 1 })).toBe(false);
      expect(isUser({ id: 1, name: undefined })).toBe(false);
      expect(isUser(null)).toBe(false);
    });
  });
});
