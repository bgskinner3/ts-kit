/**
 * @utilType type
 * @name TXOR
 * @category Types Union
 * @description Enforces a strict choice between two property sets (T or U), preventing the mixing of properties from both.
 * @link #txor
 *
 * ## ⚖️ TXOR — Exclusive OR Utility
 *
 * Enforces a strict "one-or-the-other" choice between two types. Unlike a standard
 * TypeScript union (`|`), `TXOR` ensures that if properties from type `T` are present,
 * properties from type `U` must be absent (and vice-versa).
 *
 * @template T - The first set of properties.
 * @template U - The second set of properties.
 *
 * @example
 * ```ts
 * // Define two exclusive data shapes
 * type TEmailAuth = { email: string; otp: string };
 * type TSocialAuth = { provider: 'google' | 'apple'; token: string };
 *
 * // Use TXOR to ensure the user doesn't try to mix auth methods
 * type TAuthRequest = TXOR<TEmailAuth, TSocialAuth>;
 *
 * // ✅ Valid: Only Email props
 * const req1: TAuthRequest = { email: 'test@me.com', otp: '1234' };
 *
 * // ✅ Valid: Only Social props
 * const req2: TAuthRequest = { provider: 'google', token: 'xyz_secret' };
 *
 * // ❌ Error: Cannot mix email props with social props
 * const req3: TAuthRequest = { email: 'test@me.com', provider: 'google' };
 * ```
 */
type TXOR<T, U> =
  | (T & { [K in Exclude<keyof U, keyof T>]?: never })
  | (U & { [K in Exclude<keyof T, keyof U>]?: never });

export type { TXOR };
