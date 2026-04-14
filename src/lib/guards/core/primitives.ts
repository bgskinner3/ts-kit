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

/**
 * Checks if the value is a bigint.
 *
 * @example
 * ```ts
 * PrimitiveTypeGuards.isBigInt(123n); // true
 * PrimitiveTypeGuards.isBigInt(123); // false
 * ```
 */
export const isBigInt: TTypeGuard<bigint> = (value): value is bigint =>
  typeof value === 'bigint';

/**
 * Checks whether a value is a `symbol`.
 *
 * In JavaScript, a `symbol` is a unique and immutable primitive value that can be used as a key
 * for object properties. Each symbol is guaranteed to be unique, even if two symbols have the same
 * description.
 *
 * Key points:
 * - Symbols are often used to add unique property keys to objects without risk of name collisions.
 * - `typeof value === 'symbol'` is used to check if a value is a symbol.
 *
 * @example
 * ```ts
 * const sym1 = Symbol('foo');
 * const sym2 = Symbol('foo');
 *
 * isSymbol(sym1); // true
 * isSymbol(sym2); // true
 * isSymbol('foo'); // false
 *
 * const obj = { [sym1]: 123 };
 * console.log(obj[sym1]); // 123
 * ```
 */
export const isSymbol: TTypeGuard<symbol> = (value): value is symbol =>
  typeof value === 'symbol';

export const isPrimitive = (
  value: unknown,
): value is string | number | boolean =>
  isString(value) || isNumber(value) || isBoolean(value) || isBigInt(value);
