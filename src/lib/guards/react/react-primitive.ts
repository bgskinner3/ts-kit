// lib/react/guards/primitive.ts
import type { TTypeGuard } from '../../../types';
import type {
  Ref,
  RefObject,
  ReactNode,
  ComponentType,
  ReactPortal,
  ForwardRefExoticComponent,
} from 'react';
import { isKeyInObject } from '../core/composite';
import { isDefined, isFunction, isObject, isNull } from '../core/reference';
/**
 * Internal helper to check if a value is a React-internal object
 * by validating its hidden `$$typeof` symbol.
 */
const hasReactSymbol = (value: unknown, symbol: symbol): boolean =>
  isKeyInObject('$$typeof')(value) && value.$$typeof === symbol;

/**
 * Checks if a value is a React Ref.
 * Validates both functional refs (callback refs) and object refs (createRef/useRef).
 *
 * @template T - The type of the element or value being referenced.
 */
export const isRef = <T>(value: unknown): value is Ref<T> =>
  isDefined(value) &&
  (isFunction(value) || (isObject(value) && 'current' in value));

/**
 * Specifically checks if a Ref is a RefObject (contains a `.current` property).
 * Useful for narrowing away from callback refs.
 */
export const isRefObject = <T>(ref: Ref<T>): ref is RefObject<T | null> =>
  !isNull(ref) && isObject(ref) && 'current' in ref;

/**
 * Checks if a value is a Promise or a "Thenable" object.
 * Validates the existence of a `.then()` function.
 */
export const isPromise = <T>(value: unknown): value is Promise<T> =>
  !!value && isKeyInObject('then')(value) && isFunction(value.then);

/**
 * Checks if a value is a React Portal.
 * Portals are created via `ReactDOM.createPortal` and contain a `containerInfo` property.
 */
export const isReactPortal: TTypeGuard<ReactPortal> = (
  value: unknown,
): value is ReactPortal =>
  isObject(value) && isKeyInObject('containerInfo')(value);

/**
 * Checks if an object contains a valid `children` property.
 * Useful for validating props objects or HOC inputs.
 */
export const hasChildren = (value: unknown): value is { children: ReactNode } =>
  isObject(value) &&
  isKeyInObject('children')(value) &&
  isDefined(value.children);

/**
 * Determines if a value is a valid React Component type.
 * Supports both Functional Components (functions) and Class Components
 * (objects with a `render` method on their prototype).
 */
export const isComponentType: TTypeGuard<ComponentType<unknown>> = (
  value: unknown,
): value is ComponentType<unknown> =>
  isFunction(value) ||
  (isKeyInObject('prototype')(value) &&
    isObject(value.prototype) &&
    isKeyInObject('render')(value.prototype) &&
    isFunction(value.prototype.render));
/**
 * Validates a ForwardRef component.
 * Using unknown instead of any for prop safety.
 */
export const isForwardRef: TTypeGuard<ForwardRefExoticComponent<object>> = (
  value: unknown,
): value is ForwardRefExoticComponent<object> =>
  hasReactSymbol(value, Symbol.for('react.forward_ref'));

/**
 * Validates a Memoized component.
 * Using unknown instead of any for prop safety.
 */
// export const isMemo: TTypeGuard<MemoExoticComponent<object>> = (
//   value: unknown,
// ): value is MemoExoticComponent<object> =>
//   hasReactSymbol(value, Symbol.for('react.memo'));
