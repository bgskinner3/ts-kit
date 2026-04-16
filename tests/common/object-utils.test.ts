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
      const obj = ObjectUtils.create(proto);

      expect(obj.greeting).toBe('hello');
      expect(Object.getPrototypeOf(obj)).toBe(proto);
    });

    it('creates a "pure" object when null is passed', () => {
      // Objects created with null have no built-ins like .toString()
      const obj = ObjectUtils.create(null as any);

      expect(Object.getPrototypeOf(obj)).toBe(null);
      expect(obj.toString).toBeUndefined();
    });

    it('allows property shadowing', () => {
      const proto = { a: 1 };
      const obj = ObjectUtils.create(proto);
      (obj as any).a = 2;

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

    it('retrieves a nested value', () => {
      expect(ObjectUtils.get(obj, 'user.profile.name')).toBe('Alice');
      expect(objectGet(obj, 'user.profile')).toEqual({ name: 'Alice' });
    });

    it('returns undefined for missing path', () => {
      expect(ObjectUtils.get(obj, 'user.address')).toBeUndefined();
      expect(ObjectUtils.get(obj, '')).toBeUndefined();
    });
  });

  describe('set', () => {
    it('sets a nested property and creates missing objects', () => {
      const obj: any = {};
      ObjectUtils.set(obj, 'user.profile.name', 'Bob');
      expect(obj).toEqual({ user: { profile: { name: 'Bob' } } });

      const obj2: any = {};
      objectSet(obj2, 'settings.theme.darkMode', true);
      expect(obj2).toEqual({ settings: { theme: { darkMode: true } } });
    });

    it('does nothing if path is empty', () => {
      const obj = { a: 1 };
      ObjectUtils.set(obj, '', 42);
      expect(obj).toEqual({ a: 1 });
    });
    it('safely returns if it encounters a non-object mid-path', () => {
      // Scenario: 'user' exists but is a string, not an object.
      // The loop will move to 'user', then the safeguard will catch it
      // on the next iteration when trying to set 'name'.
      const obj = { user: 'not an object' };

      // This would normally throw an error if not for your safeguard
      ObjectUtils.set(obj as any, 'user.name', 'Bob');

      // Expect obj to remain unchanged (or at least not throw)
      expect(obj.user).toBe('not an object');
    });

    it('does nothing if obj is null or not an object (initial check)', () => {
      // Although the signature says 'object', runtime values can vary
      const obj: any = null;
      ObjectUtils.set(obj, 'a.b', 42);
      expect(obj).toBeNull();
    });
    it('hits the first loop safeguard by passing a non-object as obj', () => {
      // To hit the very first 'if' inside the loop:
      const obj: any = 'not-an-object';
      // The loop starts, 'current' is "not-an-object", safeguard triggers
      ObjectUtils.set(obj, 'a.b', 42);
      expect(obj).toBe('not-an-object');
    });

    it('hits the else if safeguard when a mid-path key exists as a primitive', () => {
      // 'user' exists and is a string (a primitive)
      const obj = { user: 'existing-string' };

      // Attempting to set 'user.name'
      // 1. Loop finds 'user' exists (skips the first 'if')
      // 2. 'user' is a string (hits your 'else if' safeguard)
      ObjectUtils.set(obj as any, 'user.name', 'Bob');

      // Verify it didn't overwrite 'user' with an object
      expect(obj.user).toBe('existing-string');
    });
  });
});
