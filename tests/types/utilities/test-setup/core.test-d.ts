import { expectType } from 'jest-tsd';
import type { TEqual, TExpect } from '../../../../src/types';
import type {
  TUnionResolver,
  TOmitMethods,
  //   TRequireIf,
  //   TIfValueRequire,
} from '../../../../src/lib/types/utilities/core';
import { forceType } from '../../../test-utils';

/**
 * TUnionResolver TESTS
 *
 * USECASE --
 * Converts each member of a union into an array of objects with a `type` field.
 * NOTE: This implementation DOES distribute unions (e.g., 'a' | 'b' becomes {type: 'a'}[] | {type: 'b'}[]).
 */

// ----------------------

// ----------------------
type UR_Actual1 = TUnionResolver<'a' | 'b'>;
type UR_Expected1 = { type: 'a' }[] | { type: 'b' }[];
export type _ur1 = TExpect<TEqual<UR_Actual1, UR_Expected1>>;
const val: unknown = {};
forceType<UR_Actual1>(val);
expectType<UR_Expected1>(val);

// Case: single literal
type UR_Actual2 = TUnionResolver<'only'>;
type UR_Expected2 = { type: 'only' }[];
export type _ur2 = TExpect<TEqual<UR_Actual2, UR_Expected2>>;
const val2: unknown = {};
forceType<UR_Actual2>(val2);
expectType<UR_Expected2>(val2);

// Case: number union
type UR_Actual3 = TUnionResolver<1 | 2>;
type UR_Expected3 = { type: 1 }[] | { type: 2 }[];
export type _ur3 = TExpect<TEqual<UR_Actual3, UR_Expected3>>;
const val3: unknown = {};
forceType<UR_Actual3>(val3);
expectType<UR_Expected3>(val3);

// Case: mixed union
type UR_Actual4 = TUnionResolver<'a' | 1 | true>;
type UR_Expected4 = { type: 'a' }[] | { type: 1 }[] | { type: true }[];
export type _ur4 = TExpect<TEqual<UR_Actual4, UR_Expected4>>;
const val4: unknown = {};
forceType<UR_Actual4>(val4);
expectType<UR_Expected4>(val4);

// Edge Case: never
type UR_Actual5 = TUnionResolver<never>;
type UR_Expected5 = never;
export type _ur5 = TExpect<TEqual<UR_Actual5, UR_Expected5>>;
const val5: unknown = {};

forceType<UR_Actual5>(val5);
expectType<never>(val5);

// Edge Case: any/unknown
type UR_Actual6 = TUnionResolver<unknown>;
type UR_Expected6 = { type: unknown }[];
export type _ur6 = TExpect<TEqual<UR_Actual6, UR_Expected6>>;
const val6: unknown = {};
forceType<UR_Actual6>(val6);
expectType<UR_Expected6>(val6);

// Edge Case: unknown (duplicate of 6, but keeping for your structure)
type UR_Actual7 = TUnionResolver<unknown>;
type UR_Expected7 = { type: unknown }[];
export type _ur7 = TExpect<TEqual<UR_Actual7, UR_Expected7>>;
const val7: unknown = {};
forceType<UR_Actual7>(val7);
expectType<UR_Expected7>(val7);

// Case: object union
type ObjA = { a: 1 };
type ObjB = { b: 2 };
type UR_Actual8 = TUnionResolver<ObjA | ObjB>;
type UR_Expected8 = { type: ObjA }[] | { type: ObjB }[];
export type _ur8 = TExpect<TEqual<UR_Actual8, UR_Expected8>>;
const val8: unknown = {};
forceType<UR_Actual8>(val8);
expectType<UR_Expected8>(val8);

/**
 * TOmitMethods TESTS
 *
 * USECASE --
 * Removes function-like properties (methods) from a type,
 * preserving all non-function fields.
 */
// ----------------------
type TOmitM_Actual1 = TOmitMethods<{
  a: string;
  b: number;
  c: () => void;
  d: (x: number) => string;
}>;
type TOmitM_Expected1 = {
  a: string;
  b: number;
};
export type _tm1 = TExpect<TEqual<TOmitM_Actual1, TOmitM_Expected1>>;

const actual1: unknown = {};
forceType<TOmitM_Actual1>(actual1);
expectType<TOmitM_Expected1>(actual1);

// ----------------------
// identity case TEST
type TM_Actual2 = TOmitMethods<{
  a: string;
  b: number;
}>;

type TM_Expected2 = {
  a: string;
  b: number;
};

export type _tm2 = TExpect<TEqual<TM_Actual2, TM_Expected2>>;
const actual2: unknown = {};
forceType<TM_Actual2>(actual2);
expectType<TM_Expected2>(actual2);

// ----------------------
// empty object TEST

type TM_Actual3 = TOmitMethods<{
  a: () => void;
  b: (x: number) => string;
}>;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type TM_Expected3 = {};

export type _tm3 = TExpect<TEqual<TM_Actual3, TM_Expected3>>;

const actual3: unknown = {};
forceType<TM_Actual3>(actual3);
expectType<TM_Expected3>(actual3);

// ----------------------
// Optional methods TEST
type TM_Actual4 = TOmitMethods<{
  a?: () => void;
  b: string;
  c?: number;
}>;

type TM_Expected4 = {
  b: string;
  c?: number;
};

export type _tm4 = TExpect<TEqual<TM_Actual4, TM_Expected4>>;

const actual4: unknown = {};
forceType<TM_Actual3>(actual4);
expectType<TM_Expected3>(actual4);

// ----------------------
// Union of function + non-function
type TM_Actual5 = TOmitMethods<{
  a: string | (() => void);
  b: number;
}>;

type TM_Expected5 = {
  a: string | (() => void); // should NOT be removed (not purely a method)
  b: number;
};

export type _tm5 = TExpect<TEqual<TM_Actual5, TM_Expected5>>;

const actual5: unknown = {};
forceType<TM_Actual3>(actual5);
expectType<TM_Expected3>(actual5);

// ----------------------
// Mixed object + method + optional + readonly
type TM_Actual6 = TOmitMethods<{
  readonly a: string;
  readonly b: () => void;
  c?: () => number;
  d: boolean;
}>;

type TM_Expected6 = {
  readonly a: string;
  d: boolean;
};

export type _tm6 = TExpect<TEqual<TM_Actual6, TM_Expected6>>;
const actual6: unknown = {};
forceType<TM_Actual3>(actual6);
expectType<TM_Expected3>(actual6);

// ----------------------
//Index signature
type TM_Actual7 = TOmitMethods<{
  [key: string]: string;
  a: () => void;
  b: number;
}>;

type TM_Expected7 = {
  [key: string]: string;
  b: number;
};

export type _tm7 = TExpect<TEqual<TM_Actual7, TM_Expected7>>;

const actual7: unknown = {};
forceType<TM_Actual3>(actual7);
expectType<TM_Expected3>(actual7);

// ----------------------
//Nested object methods (should NOT strip deeply)
type TM_Actual8 = TOmitMethods<{
  a: {
    x: () => void;
    y: string;
  };
  b: () => void;
}>;

type TM_Expected8 = {
  a: {
    x: () => void; // untouched (deep removal not expected)
    y: string;
  };
};

export type _tm8 = TExpect<TEqual<TM_Actual8, TM_Expected8>>;
const actual8: unknown = {};
forceType<TM_Actual3>(actual8);
expectType<TM_Expected3>(actual8);

/**
 * TRequireIf TESTS
 *
 * USECASE --
 *
 *
 */

// ----------------------

/**
 * TIfValueRequire TESTS
 *
 * USECASE --
 *
 *
 */

// ----------------------
