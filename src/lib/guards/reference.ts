import { TTypeGuard, TAnyFunction } from '../../types';
import type { Ref, RefObject } from 'react';

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

export const isFunction: TTypeGuard<TAnyFunction> = <T extends TAnyFunction, U>(
  term: T | U,
): term is T => typeof term === 'function';

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

export const isRef = <T>(value: unknown): value is Ref<T> =>
  isDefined(value) &&
  (isFunction(value) || (isObject(value) && 'current' in value));

export const isRefObject = <T>(ref: Ref<T>): ref is RefObject<T | null> =>
  !isNull(ref) && isObject(ref) && 'current' in ref;

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
  isRef,
  isRefObject,
} as const;
