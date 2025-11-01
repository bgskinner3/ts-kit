// global/common-utils.docs.d.ts
declare global {
  class DebugUtilsDocs {
    /**
     * UTIL LOCATION: DEBUG UTILS
     *
     *
     * Retrieves the caller's location (file, line, and column) from the stack trace.
     *
     * Useful for logging, debugging, and tracing where a function was called from.
     *
     * It works by inspecting `Error().stack` and extracting relevant frames.
     *
     * @param preferredIndex - The zero-based stack frame index to prioritize (default: 3).
     * @param fallbackIndex - The fallback frame index if the preferred frame doesn’t exist (default: 2).
     * @param topParent - If `true`, returns the top-most relevant stack frame in your code (skipping `node_modules`).
     * @param stripPathPrefix - If provided, removes this prefix (e.g., your project root path) from the returned string.
     *
     * @returns A string describing the caller’s location, e.g. `"src/utils/core/debug.ts:42:15"`.
     *
     * @example
     * ```ts
     * import { DebugUtils } from '@/utils/core/debug';
     *
     * function exampleFunction() {
     *   console.log(DebugUtils.getCallerLocation());
     * }
     *
     * exampleFunction();
     * // Example output:
     * // "src/utils/core/debug.ts:12:5"
     * ```
     *
     * @example
     * ```ts
     * // Get the top-most relevant frame (ignoring node_modules)
     * console.log(DebugUtils.getCallerLocation(3, 2, true));
     * // Example output:
     * // "src/server/api/user.ts:88:17"
     * ```
     *
     * @example
     * ```ts
     * // Strip out the absolute path prefix for cleaner logs
     * console.log(DebugUtils.getCallerLocation(3, 2, false, process.cwd()));
     * // Example output:
     * // "/src/services/logger.ts:54:9"
     * ```
     */
    static getCallerLocation(): void;

    /**
     * UTIL LOCATION: DEBUG UTILS
     *
     * Logs messages to the console only in development mode (unless overridden).
     *
     * - Supports `log`, `warn`, `error`, `info`, and `debug`.
     * - Serializes objects and BigInts safely.
     * - Supports per-type or default color highlighting.
     *
     * @example
     * ```ts
     * DebugUtils.logDev('warn', 'This is a warning');
     * DebugUtils.logDev('error', 'Something went wrong', err);
     * DebugUtils.logDev('Just a regular message');
     * ```
     *
     * @example
     * ```ts
     * // Custom color highlighting
     * DebugUtils.logDev('debug', 'Server started', {
     *   highlighters: { default: (t) => `\x1b[32m${t}\x1b[0m` }
     * });
     * ```
     */
    static logDev(): void;

    /**
     * Safely serializes any value into a readable string.
     *
     * - Handles objects, BigInts, and circular structures gracefully.
     * - Pretty-prints JSON for readability.
     *
     * @example
     * ```ts
     * DebugUtils.serialize({ foo: 'bar' });
     * // => "{\n  \"foo\": \"bar\"\n}"
     * ```
     */
    static serialize(): void;
  }
}

// This ensures TypeScript treats the file as a module
export {};
