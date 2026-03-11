import { TTypeGuard, TAnyFunction } from '../../types';

export const isNull: TTypeGuard<null> = <T>(term: T | null): term is null =>
  term === null;

export const isUndefined: TTypeGuard<undefined> = (value): value is undefined =>
  typeof value === 'undefined';

export const isDefined: TTypeGuard<unknown> = (
  value,
): value is NonNullable<unknown> => value !== null && value !== undefined;

export const isNil: TTypeGuard<null | undefined> = (
  value,
): value is null | undefined => value == null;

// export const isFunction: TTypeGuard<TAnyFunction> = <T extends TAnyFunction, U>(
//   term: T | U,
// ): term is T => typeof term === 'function';
export const isFunction: TTypeGuard<TAnyFunction> = (
  value: unknown,
): value is TAnyFunction => typeof value === 'function';

export const isObject: TTypeGuard<object> = <T extends object, U>(
  term: T | U,
): term is NonNullable<T> =>
  !isNull(term) && !isArray(term) && typeof term === 'object';

export const isArray: TTypeGuard<unknown[]> = <T, U>(
  term: Array<T> | U,
): term is Array<T> => Array.isArray(term);

export const isMap: TTypeGuard<Map<unknown, unknown>> = <K, V, U>(
  term: Map<K, V> | U,
): term is Map<K, V> => term instanceof Map;

export const isSet: TTypeGuard<Set<unknown>> = <T, U>(
  term: Set<T> | U,
): term is Set<T> => term instanceof Set;

/** @see {@link ReferenceTypeGuardsDocs.isWeakMap}  */
export const isWeakMap: TTypeGuard<WeakMap<object, unknown>> = <
  K extends object,
  V,
  U,
>(
  term: WeakMap<K, V> | U,
): term is WeakMap<K, V> => term instanceof WeakMap;

/** @see {@link ReferenceTypeGuardsDocs.isWeakSet}  */
export const isWeakSet: TTypeGuard<WeakSet<object>> = <T extends object, U>(
  term: WeakSet<T> | U,
): term is WeakSet<T> => term instanceof WeakSet;

export function isInstanceOf<T extends object, Args extends unknown[]>(
  value: unknown,
  constructor: new (...args: Args) => T,
): value is T {
  return value instanceof constructor;
}
/**
 * Type guards for reference-based values (objects, arrays, maps, etc.)
 * @see {@link GuardUtilsDocs.ReferenceTypeGuards}
 */
export const ReferenceTypeGuards = {
  isNull,
  isFunction,
  isObject,
  isArray,
  isMap,
  isSet,
  isWeakMap,
  isWeakSet,
  isNil,
  isUndefined,
  isDefined,
  isInstanceOf,
} as const;
