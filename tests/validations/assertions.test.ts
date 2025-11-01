import {
  assertIsNumber,
  assertIsInteger,
  assertIsString,
  assertIsNonEmptyString,
  assertIsBoolean,
  assertIsBigInt,
  assertIsSymbol,
  assertIsNull,
  assertIsUndefined,
  assertIsDefined,
  assertIsNil,
  assertIsFunction,
  assertObject,
  assertIsArray,
  assertIsMap,
  assertIsSet,
  assertIsWeakMap,
  assertIsWeakSet,
  assertIsCamelCase,
  assertIsBufferLikeObject,
  assertIsJSONArrayString,
  assertIsJSONObjectString,
  assertIsJsonString,
  assertIsAbsoluteUrl,
  // assertIsInternalUrl,
  assertIsRGBTuple,
} from '../../src/lib';

describe('Primitive Assertion Functions', () => {
  test('assertIsNumber passes for valid numbers', () => {
    expect(() => assertIsNumber(0)).not.toThrow();
    expect(() => assertIsNumber(3.14)).not.toThrow();
  });

  test('assertIsNumber throws for invalid numbers', () => {
    expect(() => assertIsNumber('42' as any)).toThrow();
    expect(() => assertIsNumber(NaN)).toThrow();
  });

  test('assertIsString passes for strings', () => {
    expect(() => assertIsString('hello')).not.toThrow();
  });

  test('assertIsString throws for non-strings', () => {
    expect(() => assertIsString(123 as any)).toThrow();
  });

  test('assertIsNonEmptyString passes for valid strings', () => {
    expect(() => assertIsNonEmptyString('foo')).not.toThrow();
  });

  test('assertIsNonEmptyString throws for empty or whitespace strings', () => {
    expect(() => assertIsNonEmptyString('')).toThrow();
    expect(() => assertIsNonEmptyString('   ')).toThrow();
  });

  test('assertIsBoolean passes for booleans', () => {
    expect(() => assertIsBoolean(true)).not.toThrow();
    expect(() => assertIsBoolean(false)).not.toThrow();
  });

  test('assertIsBoolean throws for non-booleans', () => {
    expect(() => assertIsBoolean(0 as any)).toThrow();
  });

  describe('assertIsSymbol', () => {
    test('does not throw for symbols', () => {
      expect(() => assertIsSymbol(Symbol('foo'))).not.toThrow();
      expect(() => assertIsSymbol(Symbol.iterator)).not.toThrow();
    });

    test('throws for non-symbols', () => {
      expect(() => assertIsSymbol('foo' as any)).toThrow();
      expect(() => assertIsSymbol(123 as any)).toThrow();
      expect(() => assertIsSymbol(null as any)).toThrow();
    });
  });

  describe('assertIsBigInt', () => {
    test('does not throw for valid bigints', () => {
      expect(() => assertIsBigInt(42n)).not.toThrow();
      expect(() => assertIsBigInt(BigInt(0))).not.toThrow();
    });

    test('throws for non-bigints', () => {
      expect(() => assertIsBigInt(42 as any)).toThrow();
      expect(() => assertIsBigInt('123' as any)).toThrow();
      expect(() => assertIsBigInt(null as any)).toThrow();
    });
  });

  describe('assertIsInteger', () => {
    test('does not throw for valid integers', () => {
      expect(() => assertIsInteger(0)).not.toThrow();
      expect(() => assertIsInteger(42)).not.toThrow();
      expect(() => assertIsInteger(-100)).not.toThrow();
    });

    test('throws for non-integers', () => {
      expect(() => assertIsInteger(3.14 as any)).toThrow();
      expect(() => assertIsInteger(NaN as any)).toThrow();
      expect(() => assertIsInteger(Infinity as any)).toThrow();
      expect(() => assertIsInteger('42' as any)).toThrow();
    });
  });
});

describe('Reference Assertion Functions', () => {
  test('assertIsNull passes for null', () =>
    expect(() => assertIsNull(null)).not.toThrow());
  test('assertIsNull throws for non-null', () =>
    expect(() => assertIsNull(undefined as any)).toThrow());

  test('assertIsUndefined passes for undefined', () =>
    expect(() => assertIsUndefined(undefined)).not.toThrow());
  test('assertIsUndefined throws for other values', () =>
    expect(() => assertIsUndefined(null as any)).toThrow());

  test('assertIsDefined passes for non-null/non-undefined', () =>
    expect(() => assertIsDefined(123)).not.toThrow());
  test('assertIsDefined throws for null/undefined', () =>
    expect(() => assertIsDefined(null as any)).toThrow());

  test('assertObject passes for objects', () =>
    expect(() => assertObject({})).not.toThrow());
  test('assertObject throws for null/array/non-object', () => {
    expect(() => assertObject(null as any)).toThrow();
    expect(() => assertObject([] as any)).toThrow();
    expect(() => assertObject('foo' as any)).toThrow();
  });

  describe('assertIsNil', () => {
    test('does not throw for null or undefined', () => {
      expect(() => assertIsNil(null)).not.toThrow();
      expect(() => assertIsNil(undefined)).not.toThrow();
    });

    test('throws for other values', () => {
      expect(() => assertIsNil(0 as any)).toThrow();
      expect(() => assertIsNil('' as any)).toThrow();
      expect(() => assertIsNil({} as any)).toThrow();
    });
  });
  test('assertIsNil throws for other values', () => {
    expect(() => assertIsNil(0 as any)).toThrow();
    expect(() => assertIsNil('' as any)).toThrow();
    expect(() => assertIsNil({} as any)).toThrow();
  });
  test('assertIsFunction does not throw for functions', () => {
    expect(() => assertIsFunction(() => {})).not.toThrow();
    expect(() => assertIsFunction(async () => {})).not.toThrow();
    expect(() => assertIsFunction(function test() {})).not.toThrow();
  });
  test('assertIsFunction throws for non-functions', () => {
    expect(() => assertIsFunction(123 as any)).toThrow();
    expect(() => assertIsFunction('foo' as any)).toThrow();
    expect(() => assertIsFunction(null as any)).toThrow();
  });

  describe('assertIsArray', () => {
    test('does not throw for arrays', () => {
      expect(() => assertIsArray([])).not.toThrow();
      expect(() => assertIsArray([1, 2, 3])).not.toThrow();
    });

    test('throws for non-arrays', () => {
      expect(() => assertIsArray({} as any)).toThrow();
      expect(() => assertIsArray('string' as any)).toThrow();
      expect(() => assertIsArray(null as any)).toThrow();
      expect(() => assertIsArray(undefined as any)).toThrow();
    });
  });
  describe('assertIsMap', () => {
    test('does not throw for Map instances', () => {
      expect(() => assertIsMap(new Map())).not.toThrow();
      expect(() => assertIsMap(new Map([['a', 1]]))).not.toThrow();
    });

    test('throws for non-Map values', () => {
      expect(() => assertIsMap({} as any)).toThrow();
      expect(() => assertIsMap([] as any)).toThrow();
      expect(() => assertIsMap('map' as any)).toThrow();
      expect(() => assertIsMap(null as any)).toThrow();
    });
  });

  describe('assertIsSet', () => {
    test('does not throw for Set instances', () => {
      expect(() => assertIsSet(new Set())).not.toThrow();
      expect(() => assertIsSet(new Set([1, 2, 3]))).not.toThrow();
    });

    test('throws for non-Set values', () => {
      expect(() => assertIsSet({} as any)).toThrow();
      expect(() => assertIsSet([] as any)).toThrow();
      expect(() => assertIsSet('set' as any)).toThrow();
      expect(() => assertIsSet(null as any)).toThrow();
    });
  });

  describe('assertIsWeakMap', () => {
    test('does not throw for WeakMap instances', () => {
      const wm = new WeakMap<object, unknown>();
      const obj = {};
      wm.set(obj, 123);
      expect(() => assertIsWeakMap(wm)).not.toThrow();
    });

    test('throws for non-WeakMap values', () => {
      expect(() => assertIsWeakMap(new Map() as any)).toThrow();
      expect(() => assertIsWeakMap({} as any)).toThrow();
      expect(() => assertIsWeakMap([] as any)).toThrow();
      expect(() => assertIsWeakMap(null as any)).toThrow();
    });
  });

  describe('assertIsWeakSet', () => {
    test('does not throw for WeakSet instances', () => {
      const ws = new WeakSet<object>();
      const obj = {};
      ws.add(obj);
      expect(() => assertIsWeakSet(ws)).not.toThrow();
    });

    test('throws for non-WeakSet values', () => {
      expect(() => assertIsWeakSet(new Set() as any)).toThrow();
      expect(() => assertIsWeakSet({} as any)).toThrow();
      expect(() => assertIsWeakSet([] as any)).toThrow();
      expect(() => assertIsWeakSet(null as any)).toThrow();
    });
  });
});

describe('Refined / Composite Assertion Functions', () => {
  describe('assertIsCamelCase', () => {
    test('assertIsCamelCase passes for valid camelCase', () => {
      expect(() => assertIsCamelCase('fooBar')).not.toThrow();
    });
    test('assertIsCamelCase throws for invalid camelCase', () => {
      expect(() => assertIsCamelCase('Foo_Bar' as any)).toThrow();
    });
  });
  describe('assertIsRGBTuple', () => {
    test('assertIsRGBTuple passes for valid RGB', () => {
      expect(() => assertIsRGBTuple([0, 128, 255])).not.toThrow();
    });
    test('assertIsRGBTuple throws for invalid RGB', () => {
      expect(() => assertIsRGBTuple([0, 256, 0] as any)).toThrow();
      expect(() => assertIsRGBTuple([0, 128] as any)).toThrow();
    });
  });

  describe('assertIsBufferLikeObject', () => {
    test('does not throw for valid buffer-like objects', () => {
      const valid = { type: 'Buffer', data: [1, 2, 3] };
      expect(() => assertIsBufferLikeObject(valid)).not.toThrow();
    });

    test('throws for invalid buffer-like objects', () => {
      expect(() =>
        assertIsBufferLikeObject({ type: 'Buffer' } as any),
      ).toThrow();
      expect(() =>
        assertIsBufferLikeObject({ data: [1, 2, 3] } as any),
      ).toThrow();
      expect(() =>
        assertIsBufferLikeObject({ type: 'NotBuffer', data: [1, 2, 3] } as any),
      ).toThrow();
      expect(() =>
        assertIsBufferLikeObject({ type: 'Buffer', data: ['a', 'b'] } as any),
      ).toThrow();
      expect(() => assertIsBufferLikeObject(null as any)).toThrow();
      expect(() => assertIsBufferLikeObject('string' as any)).toThrow();
    });
  });

  describe('assertIsJSONArrayString', () => {
    test('does not throw for valid JSON array strings', () => {
      expect(() => assertIsJSONArrayString('[1,2,3]')).not.toThrow();
      expect(() => assertIsJSONArrayString('["a","b"]')).not.toThrow();
      expect(() => assertIsJSONArrayString('[]')).not.toThrow();
    });

    test('throws for invalid JSON or non-array strings', () => {
      expect(() => assertIsJSONArrayString('{"a":1}' as any)).toThrow();
      expect(() => assertIsJSONArrayString('not-json' as any)).toThrow();
      expect(() => assertIsJSONArrayString('' as any)).toThrow();
    });
  });

  describe('assertIsJSONObjectString', () => {
    test('does not throw for valid JSON object strings', () => {
      expect(() => assertIsJSONObjectString('{"a":1,"b":2}')).not.toThrow();
      expect(() => assertIsJSONObjectString('{}')).not.toThrow();
    });

    test('throws for invalid or non-object JSON', () => {
      expect(() => assertIsJSONObjectString('[1,2,3]' as any)).toThrow();
      expect(() => assertIsJSONObjectString('123' as any)).toThrow();
      expect(() => assertIsJSONObjectString('not-json' as any)).toThrow();
    });
  });

  describe('assertIsJsonString', () => {
    test('does not throw for valid JSON object or array strings', () => {
      expect(() => assertIsJsonString('{"foo": "bar"}')).not.toThrow();
      expect(() => assertIsJsonString('[1,2,3]')).not.toThrow();
    });

    test('throws for invalid JSON strings', () => {
      expect(() => assertIsJsonString('invalid' as any)).toThrow();
      expect(() => assertIsJsonString('123' as any)).toThrow();
      expect(() => assertIsJsonString('' as any)).toThrow();
    });
  });
  describe('assertIsAbsoluteUrl', () => {
    test('does not throw for valid absolute URLs', () => {
      expect(() => assertIsAbsoluteUrl('https://example.com')).not.toThrow();
      expect(() => assertIsAbsoluteUrl('http://example.org')).not.toThrow();
    });

    test('throws for invalid URLs', () => {
      expect(() => assertIsAbsoluteUrl('foo')).toThrow();
      expect(() => assertIsAbsoluteUrl('')).toThrow();
      expect(() => assertIsAbsoluteUrl(123 as any)).toThrow();
    });
  });
});
