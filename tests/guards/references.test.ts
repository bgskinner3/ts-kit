import {
  isNull,
  isFunction,
  isObject,
  isArray,
  isMap,
  isSet,
  isWeakMap,
  isWeakSet,
  isNil,
  isUndefined,
  isDefined,
  isInstanceOf,
  isRecord,
  hasOwnProperty,
} from '../../src/lib/guards/core/reference';

describe('Reference Type Guards', () => {
  describe('isRecord', () => {
    it('returns true for plain objects and false for arrays/null', () => {
      expect(isRecord({})).toBe(true);
      expect(isRecord({ a: 1 })).toBe(true);
      expect(isRecord([])).toBe(false);
      expect(isRecord(null)).toBe(false);
      // Dates should be false so they are treated as values, not mergeable objects
      expect(isRecord(new Date())).toBe(false);
    });
  });
  describe('hasOwnProperty', () => {
    it('returns true when the key exists', () => {
      const obj = { a: 1, b: undefined };
      expect(hasOwnProperty(obj, 'a')).toBe(true);
      expect(hasOwnProperty(obj, 'b')).toBe(true);
    });

    it('returns false when the key does not exist', () => {
      const obj = { a: 1 };
      expect(hasOwnProperty(obj, 'c')).toBe(false);
      expect(hasOwnProperty(obj, 'toString')).toBe(false); // Should be false for inherited props
    });

    it('works safely on objects with no prototype', () => {
      const noProto = Object.create(null);
      noProto.prop = 'test';
      expect(hasOwnProperty(noProto, 'prop')).toBe(true);
    });
  });
  describe('isNull', () => {
    it('returns true only for null', () => {
      expect(isNull(null)).toBe(true);
      expect(isNull(undefined)).toBe(false);
      expect(isNull({})).toBe(false);
    });
  });

  describe('isUndefined', () => {
    it('returns true only for undefined', () => {
      expect(isUndefined(undefined)).toBe(true);
      expect(isUndefined(null)).toBe(false);
      expect(isUndefined(0)).toBe(false);
    });
  });

  describe('isDefined', () => {
    it('returns false for null or undefined', () => {
      expect(isDefined(null)).toBe(false);
      expect(isDefined(undefined)).toBe(false);
    });
    it('returns true for all other values', () => {
      expect(isDefined(0)).toBe(true);
      expect(isDefined('')).toBe(true);
      expect(isDefined({})).toBe(true);
    });
  });

  describe('isNil', () => {
    it('returns true for null or undefined', () => {
      expect(isNil(null)).toBe(true);
      expect(isNil(undefined)).toBe(true);
    });
    it('returns false otherwise', () => {
      expect(isNil(0)).toBe(false);
      expect(isNil('')).toBe(false);
      expect(isNil({})).toBe(false);
    });
  });

  describe('isFunction', () => {
    it('returns true only for functions', () => {
      expect(isFunction(() => {})).toBe(true);
      expect(isFunction(async () => {})).toBe(true);
      expect(isFunction(function () {})).toBe(true);
      expect(isFunction({})).toBe(false);
      expect(isFunction(null)).toBe(false);
    });
  });

  describe('isObject', () => {
    it('returns true only for non-null objects', () => {
      expect(isObject({})).toBe(true);
      expect(isObject([])).toBe(false);
      expect(isObject(null)).toBe(false);
      expect(isObject(42)).toBe(false);
    });
  });

  describe('isArray', () => {
    it('returns true only for arrays', () => {
      expect(isArray([])).toBe(true);
      expect(isArray([1, 2, 3])).toBe(true);
      expect(isArray({})).toBe(false);
      expect(isArray(null)).toBe(false);
    });
  });

  describe('isMap', () => {
    it('returns true only for Map instances', () => {
      expect(isMap(new Map())).toBe(true);
      expect(isMap(new WeakMap())).toBe(false);
      expect(isMap({})).toBe(false);
    });
  });

  describe('isSet', () => {
    it('returns true only for Set instances', () => {
      expect(isSet(new Set())).toBe(true);
      expect(isSet(new WeakSet())).toBe(false);
      expect(isSet([])).toBe(false);
    });
  });

  describe('isWeakMap', () => {
    it('returns true only for WeakMap instances', () => {
      expect(isWeakMap(new WeakMap())).toBe(true);
      expect(isWeakMap(new Map())).toBe(false);
    });
  });

  describe('isWeakSet', () => {
    it('returns true only for WeakSet instances', () => {
      expect(isWeakSet(new WeakSet())).toBe(true);
      expect(isWeakSet(new Set())).toBe(false);
    });
  });
  describe('isInstanceOf', () => {
    class TestClass {}
    class OtherClass {}

    it('returns true for instances of the specified class', () => {
      expect(isInstanceOf(new Date(), Date)).toBe(true);
      expect(isInstanceOf(new RegExp(''), RegExp)).toBe(true);
      expect(isInstanceOf(new TestClass(), TestClass)).toBe(true);
    });

    it('returns false for instances of different classes', () => {
      expect(isInstanceOf(new TestClass(), OtherClass)).toBe(false);
      expect(isInstanceOf({}, TestClass)).toBe(false);
    });

    it('returns false for primitive values', () => {
      expect(isInstanceOf('hello', String)).toBe(false); // string literal is not an instance of String object
      expect(isInstanceOf(42, Number)).toBe(false);
      expect(isInstanceOf(null, Object)).toBe(false);
    });

    it('handles inheritance correctly', () => {
      class Parent {}
      class Child extends Parent {}
      const instance = new Child();

      expect(isInstanceOf(instance, Child)).toBe(true);
      expect(isInstanceOf(instance, Parent)).toBe(true);
    });
  });
});
