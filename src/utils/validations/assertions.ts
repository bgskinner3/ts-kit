import { PrimitiveTypeGuards } from '../guards';
import { generateKeyMap } from '../transformers';

// const map = generateKeyMap()

// import type { TAssert, TRGB } from '../../types'
// import { isArray, isNumber } from '../guards';

// export const assertIsDefined: TAssert<unknown> = <T>(
//     value: T | undefined,
//     message?: string,
// ): asserts value is T => {
//     if (value === undefined) {
//         throw new Error(message ?? 'Value must be defined');
//     }
// }

// // Generic assert function
// // export const assert: TAssert<unknown> = <T>(
// //   value: unknown,
// //   typeGuard: (v: unknown) => v is T,
// //   message?: string
// // ): asserts value is T => {
// //   if (!typeGuard(value)) {
// //     throw new Error(message ?? 'Validation failed for value');
// //   }
// // };
// export const assertNotNil = <T>(
//     value: T | null | undefined,
//     message?: string,
// ): asserts value is Required<T> => {
//     if (value === null || value === undefined) {
//         throw new Error(message ?? 'Value must not be null or undefined');
//     }
// }

// export const assertString: TAssert<string> = (value: unknown, message?: string): asserts value is string => {
//     if (typeof value !== 'string') {
//         throw new Error(message ?? 'Value must be a string');
//     }
// }

// export const assertNumber: TAssert<number> = (value: unknown, message?: string): asserts value is number => {
//     if (typeof value !== 'number') {
//         throw new Error(message ?? 'Value must be a number');
//     }
// }
// export const assertBigIntOrString = (
//     value: unknown,
//     message?: string,
// ): asserts value is string | bigint => {
//     if (typeof value !== 'bigint' && typeof value !== 'string') {
//         throw new Error(message ?? 'Value must be a string or bigint');
//     }
// }

// export const assertBoolean: TAssert<boolean> = (value: unknown, message?: string): asserts value is boolean => {
//     if (typeof value !== 'boolean') {
//         throw new Error(message ?? 'Value must be a boolean');
//     }
// }

// export const assertObject = (
//     value: unknown,
//     message?: string,
// ): asserts value is Record<string, unknown> => {
//     if (typeof value !== 'object' || value === null || Array.isArray(value)) {
//         throw new Error(message ?? 'Value must be a non-null object');
//     }
// }
// export const assertIsArray = <T>(value: unknown, message?: string): asserts value is T[] => {
//     if (!isArray(value)) {
//         throw new Error(message ?? 'Value must be an array');
//     }
// }
// export const assertInstanceOf = <T>(
//     value: unknown,
//     ctor: new (...args: unknown[]) => T,
//     message?: string,
// ): asserts value is T => {
//     if (!(value instanceof ctor)) {
//         throw new Error(message ?? `Value must be an instance of ${ctor.name}`);
//     }
// }
// /** @see {@link AssertionUtilsDocs.assertRGB} */
// export const assertRGB: TAssert<TRGB> = (input: unknown): asserts input is TRGB => {
//     if (
//         !isArray(input) ||
//         input.length !== 3 ||
//         input.some((n) => !isNumber(n) || n < 0 || n > 255)
//     ) {
//         throw new Error(
//             `Invalid RGB array. Expected [r, g, b] where each 0–255, received: ${JSON.stringify(input,)}`);
//     }
// };
// /**
//  * ## 🧩 Available Assertion Methods
//  *
//  * - `assertionIsDefined` — Throws if a value is `undefined`.
//  * - `assertionIsNotNil` — Throws if a value is `null` or `undefined`.
//  * - `assertionIsString` — Throws if a value is not a string.
//  * - `assertionIsNumber` — Throws if a value is not a number.
//  * - `assertionIsBigIntOrString` — Throws if a value is not a bigint or string.
//  * - `assertionIsBoolean` — Throws if a value is not a boolean.
//  * - `assertionIsObject` — Throws if a value is not a non-null object.
//  * - `assertionIsArray` — Throws if a value is not an array.
//  * - `assertionIsInstanceOf` — Throws if a value is not an instance of a given constructor.
//  *
//  * ---
//  *
//  *  @see {@link ValidationUtilsDocs.AssertionUtils}
//  */
// export const AssertionUtils = {
//     assertIsDefined,
//     assertNotNil,
//     assertIsArray,
//     assertBigIntOrString,
//     assertBoolean,
//     assertObject,
//     assertInstanceOf,
//     assertNumber,
//     assertString,
//     assertRGB

// }
