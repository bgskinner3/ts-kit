import type { TTypeGuard } from '../../../types';
import { isObject, isUndefined, isDefined } from './reference';
import { isBoolean, isNumber, isSymbol, isString } from './primitives';
import { ObjectUtils } from '../../common/object';

/**
 * ## 🧩 isInArray — Type Guard Factory for Array Membership
 *
 * Creates a **type guard** that checks whether a value exists in a given array.
 * Internally, it uses a `Set` for **O(1) lookup**, making repeated checks more efficient.
 *
 * ---
 *
 * ### ⚙️ Core Purpose
 * - 🔹 Verify that a value is included in a predefined array of allowed values.
 * - 🔹 Provide a **TypeScript type guard** so that the compiler can narrow types.
 * - 🔹 Optimized for repeated checks by creating a `Set` once per factory call.
 *
 * ---
 *
 * ### 📘 Example Usage
 * ```ts
 * // Store the returned type guard for repeated checks
 * const isAllowedColor = isInArray(['red', 'green', 'blue'] as const);
 * isAllowedColor('red');   // true
 * isAllowedColor('yellow'); // false
 *
 * const isAllowedNumber = isInArray([1, 2, 3] as const);
 * isAllowedNumber(2); // true
 * isAllowedNumber(4); // false
 *
 * // Or invoke inline without storing the guard
 * isInArray(['red', 'green', 'blue'] as const)('green'); // true
 * ```
 *
 *
 * ---
 *
 * ### 📌 Notes
 * - This is a **factory function**: you first pass the array, then use the returned function as a type guard.
 * - The returned guard checks for `undefined` and only returns `true` if the value exists in the array.
 * - Use this guard when you need **repeated membership checks** on a fixed array of values.
 *
 * @typeParam T - The type of elements in the target array.
 * @param target - The array of allowed values.
 * @returns A type guard function that narrows `unknown` to `T | undefined`.
 */
export const isInArray = <T>(target: readonly T[]): TTypeGuard<T> => {
  const set = new Set(target);
  return (value: unknown): value is T =>
    // If it's undefined and not in your set, it returns false.
    // This correctly fails a "Required" field check.
    set.has(value as T);
};
/**
 const isInArrayDep = <T>(
  target: readonly T[],
): TTypeGuard<T | undefined> => {
  const set = new Set(target);
  return (value: unknown): value is T | undefined =>
    !isUndefined(value) && set.has(value as T);
};
 */
/**
 * Checks whether a value is a valid key of a given object.
 *
 * This function returns a **TypeScript type guard**, allowing you to safely
 * access object properties with dynamic keys while retaining full type safety.
 *
 * Key points:
 * - Works with `string`, `number`, and `symbol` keys.
 * - Returns a type guard `(key: unknown) => key is keyof T`.
 * - Useful for runtime checks before accessing object properties dynamically.
 *
 * @typeParam T - The type of the target object.
 * @param obj - The object whose keys should be checked against.
 * @param key - The value to check if it is a valid key of `obj`.
 * @returns `true` if `key` exists in `obj`; otherwise `false`.
 *
 * @example
 * ```ts
 * const user = { id: 1, name: 'Alice', email: 'alice@example.com' };
 *
 * isKeyOfObject(user, 'name');     // true  ✅ 'name' is a valid key
 * isKeyOfObject(user, 'password'); // false ❌ 'password' is not a valid key
 * ```
 */
export const isKeyOfObject =
  <T extends object>(obj: T): TTypeGuard<keyof T> =>
  (key: unknown): key is keyof T =>
    (isString(key) || isNumber(key) || isSymbol(key)) && key in obj;

/**
 * Type guard that checks whether a given unknown value is an object
 * and contains a specific property key.
 *
 * Unlike `isKeyOfObject(obj)(key)` which only narrows the *key* type,
 * this guard narrows the *object* itself. After calling this function,
 * TypeScript knows that:
 *
 *   - `obj` is a non-null object
 *   - `obj` contains the property `key`
 *   - you can safely access `obj[key]`
 *
 * This is the preferred guard to use when you need to safely access
 * dynamic or unknown object properties, such as when validating
 * external or untyped data (e.g., errors from Supabase or fetch APIs).
 *
 * @example
 * if (isKeyInObject("message")(err)) {
 *   console.log(err.message); // fully typed and safe
 * }
 *
 * @param key - The property key to check for.
 * @returns A type guard that checks if an unknown value is an object
 *          containing the specified key.
 */
export const isKeyInObject =
  <K extends PropertyKey>(key: K) =>
  (obj: unknown): obj is Record<K, unknown> =>
    isObject(obj) && key in obj;

/**
 * ## 🧩 isKeyOfArray — Type Guard for Allowed Primitive Keys
 *
 * Checks if a value is one of the keys in a given readonly array of allowed keys.
 * This is a **type-safe type guard** for primitive keys (`string | number | symbol`)
 * that exist in a known array. It is useful for narrowing a value to a specific set
 * of literal keys at runtime.
 *
 * ---
 *
 * ### ⚙️ Core Purpose
 * - 🔹 Only works with **primitive keys**: `string`, `number`, or `symbol`.
 * - 🔹 Returns a **TypeScript type guard** (`key is T[number]`) for type inference.
 * - 🔹 Uses `Array.includes` to check for membership in the allowed keys array.
 *
 * ---
 *
 * ### 📘 Example Usage
 * ```ts
 * const allowedKeys = ['id', 'name', 'age'] as const;
 * const key: unknown = 'name';
 *
 * if (isKeyOfArray(allowedKeys)(key)) {
 *   // ✅ TypeScript now knows `key` is 'id' | 'name' | 'age'
 *   console.log(key); // 'name'
 * }
 *
 * const invalidKey: unknown = 'email';
 * isKeyOfArray(allowedKeys)(invalidKey); // false
 *
 * // Inline usage
 * isKeyOfArray(['x', 'y', 'z'] as const)('x'); // true
 * isKeyOfArray(['x', 'y', 'z'] as const)('a'); // false
 * ```
 *
 * ---
 *
 * @typeParam T - A readonly tuple or array of allowed keys.
 * @param keys - The array of valid keys.
 * @returns A type guard function that returns `true` if the value is included in `keys`.
 */
export const isKeyOfArray =
  <T extends readonly (string | number | symbol)[]>(
    keys: T,
  ): TTypeGuard<T[number]> =>
  (key: unknown): key is T[number] =>
    (isString(key) || isNumber(key) || isSymbol(key) || isBoolean(key)) &&
    keys.includes(key as T[number]);

/**
 * ## 🧩 isArrayOf — Type Guard for Arrays of Specific Types
 *
 * Checks if a value is an array where **all elements satisfy a given type guard**.
 * This allows TypeScript to narrow types safely and perform runtime validation.
 *
 * ---
 *
 * ### ⚙️ Core Purpose
 * - 🔹 Verify that a value is an array.
 * - 🔹 Ensure that **every element** matches a specific type guard.
 * - 🔹 Enable **type-safe operations** on arrays after the check.
 *
 * ---
 *
 * ### 📘 Example Usage
 * ```ts
 * import { isArrayOf, isNumber, isString } from '@/utils/guards/composite';
 *
 * const arr1: unknown = [1, 2, 3];
 * if (isArrayOf(isNumber, arr1)) {
 *   // ✅ arr1 is now typed as number[]
 *   const sum = arr1.reduce((a, b) => a + b, 0);
 * }
 *
 * const arr2: unknown = ['a', 'b', 3];
 * isArrayOf(isString, arr2); // false
 * ```
 *
 * ---
 *
 * ### 📌 Notes
 * - The **type guard is passed as a parameter**, making this function highly composable.
 * - Use for arrays of primitives or arrays of objects validated by another type guard.
 *
 * @typeParam T - Type of array elements.
 * @param typeGuard - Type guard function for the array elements.
 * @param value - Value to validate.
 * @returns `true` if `value` is an array and all elements pass the type guard.
 */
export const isArrayOf = <T>(
  typeGuard: TTypeGuard<T>,
  value: unknown,
): value is T[] => Array.isArray(value) && value.every(typeGuard);

/**
 * ## 🧩 isRecordOf — Type Guard for Objects with Uniform Value Types
 *
 * Checks if a value is an object where **all property values satisfy a given type guard**.
 * Useful for ensuring that a record has uniform value types and for type-safe access.
 *
 * ---
 *
 * ### ⚙️ Core Purpose
 * - 🔹 Verify that a value is an object (non-null).
 * - 🔹 Ensure that every property value passes a provided type guard.
 * - 🔹 Enable **type-safe operations** on objects with consistent value types.
 *
 * ---
 *
 * ### 📘 Example Usage
 * ```ts
 * import { isRecordOf, isNumber, isBoolean } from '@/utils/guards/composite';
 *
 * const obj1: unknown = { a: 1, b: 2 };
 * if (isRecordOf(obj1, isNumber)) {
 *   // ✅ obj1 is now typed as Record<string, number>
 *   const sum = Object.values(obj1).reduce((a, b) => a + b, 0);
 * }
 *
 * const obj2: unknown = { a: 1, b: '2' };
 * isRecordOf(obj2, isNumber); // false
 *
 * const obj3: unknown = { foo: true, bar: false };
 * isRecordOf(obj3, isBoolean); // true
 * ```
 *
 * ---
 *
 * ### 📌 Notes
 * - Works only with **plain objects** (non-null) and string keys.
 * - Supports composability by accepting any type guard for property values.
 *
 * @typeParam V - Type of the values in the record.
 * @param value - Value to check.
 * @param typeGuard - Type guard function applied to each property value.
 * @returns `true` if `value` is an object and all property values pass the type guard.
 */
export const isRecordOf = <V>(
  value: unknown,
  typeGuard: TTypeGuard<V>,
): value is Record<string, V> =>
  isObject(value) && ObjectUtils.values(value).every(typeGuard);
/**
 * ## 🔑 hasDefinedKeys — Type Guard Factory for Required Object Properties
 *
 * Creates a type guard that ensures an object contains a specific set of **required keys**
 * and that their values are **defined** (not `undefined`).
 *
 * ---
 *
 * ### ⚙️ Core Purpose
 * - 🔹 Validate that an object implements a specific interface or shape.
 * - 🔹 Ensure critical properties exist and are not `undefined`.
 * - 🔹 Narrow an `unknown` object to a specific type `T` for safe property access.
 *
 * ---
 *
 * ### 📘 Example Usage
 * ```ts
 * import { hasDefinedKeys } from '@/utils/guards/composite';
 *
 * interface User { id: string; name: string; age?: number; }
 *
 * // Create a guard for required fields
 * const isUser = hasDefinedKeys<User>(['id', 'name']);
 *
 * const data: unknown = { id: 'u1', name: 'Alice' };
 *
 * if (isUser(data)) {
 *   // ✅ data is now typed as User
 *   console.log(data.id, data.name);
 * }
 *
 * const invalid: unknown = { id: 'u2' };
 * isUser(invalid); // false (missing 'name')
 * ```
 *
 * ---
 *
 * ### 📌 Notes
 * - This is a **factory function**; it returns a new type guard function.
 * - It checks for the existence of the key *and* that the value is not `undefined`.
 * - Ideal for validating API responses or configuration objects.
 *
 * @typeParam T - The target object type to validate against.
 * @param requiredKeys - An array of keys from type `T` that must be present and defined.
 * @returns A type guard function that returns `true` if all `requiredKeys` are found and defined.
 */
export const hasDefinedKeys = <T extends object>(
  requiredKeys: (keyof T)[],
): ((value: unknown) => value is T) => {
  return (value: unknown): value is T => {
    if (!value || !isObject(value)) return false;
    return requiredKeys.every(
      (key) => isKeyInObject(key)(value) && isDefined(value[key]),
    );
  };
};

/**
 * ## 🧩 isShape — Recursive Structural Type Guard Factory
 *
 * Creates a **high-fidelity type guard** that validates whether an unknown object
 * conforms to a specific structural "contract" defined by a schema of guards.
 *
 * ---
 *
 * ### ⚙️ Core Purpose
 * - 🔹 **Eliminate `as` casting**: Moves from speculative assertions to deterministic verification.
 * - 🔹 **Recursive Validation**: Safely audits nested object trees by composing guards.
 * - 🔹 **Compile-Time Synchronization**: Using `[K in keyof T]` ensures the schema
 *   stays in sync with the interface. If the interface changes, the guard will fail to compile.
 *
 * ---
 *
 * ### 📘 Example Usage
 * ```ts
 * interface UserProfile {
 *   id: string;
 *   settings: { theme: 'dark' | 'light' };
 * }
 *
 * // Define the contract once
 * const isUserProfile = isShape<UserProfile>({
 *   id: isString,
 *   settings: isShape({
 *     theme: isInArray(['dark', 'light'] as const)
 *   })
 * });
 *
 * const rawData: unknown = await fetchApi();
 *
 * if (isUserProfile(rawData)) {
 *   // ✅ rawData is now fully narrowed, including nested properties.
 *   console.log(rawData.settings.theme);
 * }
 * ```
 *
 * ---
 *
 * ### 📌 Notes
 * - **Exorcises Ghost Objects**: Unlike `{} as T`, this verifies every required key.
 * - **Optional Support**: If a key is missing in the value but allowed in the schema,
 *   the individual property guard must handle the `undefined` case.
 * - **Zero Casts**: Internally leverages `isKeyInObject` for type-safe property discovery.
 *
 * @typeParam T - The target interface or object type to validate.
 * @param schema - A mapping of keys from `T` to their corresponding `TTypeGuard`.
 * @returns A type guard function that narrows `unknown` to `T`.
 */
export const isShape = <T extends object>(schema: {
  [K in keyof T]: TTypeGuard<T[K]>;
}): TTypeGuard<T> => {
  const schemaKeys = ObjectUtils.keys(schema);

  return (value: unknown): value is T => {
    if (!isObject(value)) return false;

    for (const key of schemaKeys) {
      const guard = schema[key];

      if (!isKeyInObject(key)(value)) return false;

      if (!guard(value[key])) return false;
    }

    return true;
  };
};
