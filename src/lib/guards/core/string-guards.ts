import type {
  TTypeGuard,
  TJSONArrayString,
  TJSONObjectString,
  TJSONDataString,
  THexByteString,
  TRGBTuple,
} from '../../../types';
import type { TSnakeCase, TKebabCase, TCamelCase } from '../../types';
import { isNonEmptyString, isString } from './primitives';
import { REGEX_CONSTANTS } from '../../../constants';
import { isUndefined } from './reference';
import { isArrayOf } from './composite';

/**
 * @utilType Guard
 * @name isCamelCase
 * @category Guards String
 * @description Validates if a string follows camelCase naming conventions.
 * @link #iscamelcase
 */
export const isCamelCase: TTypeGuard<TCamelCase<string>> = (
  value,
): value is TCamelCase<string> =>
  typeof value === 'string' && REGEX_CONSTANTS.camelCase.test(value);
/**
 * @utilType Guard
 * @name isSnakeCase
 * @category Guards String
 * @description Validates if a string follows snake_case naming conventions.
 * @link #issnakecase
 */
export const isSnakeCase: TTypeGuard<TSnakeCase<string>> = (
  value,
): value is TSnakeCase<string> =>
  typeof value === 'string' && REGEX_CONSTANTS.snakeCase.test(value);
/**
 * @utilType Guard
 * @name isKebabCase
 * @category Guards String
 * @description Validates if a string follows kebab-case naming conventions.
 * @link #iskebabcase
 */
export const isKebabCase: TTypeGuard<TKebabCase<string>> = (
  value,
): value is TKebabCase<string> =>
  typeof value === 'string' && REGEX_CONSTANTS.kebabCase.test(value);
/**
 * @utilType Guard
 * @name isJSONArrayString
 * @category Guards String
 * @description Verifies if a string is a valid JSON-serialized array.
 * @link #isjsonarraystring
 */
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
/**
 * @utilType Guard
 * @name isJSONObjectString
 * @category Guards String
 * @description Verifies if a string is a valid JSON-serialized object.
 * @link #isjsonobjectstring
 */
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

/**
 * @utilType Guard
 * @name isHTMLString
 * @category Guards String
 * @description Checks if a string contains HTML tags using regex detection.
 * @link #ishtmlstring
 */
export const isHTMLString: TTypeGuard<string> = (
  value: unknown,
): value is string => {
  return isString(value) && REGEX_CONSTANTS.htmlDetection.test(value);
};

/**
 * @utilType Guard
 * @name isHexByteString
 * @category Guards String
 * @description Factory that creates a guard to validate if a string is a valid hex byte string, optionally enforcing length.
 * @link #ishexbytestring
 * Example usage:
 * ```ts
 * isHexString("0a1b2c"); // true
 * isHexString("0a1b2z"); // false (invalid character 'z')
 * isHexString("0a1b2c", 6); // true
 * isHexString("0a1b2c", 8); // false (length mismatch)
 * ```
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
 * @utilType Guard
 * @name isJsonString
 * @category Guards String
 * @description Validates if a string is a valid JSON-serialized array or object.
 * @link #isjsonstring
 */
export const isJsonString: TTypeGuard<TJSONDataString> = (
  value: unknown,
): value is TJSONDataString =>
  isJSONArrayString(value) || isJSONObjectString(value);
/**
 * @utilType Guard
 * @name isHexColor
 * @category Guards Color
 * @description Validates if a string is a valid 3 or 6-digit HEX color code.
 * @link #ishexcolor
 */
export const isHexColor: TTypeGuard<string> = (
  value: unknown,
): value is string => {
  return isString(value) && /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value);
};

/**
 * @utilType Guard
 * @name isRGBString
 * @category Guards Color
 * @description Validates if a string is a valid CSS rgb() or rgba() string.
 * @link #isrgbstring
 */
export const isRGBString: TTypeGuard<string> = (
  value: unknown,
): value is string => {
  if (!isString(value)) return false;

  // Updated regex: 'a' is optional, and the 4th alpha value is optional
  const rgbRegex =
    /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})(?:\s*,\s*[\d.]+)?\s*\)$/i;

  const match = value.match(rgbRegex);
  if (!match) return false;

  const r = Number(match[1]);
  const g = Number(match[2]);
  const b = Number(match[3]);

  return [r, g, b].every((v) => v >= 0 && v <= 255);
};
/**
 * @utilType Guard
 * @name isTuple3
 * @category Guards Core
 * @description Validates if a value is an array of exactly three non-NaN numbers.
 * @link #istuple3
 */
export const isTuple3: TTypeGuard<TRGBTuple> = (
  value: unknown,
): value is TRGBTuple =>
  isArrayOf(
    (v): v is number => typeof v === 'number' && !Number.isNaN(v),
    value,
  ) && value.length === 3;
