/**
 * TPromisify: Property-Level Promise Wrapper
 *
 * Maps over an object type and wraps every property value in a Promise.
 * This is particularly useful when defining the return type of a
 * data-fetching layer or a proxy that handles async operations.
 *
 * @template T - The original object structure
 *
 * @example
 * interface UserData { id: string; age: number; }
 *
 * // Result: { id: Promise<string>; age: Promise<number>; }
 * type AsyncUser = TPromisify<UserData>;
 */
type TPromisify<T> = {
  [P in keyof T]: Promise<T[P]>;
};

/**
 * TPromiseType: Promise Resolution Utility
 *
 * Unwraps a Promise type to extract the underlying value type (U).
 * If the provided type is not a Promise, it resolves to `never`.
 *
 * @template T - The Promise type to unwrap
 *
 * @example
 * type ApiResponse = Promise<{ status: number; data: any }>;
 *
 * // Result: { status: number; data: any }
 * type RawResponse = TPromiseType<ApiResponse>;
 */
type TPromiseType<T> = T extends Promise<infer U> ? U : never;
