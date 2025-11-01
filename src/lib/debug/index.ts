import { isString, isUndefined, isBigInt } from '../guards';
import { REGEX_CONSTANTS, ANSI_COLOR_CODES, LOG_TYPES } from '../../constants';
import {
    TGetCallerLocationOptions,
    TLogOptions,
    THighlighterMap,
    TLogType
} from '../../types'

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
    success: (t) => highlight(t, 'green'),
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
export const getCallerLocation = (options: TGetCallerLocationOptions): string => {
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


export const logDev = (options: TLogOptions, ...args: unknown[]) => {
//   const { enabled = true, overrideDev = false, highlighters = {} } = options;


//   if (!overrideDev || !enabled) return;

//   // Determine log type
//   let type: TLogType = 'log';
//   if (!explicitType && typeof args[0] === 'string' && LOG_TYPES.includes(args[0] as TLogType)) {
//     type = args.shift() as TLogType;
//   }

//   // Handle table logs separately
//   if (type === 'table') {
//     const tableData = args.map((item: any) => {
//       if (item?.current) {
//         return item.current.map((l: any) => ({
//           key: l.key,
//           duration: l.end ? (l.end - l.start).toFixed(2) + 'ms' : 'in progress',
//         }));
//       }
//       return item;
//     });
//     console.table(tableData.flat());
//     return;
//   }

//   // Format and colorize messages
//   const highlighter = highlighters[type] ?? DebugUtils.logTypeHighlighters[type];
//   const messages = args.map((msg) => {
//     let text = typeof msg === 'object' ? DebugUtils.serialize(msg) : String(msg);
//     if (highlighters.default) text = highlighters.default(text);
//     return highlighter ? highlighter(text) : text;
//   });

//   (console[type] ?? console.log)(...messages);
};