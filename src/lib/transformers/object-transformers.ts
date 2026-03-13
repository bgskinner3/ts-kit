import { ObjectUtils, ArrayUtils } from '../common';
import { capitalizeString } from './string-transformers';
/**
 * ## 🔑 generateKeyMap — Create a Typed Key Transformation Map
 *
 * Generates an object mapping original keys to transformed string values
 * using an optional **prefix** and required **suffix**.
 *
 * This is useful when generating standardized property names such as
 * getter/setter names, CSS class maps, or API field mappings.
 *
 * ---
 *
 * ### ⚙️ Behavior
 * - Iterates through the provided `keys` array.
 * - Builds a new string for each key using:
 *   - Optional `prefix`
 *   - Capitalized original key
 *   - Required `suffix`
 * - Returns a **fully typed mapping object** where:
 *
 * ```
 * key -> transformedValue
 * ```
 *
 * ---
 *
 * ### 📘 Example
 *
 * ```ts
 * const map = generateKeyMap({
 *   keys: ['name', 'email'] as const,
 *   prefix: 'get',
 *   suffix: 'Value',
 * });
 *
 * // Result:
 * // {
 * //   name: "getNameValue",
 * //   email: "getEmailValue"
 * // }
 * ```
 *
 * ---
 *
 * @typeParam K - Keys to transform
 * @typeParam P - Optional prefix string
 * @typeParam S - Required suffix string
 */
export const generateKeyMap = <
  K extends string,
  P extends string | undefined = undefined,
  S extends string = string,
>(data: {
  keys: readonly K[];
  prefix?: P;
  suffix: S;
}) => {
  const { keys, prefix, suffix } = data;

  const entries = ArrayUtils.map(keys, (key) => {
    const camel = prefix
      ? `${prefix}${key.charAt(0).toUpperCase() + key.slice(1)}${suffix}`
      : `${key.charAt(0).toLowerCase() + key.slice(1)}${suffix}`;

    return [key, camel] as [
      K,
      P extends string ? `${P}${Capitalize<K>}${S}` : `${K}${S}`,
    ];
  });

  return ObjectUtils.fromEntries(entries) satisfies Record<
    K,
    P extends string ? `${P}${Capitalize<K>}${S}` : `${K}${S}`
  >;
};
/**
 * ## 🗂️ toKeyByField — Convert Array to Keyed Object
 *
 * Converts an array of objects into a **record keyed by a specific field**.
 *
 * The specified key field becomes the **object key**, and the remaining
 * properties are preserved as the value.
 *
 * This is useful for quickly creating lookup tables from API responses
 * or normalized datasets.
 *
 * ---
 *
 * ### 📘 Example
 *
 * ```ts
 * const users = [
 *   { id: 1, name: 'Alice' },
 *   { id: 2, name: 'Bob' },
 * ];
 *
 * const map = toKeyByField(users, 'id');
 *
 * // Result:
 * // {
 * //   1: { name: 'Alice' },
 * //   2: { name: 'Bob' }
 * // }
 * ```
 *
 * ---
 *
 * @param rows - Array of objects to transform
 * @param keyField - Property used as the object key
 */
export const toKeyByField = <
  RowType extends Record<Key, string | number | symbol>,
  Key extends keyof RowType,
>(
  rows: RowType[],
  keyField: Key,
): Record<RowType[Key], Omit<RowType, Key>> => {
  return ObjectUtils.fromEntries<RowType[Key], Omit<RowType, Key>>(
    ArrayUtils.map(rows, (row) => {
      const key: RowType[Key] = row[keyField];
      const { [keyField]: _, ...rest } = row;
      return [key, rest] satisfies [RowType[Key], Omit<RowType, Key>];
    }),
  ) satisfies Record<RowType[Key], Omit<RowType, Key>>;
};
/**
 * ## 🔠 capitalizeArray — Capitalize All Strings in an Array
 *
 * Transforms every string in an array so that the **first letter is capitalized**.
 *
 * Uses the `capitalizeString` utility internally and preserves the
 * literal type relationship using `Capitalize<T>`.
 *
 * ---
 *
 * ### 📘 Example
 *
 * ```ts
 * capitalizeArray(['name', 'email']);
 *
 * // Result:
 * // ['Name', 'Email']
 * ```
 *
 * ---
 *
 * @param arr - Array of strings to capitalize
 */
export const capitalizeArray = <T extends string>(
  arr: readonly T[],
): Capitalize<T>[] => ArrayUtils.map(arr, capitalizeString);
/**
 * ## 🔠 capitalizedKeys — Get Capitalized Object Keys
 *
 * Extracts keys from an object and returns them as an array of
 * **capitalized strings**.
 *
 * Only keys that **start with a letter** are included.
 *
 * This is useful when generating UI labels, enum-like lists,
 * or metadata from object shapes.
 *
 * ---
 *
 * ### 📘 Example
 *
 * ```ts
 * const user = {
 *   id: 1,
 *   name: 'Alice',
 * };
 *
 * capitalizedKeys(user);
 *
 * // Result:
 * // ['Id', 'Name']
 * ```
 *
 * ---
 *
 * @param obj - Object whose keys should be capitalized
 */
export const capitalizedKeys = <T extends Record<string, unknown>>(
  obj: T,
): Capitalize<keyof T & string>[] =>
  capitalizeArray(
    ObjectUtils.keys(obj)
      .map(String) // Convert all keys to string
      .filter((key) => /^[A-Za-z]/.test(key)),
  );
