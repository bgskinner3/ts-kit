import type { TTypeGuard, TBufferLikeObject, TRGB } from '../../../types';
import { isNumber, isNonEmptyString, isString } from './primitives';
import { REGEX_CONSTANTS } from '../../../constants';
import { isObject, isArray } from './reference';
import { isArrayOf } from './composite';

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
