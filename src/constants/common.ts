const REGEX_CONSTANTS = {
  isoRegex:
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/,
  camelCase: /^[a-z]+(?:[A-Z][a-z0-9]*)*$/,
  hexString: /^[0-9a-fA-F]+$/,
  hexColor: /^[0-9A-Fa-f]{6}$/,
  letterSeparator: /[^A-Za-z]+/g,
  camelCaseBoundary: /(?:^\w|[A-Z]|\b\w)/g,
  kebabCaseBoundary: /([a-z0-9])([A-Z])/g,
  whitespace: /\s+/g,
  wordBoundarySplitter: /[^A-Za-z0-9]+/g,
} as const;

const HTML_TAGS = Object.freeze(['div', 'span', 'a', 'p', 'ul', 'li'] as const);

export { REGEX_CONSTANTS, HTML_TAGS };
