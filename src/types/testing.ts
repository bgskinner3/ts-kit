/**
 * TEqual: Strict Type Equality Checker
 * Returns true if T and U are identical, otherwise false.
 */
type TEqual<T, U> =
  (<V>() => V extends T ? 1 : 2) extends <V>() => V extends U ? 1 : 2
    ? true
    : false;

/**
 * TExpect: Compile-time Assertion
 * Use this to throw a compiler error if a test fails.
 */
type TExpect<T extends true> = T;

export type { TEqual, TExpect };
