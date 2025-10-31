// global/validation-utils.docs.d.ts
declare global {
  /**
   * TuningDocs: global JSDoc-only reference for all scoring methods
   *
   * This class does not exist at runtime. It is purely for:
   * - Centralized documentation of scoring logic
   * - Clickable `@see` references in VS Code
   * - Maintaining tuning guidance, practical tips, and examples
   *
   * To use:
   * ```ts
   * /**
   *  * Compute the final pool score.
   *  * @see TuningDocs.computeFinalPoolScoreDoc
   *  *\/
   * const score = LiquidityConfigurator.computeFinalPoolScore(pool);
   * ```
   */
  class ValidationUtilsDocs {
    /**
     * Title / Summary of the method
     *
     * Detailed description:
     * - What the method does
     * - Why it’s needed
     * - Key inputs and outputs
     *
     * Steps / Flow:
     * 1. Step one description
     * 2. Step two description
     * 3. Step three description
     *
     * Key parameters / tuning:
     * - `param1` (default: X): Explanation and effect
     * - `param2` (default: Y): Explanation and effect
     * - `param3` (default: Z): Explanation and effect
     *
     * Clamping / scaling / normalization rules:
     * - How the values are bounded, scaled, or normalized
     *
     * Practical guidance:
     * - How to tune parameters for different scenarios
     * - Expected behavior when parameters change
     *
     * Examples:
     * - Input → Expected output
     * - Input → Expected output
     *
     * @param param Description of input
     * @returns Description of output
     * @see ActualClass.actualMethod
     */
    static exampleDoc(): void;


    /**
     * ## 🧠 ReferenceTypeGuards — Safe Type Checks for Reference & Built-In Objects
     *
     * A focused utility module providing **type-safe guards** for JavaScript’s
     * **reference-based types** (objects, arrays, functions, maps, sets, and their weak counterparts).
     *
     * These guards enable **compile-time narrowing** and **runtime validation**
     * for any kind of reference or collection type in JavaScript.
     *
     * ---
     *
     * ### ⚙️ Core Purpose
     * Reference type guards are designed to:
     * - ✅ Differentiate between **primitive** and **reference** values
     * - 🧩 Safely check for collection types (`Map`, `Set`, `Array`, etc.)
     * - 🧼 Prevent invalid `instanceof` or `typeof` checks
     * - 💪 Work seamlessly with TypeScript’s type-narrowing inference
     *
     * ---
     *
     * ### 🧩 Available Guards
     *
     * | Function | Description |
     * |-----------|-------------|
     * | `isNull` | Checks if a value is exactly `null`. |
     * | `isFunction` | Checks if a value is a function. |
     * | `isObject` | Checks if a value is a non-null object. |
     * | `isArray` | Checks if a value is an array. |
     * | `isMap` | Checks if a value is an instance of `Map`. |
     * | `isSet` | Checks if a value is an instance of `Set`. |
     * | `isWeakMap` | Checks if a value is an instance of `WeakMap` (weakly held keys). |
     * | `isWeakSet` | Checks if a value is an instance of `WeakSet` (weakly held objects). |
     *
     * ---
     *
     * ### 📘 Example Usage
     * ```ts
     * import { isArray, isMap, isWeakSet } from '@/utils/ReferenceTypeGuards';
     *
     * const arr = [1, 2, 3];
     * const map = new Map();
     * const weakSet = new WeakSet();
     *
     * if (isArray(arr)) console.log('Array of length:', arr.length);
     * if (isMap(map)) console.log('Map size:', map.size);
     * if (isWeakSet(weakSet)) console.log('WeakSet detected!');
     * ```
     *
     * ---
     *
     * ### 📚 Additional Reading
     * - [MDN: typeof operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof)
     * - [MDN: instanceof operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof)
     * - [MDN: Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
     * - [MDN: Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)
     * - [MDN: WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)
     * - [MDN: WeakSet](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet)
     *
     * ---
     *
     * @module ReferenceTypeGuards
     * @see {@link TTypeGuard}
     * @see {@link ValidationUtilsDocs.ReferenceTypeGuards}
     */
    static ReferenceTypeGuards(): void;

    /**
     * ## 🧩 CompositeTypeGuards — Type-Safe Validators for Structured & Reference-Like Values
     *
     * This file provides **type-safe, strongly inferred guards** for **composite values**,
     * which are non-primitive, structured, or reference-based types. These guards validate
     * objects, arrays, key membership, URLs, and specialized structures like buffers or
     * React-like elements.
     *
     * ### Types of Guards Included:
     * 1. **Object & Record Guards**
     *    - `isObject`, `isRecordOf`  
     *    - Validates that a value is an object or a record with values passing a type guard.
     *
     * 2. **Array & Membership Guards**
     *    - `isArrayOf`, `isInArray`, `isKeyOfArray`, `isKeyOfObject`  
     *    - Validate array contents, membership, or allowed keys.
     *
     * 3. **Specialized Structured Guards**
     *    - `isBufferLikeObject`, `isElementLike`, `isElementOfType`  
     *    - Validate specific structured objects like buffer-like objects or virtual DOM elements.
     *
     * 4. **URL & Environment Guards**
     *    - `isValidUrl`, `isUrlOrRelativePath`, `isInternalUrl`, `isClientSide`  
     *    - Validate strings representing URLs, relative paths, or runtime environment context.
     *
     * ---
     * ## Role / Purpose
     *
     * **Role:**
     * - Provide runtime-validated, type-safe checks for structured or reference-based values.
     * - Ensure objects, arrays, and complex structures conform to expected shapes.
     * - Improve **type safety**, **runtime reliability**, and **developer confidence** when working
     *   with non-primitive values.
     *
     * ---
     * ## Guidelines
     *
     * **✅ What goes here:**
     * - Type guards for reference-based types (`isObject`, `isArray`, `isMap`, `isSet`, etc.).
     * - Type guards for structured/composite values (`isBufferLikeObject`, `isElementLike`, `isElementOfType`).
     * - Guards for key validation or membership (`isKeyOfArray`, `isKeyOfObject`, `isInArray`).
     * - Guards that combine primitive checks with object structure validation.
     *
     * **🚫 What does NOT go here:**
     * - Guards for primitive types (`string`, `number`, `boolean`, etc.) — see `PrimitiveValueGuards`.
     * - Runtime assertion functions that throw errors.
     * - Validators that depend on external state beyond the input object.
     *
     * ---
     * ## 📘 Example Usage
     * ```ts
     * import {
     *   isBufferLikeObject,
     *   isInArray,
     *   isValidUrl,
     *   isUrlOrRelativePath,
     *   isInternalUrl,
     *   isClientSide,
     *   isElementLike,
     *   isElementOfType,
     *   isKeyOfObject,
     *   isKeyOfArray,
     *   isArrayOf,
     *   isRecordOf
     * } from '@/utils/guards/composite';
     *
     * const buffer: unknown = { type: 'Buffer', data: [1, 2, 3] };
     * if (isBufferLikeObject(buffer)) {
     *   console.log(buffer.data); // ✅ typed as TBufferLikeObject
     * }
     *
     * const element: unknown = { type: 'div', props: { className: 'container' } };
     * if (isElementOfType(element, ['div', 'span'])) {
     *   console.log(element.type); // 'div'
     * }
     *
     * const arr = [1, 2, 3];
     * if (isArrayOf(isNumber, arr)) {
     *   console.log('All numbers!', arr);
     * }
     *
     * const allowedKeys = ['id', 'name'] as const;
     * const key: unknown = 'name';
     * if (isKeyOfArray(allowedKeys)(key)) {
     *   console.log('Valid key:', key);
     * }
     *
     * const url = '/home';
     * if (isUrlOrRelativePath(url)) {
     *   console.log('Valid URL or relative path');
     * }
     * ```
     *
     * ---
     * #### ✅ Notes
     * - All methods are **pure functions**; no instantiation is required.
     * - Guards here focus on **reference, structured, or composite types**, often combining multiple checks.
     * - Use these as **building blocks** for complex validations, filtering, or type-safe runtime logic.
     */

    static CompositeTypeGuards(): void;

    /**
     * ## 🧩 Assertion Utilities — Runtime Type & Value Validators
     *
     * This file provides **assertion functions** for runtime validation of values.
     * Unlike type guards, assertion functions **throw an error** if a value does not
     * meet the expected type or condition. These are useful for enforcing invariants
     * and ensuring that data conforms to expected types at runtime.
     *
     * ### Types of Assertions Included:
     * 1. **Primitive Assertions**
     *    - e.g., `assertNumber(value)`, `assertString(value)`  
     *    - Throws if the value is not the expected primitive type.
     *
     * 2. **Reference & Structured Assertions**
     *    - e.g., `assertObject(value)`, `assertArrayOf(value, isNumber)`  
     *    - Throws if the value is not an object, array, or does not pass the supplied guard.
     *
     * 3. **Specialized / Composite Assertions**
     *    - e.g., `assertBufferLikeObject(value)`, `assertElementOfType(value, ['div'])`  
     *    - Throws if the value does not match a specific structured type.
     *
     * 4. **URL / Environment Assertions**
     *    - e.g., `assertValidUrl(value)`, `assertInternalUrl(value)`  
     *    - Throws if the string is not a valid URL, relative path, or internal URL.
     *
     * ---
     * ## Role / Purpose
     *
     * **Role:**
     * - Enforce **runtime invariants** for both primitive and composite values.
     * - Provide **type narrowing** via TypeScript’s `asserts` keyword.
     * - Complement type guards by throwing errors when data violates expectations.
     *
     * ---
     * ## Guidelines
     *
     * **✅ What goes here:**
     * - Assertion functions using TypeScript’s `asserts` keyword.
     * - Functions that combine primitive checks and/or structural validation.
     * - Specialized assertions for objects with expected shapes or structured types.
     *
     * **🚫 What does NOT go here:**
     * - Functions that merely return `true`/`false` without asserting (use type guards instead).
     * - Runtime validators that depend on external state beyond the value passed.
     *
     * ---
     * ## 📘 Example Usage
     * ```ts
     * import { assertNumber, assertNonEmptyString, assertBufferLikeObject } from '@/utils/asserts';
     *
     * const value: unknown = 42;
     * assertNumber(value); // ✅ passes, value is narrowed to number
     *
     * const name: unknown = 'Alice';
     * assertNonEmptyString(name); // ✅ passes, name is narrowed to string
     *
     * const buffer: unknown = { type: 'Buffer', data: [1, 2, 3] };
     * assertBufferLikeObject(buffer); // ✅ passes, buffer typed as TBufferLikeObject
     *
     * // Throws if invalid
     * assertNumber('not a number'); // ❌ throws error
     * ```
     *
     * ---
     * #### ✅ Notes
     * - All methods are **pure functions**.
     * - Use assertions when you want **strict enforcement** of type/value invariants at runtime.
     * - Can be used **together with type guards** for flexible type validation strategies.
     */
    static AssertionUtils(): void;
    /**
     * ## 🧩 PrimitiveValueGuards — Type-Safe Validators for Primitives and Primitive-Like Values
     *
     * This file provides **type-safe, strongly inferred** guards for JavaScript primitive types
     * and values derived from primitives, such as strings matching a pattern or allowed literals.
     *
     * ### Primitive types included:
     * - `string`
     * - `number`
     * - `boolean`
     * - `bigint`
     * - `symbol`
     * - `undefined`
     * - `null` (optional, see ReferenceTypeGuards)
     *
     * ### Derived / extended primitive values:
     * - Non-empty strings (`isNonEmptyString`)
     * - CamelCase strings (`isCamelCase`)
     * - Hexadecimal strings (`isHexString`)
     * - JSON strings (`isJsonString`)
     * - Values matching a set of allowed literals (`isOneOf`)
     *
     * ---
     * ## Role / Purpose
     *
     * **Role:**
     * Provide runtime-validated, type-safe checks for primitive values and primitive-derived data.
     * - Responsible for ensuring values match expected primitive types and common derived patterns.
     * - Exists to improve **type safety**, **developer confidence**, and **code readability** in TypeScript projects.
     *
     * ---
     * ## Guidelines
     *
     * **✅ What goes here:**
     * - Type guards for primitive types (`isNumber`, `isBoolean`, etc.).
     * - Type guards for primitive-derived values (`isJsonString`, `isHexString`, `isCamelCase`, `isOneOf`).
     * - Functions that operate only on primitive values or arrays/records of primitives.
     *
     * **🚫 What does NOT go here:**
     * - Guards for objects, arrays, maps, sets, or other reference types (see `reference.ts`).
     * - Runtime assertion functions that throw errors.
     * - Complex validators that depend on external state or DOM elements.
     *
     * ---
     * ## 📘 Available Methods
     * | Method | Description |
     * |--------|-------------|
     * | `isNumber` | Checks if a value is a valid number (not NaN, finite). |
     * | `isInteger` | Checks if a value is an integer. |
     * | `isString` | Checks if a value is a string. |
     * | `isNonEmptyString` | Checks if a string has length > 0. |
     * | `isBoolean` | Checks if a value is a boolean. |
     * | `isBigInt` | Checks if a value is a bigint. |
     * | `isSymbol` | Checks if a value is a symbol. |
     * | `isOneOf` | Checks if a value matches one of a readonly array of primitive literals. |
     * | `isCamelCase` | Checks if a string is camelCase. |
     * | `isHexString` | Checks if a string is a valid hexadecimal string (optionally of a given length). |
     * | `isJsonString` | Checks if a string contains valid JSON. |
     *
     * ---
     * ### 🧱 Example Usage
     * ```ts
     * import {
     *   isNumber,
     *   isNonEmptyString,
     *   isOneOf,
     *   isJsonString,
     *   isHexString,
     *   isCamelCase
     * } from '@/utils/guards/primitives';
     *
     * isNumber(42); // true
     * isNonEmptyString('hello'); // true
     * isOneOf(['red', 'green'], 'green'); // true
     * isJsonString('{"foo":1}'); // true
     * isHexString('0a1b2c'); // true
     * isCamelCase('myVariableName'); // true
     * ```
     *
     * ---
     * #### ✅ Notes
     * - All methods are **pure functions**; no instantiation is required.
     * - Guards here **combine primitive checks with extra validation** (patterns, allowed literals).
     * - Use these as **building blocks** for more complex validations and higher-order type guards.
     */
    static PrimitiveTypeGuards(): void;
  }


class AssertionUtilsDocs {
  /**
 * ## 🎨 assertRGB — Ensures a Value is a Valid RGB Tuple
 *
 * Asserts that the provided input is a valid RGB array containing exactly three
 * finite numeric values (0–255). Throws a descriptive error if validation fails.
 *
 * @example
 * ```ts
 * const color: unknown = [255, 128, 64];
 * assertRGB(color); // ✅ passes — color is now typed as TRGB
 *
 * const invalid = [255, -5, 'oops'];
 * assertRGB(invalid); // ❌ throws "Invalid RGB array: [255,-5,"oops"]"
 * ```
 */
 static assertRGB(): void;
}

  // ─────────────────────────────────────────────────────────────
  // ─────────────────────────────────────────────────────────────
  // ─────────────────────────────────────────────────────────────
  // ─────────────────────────────────────────────────────────────
  // CompositeTypeGuardsDocs
  // ─────────────────────────────────────────────────────────────
  // ─────────────────────────────────────────────────────────────
  // ─────────────────────────────────────────────────────────────
  // ─────────────────────────────────────────────────────────────
  class CompositeTypeGuardsDocs {
    /**
     * Checks if a value is a **Buffer-like object**.
     *
     * A Buffer-like object is an object with the following shape:
     * ```ts
     * {
     *   type: 'Buffer';
     *   data: number[];
     * }
     * ```
     *
     * This guard validates:
     * - ✅ The value is a non-null object
     * - ✅ The `type` property exists and is exactly `'Buffer'`
     * - ✅ The `data` property exists and is an array of numbers
     *
     * ---
     * ### Key Points
     * - Uses `isObject` to ensure the value is an object
     * - Uses `isArrayOf(isNumber)` to check that `data` contains only numbers
     * - This is a **composite type guard** because it combines multiple primitive/reference checks
     *
     * ---
     * ### Example Usage
     * ```ts
     * const buf = { type: 'Buffer', data: [1, 2, 3] };
     * const notBuf = { type: 'Buffer', data: ['a', 'b'] };
     *
     * isBufferLikeObject(buf); // true
     * isBufferLikeObject(notBuf); // false
     * ```
     *
     * ---
     * @param value - The value to check
     * @returns `true` if the value is a Buffer-like object, otherwise `false`
     */
    static isBufferLikeObject(): void;

    /**
     * ## 🧩 isInArray — Type Guard Factory for Array Membership
     *
     * Creates a **type guard** that checks whether a value exists in a given array.
     * Internally, it uses a `Set` for **O(1) lookup**, making repeated checks more efficient.
     *
     * ---
     *
     * ### ⚙️ Core Purpose
     * - 🔹 Verify that a value is included in a predefined array of allowed values.
     * - 🔹 Provide a **TypeScript type guard** so that the compiler can narrow types.
     * - 🔹 Optimized for repeated checks by creating a `Set` once per factory call.
     *
     * ---
     *
     * ### 📘 Example Usage
     * ```ts
     * // Store the returned type guard for repeated checks
     * const isAllowedColor = isInArray(['red', 'green', 'blue'] as const);
     * isAllowedColor('red');   // true
     * isAllowedColor('yellow'); // false
     *
     * const isAllowedNumber = isInArray([1, 2, 3] as const);
     * isAllowedNumber(2); // true
     * isAllowedNumber(4); // false
     *
     * // Or invoke inline without storing the guard
     * isInArray(['red', 'green', 'blue'] as const)('green'); // true
     * ```
     *
     *
     * ---
     *
     * ### 📌 Notes
     * - This is a **factory function**: you first pass the array, then use the returned function as a type guard.
     * - The returned guard checks for `undefined` and only returns `true` if the value exists in the array.
     * - Use this guard when you need **repeated membership checks** on a fixed array of values.
     *
     * @typeParam T - The type of elements in the target array.
     * @param target - The array of allowed values.
     * @returns A type guard function that narrows `unknown` to `T | undefined`.
     */
    static isInArray(): void;
    /**
     * ## 🧩 isValidUrl — Type Guard for Absolute URLs
     *
     * Checks whether a given string is a valid absolute URL according to the
     * browser's `URL` constructor. Returns `true` if the string can be parsed
     * as a valid URL, otherwise `false`.
     *
     * ---
     *
     * ### ⚙️ Core Purpose
     * - 🔹 Ensures the string is non-empty and a valid URL.
     * - 🔹 Provides a **TypeScript type guard** (`url is string`) for safe narrowing.
     *
     * ---
     *
     * ### 📘 Example Usage
     * ```ts
     * isValidUrl('https://example.com'); // true
     * isValidUrl('ftp://example.com');   // true
     * isValidUrl('not a url');           // false
     * isValidUrl('');                     // false
     * ```
     *
     * ---
     *
     * @param url - The value to validate as a URL.
     * @returns `true` if `url` is a non-empty valid absolute URL string.
     */
    static isValidUrl(): void;

    /**
     * ## 🧩 isUrlOrRelativePath — Type Guard for Absolute or Relative URLs
     *
     * Validates a string as either:
     * - A valid absolute URL, or
     * - A relative path starting with `/`.
     *
     * Useful for APIs, routing, or front-end link validation.
     *
     * ---
     *
     * ### ⚙️ Core Purpose
     * - 🔹 Checks non-empty strings only.
     * - 🔹 Supports both absolute URLs and relative paths.
     * - 🔹 Returns a **TypeScript type guard** (`value is string`).
     *
     * ---
     *
     * ### 📘 Example Usage
     * ```ts
     * isUrlOrRelativePath('/home');                    // true (relative path)
     * isUrlOrRelativePath('https://example.com');     // true (absolute URL)
     * isUrlOrRelativePath('invalid-url');             // false
     * isUrlOrRelativePath('');                        // false
     * ```
     *
     * ---
     *
     * @param value - The string to validate.
     * @returns `true` if `value` is a valid URL or relative path.
     */
    static isUrlOrRelativePath(): void;

    /**
     * ## 🧩 isValidInternalUrl — Checks for Internal URLs
     *
     * Determines whether a URL is **internal to the current website**.
     * - Relative paths (`/...`) are always considered internal.
     * - Absolute URLs are considered internal if their hostname matches
     *   the current location's hostname (client-side only).
     *
     * ---
     *
     * ### ⚙️ Core Purpose
     * - 🔹 Helps validate URLs for security and routing purposes.
     * - 🔹 Works **client-side only**; returns `false` on server-side.
     *
     * ---
     *
     * ### 📘 Example Usage
     * ```ts
     * // Suppose location.hostname === 'example.com'
     * isValidInternalUrl('/about');                       // true
     * isValidInternalUrl('https://example.com/home');     // true
     * isValidInternalUrl('https://other.com/page');       // false
     * isValidInternalUrl('invalid-url');                  // false
     * ```
     *
     * ---
     *
     * @param url - Optional string to validate as an internal URL.
     * @returns `true` if the URL is internal and valid; otherwise `false`.
     */
    static isInternalUrl(): void;
    /**
     * ## 🧩 isClientSide — Detects Client-Side Execution
     *
     * Determines whether the code is running in a **browser environment**.
     * Returns `true` if `window` is defined, otherwise `false`.
     *
     * ---
     *
     * ### ⚙️ Core Purpose
     * - 🔹 Useful for conditional logic that only runs in the browser.
     * - 🔹 Often used with URL or DOM-related checks.
     *
     * ---
     *
     * ### 📘 Example Usage
     * ```ts
     * if (isClientSide()) {
     *   console.log('Running in browser');
     * } else {
     *   console.log('Running on server');
     * }
     * ```
     *
     * @returns `true` if running client-side, otherwise `false`.
     */
    static isClientSide(): void;

    /**
     * ## 🧩 isElementLike — Type Guard for React-Like Elements
     *
     * Checks whether a value resembles a **React-like element** or virtual DOM node.
     * Specifically, it verifies that:
     * - The value is an object
     * - It has a `type` property which is a string or function
     * - It has a `props` property which is an object
     *
     * ---
     *
     * ### ⚙️ Core Purpose
     * - 🔹 Provides a **TypeScript type guard** to narrow unknown values to `TElementLike`.
     * - 🔹 Useful when processing virtual DOM trees or custom component objects.
     * - 🔹 Prevents runtime errors when accessing `.type` or `.props` of arbitrary values.
     *
     * ---
     *
     * ### 📘 Example Usage
     * ```ts
     * const element: unknown = {
     *   type: 'div',
     *   props: { className: 'container' }
     * };
     *
     * if (isElementLike(element)) {
     *   // ✅ TypeScript now knows `element` is TElementLike
     *   console.log(element.type);  // 'div'
     *   console.log(element.props); // { className: 'container' }
     * }
     *
     * const invalid = { foo: 'bar' };
     * isElementLike(invalid); // false
     * ```
     *
     * ---
     *
     * @param element - The value to check.
     * @returns `true` if `element` has a `type` and `props` structure, otherwise `false`.
     */
    static isElementLike(): void;

    /**
     * ## 🧩 isElementOfType — Type Guard for Specific Element Types
     *
     * Checks whether a value is a **React-like element** of a specific HTML tag or component type.
     * It first ensures the value is `isElementLike`, then confirms its `type` is included
     * in the allowed types.
     *
     * ---
     *
     * ### ⚙️ Core Purpose
     * - 🔹 Narrow elements to a **specific set of allowed types** (HTML tags or components).
     * - 🔹 Helps with type-safe filtering, mapping, or processing of elements in trees.
     * - 🔹 Useful in rendering logic, virtual DOM manipulation, or UI libraries.
     *
     * ---
     *
     * ### 📘 Example Usage
     * ```ts
     * const elements: unknown[] = [
     *   { type: 'div', props: {} },
     *   { type: 'span', props: {} },
     *   { type: 'button', props: {} }
     * ];
     *
     * const allowedTags: THTMLTags = ['div', 'button'];
     *
     * const filtered = elements.filter(el => isElementOfType(el, allowedTags));
     * // ✅ filtered contains only elements with type 'div' or 'button'
     *
     * elements.forEach(el => {
     *   if (isElementOfType(el, ['span'])) {
     *     console.log('Span element found:', el.props);
     *   }
     * });
     * ```
     *
     * ---
     *
     * @typeParam T - The union of allowed HTML tags or component types.
     * @param element - The value to check.
     * @param allowedTypes - Array of allowed element types.
     * @returns `true` if `element` is a valid element of one of the `allowedTypes`.
     */
    static isElementOfType(): void;
    /**
     * Checks whether a value is a valid key of a given object.
     *
     * This function returns a **TypeScript type guard**, allowing you to safely
     * access object properties with dynamic keys while retaining full type safety.
     *
     * Key points:
     * - Works with `string`, `number`, and `symbol` keys.
     * - Returns a type guard `(key: unknown) => key is keyof T`.
     * - Useful for runtime checks before accessing object properties dynamically.
     *
     * @typeParam T - The type of the target object.
     * @param obj - The object whose keys should be checked against.
     * @param key - The value to check if it is a valid key of `obj`.
     * @returns `true` if `key` exists in `obj`; otherwise `false`.
     *
     * @example
     * ```ts
     * const user = { id: 1, name: 'Alice', email: 'alice@example.com' };
     *
     * isKeyOfObject(user, 'name');     // true  ✅ 'name' is a valid key
     * isKeyOfObject(user, 'password'); // false ❌ 'password' is not a valid key
     * ```
     */
    static isKeyOfObject(): void;
    /**
     * ## 🧩 isKeyOfArray — Type Guard for Allowed Primitive Keys
     *
     * Checks if a value is one of the keys in a given readonly array of allowed keys.
     * This is a **type-safe type guard** for primitive keys (`string | number | symbol`)
     * that exist in a known array. It is useful for narrowing a value to a specific set
     * of literal keys at runtime.
     *
     * ---
     *
     * ### ⚙️ Core Purpose
     * - 🔹 Only works with **primitive keys**: `string`, `number`, or `symbol`.
     * - 🔹 Returns a **TypeScript type guard** (`key is T[number]`) for type inference.
     * - 🔹 Uses `Array.includes` to check for membership in the allowed keys array.
     *
     * ---
     *
     * ### 📘 Example Usage
     * ```ts
     * const allowedKeys = ['id', 'name', 'age'] as const;
     * const key: unknown = 'name';
     *
     * if (isKeyOfArray(allowedKeys)(key)) {
     *   // ✅ TypeScript now knows `key` is 'id' | 'name' | 'age'
     *   console.log(key); // 'name'
     * }
     *
     * const invalidKey: unknown = 'email';
     * isKeyOfArray(allowedKeys)(invalidKey); // false
     *
     * // Inline usage
     * isKeyOfArray(['x', 'y', 'z'] as const)('x'); // true
     * isKeyOfArray(['x', 'y', 'z'] as const)('a'); // false
     * ```
     *
     * ---
     *
     * @typeParam T - A readonly tuple or array of allowed keys.
     * @param keys - The array of valid keys.
     * @returns A type guard function that returns `true` if the value is included in `keys`.
     */
    static isKeyOfArray(): void;
    /**
     * ## 🧩 isRecordOf — Type Guard for Objects with Uniform Value Types
     *
     * Checks if a value is an object where **all property values satisfy a given type guard**.
     * Useful for ensuring that a record has uniform value types and for type-safe access.
     *
     * ---
     *
     * ### ⚙️ Core Purpose
     * - 🔹 Verify that a value is an object (non-null).
     * - 🔹 Ensure that every property value passes a provided type guard.
     * - 🔹 Enable **type-safe operations** on objects with consistent value types.
     *
     * ---
     *
     * ### 📘 Example Usage
     * ```ts
     * import { isRecordOf, isNumber, isBoolean } from '@/utils/guards/composite';
     *
     * const obj1: unknown = { a: 1, b: 2 };
     * if (isRecordOf(obj1, isNumber)) {
     *   // ✅ obj1 is now typed as Record<string, number>
     *   const sum = Object.values(obj1).reduce((a, b) => a + b, 0);
     * }
     *
     * const obj2: unknown = { a: 1, b: '2' };
     * isRecordOf(obj2, isNumber); // false
     *
     * const obj3: unknown = { foo: true, bar: false };
     * isRecordOf(obj3, isBoolean); // true
     * ```
     *
     * ---
     *
     * ### 📌 Notes
     * - Works only with **plain objects** (non-null) and string keys.
     * - Supports composability by accepting any type guard for property values.
     *
     * @typeParam V - Type of the values in the record.
     * @param value - Value to check.
     * @param typeGuard - Type guard function applied to each property value.
     * @returns `true` if `value` is an object and all property values pass the type guard.
     */
    static isRecordOf(): void;

    /**
     * ## 🧩 isArrayOf — Type Guard for Arrays of Specific Types
     *
     * Checks if a value is an array where **all elements satisfy a given type guard**.
     * This allows TypeScript to narrow types safely and perform runtime validation.
     *
     * ---
     *
     * ### ⚙️ Core Purpose
     * - 🔹 Verify that a value is an array.
     * - 🔹 Ensure that **every element** matches a specific type guard.
     * - 🔹 Enable **type-safe operations** on arrays after the check.
     *
     * ---
     *
     * ### 📘 Example Usage
     * ```ts
     * import { isArrayOf, isNumber, isString } from '@/utils/guards/composite';
     *
     * const arr1: unknown = [1, 2, 3];
     * if (isArrayOf(isNumber, arr1)) {
     *   // ✅ arr1 is now typed as number[]
     *   const sum = arr1.reduce((a, b) => a + b, 0);
     * }
     *
     * const arr2: unknown = ['a', 'b', 3];
     * isArrayOf(isString, arr2); // false
     * ```
     *
     * ---
     *
     * ### 📌 Notes
     * - The **type guard is passed as a parameter**, making this function highly composable.
     * - Use for arrays of primitives or arrays of objects validated by another type guard.
     *
     * @typeParam T - Type of array elements.
     * @param typeGuard - Type guard function for the array elements.
     * @param value - Value to validate.
     * @returns `true` if `value` is an array and all elements pass the type guard.
     */
    static isArrayOf(): void;
  }
  class ReferenceTypeGuardsDocs {
    /**
     * Checks if the given value is an instance of `WeakSet`.
     *
     * A **WeakSet** is a special kind of `Set` where:
     * - It can only store **object values** (no primitives)
     * - Objects are **held weakly**, meaning if there are no other references to an object,
     *   it can be garbage-collected automatically
     * - It is **not iterable** — you can’t get its contents or size
     * - Commonly used to track object presence without memory leaks
     *
     * 🧠 Useful for:
     * - Tracking which objects have been processed
     * - Marking objects as “seen” in caches or graph traversals
     *
     * 📚 **Learn more:**
     * - [MDN — WeakSet](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet)
     *
     * @example
     * ```ts
     * const weakSet = new WeakSet<object>();
     * const obj = {};
     *
     * weakSet.add(obj);
     *
     * ReferenceTypeGuards.isWeakSet(weakSet); // true
     * ReferenceTypeGuards.isWeakSet(new Set()); // false
     * ReferenceTypeGuards.isWeakSet([]); // false
     * ```
     */
    static isWeakSet(): void;
    /**
     * Checks if the given value is an instance of `WeakMap`.
     *
     * A **WeakMap** is a special kind of `Map` where:
     * - **Keys must be objects** (not primitives)
     * - Keys are **held weakly**, meaning if there are no other references to the key object,
     *   it can be garbage-collected automatically
     * - It does **not** support iteration (`.keys()`, `.values()`, `.entries()` are not available)
     * - It is ideal for **storing private metadata** about objects without preventing cleanup
     *
     * 🧠 Useful for:
     * - Caching computed data for objects
     * - Associating data with DOM elements without memory leaks
     *
     * 📚 **Learn more:**
     * - [MDN — WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)
     *
     * @example
     * ```ts
     * const weakMap = new WeakMap<object, number>();
     * const obj = {};
     *
     * weakMap.set(obj, 42);
     *
     * ReferenceTypeGuards.isWeakMap(weakMap); // true
     * ReferenceTypeGuards.isWeakMap(new Map()); // false
     * ReferenceTypeGuards.isWeakMap({}); // false
     * ```
     */
    static isWeakMap(): void;
  }
  class PrimitiveTypeGuardsDocs {
    /**
     * Checks if the value is a bigint.
     *
     * @example
     * ```ts
     * PrimitiveTypeGuards.isBigInt(123n); // true
     * PrimitiveTypeGuards.isBigInt(123); // false
     * ```
     */
    static isBigInt(): void;

    /**
     * Checks whether a value is a `symbol`.
     *
     * In JavaScript, a `symbol` is a unique and immutable primitive value that can be used as a key
     * for object properties. Each symbol is guaranteed to be unique, even if two symbols have the same
     * description.
     *
     * Key points:
     * - Symbols are often used to add unique property keys to objects without risk of name collisions.
     * - `typeof value === 'symbol'` is used to check if a value is a symbol.
     *
     * @example
     * ```ts
     * const sym1 = Symbol('foo');
     * const sym2 = Symbol('foo');
     *
     * isSymbol(sym1); // true
     * isSymbol(sym2); // true
     * isSymbol('foo'); // false
     *
     * const obj = { [sym1]: 123 };
     * console.log(obj[sym1]); // 123
     * ```
     */
    static isSymbol(): void;

    /**
     * Checks whether a value is one of the allowed values in a readonly array.
     *
     * Checks if a value is one of a list of allowed primitive values (string, number, or boolean).
     *
     * Example:
     *   const isAllowed = isOneOf(['red', 'green', 'blue'] as const);
     *   isAllowed('red');   // true
     *   isAllowed('yellow'); // false
     *
     * Key points:
     * - Only works with primitive types: string, number, or boolean.
     * - Returns a TypeScript type guard, so it can narrow types in code.
     * - Checks a single value at a time using Array.includes().
     *
     * Use case:
     *   Perfect for validating that a variable matches one of a small set of literal values.
     *
     * @typeParam T - A readonly tuple or array of allowed values.
     * @param allowed - The array of valid values.
     * @param value - The value to check.
     * @returns `true` if the value exists in the allowed array; otherwise `false`.
     *
     * @example
     * ```ts
     * const colors = ['red', 'green', 'blue'] as const;
     * if (isOneOf(colors, 'green')) {
     *   // ✅ value is 'green' | 'red' | 'blue'
     * }
     *
     * const flags = [0, 1] as const;
     * isOneOf(flags, 2); // false
     * ```
     */
    static isOneOf(): void;

    /**
     * Checks whether a string is a valid hexadecimal representation.
     *
     * A hexadecimal string consists of characters 0–9, a–f, or A–F,
     * and is often used for binary data encoding, color codes, cryptographic hashes, etc.
     *
     * Key points:
     * - The value must be a non-empty string.
     * - Only characters `[0-9a-fA-F]` are allowed.
     * - The length must be even, unless `expectedLength` is provided.
     * - If `expectedLength` is specified, the string must match that exact length.
     * - Returns a TypeScript type guard, so it narrows the type to `string` when used.
     *
     * Example usage:
     * ```ts
     * isHexString("0a1b2c"); // true
     * isHexString("0a1b2z"); // false (invalid character 'z')
     * isHexString("0a1b2c", 6); // true
     * isHexString("0a1b2c", 8); // false (length mismatch)
     * ```
     *
     * Use case:
     * - Validating inputs for cryptographic functions.
     * - Ensuring a string is a valid hex color code.
     * - Checking serialized binary data in hexadecimal format.
     *
     * @param value - The value to check.
     * @param expectedLength - Optional length the hex string must match exactly.
     * @returns `true` if `value` is a valid hexadecimal string; otherwise `false`.
     *
     * @typeParam T - N/A
     */

    static isHexString(): void;
    /**
     * Checks whether a string contains valid JSON.
     *
     * This type guard ensures that:
     * - The value is a non-empty string.
     * - The string can be parsed successfully using `JSON.parse()`.
     *
     * Key points:
     * - Returns a TypeScript type guard, narrowing the type to `string`.
     * - Invalid JSON or non-string values return `false`.
     * - Useful for validating dynamic input or API responses.
     *
     * Example usage:
     * ```ts
     * isJsonString('{"foo": 1}'); // true
     * isJsonString('["a", "b"]'); // true
     * isJsonString('not json');   // false
     * isJsonString('');           // false
     * ```
     *
     * Use case:
     * - Safely validate strings before parsing them as JSON.
     * - Guard input data in APIs, configuration files, or user inputs.
     *
     * @param value - The value to validate.
     * @returns `true` if `value` is a string containing valid JSON; otherwise `false`.
     */
    static isJsonString(): void;

    /**
     * Checks if the value is a camelCase string.
     *
     * By default, this checks that:
     * - The string starts with a lowercase letter
     * - Only contains alphanumeric characters
     * - No separators like `_`, `-`, or spaces
     *
     * You can think of this in terms of the `TCamelCase` type:
     * ```ts
     * type Example = TCamelCase<'my-variable'>; // 'myVariable'
     * ```
     *
     * Optionally, camelCase strings may preserve consecutive uppercase letters
     * using `TCamelCaseOptions['preserveConsecutiveUppercase']`. For example:
     * ```ts
     * type Example1 = TCamelCase<'FOO-BAR'>; // 'fooBAR' if preserveConsecutiveUppercase = true
     * type Example2 = TCamelCase<'FOO-BAR', { preserveConsecutiveUppercase: false }>; // 'fooBar'
     * ```
     *
     * @example
     * ```ts
     * TypeGuardUtils.isCamelCase('myVariable'); // true
     * TypeGuardUtils.isCamelCase('myVariable2'); // true
     * TypeGuardUtils.isCamelCase('MyVariable'); // false (starts with uppercase)
     * TypeGuardUtils.isCamelCase('my_variable'); // false (contains underscore)
     * TypeGuardUtils.isCamelCase('fooBAR'); // true if preserveConsecutiveUppercase is considered
     * ```
     */
    static isCamelCase(): void;
  }
}

// This ensures TypeScript treats the file as a module
export { };
