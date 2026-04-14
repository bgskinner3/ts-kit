// lib/react/guards/primitive.ts
import type { TTypeGuard } from '../../types';
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
 * ## 🧩 isRef — Type Guard for React Refs
 *
 * Validates if a value is a valid React Ref, covering both **Functional (Callback) Refs**
 * and **Object Refs** (created via `useRef` or `createRef`).
 *
 * ---
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
 * ## 🧩 isRefObject — Type Guard for Persistent Ref Objects
 *
 * Specifically checks if a value is a `RefObject` (an object containing a `.current` property).
 * This effectively narrows the type away from Callback Refs.
 *
 * ---
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
 * ## 🧩 isPromise — Type Guard for Async Thenables
 *
 * Checks if a value is a `Promise` or a "Thenable" object by validating
 * the existence of a `.then()` method.
 *
 * ---
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
 * ## 🧩 isReactPortal — Type Guard for Portals
 *
 * Checks if a value is a `ReactPortal` created via `ReactDOM.createPortal`.
 * Validates the existence of the internal `containerInfo` property.
 */
export const isReactPortal: TTypeGuard<ReactPortal> = (
  value: unknown,
): value is ReactPortal =>
  isObject(value) && isKeyInObject('containerInfo')(value);

/**
 * ## 🧩 hasChildren — Type Guard for Prop Objects with Children
 *
 * Validates if an object contains a defined `children` property.
 * Useful for verifying props in HOCs or wrapper components.
 */
export const hasChildren = (value: unknown): value is { children: ReactNode } =>
  isObject(value) &&
  isKeyInObject('children')(value) &&
  isDefined(value.children);

/**
 * ## 🧩 isComponentType — Type Guard for React Components
 *
 * Determines if a value is a valid React Component (Function Component or Class Component).
 * For classes, it validates the existence of a `render` method on the prototype.
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
 * ## 🧩 isForwardRef — Type Guard for ForwardRef Components
 *
 * Validates if a component is wrapped in `React.forwardRef` by checking
 * the internal `$$typeof` symbol.
 */
export const isForwardRef: TTypeGuard<ForwardRefExoticComponent<object>> = (
  value: unknown,
): value is ForwardRefExoticComponent<object> =>
  hasReactSymbol(value, Symbol.for('react.forward_ref'));
