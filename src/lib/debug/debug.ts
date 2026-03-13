import {
  isString,
  isUndefined,
  isBigInt,
  isObject,
  isKeyOfArray,
} from '../guards/core';
import { REGEX_CONSTANTS, ANSI_COLOR_CODES, LOG_TYPES } from '../../constants';
import {
  TGetCallerLocationOptions,
  TLogOptions,
  THighlighterMap,
  TLogType,
  TTableItem,
} from '../../types';
import { ArrayUtils } from '../common';

export function highlight(
  text: string,
  colorCode: keyof typeof ANSI_COLOR_CODES = 'yellow',
) {
  return `${ANSI_COLOR_CODES[colorCode]}${text}${ANSI_COLOR_CODES.reset}`;
}

/** Common terminal color mappings */
export const logTypeHighlighters: THighlighterMap = {
  log: (t) => highlight(t, 'yellow'),
  info: (t) => highlight(t, 'cyan'),
  error: (t) => highlight(t, 'red'),
  debug: (t) => highlight(t, 'magenta'),
  warn: (t) => highlight(t, 'yellow'),
  table: (t) => t,
};

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
export const serialize = (data: unknown): string => {
  if (isUndefined(data)) return '';
  if (isString(data)) return data;

  try {
    return JSON.stringify(
      data,
      (_, value) => (isBigInt(value) ? value.toString() : value),
      2,
    );
  } catch {
    return String(data);
  }
};

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
export const getCallerLocation = (
  options: TGetCallerLocationOptions,
): string => {
  const {
    preferredIndex = 3,
    fallbackIndex = 2,
    topParent = false,
    stripPathPrefix = process.cwd(),
  } = options;

  const stack = new Error().stack;
  if (!stack) return 'unknown';

  const lines = stack
    .split('\n')
    .slice(1)
    .map((line) => line.replace(REGEX_CONSTANTS.stackTracePrefix, '').trim())
    .filter(Boolean);

  const line = topParent
    ? ([...lines].reverse().find((l) => !l.includes('node_modules')) ??
      lines.at(-1))
    : (lines[preferredIndex] ?? lines[fallbackIndex] ?? lines.at(-1));

  return stripPathPrefix
    ? (line?.replace(stripPathPrefix, '') ?? 'unknown')
    : (line ?? 'unknown');
};

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
export const logDev = (options: TLogOptions, ...args: unknown[]) => {
  const isDev = process.env.NODE_ENV !== 'production';
  const { enabled = true, overrideDev = false } = options;

  if (!enabled) return;
  if (!isDev && !overrideDev) return;

  //   // Determine log type
  let type: TLogType = 'log';
  const currentType = args[0];
  if (isString(currentType) && isKeyOfArray(LOG_TYPES)(currentType)) {
    type = currentType;
  }

  // Handle table logs separately
  if (type === 'table') {
    const tableData = ArrayUtils.map(args, (item: unknown) => {
      if (item && isObject(item) && 'current' in item) {
        // assume item.current is iterable
        const curr = (item as { current: TTableItem[] }).current;
        return curr.map((l) => ({
          key: l.key,
          duration:
            l.end && l.start
              ? `${(l.end - l.start).toFixed(2)}ms`
              : 'in progress',
        }));
      }
      return item;
    });
    console.table(tableData.flat());
    return;
  }

  const highlighter = logTypeHighlighters[type];
  const messages = args.map((msg) => {
    let text = isObject(msg) ? serialize(msg) : String(msg);

    return highlighter ? highlighter(text) : text;
  });

  (console[type] ?? console.log)(...messages);
};
