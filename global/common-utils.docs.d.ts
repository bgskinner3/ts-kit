// global/common-utils.docs.d.ts
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
  class CommonUtilsDocs {
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
    // ─────────────────────────────────────────────────────────────
    // ─────────────────────────────────────────────────────────────
    // ─────────────────────────────────────────────────────────────
    // ─────────────────────────────────────────────────────────────
    // 🧩 METHOD SUMMARIES
    // ─────────────────────────────────────────────────────────────
    // ─────────────────────────────────────────────────────────────
    // ─────────────────────────────────────────────────────────────
    // ─────────────────────────────────────────────────────────────

    // ─────────────────────────────────────────────────────────────
    // ─────────────────────────────────────────────────────────────
    // ─────────────────────────────────────────────────────────────
    // ─────────────────────────────────────────────────────────────
    // 🧩 CLASS SUMMARIES
    // ─────────────────────────────────────────────────────────────
    // ─────────────────────────────────────────────────────────────
    // ─────────────────────────────────────────────────────────────
    // ─────────────────────────────────────────────────────────────
    /**
     * # 🧰 ArrayUtils
     *
     * **Role / Purpose:**
     * Provides a set of **type-safe**, **pure**, and **reusable** array manipulation helpers.
     * Designed to improve inference, maintain immutability, and ensure consistency across the codebase.
     *
     * ---
     *
     * ## 🧩 Available Methods
     * | Method | Description |
     * |--------|-------------|
     * | `includes` | Type-safe `Array.includes` helper for union narrowing. |
     * | `createFixedLengthArray` | Ensures arrays have a fixed compile-time length. |
     * | `readAllItems` | Returns a shallow copy of an array. |
     * | `map` | Type-safe wrapper around `Array.map`. |
     * | `forEachUnion` | Handles arrays with union element types safely. |
     * | `forEach` | Standard, type-safe `forEach` wrapper. |
     * | `reduce` | Strictly typed reduction helper. |
     * | `flat` | One-level flattening helper. |
     * | `flatMap` | Safe flatMap alternative with strong typing. |
     * | `filter` | Generic and narrowed type-safe filter. |
     * | `filterNonNullable` | Removes nullish values safely. |
     *
     * ---
     *
     * ## 🔍 Notes
     * - All methods are **static** and **pure**.
     * - Designed for **tree-shaking compatibility** — use alongside `exportStaticMethods`.
     * - Follows the **Hybrid Export Pattern** (both class and destructured methods).
     *
     * ## 🧠 Example
     * ```ts
     * import { ArrayUtils, map, filterNonNullable } from '@/utils';
     *
     * const clean = filterNonNullable([1, null, 2]); // [1, 2]
     * const doubled = map(clean, n => n * 2);       // [2, 4]
     * ```
     */
    static ArrayUtils(): void;

    /**
     * ## 🧩 ObjectUtils — Type-Safe Object Utilities
     * Utility class providing **type-safe, strongly inferred** helpers for working with objects.
     *
     * These methods wrap core `Object.*` APIs and add:
     * - 🔒 Safer key/value inference
     * - 🧠 Stronger TypeScript typing
     * - 💪 Optional dot-path helpers for nested access
     *
     * ---
     * ## 📘 Available Methods
     * | Method | Description |
     * |--------|-------------|
     * | `keys` | Returns the keys of an object with proper key inference. |
     * | `entries` | Returns key-value pairs with full type support. |
     * | `fromEntries` | Constructs an object from typed key-value entries. |
     * | `values` | Returns the values of an object with inferred value types. |
     * | `has` | Checks if a nested property exists using dot notation. |
     * | `get` | Safely retrieves a nested property by dot path. |
     * | `set` | Safely sets a nested property by dot path (creates intermediate objects). |
     *
     * ---
     * ### 🧱 Example Usage
     * ```ts
     * import { objectKeys, objectHas, objectGet } from '@/utils';
     *
     * const user = { profile: { name: 'Alice' } };
     *
     * const keys = objectKeys(user); // ['profile']
     * const hasName = objectHas(user, 'profile.name'); // true
     * const name = objectGet(user, 'profile.name'); // 'Alice'
     * ```
     */
    static ObjectUtils(): void;
  }
}

// This ensures TypeScript treats the file as a module
export {};
