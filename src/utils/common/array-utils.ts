import type { TFixedLengthArray } from '../../types';
import { exportAndRenameStaticMethods } from '../../managers';

/**
 * ## 🧩 Available Methods
 *
 * - `includes` — Type-safe `Array.includes` helper for union narrowing.
 * - `createFixedLengthArray` — Ensures arrays have a fixed compile-time length.
 * - `readAllItems` — Returns a shallow copy of an array.
 * - `map` — Type-safe wrapper around `Array.map`.
 * - `forEachUnion` — Handles arrays with union element types safely.
 * - `forEach` — Standard, type-safe `forEach` wrapper.
 * - `reduce` — Strictly typed reduction helper.
 * - `flat` — One-level flattening helper.
 * - `flatMap` — Safe flatMap alternative with strong typing.
 * - `filter` — Generic and narrowed type-safe filter.
 * - `filterNonNullable` — Removes nullish values safely.
 *
 * ---
 * @see {@link CommonUtilsDocs.ArrayUtils}
 */
class ArrayUtils {
  static includes<T extends U, U>(arr: ReadonlyArray<T>, el: U): el is T {
    return arr.includes(el as T);
  }
  static createFixedLengthArray<T>(
    items: T[],
    length: number,
  ): TFixedLengthArray<T[]> {
    if (items.length !== length) {
      throw new Error(`Array must have exactly ${length} elements`);
    }
    return items satisfies TFixedLengthArray<T[]>;
  }
  static readAllItems<T>(arr: ReadonlyArray<T>): T[] {
    return [...arr]; // Simply returns a shallow copy of the array
  }
  /** 🧠 Safe map wrapper with correct inference */
  static map<T, U>(
    arr: ReadonlyArray<T>,
    fn: (value: T, index: number, array: ReadonlyArray<T>) => U,
  ): U[] {
    return arr.map(fn);
  }
  /**
   * 🧠 Type-safe forEach for arrays that might be union types
   * Helps TypeScript narrow union members.
   *
   * @example
   * const arr: (A[] | B[] | C[]) = getArray();
   * ArrayUtils.forEachUnion(arr, (item) => {
   *   if (isA(item)) { ... }
   * });
   */
  static forEachUnion<T extends ReadonlyArray<any> | ReadonlyArray<any>[]>(
    arr: T,
    fn: (
      item: T extends ReadonlyArray<infer U> ? U : never,
      index: number,
    ) => void,
  ): void {
    // Flatten union arrays if needed
    const flatArr = ([] as any[]).concat(...(arr as any));
    flatArr.forEach(fn);
  }
  /** 🧠 Safe forEach wrapper with correct inference */
  static forEach<T>(
    arr: ReadonlyArray<T>,
    fn: (value: T, index: number, array: ReadonlyArray<T>) => void,
  ): void {
    arr.forEach(fn);
  }
  static reduce<T, U>(
    arr: ReadonlyArray<T>,
    fn: (
      accumulator: U,
      current: T,
      index: number,
      array: ReadonlyArray<T>,
    ) => U,
    initialValue: U,
  ): U {
    return arr.reduce(fn, initialValue);
  }
  /** 🧠 Type-safe flat for 1-level nested arrays */
  static flat<T>(arr: ReadonlyArray<T | T[]>): T[] {
    return arr.reduce<T[]>((acc, val) => acc.concat(val as T | T[]), []);
  }

  /** 🧠 Type-safe flatMap */
  static flatMap<T, U>(
    arr: ReadonlyArray<T>,
    fn: (item: T, index: number) => U | U[],
  ): U[] {
    return arr.reduce<U[]>((acc, item, i) => {
      const result = fn(item, i);
      return acc.concat(result as U[]);
    }, []);
  }

  /**
   * 🧠 Type-safe filter wrapper
   * Preserves TypeScript type inference.
   *
   * @example
   * const numbers: (number | null)[] = [1, 2, null, 4];
   * const validNumbers = ArrayUtils.filter(numbers, (n): n is number => n != null);
   */
  static filter<T, S extends T>(
    arr: ReadonlyArray<T>,
    predicate: (value: T, index: number, array: ReadonlyArray<T>) => value is S,
  ): S[];
  static filter<T>(
    arr: ReadonlyArray<T>,
    predicate: (value: T, index: number, array: ReadonlyArray<T>) => boolean,
  ): T[];
  static filter<T>(
    arr: ReadonlyArray<T>,
    predicate: (value: T, index: number, array: ReadonlyArray<T>) => boolean,
  ): T[] {
    return arr.filter(predicate);
  }
  /**
   * Shortcut for filtering out null or undefined values.
   */
  static filterNonNullable<T>(arr: ReadonlyArray<T | null | undefined>): T[] {
    return ArrayUtils.filter(arr, (item): item is T => item != null);
  }
}

//
// 🔄 HYBRID EXPORT PATTERN — ArrayUtils
// -----------------------------------------------------------------------------
// Purpose:
// This pattern exposes both the organized utility class (`ArrayUtils`) and
// individually tree-shakable function exports (like `arrayMap`, `arrayFilter`, etc.).
//
// ✅ Why:
// - Developers can import *just what they need* for better bundle optimization.
// - Retains full class form (`ArrayUtils`) for grouped documentation or organized access.
// - Maintains type safety and clear naming via consistent prefixes (e.g. `arrayMap`).
//
// 🧱 Structure:
// 1. `ArrayUtils` — full static utility class (namespaced usage).
// 2. `RenamedArrayMethods` — plain object with all renamed, bound statics.
// 3. Individual tree-shakable exports — destructured for direct imports.
//
// 💡 Example Usage:
// ```ts
// // Import only what you need (tree-shakable)
// import { arrayMap, arrayFilter } from '@/utils';
//
// const doubled = arrayMap([1, 2, 3], n => n * 2);
// const clean = arrayFilter(doubled, n => n > 2);
//
// // Or use grouped access
// import { RenamedArrayMethods } from '@/utils';
// RenamedArrayMethods.arrayMap([1, 2, 3], n => n * 2);
//
// // Or access via the class itself
// import { ArrayUtils } from '@/utils';
// ArrayUtils.map([1, 2, 3], n => n * 2);
// ```
// -----------------------------------------------------------------------------

export const RenamedArrayMethods = exportAndRenameStaticMethods(ArrayUtils, {
  arrayIncludes: 'includes',
  arrayMap: 'map',
  arrayFilter: 'filter',
  arrayFlat: 'flat',
  arrayReduce: 'reduce',
  arrayForEach: 'forEach',
  arrayFlatMap: 'flatMap',
  arrayFilterNonNullable: 'filterNonNullable',
});

// Directly export the destructured functions for tree-shaking
export const {
  arrayMap,
  arrayFilter,
  arrayIncludes,
  arrayReduce,
  arrayFlat,
  arrayFlatMap,
  arrayForEach,
  arrayFilterNonNullable,
} = RenamedArrayMethods;

// Export the full class if needed
export { ArrayUtils };
