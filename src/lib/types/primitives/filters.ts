/**
 * TFilterKeysByValue: Type-Based Key Selector
 *
 * Extracts only the keys of an object that match a specific value type.
 * Useful for filtering objects to find all "string" keys or all "number" keys.
 *
 * @template T - The source object type
 * @template U - The value type to filter by
 *
 * @example
 * interface Profile { id: number; bio: string; age: number; }
 * // Result: 'id' | 'age'
 * type NumericKeys = TFilterKeysByValue<Profile, number>;
 */
type TFilterKeysByValue<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];

/**
 * TStripType: Type-Based Property Filter
 *
 * Creates a new type by excluding all properties that match a specific value type.
 * This is the inverse of PickByType.
 *
 * @template T - The source object type
 * @template U - The value type to remove
 *
 * @example
 * interface Todo { id: string; completed: boolean; createdAt: Date; }
 * // Result: { id: string; createdAt: Date; }
 * type HideFlags = TStripType<Todo, boolean>;
 */
type TStripType<T, U> = {
  [K in keyof T as T[K] extends U ? never : K]: T[K];
};

export type { TFilterKeysByValue, TStripType };
