import { exportAndRenameStaticMethods } from '../../managers';

/**
 * ## 🧩 Available Assertion Methods
 *
 * - `assertionIsDefined` — Throws if a value is `undefined`.
 * - `assertionIsNotNil` — Throws if a value is `null` or `undefined`.
 * - `assertionIsString` — Throws if a value is not a string.
 * - `assertionIsNumber` — Throws if a value is not a number.
 * - `assertionIsBigIntOrString` — Throws if a value is not a bigint or string.
 * - `assertionIsBoolean` — Throws if a value is not a boolean.
 * - `assertionIsObject` — Throws if a value is not a non-null object.
 * - `assertionIsArray` — Throws if a value is not an array.
 * - `assertionIsInstanceOf` — Throws if a value is not an instance of a given constructor.
 *
 * ---
 *
 *  @see {@link ValidationUtilsDocs.AssertionUtils}
 */
class AssertionUtils {
  static isDefined<T>(
    value: T | undefined,
    message?: string,
  ): asserts value is T {
    if (value === undefined) {
      throw new Error(message ?? 'Value must be defined');
    }
  }

  static isNotNil<T>(
    value: T | null | undefined,
    message?: string,
  ): asserts value is Required<T> {
    if (value === null || value === undefined) {
      throw new Error(message ?? 'Value must not be null or undefined');
    }
  }

  static isString(value: unknown, message?: string): asserts value is string {
    if (typeof value !== 'string') {
      throw new Error(message ?? 'Value must be a string');
    }
  }

  static isNumber(value: unknown, message?: string): asserts value is number {
    if (typeof value !== 'number') {
      throw new Error(message ?? 'Value must be a number');
    }
  }
  static isBigIntOrString(
    value: unknown,
    message?: string,
  ): asserts value is string | bigint {
    if (typeof value !== 'bigint' && typeof value !== 'string') {
      throw new Error(message ?? 'Value must be a string or bigint');
    }
  }

  static isBoolean(value: unknown, message?: string): asserts value is boolean {
    if (typeof value !== 'boolean') {
      throw new Error(message ?? 'Value must be a boolean');
    }
  }

  static isObject(
    value: unknown,
    message?: string,
  ): asserts value is Record<string, unknown> {
    if (typeof value !== 'object' || value === null || Array.isArray(value)) {
      throw new Error(message ?? 'Value must be a non-null object');
    }
  }
  static isArray<T>(value: unknown, message?: string): asserts value is T[] {
    if (!Array.isArray(value)) {
      throw new Error(message ?? 'Value must be an array');
    }
  }
  static isInstanceOf<T>(
    value: unknown,
    ctor: new (...args: unknown[]) => T,
    message?: string,
  ): asserts value is T {
    if (!(value instanceof ctor)) {
      throw new Error(message ?? `Value must be an instance of ${ctor.name}`);
    }
  }
}

// -----------------------------------------------------------------------------
// 🔄 HYBRID EXPORT PATTERN
// -----------------------------------------------------------------------------
export const RenamedAssertionMethods = exportAndRenameStaticMethods(
  AssertionUtils,
  {
    assertionIsDefined: 'isDefined',
    assertionIsNotNil: 'isNotNil',
    assertionIsString: 'isString',
    assertionIsNumber: 'isNumber',
    assertionIsBigIntOrString: 'isBigIntOrString',
    assertionIsBoolean: 'isBoolean',
    assertionIsObject: 'isObject',
    assertionIsArray: 'isArray',
    assertionIsInstanceOf: 'isInstanceOf',
  },
);

// -----------------------------------------------------------------------------
// 🧩 Tree-shakable direct exports
// -----------------------------------------------------------------------------
export const {
  assertionIsDefined,
  assertionIsNotNil,
  assertionIsString,
  assertionIsNumber,
  assertionIsBigIntOrString,
  assertionIsBoolean,
  assertionIsObject,
  assertionIsArray,
  assertionIsInstanceOf,
} = RenamedAssertionMethods;

// -----------------------------------------------------------------------------
// 🧱 Export full utility class (optional grouped import)
// -----------------------------------------------------------------------------
export { AssertionUtils };
