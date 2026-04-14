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
 * @utilType Guard
 * @name isRef
 * @category Guards React
 * @description Validates if a value is a valid React Ref, covering both Callback Refs and Object Refs (createRef/useRef).
 * @link #isref
 *
 * ### 📘 Example Usage
 * ```ts
 * isRef((el) => { console.log(el) }); // true (Callback Ref)
 * isRef({ current: document.createElement('div') }); // true (Object Ref)
 * ```
 *
 * @template T - The type of the element or value being referenced.
 */
export const isRef = <T>(value: unknown): value is Ref<T> =>
  isDefined(value) &&
  (isFunction(value) || (isObject(value) && 'current' in value));

/**
 * @utilType Guard
 * @name isRefObject
 * @category Guards React
 * @description Specifically narrows a Ref type to an object containing a .current property (RefObject).
 * @link #isrefobject
 *
 * ### 📘 Example Usage
 * ```ts
 * const myRef = useRef(null);
 * if (isRefObject(myRef)) {
 *   // ✅ Safely access myRef.current
 * }
 * ```
 */
export const isRefObject = <T>(ref: Ref<T>): ref is RefObject<T | null> =>
  !isNull(ref) && isObject(ref) && 'current' in ref;

/**
 * @utilType Guard
 * @name isPromise
 * @category Guards Core
 * @description Checks if a value is a Promise or a "Thenable" by validating the existence of a .then() method.
 * @link #ispromise
 *
 * ### 📘 Example Usage
 * ```ts
 * if (isPromise(data)) {
 *   data.then((res) => console.log(res));
 * }
 * ```
 */
export const isPromise = <T>(value: unknown): value is Promise<T> =>
  !!value && isKeyInObject('then')(value) && isFunction(value.then);

/**
 * @utilType Guard
 * @name isReactPortal
 * @category Guards React
 * @description Validates if a value is a ReactPortal created via ReactDOM.createPortal.
 * @link #isreactportal
 */
export const isReactPortal: TTypeGuard<ReactPortal> = (
  value: unknown,
): value is ReactPortal =>
  isObject(value) && isKeyInObject('containerInfo')(value);

/**
 * @utilType Guard
 * @name hasChildren
 * @category Guards React
 * @description Validates if a props object contains a defined children property.
 * @link #haschildren
 */
export const hasChildren = (value: unknown): value is { children: ReactNode } =>
  isObject(value) &&
  isKeyInObject('children')(value) &&
  isDefined(value.children);

/**
 * @utilType Guard
 * @name isComponentType
 * @category Guards React
 * @description Determines if a value is a valid React Component (Function or Class Component).
 * @link #iscomponenttype
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
 * @utilType Guard
 * @name isForwardRef
 * @category Guards React
 * @description Validates if a component is wrapped in React.forwardRef.
 * @link #isforwardref
 */
export const isForwardRef: TTypeGuard<ForwardRefExoticComponent<object>> = (
  value: unknown,
): value is ForwardRefExoticComponent<object> =>
  hasReactSymbol(value, Symbol.for('react.forward_ref'));
