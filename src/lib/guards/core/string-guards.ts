import type {
  TTypeGuard,
  TCamelCase,
  TJSONArrayString,
  TJSONObjectString,
  TJSONDataString,
  THexByteString,
  TSnakeCase,
  TKebabCase,
} from '../../../types';
import { isNonEmptyString, isString } from './primitives';
import { REGEX_CONSTANTS } from '../../../constants';
import { isUndefined } from './reference';

/**
 * Checks if the value is a camelCase string.
 *
 * By default, this checks that:
 * - The string starts with a lowercase letter
 * - Only contains alphanumeric characters
 * - No separators like `_`, `-`, or spaces
 *
 * You can think of this in terms of the `TCamelCase` type:
 * ```ts
 * type Example = TCamelCase<'my-variable'>; // 'myVariable'
 * ```
 *
 * Optionally, camelCase strings may preserve consecutive uppercase letters
 * using `TCamelCaseOptions['preserveConsecutiveUppercase']`. For example:
 * ```ts
 * type Example1 = TCamelCase<'FOO-BAR'>; // 'fooBAR' if preserveConsecutiveUppercase = true
 * type Example2 = TCamelCase<'FOO-BAR', { preserveConsecutiveUppercase: false }>; // 'fooBar'
 * ```
 *
 * @example
 * ```ts
 * TypeGuardUtils.isCamelCase('myVariable'); // true
 * TypeGuardUtils.isCamelCase('myVariable2'); // true
 * TypeGuardUtils.isCamelCase('MyVariable'); // false (starts with uppercase)
 * TypeGuardUtils.isCamelCase('my_variable'); // false (contains underscore)
 * TypeGuardUtils.isCamelCase('fooBAR'); // true if preserveConsecutiveUppercase is considered
 * ```
 */
export const isCamelCase: TTypeGuard<TCamelCase<string>> = (
  value,
): value is TCamelCase<string> =>
  typeof value === 'string' && REGEX_CONSTANTS.camelCase.test(value);


export const isSnakeCase: TTypeGuard<TSnakeCase<string>> = (
  value,
): value is TSnakeCase<string> =>
  typeof value === 'string' && REGEX_CONSTANTS.snakeCase.test(value);


export const isKebabCase: TTypeGuard<TKebabCase<string>> = (
  value,
): value is TKebabCase<string> =>
  typeof value === 'string' && REGEX_CONSTANTS.kebabCase.test(value);

export const isJSONArrayString: TTypeGuard<TJSONArrayString> = (
  value: unknown,
): value is TJSONArrayString => {
  if (!isNonEmptyString(value)) return false;
  try {
    return Array.isArray(JSON.parse(value));
  } catch {
    return false;
  }
};

export const isJSONObjectString: TTypeGuard<TJSONObjectString> = (
  value: unknown,
): value is TJSONObjectString => {
  if (!isNonEmptyString(value)) return false;
  try {
    const parsed = JSON.parse(value);
    return (
      typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed)
    );
  } catch {
    return false;
  }
};
export const isHTMLString: TTypeGuard<string> = (
  value: unknown,
): value is string => {
  return isString(value) && REGEX_CONSTANTS.htmlDetection.test(value);
};

/**
 * Checks whether a string is a valid hexadecimal representation.
 *
 * A hexadecimal string consists of characters 0–9, a–f, or A–F,
 * and is often used for binary data encoding, color codes, cryptographic hashes, etc.
 *
 * Key points:
 * - The value must be a non-empty string.
 * - Only characters `[0-9a-fA-F]` are allowed.
 * - The length must be even, unless `expectedLength` is provided.
 * - If `expectedLength` is specified, the string must match that exact length.
 * - Returns a TypeScript type guard, so it narrows the type to `string` when used.
 *
 * Example usage:
 * ```ts
 * isHexString("0a1b2c"); // true
 * isHexString("0a1b2z"); // false (invalid character 'z')
 * isHexString("0a1b2c", 6); // true
 * isHexString("0a1b2c", 8); // false (length mismatch)
 * ```
 *
 * Use case:
 * - Validating inputs for cryptographic functions.
 * - Ensuring a string is a valid hex color code.
 * - Checking serialized binary data in hexadecimal format.
 *
 * @param value - The value to check.
 * @param expectedLength - Optional length the hex string must match exactly.
 * @returns `true` if `value` is a valid hexadecimal string; otherwise `false`.
 *
 * @typeParam T - N/A
 */
export const isHexByteString = (
  expectedLength?: number,
): TTypeGuard<THexByteString> => {
  return (value: unknown): value is THexByteString => {
    if (!isNonEmptyString(value)) return false;
    if (value.length % 2 !== 0) return false;
    if (!REGEX_CONSTANTS.hexString.test(value)) return false;
    if (!isUndefined(expectedLength) && value.length !== expectedLength)
      return false;
    return true;
  };
};

/**
 * Checks whether a string contains valid JSON.
 *
 * This type guard ensures that:
 * - The value is a non-empty string.
 * - The string can be parsed successfully using `JSON.parse()`.
 *
 * Key points:
 * - Returns a TypeScript type guard, narrowing the type to `string`.
 * - Invalid JSON or non-string values return `false`.
 * - Useful for validating dynamic input or API responses.
 *
 * Example usage:
 * ```ts
 * isJsonString('{"foo": 1}'); // true
 * isJsonString('["a", "b"]'); // true
 * isJsonString('not json');   // false
 * isJsonString('');           // false
 * ```
 *
 * Use case:
 * - Safely validate strings before parsing them as JSON.
 * - Guard input data in APIs, configuration files, or user inputs.
 *
 * @param value - The value to validate.
 * @returns `true` if `value` is a string containing valid JSON; otherwise `false`.
 */
export const isJsonString: TTypeGuard<TJSONDataString> = (
  value: unknown,
): value is TJSONDataString =>
  isJSONArrayString(value) || isJSONObjectString(value);
