/**
 * TPrettify: IntelliSense Optimization Utility
 *
 * Flattens complex intersections and mapped types into a single,
 * readable object interface. It doesn't change the logic of the type,
 * but makes the hover-over tooltips in IDEs much easier to debug.
 *
 * @template T - The complex or intersected type to flatten
 *
 * @example
 * type Intersected = { a: string } & { b: number } & { c: boolean };
 *
 * // Hovering over 'Pretty' shows: { a: string; b: number; c: boolean }
 * // Instead of: { a: string } & { b: number } & { c: boolean }
 * type Pretty = TPrettify<Intersected>;
 */
type TPrettify<T> = { [K in keyof T]: T[K] } & {};
/**
 * TMerge: Deep Object Merge Utility
 *
 * Merges two types where properties in the second type (O2) override
 * those in the first (O1). It ensures that the resulting type respects
 * the structure of O2 while retaining non-conflicting keys from O1.
 *
 * @template O1 - The base object type
 * @template O2 - The overriding object type
 *
 * @example
 * type Base = { id: number; name: string; active: boolean };
 * type Update = { id: string; active: string };
 *
 * // Result: { id: string; name: string; active: string }
 * type Merged = TMerge<Base, Update>;
 */
type TMerge<O1, O2> = O2 & Omit<O1, keyof O2>;

/**
 * TCreateDiff: Symmetric Difference Utility
 *
 * Identifies the properties that exist in type T or type U, but NOT in both.
 * It effectively returns the "unique" keys from two different objects.
 *
 * @template T - The first type
 * @template U - The second type
 *
 * @example
 * type A = { name: string; id: number; };
 * type B = { name: string; age: number; };
 * // Result: { id: number; age: number; }
 * type UniqueData = TCreateDiff<A, B>;
 */
type TCreateDiff<T, U> = Omit<T, keyof U> & Omit<U, keyof T>;

export type { TCreateDiff, TMerge, TPrettify };
