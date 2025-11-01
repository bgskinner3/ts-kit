import { TTypeGuard } from '../../types';

export const isNumber: TTypeGuard<number> = (value): value is number =>
  typeof value === 'number' && !Number.isNaN(value) && Number.isFinite(value);

export const isInteger: TTypeGuard<number> = (value): value is number =>
  Number.isInteger(value);

export const isString: TTypeGuard<string> = (value): value is string =>
  typeof value === 'string';

export const isNonEmptyString: TTypeGuard<string> = (value): value is string =>
  typeof value === 'string' && value.length > 0 && value.trim().length > 0;

export const isBoolean: TTypeGuard<boolean> = (value): value is boolean =>
  typeof value === 'boolean';

/** @see {@link PrimitiveTypeGuardsDocs.isBigInt}  */
export const isBigInt: TTypeGuard<bigint> = (value): value is bigint =>
  typeof value === 'bigint';

/** @see {@link PrimitiveTypeGuardsDocs.isSymbol}  */
export const isSymbol: TTypeGuard<symbol> = (value): value is symbol =>
  typeof value === 'symbol';

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
} as const;
