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

/**
 * Checks if the given value is an instance of `WeakMap`.
 *
 * A **WeakMap** is a special kind of `Map` where:
 * - **Keys must be objects** (not primitives)
 * - Keys are **held weakly**, meaning if there are no other references to the key object,
 *   it can be garbage-collected automatically
 * - It does **not** support iteration (`.keys()`, `.values()`, `.entries()` are not available)
 * - It is ideal for **storing private metadata** about objects without preventing cleanup
 *
 * 🧠 Useful for:
 * - Caching computed data for objects
 * - Associating data with DOM elements without memory leaks
 *
 * 📚 **Learn more:**
 * - [MDN — WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)
 *
 * @example
 * ```ts
 * const weakMap = new WeakMap<object, number>();
 * const obj = {};
 *
 * weakMap.set(obj, 42);
 *
 * ReferenceTypeGuards.isWeakMap(weakMap); // true
 * ReferenceTypeGuards.isWeakMap(new Map()); // false
 * ReferenceTypeGuards.isWeakMap({}); // false
 * ```
 */
export const isWeakMap: TTypeGuard<WeakMap<object, unknown>> = <
  K extends object,
  V,
  U,
>(
  term: WeakMap<K, V> | U,
): term is WeakMap<K, V> => term instanceof WeakMap;

/**
 * Checks if the given value is an instance of `WeakSet`.
 *
 * A **WeakSet** is a special kind of `Set` where:
 * - It can only store **object values** (no primitives)
 * - Objects are **held weakly**, meaning if there are no other references to an object,
 *   it can be garbage-collected automatically
 * - It is **not iterable** — you can’t get its contents or size
 * - Commonly used to track object presence without memory leaks
 *
 * 🧠 Useful for:
 * - Tracking which objects have been processed
 * - Marking objects as “seen” in caches or graph traversals
 *
 * 📚 **Learn more:**
 * - [MDN — WeakSet](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet)
 *
 * @example
 * ```ts
 * const weakSet = new WeakSet<object>();
 * const obj = {};
 *
 * weakSet.add(obj);
 *
 * ReferenceTypeGuards.isWeakSet(weakSet); // true
 * ReferenceTypeGuards.isWeakSet(new Set()); // false
 * ReferenceTypeGuards.isWeakSet([]); // false
 * ```
 */
export const isWeakSet: TTypeGuard<WeakSet<object>> = <T extends object, U>(
  term: WeakSet<T> | U,
): term is WeakSet<T> => term instanceof WeakSet;

export function isInstanceOf<T extends object, Args extends unknown[]>(
  value: unknown,
  constructor: new (...args: Args) => T,
): value is T {
  return value instanceof constructor;
}
