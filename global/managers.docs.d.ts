// global/managers.docs.d.ts
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
  class ManagerDocs {
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
     * Extracts all static methods from a class and returns them as a plain object
     * with each method bound to the class. This allows you to use the methods
     * as standalone functions while retaining their `this` context if needed.
     *
     * This pattern is especially useful for:
     * - Allowing hybrid export: you can export both the class and individual
     *   static methods.
     * - Making imports tree-shaking friendly: bundlers can include only the
     *   functions actually used in other modules, rather than importing the
     *   entire class.
     *
     * Example usage:
     * ```ts
     * class MyUtils {
     *   static foo() { console.log('foo'); }
     *   static bar() { console.log('bar'); }
     * }
     *
     * const { foo, bar } = exportStaticMethods(MyUtils);
     * foo(); // works
     * ```
     *
     * @template T - The class type to extract static methods from
     * @param cls - The class containing static methods
     * @returns An object containing all static methods of the class, bound to `cls`
     */
    static exportStaticMethods(): void;
  }
}

// This ensures TypeScript treats the file as a module
export {};
