import { expectType } from 'jest-tsd';
import type { TEqual, TExpect } from '../../../../src/types';
import type {
  TDeepWriteable,
  TDeepMap,
  TDeepBigIntToNumber,
} from '../../../../src/lib/types/utilities/objects';
import { forceType } from '../../../test-utils';

/**
 * DEEP TESTSSS
 *
 *   TDeepWriteable, TDeepMap, TDeepBigIntToNumber, TESTS
 *
 *
 * These utilities are used for transforming deeply nested data structures
 * across API boundaries, state layers, and serialization pipelines.
 *
 * - TDeepMap
 *   Used for global type replacement across a structure.
 *   Example: converting all `bigint → number` or `string → Date`.
 *   Common in API normalization layers and schema migrations.
 *
 * - TDeepWriteable
 *   Used to remove immutability constraints from deeply readonly objects.
 *   Example: converting frozen API models into editable drafts or form state.
 *
 * - TDeepBigIntToNumber
 *   Used for serialization compatibility (e.g. JSON, HTTP, frontend transfer).
 *   Converts all bigint values into number since bigint is not JSON-safe.
 *
 * SUMMARY:
 * Map → transform values
 * Writeable → enable mutation
 * BigIntToNumber → serialization safety
 */

// TDeepWriteable

// Case: The ReadonlyArray Pivot (Crucial)
type TDeepWrite_Actual3 = TDeepWriteable<
  ReadonlyArray<{ readonly id: number }>
>;
type TDeepWrite_Expected3 = { id: number }[]; // Should be a standard mutable array
export type _tdw3 = TExpect<TEqual<TDeepWrite_Actual3, TDeepWrite_Expected3>>;

const deepWrite1: unknown = [{}];
forceType<TDeepWrite_Actual3>(deepWrite1);
expectType<TDeepWrite_Expected3>(deepWrite1);

// ------------------------------------------------------------------------

// Case: Built-in Protection (Date/RegExp)
// If it tries to strip readonly from Date.prototype, it breaks the type.
type TDeepWrite_Actual4 = TDeepWriteable<{ readonly created: Date }>;
type TDeepWrite_Expected4 = { created: Date };
export type _tdw4 = TExpect<TEqual<TDeepWrite_Actual4, TDeepWrite_Expected4>>;

const deepWrite2: unknown = {};
forceType<TDeepWrite_Actual4>(deepWrite2);
expectType<TDeepWrite_Expected4>(deepWrite2);

// ------------------------------------------------------------------------

// Case: Function Preservation
type TDeepWrite_Actual5 = TDeepWriteable<{ readonly save: () => void }>;
type TDeepWrite_Expected5 = { save: () => void };
export type _tdw5 = TExpect<TEqual<TDeepWrite_Actual5, TDeepWrite_Expected5>>;

const deepWrite3: unknown = {};
forceType<TDeepWrite_Actual5>(deepWrite3);
expectType<TDeepWrite_Expected5>(deepWrite3);

// ------------------------------------------------------------------------
type TTupleBase = readonly [readonly [string, number], bigint];
type TTupleActual = TDeepWriteable<TTupleBase>;
type TTupleExpected = [[string, number], bigint];
export type _ttup = TExpect<TEqual<TTupleActual, TTupleExpected>>;

const deepWrite4: unknown = {};
forceType<TTupleActual>(deepWrite4);
expectType<TTupleExpected>(deepWrite4);

// ====================================================================================================
// ====================================================================================================
// ====================================================================================================

// TDeepMap

// Case: Mapping only specific String Literals
type TDeepMap_Actual3 = TDeepMap<
  { status: 'PENDING' | 'DONE' },
  'PENDING',
  'START'
>;
type TDeepMap_Expected3 = { status: 'START' | 'DONE' };
export type _tdm3 = TExpect<TEqual<TDeepMap_Actual3, TDeepMap_Expected3>>;

const deepMap1: unknown = [{}];
forceType<TDeepMap_Actual3>(deepMap1);
expectType<TDeepMap_Expected3>(deepMap1);

// ------------------------------------------------------------------------

// Case: Mapping Classes/Built-ins to Primitives
type TDeepMap_Actual4 = TDeepMap<{ timestamp: Date }, Date, number>;
type TDeepMap_Expected4 = { timestamp: number };
export type _tdm4 = TExpect<TEqual<TDeepMap_Actual4, TDeepMap_Expected4>>;

const deepMap2: unknown = [{}];
forceType<TDeepMap_Actual4>(deepMap2);
expectType<TDeepMap_Expected4>(deepMap2);

// ------------------------------------------------------------------------

// Case: Handling 'any' within the structure (The "Don't Crash" test)
type TDM_Actual5 = TDeepMap<{ raw: unknown; id: bigint }, bigint, number>;
type TDM_Expected5 = { raw: unknown; id: number };

export type _tdm5 = TExpect<TEqual<TDM_Actual5, TDM_Expected5>>;

const dmVal5: unknown = { raw: 'anything', id: 100 };
forceType<TDM_Actual5>(dmVal5);
expectType<TDM_Expected5>(dmVal5);

// ====================================================================================================
// ====================================================================================================
// ====================================================================================================

// TDeepBigIntToNumber

// ------------------------------------------------------------------------
// Case: Deeply nested arrays
type TDeepNum_Actual3 = TDeepBigIntToNumber<bigint[][]>;
type TDeepNum_Expected3 = number[][];
export type _tdbn3 = TExpect<TEqual<TDeepNum_Actual3, TDeepNum_Expected3>>;

const deepNum1: unknown = [[0]];
forceType<TDeepNum_Actual3>(deepNum1);
expectType<TDeepNum_Expected3>(deepNum1);

// ------------------------------------------------------------------------

// Case: Objects with Optional BigInts
type DeepNum_Actual4 = TDeepBigIntToNumber<{ val?: bigint | null }>;
type DeepNum_Expected4 = { val?: number | null };
export type _tdbn4 = TExpect<TEqual<DeepNum_Actual4, DeepNum_Expected4>>;

const deepNum2: unknown = {};
forceType<DeepNum_Actual4>(deepNum2);
expectType<DeepNum_Expected4>(deepNum2);

// ------------------------------------------------------------------------
type TNullableBase = {
  id: bigint | null;
  count?: bigint;
};
type TNullableActual = TDeepBigIntToNumber<TNullableBase>;
type TNullableExpected = {
  id: number | null;
  count?: number;
};
export type _tnull = TExpect<TEqual<TNullableActual, TNullableExpected>>;

const deepNum3: unknown = {};
forceType<TNullableActual>(deepNum3);
expectType<TNullableExpected>(deepNum3);
