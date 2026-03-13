// lib/react/guards/node.ts
import type {
  TTypeGuard,
  TNamedComponent,
  TElementLike,
  THTMLTags,
} from '../../../types';
import type { ReactElement, ReactNode, MouseEvent } from 'react';
import { isPrimitive, isString } from '../core/primitives';
import { isArrayOf, isKeyInObject } from '../core/composite';
import { isNil, isFunction, isObject } from '../core/reference';
import { isReactPortal } from './react-primitive';
import { isValidElement, Fragment } from 'react';

/**
 * ## 🌳 isValidReactNode — Type Guard for all Renderable Content
 *
 * Validates if a value is a valid `ReactNode` (anything React can render).
 * This includes primitives, JSX elements, Portals, and recursive arrays of nodes.
 */
export const isValidReactNode: TTypeGuard<ReactNode> = (
  value: unknown,
): value is ReactNode =>
  isNil(value) ||
  isPrimitive(value) ||
  isValidElement(value) ||
  isReactPortal(value) || // Added portal support
  isArrayOf(isValidReactNode, value);

/**
 * ## 🌳 isReactElement — Type Guard for JSX Elements
 *
 * Validates if a value is a `ReactElement` (JSX).
 * Uses React's internal security checks to ensure the object is a legitimate element.
 */
export const isReactElement: TTypeGuard<ReactElement> = (
  value: unknown,
): value is ReactElement => isValidElement(value);

/**
 * ## 🌳 isFragment — Type Guard for React Fragments
 *
 * Narrow check to determine if a React Element is specifically a `<React.Fragment>`.
 */
export const isFragment: TTypeGuard<ReactElement> = (
  value: unknown,
): value is ReactElement => isValidElement(value) && value.type === Fragment;
/**
 * ## 🌳 hasOnClick — Type Guard for Interactive Elements
 *
 * Checks if a React Element has a valid `onClick` function in its props.
 * Useful for safely injecting behavior during `React.cloneElement`.
 *
 * ---
 * ### 📘 Example Usage
 * ```ts
 * if (hasOnClick(child)) {
 *   return React.cloneElement(child, {
 *     onClick: (e) => { console.log('Clicked!'); child.props.onClick(e); }
 *   });
 * }
 * ```
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
 * ## 🌳 isElementLike — Type Guard for Duck-Typed Elements
 *
 * Checks if an object "looks like" a React element (has type and props).
 * Useful for processing JSON-serialized components or objects from other environments.
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
 * ## 🌳 isElementOfType — Type Guard for Specific HTML Tags
 *
 * Validates if an element-like object matches a specific set of allowed HTML tags.
 *
 * @param allowedTypes - An array or string of tags to validate against (e.g., 'div' or ['a', 'button']).
 */
export const isElementOfType = <T extends THTMLTags>(
  element: unknown,
  allowedTypes: THTMLTags,
): element is { type: THTMLTags; props: object } =>
  isElementLike(element) && allowedTypes.includes(element.type as T);

/**
 * ## 🌳 hasNameMetadata — Type Guard for Named Components
 *
 * Checks if a React component type has identifying metadata like `displayName` or `name`.
 * Essential for debugging utilities or logging component names.
 */
export const hasNameMetadata = (type: unknown): type is TNamedComponent =>
  isFunction(type) &&
  (isObject(type) || isFunction(type)) &&
  (isKeyInObject('displayName')(type) ||
    isKeyInObject('name')(type) ||
    isKeyInObject('type')(type));
