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
     * Logs messages to the console **only in development environment** unless overridden.
     * Supports standard log types ('log', 'warn', 'error', 'info', 'debug') as well as
     * table logging for structured data.
     *
     * @remarks
     * - If the first argument matches a log type in `LOG_TYPES`, it is treated as the type.
     * - Table logs are automatically formatted if the items contain a `current` array of objects.
     * - Each message is stringified if it is an object.
     * - Optional highlighters can be applied via `logTypeHighlighters`.
     *
     * @param options - Configuration options for this log call
     * @param options.enabled - Whether this log should be enabled (default: true)
     * @param options.overrideDev - Force logging even in production (default: false)
     * @param args - Messages to log. If the first item is a log type string, it is used as the type.
     *
     * @example
     * ```ts
     * logDev({}, 'info', 'Server started on port', 3000);
     *
     * logDev({ overrideDev: true }, 'error', new Error('Something failed'));
     *
     * logDev({}, 'table', { current: [{ key: 'task1', start: 0, end: 120 }] });
     * ```
     *
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

    /**
     * DebugUtils – a collection of development-time utilities for logging, serializing, and
     * inspecting code execution context. These utilities are primarily intended for
     * debugging and development use, and automatically suppress logs in production
     * unless explicitly overridden.
     *
     * @remarks
     * The module provides the following functionality:
     *
     * 1. `logDev(options: TLogOptions, ...args: unknown[])`
     *    - Logs messages to the console in development mode.
     *    - Supports standard log types: 'log', 'warn', 'error', 'info', 'debug', and 'table'.
     *    - Table logging expects objects with a `.current` array of `TTableItem` objects
     *      and formats `key` + `duration` values automatically.
     *    - Optional `enabled` and `overrideDev` flags allow conditional logging.
     *    - Example usage:
     *      ```ts
     *      logDev({}, 'info', 'Server started on port', 3000);
     *      logDev({ overrideDev: true }, 'error', new Error('Failed'));
     *      logDev({}, 'table', { current: [{ key: 'task1', start: 0, end: 120 }] });
     *      ```
     *
     * 2. `getCallerLocation(options: TGetCallerLocationOptions): string`
     *    - Retrieves the call site (function + file/line) from the current stack trace.
     *    - Options:
     *        - `preferredIndex`: index in stack trace to use (default 3)
     *        - `fallbackIndex`: fallback index if preferred fails (default 2)
     *        - `topParent`: use top-most non-node_module frame
     *        - `stripPathPrefix`: remove a prefix from file paths (default: process.cwd())
     *    - Example usage:
     *      ```ts
     *      const loc = getCallerLocation({ preferredIndex: 3 });
     *      console.log(loc); // "MyService.fetchData (src/services/my-service.ts:91:22)"
     *      ```
     *
     * 3. `serialize(data: unknown): string`
     *    - Safely serializes any JavaScript value into a readable string.
     *    - Handles `undefined`, strings, and `bigint` values automatically.
     *    - Example usage:
     *      ```ts
     *      serialize({ a: 1n, b: 'hello' });
     *      // Output:
     *      // `{
     *      //   "a": "1",
     *      //   "b": "hello"
     *      // }`
     *      ```
     *
     * 4. `logTypeHighlighters: THighlighterMap`
     *    - Provides default ANSI color mappings for different log types.
     *    - Can be used to customize output colors in `logDev`.
     *    - Example usage:
     *      ```ts
     *      console.log(logTypeHighlighters.info('This is cyan'));
     *      ```
     *
     * @example
     * ```ts
     * import { DebugUtils } from './debug-utils';
     *
     * DebugUtils.logDev({}, 'debug', 'This will only show in development');
     *
     * const caller = DebugUtils.getCallerLocation({ topParent: true });
     * console.log('Caller:', caller);
     *
     * console.log(DebugUtils.serialize({ big: 123n }));
     * ```
     *
     * @see {@link logTypeHighlighters} for default color/highlight mappings.
     * @see {@link TLogOptions} for logging options type.
     * @see {@link TTableItem} for structured table logging format.
     */
    static DebugUtils(): void;
  }
}

// This ensures TypeScript treats the file as a module
export {};
