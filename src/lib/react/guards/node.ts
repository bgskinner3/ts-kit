// lib/react/guards/node.ts
import type { TTypeGuard } from '../../../types';
import type { ReactElement, ReactNode } from 'react';
import {
  isArrayOf,
  isNil,
  isPrimitive,
} from '../../guards';
import { isReactPortal } from './primitive';
import { isValidElement, Fragment } from 'react';
export const isValidReactNode: TTypeGuard<ReactNode> = (
  value: unknown,
): value is ReactNode =>
  isNil(value) ||
  isPrimitive(value) ||
  isValidElement(value) ||
  isReactPortal(value) || // Added portal support
  isArrayOf(isValidReactNode, value);

/**
 * Validates if a value is a React Element (JSX).
 * Uses React's internal $$typeof check for security.
 */
export const isReactElement: TTypeGuard<ReactElement> = (
  value: unknown,
): value is ReactElement => isValidElement(value);

/**
 * Narrow check for Fragments.
 */
export const isFragment: TTypeGuard<ReactElement> = (
  value: unknown,
): value is ReactElement => isValidElement(value) && value.type === Fragment;