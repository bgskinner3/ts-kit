import type { TKeyboardConfig } from '../types';
const HTML_TAGS = Object.freeze(['div', 'span', 'a', 'p', 'ul', 'li'] as const);
const SAFE_HTML_TAGS = Object.freeze([
  'b',
  'i',
  'p',
  'ul',
  'li',
  'a',
  'span',
  'div',
  'br',
  'strong',
  'em',
  'u',
  'code',
  'pre',
  'blockquote',
] as const);
const DEFAULT_KEYBOARD_CONFIG: Required<TKeyboardConfig> = {
  allowedKeys: [
    'arrowleft',
    'arrowright',
    'arrowup',
    'arrowdown',
    'backspace',
    'delete',
    'tab',
  ],
  clearKeys: ['backspace', 'delete'],
  copyShortcut: {
    key: 'c',
    modifiers: ['ctrl', 'meta'],
  },
  pasteShortcut: {
    key: 'v',
    modifiers: ['ctrl', 'meta'],
  },
} satisfies Required<TKeyboardConfig>;

export { DEFAULT_KEYBOARD_CONFIG, SAFE_HTML_TAGS, HTML_TAGS };
