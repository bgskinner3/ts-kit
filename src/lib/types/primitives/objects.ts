/**
 * TUnpackObject: Property Value Extractor
 *
 * Extracts a union of all possible property values from an object or interface.
 * Useful for creating types based on the data contained within a map.
 *
 * @template T - The source object type
 *
 * @example
 * const Colors = { primary: '#f00', secondary: '#0f0' } as const;
 * // Result: '#f00' | '#0f0'
 * type ColorValues = TUnpackObject<typeof Colors>;
 */
type TUnpackObject<T> =
  T extends Array<infer U> ? U : T extends object ? T[keyof T] : never;

/**
 * TWriteable: Shallow Mutability Utility
 *
 * Removes the 'readonly' modifier from the top-level properties of a type.
 * Unlike TDeepWriteable, this only affects the immediate keys of the object.
 *
 * @template T - The type to make mutable
 *
 * @example
 * interface User { readonly id: string; name: string; }
 * // Result: { id: string; name: string; }
 * type MutableUser = TWriteable<User>;
 */
type TWriteable<T> = {
  -readonly [P in keyof T]: T[P];
};

/**
 * TEnsure: Selective Requirement Utility
 *
 * Takes a type and makes a specific subset of its keys (K) required,
 * while leaving the rest of the object structure untouched.
 *
 * @template T - The source type
 * @template K - The keys to be made required
 *
 * @example
 * interface Post { title?: string; body?: string; id: number; }
 * // Result: { title: string; body?: string; id: number; }
 * type ValidatedPost = TEnsure<Post, 'title'>;
 */
type TEnsure<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

export type { TEnsure, TUnpackObject, TWriteable };
