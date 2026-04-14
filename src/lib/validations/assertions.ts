import {
  CoreTypeGuards,
  isRGBTuple,
  isCamelCase,
  isBufferLikeObject,
  isJSONArrayString,
  isJSONObjectString,
  isJsonString,
  isAbsoluteUrl,
  isInternalUrl,
} from '../guards';
import type {
  TAssert,
  TTypeGuard,
  TRGB,
  TInternalUrl,
  TAbsoluteURL,
  TAnyFunction,
  TJSONObjectString,
  TJSONArrayString,
  TJSONDataString,
  TBufferLikeObject,
} from '../../types';
/**
 * @utilType util
 * @name assertValue
 * @category Validations Assertions
 * @description Asserts that a value passes a type guard check, throwing an error if it fails while preserving TS narrowing.
 * @link #assertvalue
 *
 * @throws {Error} If the value does not satisfy the type guard.
 *
 * @example
 * ```ts
 * const isString = (v: unknown): v is string => typeof v === 'string';
 * const myValue: unknown = "hello";
 * assertValue(myValue, isString); // narrows type of myValue to string
 * ```
 */
export function assertValue<T>(
  value: unknown,
  typeGuard: TTypeGuard<T>,
  message?: string,
): asserts value is T {
  if (!typeGuard(value)) {
    throw new Error(message ?? 'Validation failed for value');
  }
}
/**
 * @utilType util
 * @name makeAssert
 * @category Validations Assertions
 * @description Higher-order utility that creates a reusable assertion function for a specific type guard.
 * @link #makeassert
 *
 * @example
 * ```ts
 * const isNumber = (v: unknown): v is number => typeof v === 'number';
 * const assertNumber = makeAssert(isNumber, 'myNumber');
 *
 * const value: unknown = 42;
 * assertNumber(value); // Narrows value type to number
 * ```
 */
const makeAssert = <T>(guard: TTypeGuard<T>, _key: string): TAssert<T> => {
  return (value: unknown, message?: string) =>
    assertValue(value, guard, message);
};

// -------------------- Generate assertion functions --------------------

// Primitive asserts
/* prettier-ignore */ export const assertIsNumber: TAssert<number> = makeAssert(CoreTypeGuards.isNumber, 'isNumber');
/* prettier-ignore */ export const assertIsInteger: TAssert<number> = makeAssert(CoreTypeGuards.isInteger, 'isInteger');
/* prettier-ignore */ export const assertIsString: TAssert<string> = makeAssert(CoreTypeGuards.isString, 'isString');
/* prettier-ignore */ export const assertIsNonEmptyString: TAssert<string> = makeAssert(CoreTypeGuards.isNonEmptyString, 'isNonEmptyString');
/* prettier-ignore */ export const assertIsBoolean: TAssert<boolean> = makeAssert(CoreTypeGuards.isBoolean, 'isBoolean');
/* prettier-ignore */ export const assertIsBigInt: TAssert<bigint> = makeAssert(CoreTypeGuards.isBigInt, 'isBigInt');
/* prettier-ignore */ export const assertIsSymbol: TAssert<symbol> = makeAssert(CoreTypeGuards.isSymbol, 'isSymbol');

// Reference asserts
/* prettier-ignore */ export const assertIsNull: TAssert<null> = makeAssert(CoreTypeGuards.isNull, 'isNull');
/* prettier-ignore */ export const assertIsUndefined: TAssert<undefined> = makeAssert(CoreTypeGuards.isUndefined, 'isUndefined');
/* prettier-ignore */ export const assertIsDefined: TAssert<NonNullable<unknown>> = makeAssert(CoreTypeGuards.isDefined, 'isDefined');
/* prettier-ignore */ export const assertIsNil: TAssert<null | undefined> = makeAssert(CoreTypeGuards.isNil, 'isNil');
/* prettier-ignore */ export const assertIsFunction: TAssert<TAnyFunction> = makeAssert(CoreTypeGuards.isFunction, 'isFunction');
/* prettier-ignore */ export const assertObject: TAssert<object> = makeAssert(CoreTypeGuards.isObject, 'isObject');
/* prettier-ignore */ export const assertIsArray: TAssert<unknown[]> = makeAssert(CoreTypeGuards.isArray, 'isArray');
/* prettier-ignore */ export const assertIsMap: TAssert<Map<unknown, unknown>> = makeAssert(CoreTypeGuards.isMap, 'isMap');
/* prettier-ignore */ export const assertIsSet: TAssert<Set<unknown>> = makeAssert(CoreTypeGuards.isSet, 'isSet');
/* prettier-ignore */ export const assertIsWeakMap: TAssert<WeakMap<object, unknown>> = makeAssert(CoreTypeGuards.isWeakMap, 'isWeakMap');
/* prettier-ignore */ export const assertIsWeakSet: TAssert<WeakSet<object>> = makeAssert(CoreTypeGuards.isWeakSet, 'isWeakSet');

// Refined / Composite asserts
/* prettier-ignore */ export const assertIsCamelCase: TAssert<string> = makeAssert(isCamelCase, 'isCamelCase');
/* prettier-ignore */ export const assertIsBufferLikeObject: TAssert<TBufferLikeObject> = makeAssert(isBufferLikeObject, 'isBufferLikeObject');
/* prettier-ignore */ export const assertIsJSONArrayString: TAssert<TJSONArrayString> = makeAssert(isJSONArrayString, 'isJSONArrayString');
/* prettier-ignore */ export const assertIsJSONObjectString: TAssert<TJSONObjectString> = makeAssert(isJSONObjectString, 'isJSONObjectString');
/* prettier-ignore */ export const assertIsJsonString: TAssert<TJSONDataString> = makeAssert(isJsonString, 'isJsonString');
/* prettier-ignore */ export const assertIsAbsoluteUrl: TAssert<TAbsoluteURL> = makeAssert(isAbsoluteUrl, 'isAbsoluteUrl');
/* prettier-ignore */ export const assertIsInternalUrl: TAssert<TInternalUrl> = makeAssert(isInternalUrl, 'isInternalUrl');
/* prettier-ignore */ export const assertIsRGBTuple: TAssert<TRGB> = makeAssert(isRGBTuple, 'isRGBTuple');

export const AssertionUtils = {
  // creators
  assertValue,
  makeAssert,
  // Primitive
  assertIsNumber,
  assertIsInteger,
  assertIsString,
  assertIsNonEmptyString,
  assertIsBoolean,
  assertIsBigInt,
  assertIsSymbol,

  // Reference
  assertIsNull,
  assertIsUndefined,
  assertIsDefined,
  assertIsNil,
  assertIsFunction,
  assertObject,
  assertIsArray,
  assertIsMap,
  assertIsSet,
  assertIsWeakMap,
  assertIsWeakSet,

  // Refined / Composite
  assertIsCamelCase,
  assertIsBufferLikeObject,
  assertIsJSONArrayString,
  assertIsJSONObjectString,
  assertIsJsonString,
  assertIsAbsoluteUrl,
  assertIsInternalUrl,
  assertIsRGBTuple,
} as const;
