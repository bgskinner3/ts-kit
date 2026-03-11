type TKeyboardActionResult = {
  isPaste: boolean;
  isCopy: boolean;
  isClear: boolean;
  isAllowedKey: boolean;
  shouldBlockTyping: boolean;
};
type ModifierKey = 'ctrl' | 'meta' | 'alt' | 'shift';

type TShortcutDefinition = {
  key: string;
  modifiers: ModifierKey[];
};

type TKeyboardConfig = {
  allowedKeys?: string[];
  clearKeys?: string[];
  copyShortcut?: TShortcutDefinition;
  pasteShortcut?: TShortcutDefinition;
};

type TBaseImageObject = {
  src: string;
  [key: string]: unknown;
};

export type {
  TKeyboardConfig,
  TShortcutDefinition,
  ModifierKey,
  TKeyboardActionResult,
  TBaseImageObject,
};
