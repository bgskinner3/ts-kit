// global/validation-utils.docs.d.ts
// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
     * Assertions
     *
     * A utility class for runtime assertion functions in TypeScript.
     *
     * Assertions are functions that **verify a condition at runtime** and throw an error if the condition is not met.
     * They differ from traditional type guards in two key ways:
     *
     * 1. **Type Guards (e.g., `isDefined`)**
     *    - Return a boolean indicating whether a value matches a type.
     *    - Example: `if (ValidationUtils.isDefined(x)) { ... }`
     *    - TypeScript can narrow types **only within conditional branches**.
     *
     * 2. **Assertions (e.g., `Assertions.isDefined`)**
     *    - Use the TypeScript `asserts` keyword: `asserts value is T`.
     *    - Throw an error if the value does not meet the condition.
     *    - Guarantee to TypeScript that after the assertion runs, the value has the specified type.
     *    - Example:
     *      ```ts
     *      let x: string | undefined;
     *      Assertions.isDefined(x, 'x must exist');
     *      // After this line, TypeScript knows `x` is a string
     *      console.log(x.length);
     *      ```
     *
     * Benefits of using assertion functions:
     * - Provides **runtime safety** by validating values immediately.
     * - Ensures **type safety** for subsequent code without repeated null/undefined checks.
     * - Centralizes all runtime invariants in a **single utility class**.
     *
     * Use this class for validating primitives, objects, arrays, or domain-specific structures.
     */
    static AssertionUtils(): void;
  }
}

// This ensures TypeScript treats the file as a module
export {};
