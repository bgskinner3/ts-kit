import type { TTypeGuard, TBufferLikeObject, TRGB } from '../../types';
import { isNumber, isNonEmptyString, isString } from './primitives';
import { REGEX_CONSTANTS } from '../../../constants';
import { isObject, isArray } from './reference';
import { isArrayOf } from './composite';

/**
 * Checks if a value is a **Buffer-like object**.
 *
 * A Buffer-like object is an object with the following shape:
 * ```ts
 * {
 *   type: 'Buffer';
 *   data: number[];
 * }
 * ```
 *
 * This guard validates:
 * - ✅ The value is a non-null object
 * - ✅ The `type` property exists and is exactly `'Buffer'`
 * - ✅ The `data` property exists and is an array of numbers
 *
 * ---
 * ### Key Points
 * - Uses `isObject` to ensure the value is an object
 * - Uses `isArrayOf(isNumber)` to check that `data` contains only numbers
 * - This is a **composite type guard** because it combines multiple primitive/reference checks
 *
 * ---
 * ### Example Usage
 * ```ts
 * const buf = { type: 'Buffer', data: [1, 2, 3] };
 * const notBuf = { type: 'Buffer', data: ['a', 'b'] };
 *
 * isBufferLikeObject(buf); // true
 * isBufferLikeObject(notBuf); // false
 * ```
 *
 * ---
 * @param value - The value to check
 * @returns `true` if the value is a Buffer-like object, otherwise `false`
 */
export const isBufferLikeObject: TTypeGuard<TBufferLikeObject> = (
  value: unknown,
): value is TBufferLikeObject => {
  if (!isObject(value)) return false;

  const hasTypeBuffer = 'type' in value && value.type === 'Buffer';
  const hasNumberArrayData =
    'data' in value && isArrayOf(isNumber, (value as { data: unknown }).data);

  return hasTypeBuffer && hasNumberArrayData;
};
/**
 * ## 🎨 isRGBTuple — Type Guard for Color Values
 *
 * Validates if a value is an array of exactly three numbers, each representing
 * a standard 8-bit color channel (0-255).
 *
 * ---
 *
 * ### ⚙️ Core Purpose
 * - 🔹 Verify the value is an array with a `length` of 3.
 * - 🔹 Ensure every element is a number within the range [0, 255].
 * - 🔹 Provide a **TypeScript type guard** (`TRGB`) for safe tuple access.
 *
 * ---
 *
 * ### 📘 Example Usage
 * ```ts
 * isRGBTuple([255, 0, 0]);     // true (Red)
 * isRGBTuple([0, 256, 0]);     // false (Out of range)
 * isRGBTuple([128, 128]);      // false (Wrong length)
 * ```
 */
export const isRGBTuple: TTypeGuard<TRGB> = (input: unknown): input is TRGB => {
  return (
    isArray(input) &&
    input.length === 3 &&
    input.every((n) => isNumber(n) && n >= 0 && n <= 255)
  );
};
/**
 * ## 📞 isPhoneNumber — Type Guard for International Formats
 *
 * Validates whether a string matches common phone number patterns, including
 * US, EU, and generic international formats.
 *
 * ---
 *
 * ### ⚙️ Core Purpose
 * - 🔹 Test strings against a set of optimized regular expressions.
 * - 🔹 Support multiple geographical formats (US/EU/Global).
 * - 🔹 Ensure the value is a non-empty string before testing.
 *
 * ---
 *
 * ### 📘 Example Usage
 * ```ts
 * isPhoneNumber('+1-202-555-0101'); // true
 * isPhoneNumber('06 12 34 56 78');    // true
 * isPhoneNumber('123-abc');           // false
 * ```
 */
export const isPhoneNumber: TTypeGuard<string> = (
  value: unknown,
): value is string => {
  if (!isNonEmptyString(value)) return false;

  return [
    REGEX_CONSTANTS.USPhoneNumber,
    REGEX_CONSTANTS.EUPhoneNumber,
    REGEX_CONSTANTS.genericPhoneNumber,
  ].some((regex) => regex.test(value));
};

/**
 * ## 📧 isEmail — Type Guard for Email Addresses
 *
 * Validates if a string conforms to a standard email address format using
 * a robust regular expression.
 *
 * ---
 *
 * ### ⚙️ Core Purpose
 * - 🔹 Verify the string contains a valid local part, '@' symbol, and domain.
 * - 🔹 Perform a high-speed check suitable for form validation or data cleaning.
 *
 * ---
 *
 * ### 📘 Example Usage
 * ```ts
 * isEmail('hello@world.com'); // true
 * isEmail('invalid-email@');   // false
 * isEmail(12345);              // false
 * ```
 */
export const isEmail: TTypeGuard<string> = (
  value: unknown,
): value is string => {
  return isString(value) && REGEX_CONSTANTS.emailRegex.test(value);
};
