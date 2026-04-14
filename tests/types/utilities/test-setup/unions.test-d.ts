import { expectType } from 'jest-tsd';
import type {
  TEqual,
  TExpect,
  TNormalizeTypeValue,
} from '../../../../src/types';
import type { TXOR } from '../../../../src/lib/types/utilities/unions';
import { forceType } from '../../../test-utils';

/**
 * TXOR TESTS
 *
 * USECASE --
 * We have two distinct login methods. We must ensure the developer
 * cannot provide a mix of credentials (e.g., an OTP with a Google Token).
 */

// XOR TEsting shapes
type TEmailAuth = { email: string; otp: string };
type TSocialAuth = { provider: 'google' | 'apple'; token: string };
type TAuthRequest = TXOR<TEmailAuth, TSocialAuth>;

type TActual1 = TXOR<TEmailAuth, TSocialAuth>;

type TExpected1 =
  | (TEmailAuth & { provider?: never; token?: never })
  | (TSocialAuth & { email?: never; otp?: never });

export type _tx1 = TExpect<TEqual<TActual1, TExpected1>>;
const xorValOne: unknown = {};
forceType<TActual1>(xorValOne);
expectType<TExpected1>(xorValOne);

// =========================================

// ---------------------------------------------------------
// EXTRACT TESTS
// ---------------------------------------------------------
type TEmailOnly = Extract<TAuthRequest, { email: string }>;
export type _tx2 = TExpect<
  TEqual<TEmailOnly, TEmailAuth & { provider?: never; token?: never }>
>;

// =========================================
// EDGCASES
// Overlapping keys
type A = { id: string; a: number };
type B = { id: string; b: boolean };

type TOverlap = TXOR<A, B>;

type TExpectedOverlap = (A & { b?: never }) | (B & { a?: never });

export type _tx3 = TExpect<TEqual<TOverlap, TExpectedOverlap>>;

const xorValTwo: unknown = {};
forceType<TOverlap>(xorValTwo);
expectType<TExpectedOverlap>(xorValTwo);

// =========================================
// Shared key with DIFFERENT types
type A2 = { id: string };
type B2 = { id: number };

type TConflict = TXOR<A2, B2>;
type TExpectedConflict = A2 | B2;

export type _tx4 = TExpect<
  TEqual<TNormalizeTypeValue<TConflict>, TNormalizeTypeValue<TExpectedConflict>>
>;

// =========================================
// Optional properties edge case
type A3 = { a?: string };
type B3 = { b?: number };

type TOptional = TXOR<A3, B3>;

type TExpectedOptional = (A3 & { b?: never }) | (B3 & { a?: never });

export type _tx5 = TExpect<TEqual<TOptional, TExpectedOptional>>;

const xorValFour: unknown = {};
forceType<TOptional>(xorValFour);
expectType<TExpectedOptional>(xorValFour);
