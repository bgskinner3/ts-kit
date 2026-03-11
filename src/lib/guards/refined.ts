import type {
  TTypeGuard,
  TBufferLikeObject,
  TCamelCase,
  TJSONArrayString,
  TJSONObjectString,
  TJSONDataString,
  TRGB,
  THexByteString,
  TSnakeCase,
  TKebabCase,
} from '../../types';
import { isNumber, isNonEmptyString, isString } from './primitives';
import { REGEX_CONSTANTS } from '../../constants';
import { isUndefined, isObject, isArray } from './reference';
import { isArrayOf } from './composite';

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

/**  @see {@link CompositeTypeGuardsDocs.isBufferLikeObject} */
export const isBufferLikeObject: TTypeGuard<TBufferLikeObject> = (
  value: unknown,
): value is TBufferLikeObject => {
  if (!isObject(value)) return false;

  const hasTypeBuffer = 'type' in value && value.type === 'Buffer';
  const hasNumberArrayData =
    'data' in value && isArrayOf(isNumber, (value as { data: unknown }).data);

  return hasTypeBuffer && hasNumberArrayData;
};

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
/** @see {@link PrimitiveTypeGuardsDocs.isJsonString} */
export const isJsonString: TTypeGuard<TJSONDataString> = (
  value: unknown,
): value is TJSONDataString =>
  isJSONArrayString(value) || isJSONObjectString(value);

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
export const isHTMLString: TTypeGuard<string> = (
  value: unknown,
): value is string => {
  return isString(value) && REGEX_CONSTANTS.htmlDetection.test(value);
};

export const RefinedTypeGuards = {
  isCamelCase,
  isBufferLikeObject,
  isJSONArrayString,
  isJSONObjectString,
  isJsonString,
  isRGBTuple,
  isSnakeCase,
  isKebabCase,
  isPhoneNumber,
  isEmail,
  isHTMLString,
} as const;
