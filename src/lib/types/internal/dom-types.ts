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
/**
 * Local alias for the native DOM ScrollLogicalPosition.
 * This resolves the ESLint 'no-undef' error and ensures
 * compatibility across different TS configurations.
 */
type TScrollLogicalPosition = 'center' | 'end' | 'start' | 'nearest';

type TScrollBehavior = 'auto' | 'smooth';

type THashScrollOptions = {
  href: string;
  behavior?: TScrollBehavior;
  block?: TScrollLogicalPosition;
  event?: { preventDefault: () => void };
};

export type {
  TKeyboardConfig,
  TShortcutDefinition,
  ModifierKey,
  TKeyboardActionResult,
  TBaseImageObject,
  THashScrollOptions,
};
