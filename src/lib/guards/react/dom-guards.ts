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
 * @utilType util
 * @name isPropValid
 * @category Guards React
 * @description Memoized validator that checks if a string is a standard DOM attribute, SVG attribute, or React event handler.
 * @link #ispropvalid
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
 * @utilType Guard
 * @name isDOMPropKey
 * @category Guards React
 * @description Type guard to verify if an unknown value is a string that represents a valid DOM property.
 * @link #isdompropkey

 */
export const isDOMPropKey: TTypeGuard<string> = (
  value: unknown,
): value is string => isString(value) && isPropValid(value);
/**
 * @utilType Guard
 * @name isDOMEntry
 * @category Guards React
 * @description Validates if a key-value pair entry represents a valid DOM property for a specific HTML element type.
 * @link #isdomentry
 */
export const isDOMEntry = <TElement extends ElementType>(
  entry: [PropertyKey, unknown],
): entry is [
  Extract<keyof ComponentPropsWithoutRef<TElement>, string>,
  unknown,
] => isString(entry[0]) && isDOMPropKey(entry[0]);
