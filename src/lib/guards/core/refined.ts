import type { TTypeGuard, TBufferLikeObject, TRGB } from '../../../types';
import { isNumber, isNonEmptyString, isString } from './primitives';
import { REGEX_CONSTANTS } from '../../../constants';
import { isObject, isArray } from './reference';
import { isArrayOf } from './composite';

/**
 * @utilType Guard
 * @name isBufferLikeObject
 * @category Guards Core
 * @description Validates if an object matches the shape of a serialized Buffer (e.g., { type: 'Buffer', data: number[] }).
 * @link #isbufferlikeobject
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
 * @utilType Guard
 * @name isRGBTuple
 * @category Guards Core
 * @description Checks if a value is a valid RGB tuple: an array of exactly three numbers between 0 and 255.
 * @link #isrgbtuple
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
 * @utilType Guard
 * @name isPhoneNumber
 * @category Guards Core
 * @description Validates a string against common US, EU, and generic phone number regex patterns.
 * @link #isphonenumber
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
 * @utilType Guard
 * @name isEmail
 * @category Guards Core
 * @description Validates if a string follows a standard email format using regex.
 * @link #isemail

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
