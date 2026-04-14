import {
  capitalizedKeys,
  capitalizeArray,
  toKeyByField,
  generateKeyMap,
} from '../../src/lib/transformers/object-transformers';
import { ObjectUtils } from '../../src/lib/common/object';

describe('ObjectTransformers', () => {
  describe('Capitalization utilities', () => {
    describe('capitalizeArray', () => {
      test('capitalizes all strings in an array', () => {
        const input = ['hello', 'world', 'test'] as const;
        const result = capitalizeArray(input);
        expect(result).toEqual(['Hello', 'World', 'Test']);
      });

      test('handles empty arrays', () => {
        expect(capitalizeArray([])).toEqual([]);
      });

      test('preserves single-character strings', () => {
        const input = ['a', 'b'] as const;
        expect(capitalizeArray(input)).toEqual(['A', 'B']);
      });
    });

    describe('capitalizedKeys', () => {
      test('capitalizes all string keys of an object', () => {
        const obj = { first: 1, second: 2, third: 3 };
        const result = capitalizedKeys(obj);
        expect(result).toEqual(['First', 'Second', 'Third']);
      });

      test('filters out non-string keys', () => {
        const obj = { 1: 'a', true: 'b', hello: 'world' };
        const result = capitalizedKeys(obj);
        expect(result).toEqual(['True', 'Hello']);
      });

      test('handles empty objects', () => {
        expect(capitalizedKeys({})).toEqual([]);
      });

      test('works with keys already capitalized', () => {
        const obj = { Hello: 1, World: 2 };
        expect(capitalizedKeys(obj)).toEqual(['Hello', 'World']);
      });
    });
  });
  describe('toKeyByField', () => {
    type Row = { id: number; name: string; age: number };

    const rows: Row[] = [
      { id: 1, name: 'Alice', age: 25 },
      { id: 2, name: 'Bob', age: 30 },
      { id: 3, name: 'Charlie', age: 35 },
    ];

    test('maps array to record by id', () => {
      const result = toKeyByField(rows, 'id');

      expect(result).toEqual({
        1: { name: 'Alice', age: 25 },
        2: { name: 'Bob', age: 30 },
        3: { name: 'Charlie', age: 35 },
      });
    });

    test('maps array to record by name', () => {
      const result = toKeyByField(rows, 'name');

      expect(result).toEqual({
        Alice: { id: 1, age: 25 },
        Bob: { id: 2, age: 30 },
        Charlie: { id: 3, age: 35 },
      });
    });

    test('handles empty array', () => {
      const result = toKeyByField([], 'id');
      expect(result).toEqual({});
    });

    test('ensures key is omitted in output', () => {
      const result = toKeyByField(rows, 'id');
      ObjectUtils.values(result).forEach((value) => {
        expect(value).not.toHaveProperty('id');
      });
    });
  });

  describe('generateKeyMap', () => {
    describe('generateKeyMap - basic usage', () => {
      test('generates keys with suffix only', () => {
        const keys = ['first', 'second', 'third'] as const;
        const suffix = 'Id';

        const result = generateKeyMap({ keys, suffix });

        expect(result).toEqual({
          first: 'firstId',
          second: 'secondId',
          third: 'thirdId',
        });
      });
    });
    describe('generateKeyMap - with prefix', () => {
      test('generates keys with prefix and suffix', () => {
        const keys = ['first', 'second'] as const;
        const prefix = 'my';
        const suffix = 'Key';

        const result = generateKeyMap({ keys, prefix, suffix });

        expect(result).toEqual({
          first: 'myFirstKey',
          second: 'mySecondKey',
        });
      });
    });
    describe('generateKeyMap - edge cases', () => {
      test('handles empty keys', () => {
        expect(generateKeyMap({ keys: [], suffix: 'X' })).toEqual({});
      });

      test('handles single-character keys', () => {
        const keys = ['a', 'b'] as const;
        const result = generateKeyMap({ keys, suffix: 'Z' });
        expect(result).toEqual({ a: 'aZ', b: 'bZ' });
      });

      test('handles prefix as empty string', () => {
        const keys = ['one', 'two'] as const;
        const result = generateKeyMap({ keys, prefix: '', suffix: 'X' });
        expect(result).toEqual({ one: 'oneX', two: 'twoX' });
      });
    });
  });
});
/**
 import type {
  //   TFilterKeysByValue,
  TStripType,
} from '../../../src/lib/types/primitives/filters';
import type { TEqual, TExpect } from '../../../src/types/testing';

type TComplexUser = {
  readonly id: number;
  name: string;
  age?: number; // number | undefined
  bio: string | null; // string | null
  roles: string[] | 'guest'; // Union type
  tags: string[] | undefined; // Another optional pattern
};
type TFilterKeysByValue<T, U> = {
  [K in keyof T]-?: NonNullable<T[K]> extends U ? K : never;
}[keyof T];
describe('Filter Primitives (Thorough Edge Case Testing)', () => {
  describe('TFilterKeysByValue', () => {
    it('should handle standard primitives (including nullables via NonNullable)', () => {
      // NonNullable<name> is string. NonNullable<bio> is string.
      // Both match 'string'.
      type Actual = TFilterKeysByValue<TComplexUser, string>;
      type Expected = 'name' | 'bio';

      type _test = TExpect<TEqual<Actual, Expected>>;
    });

    it('should handle loose matching for optional numbers (?-)', () => {
      // Testing if your utility handles the '?' correctly
      type Actual = TFilterKeysByValue<TComplexUser, number>;
      type Expected = 'id' | 'age';
      type _test = TExpect<TEqual<Actual, Expected>>;
    });

    it('should extract union types correctly', () => {
      type Actual = TFilterKeysByValue<TComplexUser, string[] | 'guest'>;

      // Both match because string[] (from tags) extends the union string[] | 'guest'
      type Expected = 'roles';

      type _test = TExpect<TEqual<Actual, Expected>>;
    });

    it('should return never when no keys match the filter', () => {
      type Actual = TFilterKeysByValue<TComplexUser, boolean>;

      type _test = TExpect<TEqual<Actual, never>>;
    });
  });

  describe('TStripType', () => {
    it('should remove properties including readonly ones', () => {
      type Actual = TStripType<TComplexUser, number>;
      // Should remove 'id' and 'age'
      type Expected = {
        name: string;
        bio: string | null;
        roles: string[] | 'guest';
        tags: string[] | undefined;
      };
      type _test = TExpect<TEqual<Actual, Expected>>;
    });

    it('should strip nullables only if null is included in U', () => {
      // Stripping 'string' should leave 'bio' alone because 'bio' is 'string | null'
      type Actual = TStripType<TComplexUser, string>;
      type _test = TExpect<Actual['bio'] extends string | null ? true : false>;
    });

    it('should effectively strip optional properties', () => {
      type Actual = TStripType<TComplexUser, string[] | undefined>;
      // 'tags' should be gone
      type _test = TExpect<TEqual<keyof Actual & 'tags', never>>;
    });
  });

  // Keep Jest runner from complaining about empty files
  it('✅ Type Check Validation Complete', () => {
    expect(true).toBe(true);
  });
});

 */
