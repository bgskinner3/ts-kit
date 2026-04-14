// lib/guards/dom.ts
import { VALID_DOM_PROPS } from '../../../constants';
import { ObjectUtils } from '../../common';
import type { TTypeGuard } from '../../../types';
import type { ElementType, ComponentPropsWithoutRef } from 'react';
import { isString } from '../core/primitives';
import { memoize } from '../../common/memoize';

// 1. Build the regex string once at module load
// Note: If VALID_DOM_PROPS is a Set, use [...VALID_DOM_PROPS].join('|')
const allDomKeys = ObjectUtils.keys(VALID_DOM_PROPS).join('|');

const reactPropsRegex = new RegExp(
  `^((${allDomKeys})|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$`,
);
/**
 * Validates if a property is a standard DOM/SVG attribute or event handler.
 * Memoized to ensure O(1) lookups after the first check.
 */
export const isPropValid = memoize((prop: string): boolean => {
  return (
    reactPropsRegex.test(prop) ||
    (prop.charCodeAt(0) === 111 /* o */ &&
      prop.charCodeAt(1) === 110 /* n */ &&
      prop.charCodeAt(2) < 91) /* Z+1 */
  );
});
/**
 * Type guard to check if a value is a valid DOM property string.
 */
export const isDOMPropKey: TTypeGuard<string> = (
  value: unknown,
): value is string => isString(value) && isPropValid(value);
/**
 * Checks if a key-value entry represents a valid DOM property for a specific element.
 */
export const isDOMEntry = <TElement extends ElementType>(
  entry: [PropertyKey, unknown],
): entry is [
  Extract<keyof ComponentPropsWithoutRef<TElement>, string>,
  unknown,
] => isString(entry[0]) && isDOMPropKey(entry[0]);
