type TConfigSchema = Record<string, Record<string, string>>;
/**
 * TRequireKey: A utility type to force a dependency between two variants.
 *
 * It creates a discriminated union that makes a "Dependent" key required
 * ONLY when a "Trigger" key matches a specific value.
 *
 * @template T - The Variant Schema (e.g., TThemedTextSchema)
 * @template K1 - The "Trigger" key (e.g., 'variant')
 * @template V1 - The value of K1 that triggers the requirement (e.g., 'gradientText')
 * @template K2 - The "Dependent" key that becomes required (e.g., 'gradients')
 *
 * @example
 * // If variant is 'gradientText', the user MUST provide a 'gradients' selection.
 * // If variant is anything else, 'gradients' is forbidden.
 * type MyRules = TRequireKey<MySchema, 'variant', 'gradientText', 'gradients'>;
 *
 * @example
 * // Usage in tcva:
 * export const myVariants = tcva<MySchema, MyRules>('base-classes', { ... });
 */
type TRequireKey<
  T extends TConfigSchema,
  K1 extends keyof T,
  V1 extends keyof T[K1],
  K2 extends keyof T,
> =
  | ({ [P in K1]: V1 } & { [P in K2]: keyof T[K2] }) // If Trigger matches, Dependent is REQUIRED
  | ({ [P in K1]?: Exclude<keyof T[K1], V1> | null } & { [P in K2]?: never }); // Otherwise, Dependent is FORBIDDEN

/**
 * TRequireIf: Conditional Requirement Utility
 *
 * Enforces that property K2 becomes REQUIRED when property K1 matches value V1.
 * If K1 does NOT match V1, property K2 is forbidden (must be undefined).
 *
 * @template T - The base interface containing all possible properties
 * @template K1 - The "Trigger" property key (the condition)
 * @template V1 - The value of K1 that activates the requirement
 * @template K2 - The "Dependent" property key (the result)
 *
 * @example
 * interface TFormatProps {
 *   value: bigint;
 *   unit: 'eth' | 'gwei' | 'token';
 *   decimals?: number;
 * }
 *
 * // Rule: If unit is 'token', decimals is REQUIRED. Otherwise, FORBIDDEN.
 * type TStrictFormat = TRequireIf<TFormatProps, 'unit', 'token', 'decimals'>;
 *
 * // ✅ Valid: 'eth' doesn't need decimals
 * const eth: TStrictFormat = { value: 1n, unit: 'eth' };
 *
 * // ✅ Valid: 'token' includes required decimals
 * const token: TStrictFormat = { value: 1n, unit: 'token', decimals: 18 };
 *
 * // ❌ Error: Property 'decimals' is missing but required for 'token'
 * const fail1: TStrictFormat = { value: 1n, unit: 'token' };
 *
 * // ❌ Error: Property 'decimals' is forbidden for 'eth'
 * const fail2: TStrictFormat = { value: 1n, unit: 'eth', decimals: 18 };
 */
type TRequireIf<T, K1 extends keyof T, V1 extends T[K1], K2 extends keyof T> =
  | (Omit<T, K1 | K2> & { [P in K1]: V1 } & { [P in K2]: T[K2] }) // Branch: K1 is V1, K2 is REQUIRED
  | (Omit<T, K2> & { [P in K1]?: Exclude<T[K1], V1> } & { [P in K2]?: never }); // Branch: K1 is NOT V1, K2 is FORBIDDEN

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
 * TOmitMethods: Data-Only Utility
 *
 * Strips all function properties (methods) from a type, leaving only
 * data properties. Useful for serializing state or generating types
 * for DTOs (Data Transfer Objects).
 *
 * @template T - The source type containing data and methods
 *
 * @example
 * interface User {
 *   id: string;
 *   getName(): string;
 *   save(): Promise<void>;
 * }
 *
 * // Result: { id: string }
 * type UserData = TOmitMethods<User>;
 */
type TOmitMethods<T> = Pick<
  T,
  { [K in keyof T]: T[K] extends Function ? never : K }[keyof T]
>;

/**
 * TUnionResolver: Tagged Union Mapper
 *
 * Transforms a union of types into an array of objects where each member
 * is "tagged" within a 'type' property. This is helpful for creating
 * registry lists or metadata maps from existing unions.
 *
 * @template T - The union of literal values or types
 *
 * @example
 * type Status = 'pending' | 'success';
 *
 * // Result: ({ type: 'pending' } | { type: 'success' })[]
 * type StatusList = TUnionResolver<Status>;
 */
type TUnionResolver<T> = T extends infer U ? { type: U }[] : never;
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
