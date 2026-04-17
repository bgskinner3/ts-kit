import {
  ObjectUtils,
  objectKeys,
  objectEntries,
  objectFromEntries,
  objectValues,
  objectHas,
  objectGet,
  objectSet,
  objectIs,
  objectGetPropertyOf,
  objectCreate,
} from '../../src/lib/common/object';

describe('ObjectUtils', () => {
  describe('create', () => {
    it('creates an object that inherits from the prototype', () => {
      const proto = { greeting: 'hello' };
      const obj = objectCreate(proto);

      expect(obj.greeting).toBe('hello');
      expect(Object.getPrototypeOf(obj)).toBe(proto);
    });

    it('creates a "pure" object when null is passed', () => {
      const obj = objectCreate(null);

      expect(Object.getPrototypeOf(obj)).toBe(null);
      expect('toString' in obj).toBe(false);
    });

    it('allows property shadowing', () => {
      const proto = { a: 1 };
      const obj = objectCreate(proto);

      obj.a = 2;

      expect(obj.a).toBe(2);
      expect(proto.a).toBe(1); // Original remains unchanged
    });
  });

  describe('getPrototypeOf', () => {
    it('returns the correct prototype of an object', () => {
      const proto = { x: 10 };
      const obj = Object.create(proto);

      expect(ObjectUtils.getPrototypeOf(obj)).toBe(proto);
      expect(objectGetPropertyOf(obj)).toBe(proto);
    });

    it('returns null for objects created with null', () => {
      const obj = Object.create(null);
      expect(ObjectUtils.getPrototypeOf(obj)).toBe(null);
    });

    it('returns the standard Object prototype for literal objects', () => {
      const obj = {};
      expect(ObjectUtils.getPrototypeOf(obj)).toBe(Object.prototype);
    });
  });
  describe('is', () => {
    it('returns true for identical primitives', () => {
      expect(ObjectUtils.is(5, 5)).toBe(true);
      expect(objectIs('hello', 'hello')).toBe(true);
    });

    it('returns true for NaN compared to NaN', () => {
      // Standard NaN === NaN is false, but Object.is is true
      expect(ObjectUtils.is(NaN, NaN)).toBe(true);
      expect(objectIs(NaN, NaN)).toBe(true);
    });

    it('distinguishes between -0 and +0', () => {
      // Standard -0 === +0 is true, but Object.is is false
      expect(ObjectUtils.is(-0, +0)).toBe(false);
    });

    it('acts as a type guard', () => {
      const value: unknown = 'test';
      const match: string = 'test';

      if (ObjectUtils.is(match, value)) {
        // TypeScript narrows 'value' to string here
        expect(value.length).toBe(4);
      }
    });

    it('returns false for different objects with same content', () => {
      // Object.is checks reference equality, not deep equality
      const a = { id: 1 };
      const b = { id: 1 };
      expect(ObjectUtils.is(a, b)).toBe(false);
    });
  });
  describe('keys', () => {
    it('returns the keys of an object', () => {
      const obj = { a: 1, b: 2 };
      expect(ObjectUtils.keys(obj)).toEqual(['a', 'b']);
      expect(objectKeys(obj)).toEqual(['a', 'b']);
    });
  });

  describe('entries', () => {
    it('returns key-value pairs', () => {
      const obj = { a: 1, b: 2 };
      expect(ObjectUtils.entries(obj)).toEqual([
        ['a', 1],
        ['b', 2],
      ]);
      expect(objectEntries(obj)).toEqual([
        ['a', 1],
        ['b', 2],
      ]);
    });

    it('returns an empty array for null input', () => {
      // @ts-expect-error testing runtime behavior
      expect(ObjectUtils.entries(null)).toEqual([]);
    });
  });

  describe('fromEntries', () => {
    it('constructs an object from entries', () => {
      const entries: [string, number][] = [
        ['x', 1],
        ['y', 2],
      ];
      expect(ObjectUtils.fromEntries(entries)).toEqual({ x: 1, y: 2 });
      expect(objectFromEntries(entries)).toEqual({ x: 1, y: 2 });
    });
  });

  describe('values', () => {
    it('returns object values', () => {
      const obj = { a: 1, b: 2 };
      expect(ObjectUtils.values(obj)).toEqual([1, 2]);
      expect(objectValues(obj)).toEqual([1, 2]);
    });
  });

  describe('has', () => {
    const obj = { user: { profile: { name: 'Alice' } } };

    it('returns true for existing nested path', () => {
      expect(ObjectUtils.has(obj, 'user.profile.name')).toBe(true);
      expect(objectHas(obj, 'user.profile')).toBe(true);
    });

    it('returns false for missing or invalid path', () => {
      expect(ObjectUtils.has(obj, 'user.address.city')).toBe(false);
      expect(ObjectUtils.has(obj, '')).toBe(false);
      expect(objectHas({}, 'x')).toBe(false);
    });
  });

  describe('get', () => {
    const obj = { user: { profile: { name: 'Alice' } } };

    it('retrieves a nested value using dot path', () => {
      expect(objectGet(obj, 'user.profile.name')).toBe('Alice');
      expect(objectGet(obj, 'user.profile')).toEqual({ name: 'Alice' });
    });
    it('returns undefined when intermediate value is null', () => {
      const obj = { user: null };

      expect(objectGet(obj, 'user.name')).toBeUndefined();
    });
    it('returns undefined for missing path', () => {
      expect(objectGet(obj, 'user.address')).toBeUndefined();
    });

    it('returns undefined for empty path', () => {
      expect(objectGet(obj, '')).toBeUndefined();
    });

    it('supports direct property access via overload', () => {
      expect(objectGet(obj, 'user')).toEqual({ profile: { name: 'Alice' } });
    });

    it('supports symbol keys', () => {
      const sym = Symbol('key');
      const objWithSym = { [sym]: 'secret' };

      expect(objectGet(objWithSym, sym)).toBe('secret');
    });

    it('returns undefined when accessing missing nested object', () => {
      expect(objectGet(obj, 'user.address.street')).toBeUndefined();
    });
  });

  describe('set', () => {
    it('sets a nested property and creates missing objects', () => {
      const obj: any = {};

      objectSet(obj, 'user.profile.name', 'Bob');

      expect(obj).toEqual({
        user: { profile: { name: 'Bob' } },
      });
    });

    it('supports multiple independent deep paths', () => {
      const obj: any = {};

      objectSet(obj, 'settings.theme.darkMode', true);
      objectSet(obj, 'settings.theme.font.size', 12);

      expect(obj).toEqual({
        settings: {
          theme: {
            darkMode: true,
            font: {
              size: 12,
            },
          },
        },
      });
    });

    it('does nothing if path is empty', () => {
      const obj: any = { a: 1 };

      objectSet(obj, '', 42);

      expect(obj).toEqual({ a: 1 });
    });

    it('does nothing when mid-path value is a primitive', () => {
      const obj: any = { user: 'string' };

      objectSet(obj, 'user.name', 'Bob');

      expect(obj.user).toBe('string');
    });

    it('does nothing when mid-path value is null', () => {
      const obj: any = { user: null };

      objectSet(obj, 'user.name', 'Bob');

      expect(obj.user).toBeNull();
    });

    it('does nothing when mid-path value is undefined', () => {
      const obj: any = { user: undefined };

      objectSet(obj, 'user.name', 'Bob');

      expect(obj.user).toBeUndefined();
    });

    it('does not overwrite existing non-object structures mid-path', () => {
      const obj: any = {
        user: {
          profile: 'not-an-object',
        },
      };

      objectSet(obj, 'user.profile.name', 'Bob');

      expect(obj.user.profile).toBe('not-an-object');
    });
  });
  it('exits early when root value is null', () => {
    const obj: any = null;

    objectSet(obj, 'a.b', 123);

    expect(obj).toBeNull();
  });
  it('sets a direct property at root level', () => {
    const obj: any = {};

    objectSet(obj, 'a', 1);

    expect(obj.a).toBe(1);
  });
  it('overwrites existing nested value at final key', () => {
    const obj: any = { user: { profile: { name: 'Bob' } } };

    objectSet(obj, 'user.profile.name', 'Alice');

    expect(obj.user.profile.name).toBe('Alice');
  });
  it('assigns a value when path has a single segment', () => {
    const obj: any = {};
    ObjectUtils.set(obj, 'a', 123);
    expect(obj.a).toBe(123);
  });

  it('overwrites existing root property', () => {
    const obj: any = { a: 1 };
    ObjectUtils.set(obj, 'a', 999);
    expect(obj.a).toBe(999);
  });
});
