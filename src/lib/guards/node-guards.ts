// lib/react/guards/node.ts
import type {
  TTypeGuard,
  TNamedComponent,
  TElementLike,
  THTMLTags,
} from '../../types';
import type { ReactElement, ReactNode, MouseEvent } from 'react';
import { isPrimitive, isString } from './primitives';
import { isArrayOf, isKeyInObject } from './composite';
import { isNil, isFunction, isObject } from './reference';
import { isReactPortal } from './react-primitive';
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
/**
 * Checks if a React Element has a valid `onClick` handler in its props.
 * Useful for cloning elements and injecting click behavior safely.
 */
export const hasOnClick: TTypeGuard<
  ReactElement<{ onClick?: (e: MouseEvent<HTMLElement>) => void }>
> = (
  value: unknown,
): value is ReactElement<{
  onClick?: (e: MouseEvent<HTMLElement>) => void;
}> => {
  return (
    isReactElement(value) &&
    !isNil(value.props) &&
    isKeyInObject('onClick')(value.props) &&
    isFunction(value.props.onClick)
  );
};
/**
 * Checks if an object "looks like" a React element without requiring the React Symbol.
 * Useful for processing JSON-serialized components or third-party objects.
 */
export const isElementLike: TTypeGuard<TElementLike> = (
  element: unknown,
): element is TElementLike =>
  isObject(element) &&
  isKeyInObject('type')(element) &&
  isKeyInObject('props')(element) &&
  isObject(element.props) &&
  (isString(element.type) || isFunction(element.type));

/**
 * Validates if an element-like object matches a specific set of HTML tags.
 */
export const isElementOfType = <T extends THTMLTags>(
  element: unknown,
  allowedTypes: THTMLTags,
): element is { type: THTMLTags; props: object } =>
  isElementLike(element) && allowedTypes.includes(element.type as T);

/**
 * Guard to check if a React component type has identifying metadata.
 * Unlocks 'displayName' and 'name' for safe access.
 */
export const hasNameMetadata = (type: unknown): type is TNamedComponent =>
  (isObject(type) || isFunction(type)) &&
  (isKeyInObject('displayName')(type) ||
    isKeyInObject('name')(type) ||
    isKeyInObject('type')(type));
