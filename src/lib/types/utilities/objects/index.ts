import type { TPrettify } from '../../primitives';
/**
 * TDeepMap: Recursive Type Transformation Utility
 *
 * Deeply traverses an object, interface, or array and replaces all
 * occurrences of one type (From) with another (To).
 *
 * @template T - The data structure to traverse (Object, Array, or Primitive)
 * @template From - The type to search for (e.g., bigint)
 * @template To - The type to replace it with (e.g., number)
 *
 * @example
 * interface TApiResponse {
 *   id: string;
 *   balance: bigint;
 *   history: { amount: bigint; timestamp: number }[];
 *   metadata: { supply: { total: bigint; circulating: bigint } };
 * }
 *
 * // Recursively convert every bigint in the response to a number for frontend use
 * type TNormalizedResponse = TDeepMap<TApiResponse, bigint, number>;
 *
 * // Resulting shape:
 * // {
 * //   id: string;
 * //   balance: number;
 * //   history: { amount: number; timestamp: number }[];
 * //   metadata: { supply: { total: number; circulating: number } };
 * // }
 */
type TDeepMap<T, From, To> = T extends From
  ? To
  : T extends (infer U)[]
    ? TDeepMap<U, From, To>[]
    : T extends Record<string, unknown>
      ? { [K in keyof T]: TDeepMap<T[K], From, To> }
      : T;

/**
 * TDeepWriteable: Recursive Mutability Utility
 *
 * Removes the 'readonly' modifier from all properties within an object,
 * including nested objects and arrays. It effectively converts a
 * deeply immutable type into a mutable one.
 *
 * @template T - The type to make mutable
 *
 * @example
 * interface ImmutableUser {
 *   readonly id: string;
 *   readonly profile: { readonly bio: string };
 * }
 *
 * // Result: { id: string; profile: { bio: string } }
 * type MutableUser = TDeepWriteable<ImmutableUser>;
 */
type TDeepWriteable<T> = T extends (...args: never[]) => unknown
  ? T
  : T extends Date | RegExp
    ? T
    : T extends object // Move object check above ReadonlyArray
      ? { -readonly [K in keyof T]: TDeepWriteable<T[K]> }
      : T;
/**
 * TDeepBigIntToNumber — Recursive BigInt Normalization
 *
 * Traverses a data structure and maps all `bigint` types to `number`.
 *
 * Since the JSON specification does not support BigInt, this utility is
 * essential for preparing data for `JSON.stringify()`, network transmission,
 * or frontend consumption where `number` is the expected primitive.
 *
 * @template T - The structure (Object, Array, or Primitive) to normalize
 *
 * @example
 * type DBResult = { id: bigint; tags: bigint[]; metadata: { size: bigint } };
 *
 * // Result: { id: number; tags: number[]; metadata: { size: number } }
 * type APIPayload = TDeepBigIntToNumber<DBResult>;
 */
type TDeepBigIntToNumber<T> = T extends bigint
  ? number
  : T extends (infer U)[]
    ? Array<TDeepBigIntToNumber<U>>
    : T extends object
      ? { [K in keyof T]: TDeepBigIntToNumber<T[K]> }
      : T;
/**
 * TRecursivePartial: Deep Optional Utility
 *
 * Makes every property in an object—and all nested objects/arrays—optional.
 * This is ideal for defining partial updates for complex state trees or
 * configuration overrides.
 *
 * @template T - The source interface or type
 *
 * @example
 * interface AppConfig {
 *   theme: { colors: { primary: string; secondary: string } };
 *   enabled: boolean;
 * }
 *
 * // Result: { theme?: { colors?: { primary?: string; secondary?: string } }; enabled?: boolean }
 * type PartialConfig = TRecursivePartial<AppConfig>;
 */
type TRecursivePartial<T> = T extends (...args: never[]) => unknown
  ? T
  : T extends Array<infer U>
    ? Array<TRecursivePartial<U>>
    : T extends object
      ? { [P in keyof T]?: TRecursivePartial<T[P]> }
      : T;
/**
 * TRecursiveRequired: Deep Requirement Utility
 *
 * The inverse of TRecursivePartial. It recursively removes the optional ('?')
 * modifier from every property level, ensuring the entire structure is fully
 * populated. It safely bypasses functions to avoid breaking method signatures.
 *
 * @template T - The type containing optional properties
 *
 * @example
 * interface UserProfile {
 *   name?: string;
 *   settings?: { notifications?: boolean };
 * }
 *
 * // Result: { name: string; settings: { notifications: boolean } }
 * type StrictProfile = TRecursiveRequired<UserProfile>;
 */

type TRecursiveRequired<T> = T extends (...args: never[]) => unknown
  ? T
  : T extends Array<infer U>
    ? Array<TRecursiveRequired<U>>
    : T extends object
      ? { [K in keyof T]-?: TRecursiveRequired<T[K]> }
      : T;

/**
 * TRecursiveReadonly: Deep Immutability Utility
 *
 * Recursively applies the 'readonly' modifier to every property of an object,
 * including nested objects and arrays. It ensures that the entire data
 * structure becomes immutable. Functions are preserved as-is.
 *
 * @template T - The type to make recursively readonly
 *
 * @example
 * interface User {
 *   id: number;
 *   profile: { bio: string };
 *   tags: string[];
 * }
 *
 * // Result: { readonly id: number; readonly profile: { readonly bio: string }; readonly tags: ReadonlyArray<string> }
 * type ReadonlyUser = TRecursiveReadonly<User>;
 */
type TRecursiveReadonly<T> = T extends (...args: unknown[]) => unknown
  ? T
  : T extends Array<infer U>
    ? ReadonlyArray<TRecursiveReadonly<U>>
    : T extends object
      ? { readonly [K in keyof T]: TRecursiveReadonly<T[K]> }
      : T;

/**
 * TNonNullableDeep: Strict Null-Removal Utility
 *
 * Traverses an object tree and removes 'null' and 'undefined' from every
 * property value. This is useful for sanitizing API responses or
 * ensuring a data structure is fully initialized before use.
 *
 * @template T - The type containing nullable or undefined values
 *
 * @example
 * interface APIResponse {
 *   data: { id: string | null; meta?: { count: number | undefined } };
 * }
 *
 * // Result: { data: { id: string; meta: { count: number } } }
 * type CleanResponse = TNonNullableDeep<APIResponse>;
 */
// type TNonNullableDeep<T> = {
//   [P in keyof T]: NonNullable<T[P]> extends object
//     ? TNonNullableDeep<NonNullable<T[P]>>
//     : NonNullable<T[P]>;
// };
type TNonNullableDeep<T> = TPrettify<{
  // The '-?' ensures optional properties are made required AND non-nullable
  [P in keyof T]-?: NonNullable<T[P]> extends object
    ? TNonNullableDeep<NonNullable<T[P]>>
    : NonNullable<T[P]>;
}>;

/**
 * TNormalizeValue — Recursive BigInt-to-Number Normalizer
 *
 * Deeply traverses an input structure and converts all `bigint` values into `number`.
 *
 * This utility is critical for "Stage-2" data preparation before JSON serialization,
 * as the standard `JSON.stringify` will throw a TypeError when encountering BigInts.
 *
 * @template T - The structure (Primitive, Array, or Object) to normalize.
 *
 * @example
 * type RawStats = { count: bigint; history: bigint[]; metadata: { id: bigint } };
 *
 * // Result: { count: number; history: number[]; metadata: { id: number } }
 * type SerializedStats = TNormalizeValue<RawStats>;
 */
type TNormalizeValue<T> = T extends bigint
  ? number
  : T extends Date | RegExp | ((...args: never[]) => unknown)
    ? T
    : T extends object // This handles both Tuples and Objects correctly
      ? { [K in keyof T]: TNormalizeValue<T[K]> }
      : T;

/**
 * TNormalizedBigIntToNumber — Mapped Object Normalization
 *
 * A supporting mapped type that applies `TNormalizeValue` recursively across
 * all keys of an object.
 *
 * @template T - The object structure to iterate over.
 *
 * @note This is an internal structural helper for `TNormalizeValue`. Use
 * `TNormalizeValue` as the primary entry point for general data structures.
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
