import { TCamelCase, TSnakeCase, TKebabCase } from '../types';
import { isNil, isNonEmptyString } from '../guards';
import { REGEX_CONSTANTS } from '../../constants';
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

export const toCamelCase = <T extends TCamelCase<string>>(
  value: T | string,
): TCamelCase<T | string> => {
  if (isNil(value) || !isNonEmptyString(value)) return '';
  const cleaned = value.replace(REGEX_CONSTANTS.letterSeparator, ' ');
  return cleaned
    .replace(REGEX_CONSTANTS.camelCaseBoundary, (word, idx) =>
      idx === 0 ? word.toLowerCase() : word.toUpperCase(),
    )
    .replace(REGEX_CONSTANTS.whitespace, '');
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
  if (isNil(value) || !isNonEmptyString(value)) return '';
  const cleaned = value.replace(REGEX_CONSTANTS.wordBoundarySplitter, ' ');
  const withBoundaries = cleaned.replace(
    REGEX_CONSTANTS.kebabCaseBoundary,
    '$1 $2',
  );
  return withBoundaries
    .trim()
    .split(REGEX_CONSTANTS.whitespace)
    .join('-')
    .toLowerCase();
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
  if (isNil(value) || !isNonEmptyString(value)) return '';
  const cleaned = value.replace(REGEX_CONSTANTS.wordBoundarySplitter, ' ');
  // Step 2: Insert spaces before uppercase letters (camelCase boundaries)
  const withBoundaries = cleaned.replace(
    REGEX_CONSTANTS.kebabCaseBoundary,
    '$1 $2',
  );

  return withBoundaries
    .trim()
    .split(REGEX_CONSTANTS.whitespace)
    .join('_')
    .toLowerCase();
};
