type TLogType =
    | 'log'
    | 'warn'
    | 'error'
    | 'info'
    | 'debug'
    | 'table'
    | 'success';

type THighlighterMap = Record<TLogType, (text: string) => string>;

type TLogOptions = {
    enabled?: boolean; // optional per-call controller
    highlighters?: THighlighterMap;
    overrideDev?: boolean;
};
type TGetCallerLocationOptions = {
    preferredIndex?: number;
    /** Fallback index if preferredIndex is not available (default: 2) */
    fallbackIndex?: number;
    /** Whether to get the top-level parent function instead of preferredIndex (default: false) */
    topParent?: boolean;
    /** Path prefix to strip from the returned line (default: process.cwd()) */
    stripPathPrefix?: string;
};


export type {
    TGetCallerLocationOptions,
    TLogOptions,
    THighlighterMap,
    TLogType
}