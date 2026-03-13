import type { TTypeGuard, TBufferLikeObject, TRGB } from '../../../types';
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

export const isRGBTuple: TTypeGuard<TRGB> = (input: unknown): input is TRGB => {
  return (
    isArray(input) &&
    input.length === 3 &&
    input.every((n) => isNumber(n) && n >= 0 && n <= 255)
  );
};

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
export const isEmail: TTypeGuard<string> = (
  value: unknown,
): value is string => {
  return isString(value) && REGEX_CONSTANTS.emailRegex.test(value);
};
