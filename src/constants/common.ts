import { SAFE_HTML_TAGS } from './dom';

const LOG_TYPES = Object.freeze([
  'log',
  'warn',
  'error',
  'info',
  'debug',
  'table',
] as const);

const REGEX_CONSTANTS = {
  isoRegex:
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/,
  camelCase: /^[a-z]+(?:[A-Z][a-z0-9]*)*$/,
  kebabCase: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
  snakeCase: /^[a-z0-9]+(?:_[a-z0-9]+)*$/,
  hexString: /^[0-9a-fA-F]+$/,
  hexColor: /^[0-9A-Fa-f]{6}$/,
  letterSeparator: /[^A-Za-z]+/g,
  camelCaseBoundary: /(?:^\w|[A-Z]|\b\w)/g,
  kebabCaseBoundary: /([a-z0-9])([A-Z])/g,
  whitespace: /\s+/g,
  wordBoundarySplitter: /[^A-Za-z0-9]+/g,
  USPhoneNumber: /^(?:\+1\s?)?(?:\(\d{3}\)|\d{3})[-.\s]?\d{3}[-.\s]?\d{4}$/,
  EUPhoneNumber: /^\+?\d{1,4}[\s.-]?\d{2,4}([\s.-]?\d{2,4}){1,3}$/,
  genericPhoneNumber: /^\+?(\d[\d\s-().]{6,}\d)$/,
  genericEmail: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  emailRegex:
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/,
  imageSrcRegex: /<img[^>]+src="([^">]+)"/i,
  singleAlphabetChar: /^[a-zA-Z]$/,
  htmlDetection: new RegExp(
    `<\\/?(${SAFE_HTML_TAGS.join('|')})\\b[^>]*>|&[a-z]+;`,
    'i',
  ),
  stackTracePrefix: /^\s*at\s+/,
} as const;

const ANSI_COLOR_CODES = {
  reset: '\x1b[0m',
  black: '\x1b[30m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  bold: '\x1b[1m',
  underline: '\x1b[4m',
} as const;

export { REGEX_CONSTANTS, ANSI_COLOR_CODES, LOG_TYPES };
