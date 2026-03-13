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
 * @see {@link DebugUtilsDocs.serialize}
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
 * @see {@link DebugUtilsDocs.getCallerLocation}
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

/** @see {@link DebugUtilsDocs.logDev} for default color/highlight mappings. */
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

// export class DebugUtils {
//   private readonly isDev = process.env.NODE_ENV !== 'production';
//   private readonly cwd = process.cwd();
//   private static readonly highlighters: THighlighterMap = {
//     log: (t) => DebugUtils.highlight(t, 'yellow'),
//     info: (t) => DebugUtils.highlight(t, 'cyan'),
//     error: (t) => DebugUtils.highlight(t, 'red'),
//     debug: (t) => DebugUtils.highlight(t, 'magenta'),
//     warn: (t) => DebugUtils.highlight(t, 'yellow'),
//     table: (t) => t,
//   };

//   public static highlight(
//     text: string,
//     colorCode: keyof typeof ANSI_COLOR_CODES = 'yellow',
//   ) {
//     return `${ANSI_COLOR_CODES[colorCode]}${text}${ANSI_COLOR_CODES.reset}`;
//   }
//   public serialize(data: unknown): string {
//     if (data == null) return '';
//     if (isString(data)) return data;

//     try {
//       return JSON.stringify(data, (_, v) => (isBigInt(v) ? `${v}n` : v), 2);
//     } catch {
//       return String(data);
//     }
//   }
//   public getCallerLocation(options: TGetCallerLocationOptions = {}): string {
//     const {
//       preferredIndex = 3,
//       fallbackIndex = 2,
//       topParent = false,
//       stripPathPrefix = this.cwd,
//     } = options;

//     const stack = new Error().stack;
//     if (!stack) return 'unknown';

//     const lines = stack
//       .split('\n')
//       .slice(1)
//       .map((line) => line.replace(REGEX_CONSTANTS.stackTracePrefix, '').trim())
//       .filter(Boolean);

//     const line = topParent
//       ? ([...lines].reverse().find((l) => !l.includes('node_modules')) ??
//         lines.at(-1))
//       : (lines[preferredIndex] ?? lines[fallbackIndex] ?? lines.at(-1));

//     return stripPathPrefix
//       ? (line?.replace(stripPathPrefix, '') ?? 'unknown')
//       : (line ?? 'unknown');
//   }

//   public logDev = (options: TLogOptions, ...args: unknown[]) => {
//     const isDev = process.env.NODE_ENV !== 'production';
//     const { enabled = true, overrideDev = false } = options;

//     if (!enabled) return;
//     if (!isDev && !overrideDev) return;

//     //   // Determine log type
//     let type: TLogType = 'log';
//     const currentType = args[0];
//     if (isString(currentType) && isKeyOfArray(LOG_TYPES)(currentType)) {
//       type = currentType;
//     }

//     // Handle table logs separately
//     if (type === 'table') {
//       const tableData = ArrayUtils.map(args, (item: unknown) => {
//         if (item && isObject(item) && 'current' in item) {
//           // assume item.current is iterable
//           const curr = (item as { current: TTableItem[] }).current;
//           return curr.map((l) => ({
//             key: l.key,
//             duration:
//               l.end && l.start
//                 ? `${(l.end - l.start).toFixed(2)}ms`
//                 : 'in progress',
//           }));
//         }
//         return item;
//       });
//       console.table(tableData.flat());
//       return;
//     }

//     const highlighter = DebugUtils.highlighters[type];
//     const messages = args.map((msg) => {
//       let text = isObject(msg) ? this.serialize(msg) : String(msg);

//       return highlighter ? highlighter(text) : text;
//     });

//     (console[type] ?? console.log)(...messages);
//   };
// }
