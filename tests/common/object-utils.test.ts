import {
  ObjectUtils,
  objectKeys,
  objectEntries,
  objectFromEntries,
  objectValues,
  objectHas,
  objectGet,
  objectSet,
} from '../../src/utils';


describe('ObjectUtils', () => {
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
  });
});