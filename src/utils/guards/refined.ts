import type {
  TTypeGuard,
  TBufferLikeObject,
  TCamelCase,
  TJSONArrayString,
  TJSONObjectString,
  TJSONDataString,
  TAbsoluteURL,
  TRGB,
  THexByteString,
  TInternalUrl,
} from '../../types';
import { isObject, isArray } from '../guards/reference';
import { isNumber } from '../guards/primitives';
import { isNonEmptyString } from '../guards/primitives';
import { REGEX_CONSTANTS } from '../../constants';
import { isUndefined } from './reference';
import { isClientSide } from '../validations';
import { isArrayOf } from './composite';

/** @see {@link PrimitiveTypeGuardsDocs.isCamelCase} */
export const isCamelCase: TTypeGuard<TCamelCase<string>> = (
  value,
): value is TCamelCase<string> =>
  typeof value === 'string' && REGEX_CONSTANTS.camelCase.test(value);

/** @see {@link PrimitiveTypeGuardsDocs.isHexString} */
export const isHexByteString: TTypeGuard<THexByteString> = (
  value: unknown,
  expectedLength?: number,
): value is THexByteString => {
  if (!isNonEmptyString(value)) return false;
  if (value.length % 2 !== 0) return false;
  if (!REGEX_CONSTANTS.hexString.test(value)) return false;
  if (!isUndefined(expectedLength) && value.length !== expectedLength)
    return false;
  return true;
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

/**  @see {@link CompositeTypeGuardsDocs.isValidUrl} */
export const isAbsoluteUrl: TTypeGuard<TAbsoluteURL> = (
  url: unknown,
): url is TAbsoluteURL => {
  if (!isNonEmptyString(url)) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const isInternalUrl: TTypeGuard<TInternalUrl> = (
  url: unknown,
): url is TInternalUrl => {
  if (!isClientSide() || !isNonEmptyString(url)) return false;
  if (url.startsWith('/')) return true;
  try {
    const parsed = new URL(url, location.origin);
    return parsed.hostname === location.hostname;
  } catch {
    return false;
  }
};

export const isRGBTuple: TTypeGuard<TRGB> = (input: unknown): input is TRGB => {
  return (
    isArray(input) &&
    input.length === 3 &&
    input.every((n) => isNumber(n) && n >= 0 && n <= 255)
  );
};

export const RefinedTypeGuards = {
  isCamelCase,
  isBufferLikeObject,
  isJSONArrayString,
  isJSONObjectString,
  isJsonString,
  isAbsoluteUrl,
  isInternalUrl,
  isRGBTuple,
} as const;
