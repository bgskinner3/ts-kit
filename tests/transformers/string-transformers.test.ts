import {
  toSnakeCase,
  toKebabCase,
  toCamelCase,
  capitalizeString,
  isCamelCase,
  isKebabCase,
  isSnakeCase,
  ObjectUtils,
} from '../../src/lib';

type TestCase = readonly [string, string, string, string];

const cases: TestCase[] = [
  ['hello_world', 'helloWorld', 'hello-world', 'hello_world'] as const,
  [
    'some_value_here',
    'someValueHere',
    'some-value-here',
    'some_value_here',
  ] as const,
  [
    'alreadyCamelCase',
    'alreadyCamelCase',
    'already-camel-case',
    'already_camel_case',
  ] as const,
  [
    'Already_Pascal_Case',
    'alreadyPascalCase',
    'already-pascal-case',
    'already_pascal_case',
  ] as const,
];

const guards = {
  isCamelCase: isCamelCase,
  isKebabCase: isKebabCase,
  isSnakeCase: isSnakeCase,
} as const;

describe.each(cases)(
  'StringTransformers (%s)',
  (snake, camel, kebab, expectedSnake) => {
    test('toCamelCase', () => {
      const result = toCamelCase(snake);
      expect(result).toBe(camel);
    });

    test('toKebabCase', () => {
      const result = toKebabCase(camel);
      expect(result).toBe(kebab);
    });

    test('toSnakeCase', () => {
      const result = toSnakeCase(kebab);
      expect(result).toBe(expectedSnake);
    });

    test('round-trip consistency', () => {
      expect(toKebabCase(toCamelCase(snake))).toBe(kebab);
      expect(toSnakeCase(toKebabCase(camel))).toBe(expectedSnake);
      expect(toCamelCase(toSnakeCase(kebab))).toBe(camel);
    });

    // Test guards
    ObjectUtils.entries(guards).forEach(([name, guard]) => {
      test(`${name} correctly identifies valid strings`, () => {
        const value =
          name === 'isCamelCase'
            ? camel
            : name === 'isKebabCase'
              ? kebab
              : expectedSnake;
        expect(guard(value)).toBe(true);
      });

      test(`${name} correctly rejects invalid strings`, () => {
        const invalidValues = [
          '',
          null,
          undefined,
          123,
          'Hello World',
          'some-value!',
          'UPPERCASE',
        ];
        invalidValues.forEach((val) => {
          expect(guard(val as unknown)).toBe(false);
        });
      });
    });
  },
);

describe('StringTransformers COntinued', () => {
  describe('capitalizeString', () => {
    it('capitalizes the first letter of a string', () => {
      expect(capitalizeString('hello')).toBe('Hello');
      expect(capitalizeString('world')).toBe('World');
    });
    it('leaves an already capitalized string unchanged', () => {
      expect(capitalizeString('Hello')).toBe('Hello');
    });
    it('works for single-character strings', () => {
      expect(capitalizeString('a')).toBe('A');
    });
    it('does not modify non-letter first characters', () => {
      expect(capitalizeString('1abc')).toBe('1abc');
      expect(capitalizeString('-dash')).toBe('-dash');
    });
  });
});
