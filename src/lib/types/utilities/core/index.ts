import { TPrettify } from '../../primitives';

type TConfigSchema = Record<string, Record<string, string>>;
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
// type TIfValueRequire<
//   T extends TConfigSchema,
//   K1 extends keyof T,
//   V1 extends keyof T[K1],
//   K2 extends keyof T,
// > =
//   | ({ [P in K1]: V1 } & { [P in K2]: keyof T[K2] }) // If Trigger matches, Dependent is REQUIRED
//   | ({ [P in K1]?: Exclude<keyof T[K1], V1> | null } & { [P in K2]?: never }); // Otherwise, Dependent is FORBIDDEN
type TIfValueRequire<
  T extends TConfigSchema,
  K1 extends keyof T,
  V1 extends keyof T[K1],
  K2 extends keyof T,
> = TPrettify<
  | ({ [P in K1]: V1 } & { [P in K2]: keyof T[K2] })
  | ({ [P in K1]?: Exclude<keyof T[K1], V1> } & { [P in K2]?: undefined })
>;
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
 *
 * Enforces conditional requirements.
 * Makes {@link K2} required if {@link K1} matches {@link V1}.
 * Otherwise, {@link K2} is forbidden.
 */
type TRequireIf<
  T,
  K1 extends keyof T,
  V1 extends T[K1],
  K2 extends string,
> = TPrettify<
  /* prettier-ignore */ | (Omit<T, K1 | (K2 & keyof T)> & { [P in K1]: V1  } & { [P in K2]-?: K2 extends keyof T ? Exclude<T[K2], undefined> : unknown })
  /* prettier-ignore */
  | (Omit<T, K1 | (K2 & keyof T)> & { [P in K1]: Exclude<T[K1], V1> } & { [P in K2]?: undefined })
>;
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
type FunctionKeys<T> = {
  [K in keyof T]: string extends K // 1. Skip the general 'string' or 'number' indexers
    ? never
    : number extends K
      ? never
      : // 2. Omit the key if its value (minus undefined) is a function
        Exclude<T[K], undefined> extends (...args: never[]) => unknown
        ? K
        : never;
}[keyof T];

type TOmitMethods<T> = {
  // Use key remapping to filter out the identified function keys
  [K in keyof T as K extends FunctionKeys<T> ? never : K]: T[K];
};
/**
 type FunctionKeys<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? K : never;
}[keyof T];

type TOmitMethods<T> = Omit<T, FunctionKeys<T>>;
 */
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

export type { TUnionResolver, TOmitMethods, TRequireIf, TIfValueRequire };
