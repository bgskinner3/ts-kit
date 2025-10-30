// global/types.docs.d.ts
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
  class TypeDocs {
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
     * `StaticMethods<T>`
     *
     * Extracts all **static method keys** from a class type `T` and maps them to their corresponding function types.
     *
     * Essentially, it filters out non-function properties (like `prototype`, `name`, `length`, or other fields)
     * and leaves only the callable static methods. This is useful for:
     * - Automatically exporting all static methods from a class
     * - Creating type-safe bindings of static methods
     * - Utilities like `exportStaticMethods` that wrap or destructure class statics
     *
     * @template T - The class type to extract static methods from
     */
    static TStaticMethods(): void;
  }
}

// This ensures TypeScript treats the file as a module
export {};
