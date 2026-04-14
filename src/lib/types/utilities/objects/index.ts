import type { TPrettify } from '../../primitives';
/**
 * @utilType type
 * @name TDeepMap
 * @category Types Object
 * @description Recursively traverses a data structure and replaces all occurrences of one type with another.
 * @link #tdeepmap
 *
 * ## 🌳 TDeepMap — Recursive Type Transformation
 *
 * Deeply traverses an object, interface, or array and replaces all
 * occurrences of one type (`From`) with another (`To`).
 *
 * @template T - The structure to traverse.
 * @template From - The type to find.
 * @template To - The type to replace it with.
 */
type TDeepMap<T, From, To> = T extends From
  ? To
  : T extends (infer U)[]
    ? TDeepMap<U, From, To>[]
    : T extends Record<string, unknown>
      ? { [K in keyof T]: TDeepMap<T[K], From, To> }
      : T;

/**
 * @utilType type
 * @name TDeepWriteable
 * @category Types Object
 * @description Recursively removes the 'readonly' modifier from all properties, including nested objects and arrays.
 * @link #tdeepwriteable
 *
 * ## ✏️ TDeepWriteable — Recursive Mutability Utility
 *
 * Converts a deeply immutable type into a mutable one. It handles nested
 * objects, arrays, and preserves specialized types like Dates and RegExps.
 *
 * @template T - The type to make mutable.
 */
type TDeepWriteable<T> = T extends (...args: never[]) => unknown
  ? T
  : T extends Date | RegExp
    ? T
    : T extends object // Move object check above ReadonlyArray
      ? { -readonly [K in keyof T]: TDeepWriteable<T[K]> }
      : T;
/**
 * @utilType type
 * @name TDeepBigIntToNumber
 * @category Types Object
 * @description Specialized deep mapper that converts all bigint types to number for JSON serialization safety.
 * @link #tdeepbiginttonumber
 *
 * ## 🔄 TDeepBigIntToNumber — Recursive BigInt Normalization
 *
 * Traverses a structure and maps all `bigint` types to `number`. This is
 * essential for preparing database results for `JSON.stringify()` or
 * frontend consumption.
 *
 * @template T - The structure to normalize.
 */
type TDeepBigIntToNumber<T> = T extends bigint
  ? number
  : T extends (infer U)[]
    ? Array<TDeepBigIntToNumber<U>>
    : T extends object
      ? { [K in keyof T]: TDeepBigIntToNumber<T[K]> }
      : T;
/**
 * @utilType type
 * @name TRecursivePartial
 * @category Types Object
 * @description Recursively makes every property in an object, including nested structures and arrays, optional.
 * @link #trecursivepartial
 *
 * ## 🧩 TRecursivePartial — Deep Optional Utility
 *
 * Makes every property in an object—and all nested objects/arrays—optional.
 * Ideal for defining partial updates for complex state trees or configuration overrides.
 */
type TRecursivePartial<T> = T extends (...args: never[]) => unknown
  ? T
  : T extends Array<infer U>
    ? Array<TRecursivePartial<U>>
    : T extends object
      ? { [P in keyof T]?: TRecursivePartial<T[P]> }
      : T;
/**
 * @utilType type
 * @name TRecursiveRequired
 * @category Types Object
 * @description Recursively removes the optional '?' modifier from every property level, ensuring the structure is fully populated.
 * @link #trecursiverequired
 *
 * ## 🔒 TRecursiveRequired — Deep Requirement Utility
 *
 * The inverse of TRecursivePartial. It ensures the entire structure is fully
 * populated while safely bypassing functions to avoid breaking method signatures.
 */
type TRecursiveRequired<T> = T extends (...args: never[]) => unknown
  ? T
  : T extends Array<infer U>
    ? Array<TRecursiveRequired<U>>
    : T extends object
      ? { [K in keyof T]-?: TRecursiveRequired<T[K]> }
      : T;

/**
 * @utilType type
 * @name TRecursiveReadonly
 * @category Types Object
 * @description Recursively applies the 'readonly' modifier to every property of an object and its children.
 * @link #trecursivereadonly
 *
 * ## 🛡️ TRecursiveReadonly — Deep Immutability Utility
 *
 * Recursively applies the 'readonly' modifier to every property of an object,
 * including nested objects and arrays, ensuring the entire structure is immutable.
 */
type TRecursiveReadonly<T> = T extends (...args: unknown[]) => unknown
  ? T
  : T extends Array<infer U>
    ? ReadonlyArray<TRecursiveReadonly<U>>
    : T extends object
      ? { readonly [K in keyof T]: TRecursiveReadonly<T[K]> }
      : T;

/**
 * @utilType type
 * @name TNonNullableDeep
 * @category Types Logic
 * @description Recursively removes 'null' and 'undefined' from every property in an object tree.
 * @link #tnonnullabledeep
 *
 * ## 🧹 TNonNullableDeep — Strict Null-Removal Utility
 *
 * Traverses an object tree and removes 'null' and 'undefined'. This also forces
 * optional properties to be required and defined.
 */
type TNonNullableDeep<T> = TPrettify<{
  // The '-?' ensures optional properties are made required AND non-nullable
  [P in keyof T]-?: NonNullable<T[P]> extends object
    ? TNonNullableDeep<NonNullable<T[P]>>
    : NonNullable<T[P]>;
}>;

/**
 * @utilType type
 * @name TNormalizeValue
 * @category Types Logic
 * @description Recursively converts all bigint values into numbers to prepare structures for JSON serialization.
 * @link #tnormalizevalue
 *
 * ## 🔄 TNormalizeValue — Recursive BigInt-to-Number Normalizer
 *
 * Deeply traverses an input structure and converts all `bigint` values into `number`.
 * Critical for preventing TypeErrors during `JSON.stringify`.
 */
type TNormalizeValue<T> = T extends bigint
  ? number
  : T extends Date | RegExp | ((...args: never[]) => unknown)
    ? T
    : T extends object // This handles both Tuples and Objects correctly
      ? { [K in keyof T]: TNormalizeValue<T[K]> }
      : T;

/**
 * @utilType type
 * @name TNormalizedBigIntToNumber
 * @category Types Logic
 * @description Internal mapped type helper that applies TNormalizeValue recursively across object keys.
 * @link #tnormalizedbiginttonumber
 *
 * ## 🛠️ TNormalizedBigIntToNumber — Mapped Normalization Helper
 *
 * A supporting mapped type that applies `TNormalizeValue` recursively across
 * all keys of an object.
 *
 * @note This is an internal structural helper for `TNormalizeValue`. Use
 * `TNormalizeValue` as the primary entry point for general data structures.
 *
 * @template T - The object structure to iterate over.
 */
type TNormalizedBigIntToNumber<T> = {
  [K in keyof T]: TNormalizeValue<T[K]>;
};
export type {
  TNonNullableDeep,
  TRecursivePartial,
  TRecursiveRequired,
  TRecursiveReadonly,
  TDeepWriteable,
  TDeepMap,
  TDeepBigIntToNumber,
  TNormalizeValue,
  TNormalizedBigIntToNumber,
};
