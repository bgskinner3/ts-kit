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

/** @see {@link PrimitiveTypeGuardsDocs.isCamelCase} */
export const isCamelCase: TTypeGuard<TCamelCase<string>> = (
  value,
): value is TCamelCase<string> =>
  typeof value === 'string' && REGEX_CONSTANTS.camelCase.test(value);

/** @see {@link PrimitiveTypeGuardsDocs.isCamelCase} */
export const isSnakeCase: TTypeGuard<TSnakeCase<string>> = (
  value,
): value is TSnakeCase<string> =>
  typeof value === 'string' && REGEX_CONSTANTS.snakeCase.test(value);

/** @see {@link PrimitiveTypeGuardsDocs.isCamelCase} */
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

/** @see {@link PrimitiveTypeGuardsDocs.isHexString} */
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

/** @see {@link PrimitiveTypeGuardsDocs.isJsonString} */
export const isJsonString: TTypeGuard<TJSONDataString> = (
  value: unknown,
): value is TJSONDataString =>
  isJSONArrayString(value) || isJSONObjectString(value);
