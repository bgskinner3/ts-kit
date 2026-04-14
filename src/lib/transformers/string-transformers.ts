import { TCamelCase, TSnakeCase, TKebabCase } from '../types';
import { toWords } from '../../managers';
/**
 * ## 🔠 capitalizeString — Capitalize First Letter
 *
 * Converts the first character of a string to uppercase while preserving
 * the rest of the string.
 *
 * This utility also preserves **TypeScript literal inference**
 * using the built-in `Capitalize<T>` type.
 *
 * ---
 *
 * ### Example
 *
 * ```ts
 * capitalizeString('hello'); // "Hello"
 * capitalizeString('userName'); // "UserName"
 * ```
 *
 * @param str - String to capitalize
 * @returns String with first letter capitalized
 */
export const capitalizeString = <S extends string>(str: S): Capitalize<S> => {
  return (str[0].toUpperCase() + str.slice(1)) as Capitalize<S>;
};

/**
 * ## 🐪 toCamelCase — Convert String to camelCase
 *
 * Converts a string from various formats (`snake_case`, `kebab-case`,
 * space-separated, etc.) into **camelCase**.
 *
 * This utility:
 * - Normalizes separators (`-`, `_`, spaces)
 * - Converts word boundaries to camel casing
 * - Returns an empty string if the value is invalid
 *
 * ---
 *
 * ### Example
 *
 * ```ts
 * toCamelCase('hello-world'); // "helloWorld"
 * toCamelCase('user_name'); // "userName"
 * toCamelCase('Hello World'); // "helloWorld"
 * ```
 *
 * @param value - String to transform
 */
export const toCamelCase = <T extends string>(
  value: T | string,
): TCamelCase<T | string> => {
  const words = toWords(value);
  if (words.length === 0) return '';

  return words
    .map((word, idx) => {
      const lower = word.toLowerCase();
      return idx === 0 ? lower : lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join('') as TCamelCase<T>;
};
/**
 * ## 🧵 toKebabCase — Convert String to kebab-case
 *
 * Converts a string into **kebab-case**, commonly used for
 * URLs, CSS class names, and HTML attributes.
 *
 * The function:
 * - Normalizes camelCase boundaries
 * - Splits words by separators
 * - Joins them using `-`
 *
 * ---
 *
 * ### Example
 *
 * ```ts
 * toKebabCase('helloWorld'); // "hello-world"
 * toKebabCase('User Name'); // "user-name"
 * toKebabCase('user_name'); // "user-name"
 * ```
 *
 * @param value - String to transform
 */
export const toKebabCase = <T extends string>(
  value: T | string,
): TKebabCase<T | string> => {
  const words = toWords(value);
  if (words.length === 0) return '';

  return words.map((word) => word.toLowerCase()).join('-') as TKebabCase<T>;
};
/**
 * ## 🐍 toSnakeCase — Convert String to snake_case
 *
 * Converts a string into **snake_case**, commonly used for
 * database fields, environment variables, and backend APIs.
 *
 * The function:
 * - Splits words by separators and camelCase boundaries
 * - Joins them using `_`
 *
 * ---
 *
 * ### Example
 *
 * ```ts
 * toSnakeCase('helloWorld'); // "hello_world"
 * toSnakeCase('User Name'); // "user_name"
 * toSnakeCase('user-name'); // "user_name"
 * ```
 *
 * @param value - String to transform
 */
export const toSnakeCase = <T extends string>(
  value: T | string,
): TSnakeCase<T | string> => {
  const words = toWords(value);
  if (words.length === 0) return '';

  return words.map((word) => word.toLowerCase()).join('_') as TSnakeCase<T>;
};
