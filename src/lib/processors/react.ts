import type { Ref, RefCallback } from 'react';
import { isFunction, isRef, isRefObject, isString } from '../guards';
import { ArrayUtils, ObjectUtils } from '../common';

/**
 * Combines multiple React refs (callback refs or object refs) into a single ref callback.
 *
 * This is especially useful when a component needs to:
 * 1. Forward a ref to its parent via `forwardRef`
 * 2. Maintain its own internal ref for hooks like `useInView`, animations, or measurements
 *
 * The returned callback handles both:
 * - Function refs (calls the function with the new value)
 * - Object refs (assigns the `current` property)
 * - Properly supports `null` for unmounting
 *
 * @example
 * ```ts
 * const combinedRef = mergeRefs(forwardedRef, internalRef);
 * <div ref={combinedRef} />
 * ```
 *
 * @param refs - One or more React refs (callback or object refs)
 * @returns A single callback that updates all provided refs with the same value
 */
export const mergeRefs = <T>(
  ...refs: (Ref<T> | undefined)[]
): RefCallback<T> => {
  const validRefs = ArrayUtils.filter<Ref<T> | undefined, Ref<T>>(refs, isRef);

  return (value: T | null) => {
    for (const ref of validRefs) {
      if (isFunction(ref)) {
        ref(value);
      } else if (isRefObject(ref)) {
        ref.current = value;
      }
    }
  };
};

/**
 * Lazily evaluates the properties of an object that are functions and caches the results.
 *
 * This utility is useful when you have an object with expensive-to-compute properties
 * (functions) that you don’t want to execute until they are actually accessed. It also
 * ensures that each property is only computed **once**, even if accessed multiple times.
 *
 * The original object is **not mutated**; all computed results are stored in an internal cache.
 *
 * ### Features
 * - Lazy evaluation of function properties.
 * - Caches results for repeated access.
 * - Safe for shared or frozen objects.
 * - Works only on original string keys of the object.
 *
 * ### Example
 * ```ts
 * const config = {
 *   a: 10,
 *   b: () => Math.random() * 100,
 *   c: () => 'computed',
 * };
 *
 * const lazyConfig = lazyProxy(config);
 *
 * console.log(lazyConfig.a); // 10
 * console.log(lazyConfig.b); // e.g., 42.3 (evaluated only once)
 * console.log(lazyConfig.b); // same value as above (cached)
 * console.log(lazyConfig.c); // 'computed'
 * ```
 *
 * ### Use Cases
 * - Configuration objects with expensive default values.
 * - Large objects where some properties are rarely used.
 * - Avoiding repeated computation in utility objects or library settings.
 * - Safe lazy initialization in complex apps without mutating original objects.
 *
 * @param obj - The object whose function properties should be lazily evaluated.
 * @returns A proxied version of the object where function properties are evaluated lazily and cached.
 */
export function lazyProxy<T extends Record<string, unknown>>(obj: T): T {
  const cache = new Map<keyof T, unknown>();
  const keys = new Set<keyof T>(ObjectUtils.keys(obj));

  return new Proxy(obj, {
    get(target, prop: keyof T | string | symbol, receiver: T) {
      if (!isString(prop) || !keys.has(prop as keyof T)) {
        return Reflect.get(target, prop, receiver);
      }
      // Return cached value if already resolved
      if (cache.has(prop as keyof T)) {
        return cache.get(prop as keyof T);
      }

      const value = target[prop as keyof T];

      if (isFunction(value)) {
        const result = value();
        cache.set(prop as keyof T, result);
        return result;
      }
      return value;
    },
  });
}


