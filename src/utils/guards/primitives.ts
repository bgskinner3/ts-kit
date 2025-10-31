import { TTypeGuard, TCamelCase } from '../../types';
import { REGEX_CONSTANTS } from '../../constants';
import { isUndefined } from './reference';

export const isNumber: TTypeGuard<number> = (value): value is number =>
  typeof value === 'number' && !Number.isNaN(value) && Number.isFinite(value);

export const isInteger: TTypeGuard<number> = (value): value is number =>
  Number.isInteger(value);

export const isString: TTypeGuard<string> = (value): value is string =>
  typeof value === 'string';

export const isNonEmptyString: TTypeGuard<string> = (value): value is string =>
  typeof value === 'string' && value.trim().length > 0;

export const isBoolean: TTypeGuard<boolean> = (value): value is boolean =>
  typeof value === 'boolean';

/** @see {@link PrimitiveTypeGuardsDocs.isBigInt}  */
export const isBigInt: TTypeGuard<bigint> = (value): value is bigint =>
  typeof value === 'bigint';

/** @see {@link PrimitiveTypeGuardsDocs.isSymbol}  */
export const isSymbol: TTypeGuard<symbol> = (value): value is symbol =>
  typeof value === 'symbol';

/** @see {@link PrimitiveTypeGuardsDocs.isOneOf}  */
export const isOneOf =
  <T extends readonly (string | number | boolean)[]>(
    allowed: T,
  ): TTypeGuard<T[number]> =>
  (value: unknown): value is T[number] => {
    const type = typeof value;
    if (type !== 'string' && type !== 'number' && type !== 'boolean')
      return false;
    return allowed.includes(value as T[number]);
  };

/** @see {@link PrimitiveTypeGuardsDocs.isCamelCase} */
export const isCamelCase: TTypeGuard<TCamelCase<string>> = (
  value,
): value is TCamelCase<string> =>
  typeof value === 'string' && REGEX_CONSTANTS.camelCase.test(value);

/** @see {@link PrimitiveTypeGuardsDocs.isHexString} */
export const isHexString: TTypeGuard<string> = (
  value: unknown,
  expectedLength?: number,
): value is string => {
  if (!isNonEmptyString(value)) return false;
  if (value.length % 2 !== 0) return false;
  if (!REGEX_CONSTANTS.hexString.test(value)) return false;
  if (!isUndefined(expectedLength) && value.length !== expectedLength)
    return false;
  return true;
};

/** @see {@link PrimitiveTypeGuardsDocs.isJsonString} */
export const isJsonString: TTypeGuard<string> = (
  value: unknown,
): value is string => {
  if (!isNonEmptyString(value)) return false;

  try {
    JSON.parse(value);
    return true;
  } catch {
    return false;
  }
};

/**
 * Type guards for primitive types (string, number, boolean, etc.)
 * @see {@link ValidationUtilsDocs.PrimitiveTypeGuards}
 */
export const PrimitiveTypeGuards = {
  isNumber,
  isInteger,
  isString,
  isNonEmptyString,
  isBoolean,
  isBigInt,
  isSymbol,
  isOneOf,
  isCamelCase,
  isHexString,
  isJsonString,
} as const;
