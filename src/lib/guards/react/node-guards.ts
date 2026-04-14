// lib/react/guards/node.ts
import type {
  TTypeGuard,
  TNamedComponent,
  TElementLike,
  THTMLTags,
  TPropType,
} from '../../../types';
import type {
  ReactElement,
  ReactNode,
  MouseEvent,
  ComponentProps,
  ComponentType,
} from 'react';
import { isPrimitive, isString } from '../core/primitives';
import { isArrayOf, isKeyInObject } from '../core/composite';
import { isNil, isFunction, isObject } from '../core/reference';
import { isReactPortal } from './react-primitive';
import { isValidElement, Fragment } from 'react';

/**
 * @utilType Guard
 * @name isValidReactNode
 * @category Guards React
 * @description Validates if a value is a valid ReactNode (primitives, elements, portals, or arrays of nodes).
 * @link #isvalidreactnode
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
 * @utilType Guard
 * @name isReactElement
 * @category Guards React
 * @description Alias for React's isValidElement to identify valid React elements.
 * @link #isreactelement
 */
export const isReactElement: TTypeGuard<ReactElement> = (
  value: unknown,
): value is ReactElement => isValidElement(value);

/**
 * @utilType Guard
 * @name isFragment
 * @category Guards React
 * @description Checks if a React element is a Fragment (<>...</>).
 * @link #isfragment
 */
export const isFragment: TTypeGuard<ReactElement> = (
  value: unknown,
): value is ReactElement => isValidElement(value) && value.type === Fragment;
/**
 * @utilType Guard
 * @name hasOnClick
 * @category Guards React
 * @description Validates if a React element has a valid onClick function in its props.
 * @link #hasonclick
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
 * @utilType Guard
 * @name isElementLike
 * @category Guards React
 * @description Validates if an object mimics the shape of a React element (having type and props).
 * @link #iselementlike
.
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
 * @utilType Guard
 * @name isElementOfType
 * @category Guards React
 * @description Checks if a React-like element matches a specific set of allowed HTML tag types.
 * @link #iselementoftype
 */
export const isElementOfType = <T extends THTMLTags>(
  element: unknown,
  allowedTypes: THTMLTags,
): element is { type: THTMLTags; props: object } =>
  isElementLike(element) && allowedTypes.includes(element.type as T);

/**
 * @utilType Guard
 * @name hasNameMetadata
 * @category Guards React
 * @description Checks if a component type has identifiable metadata (displayName, name, or type).
 * @link #hasnamemetadata
 */
export const hasNameMetadata = (type: unknown): type is TNamedComponent =>
  isFunction(type) &&
  (isObject(type) || isFunction(type)) &&
  (isKeyInObject('displayName')(type) ||
    isKeyInObject('name')(type) ||
    isKeyInObject('type')(type));

/**
 * @utilType Guard
 * @name createPropGuard
 * @category Guards React
 * @description Factory that creates a type guard for specific component props.
 * @link #createpropguard
 * @example
 * ```ts
 * import StatusIndicator from './StatusIndicator';
 *
 * // Create a type guard for the "indicator" prop
 * const isIndicator = createPropGuard<typeof StatusIndicator, 'indicator'>();
 *
 * const rawValue: string = "positive";
 *
 * if (isIndicator(rawValue)) {
 *   // TS now treats rawValue as StatusIndicatorProps['indicator']
 *   return <StatusIndicator indicator={rawValue} />;
 * }
 * ```
 *
 */
export function createPropGuard<
  T extends ComponentType<object>,
  K extends keyof ComponentProps<T>,
>(): TTypeGuard<TPropType<T, K>> {
  /* prettier-ignore */ const guard: TTypeGuard<TPropType<T, K>> = 
  (value: unknown): value is TPropType<T, K> => {
    return isPrimitive(typeof value);
  };

  return guard;
}
