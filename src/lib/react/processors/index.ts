import type {
  Ref,
  RefCallback,
  CSSProperties,
  SyntheticEvent,
  ComponentPropsWithoutRef,
  ElementType,
  ReactElement,
  ReactNode,
} from 'react';
import { isFunction, isString } from '../../guards';
import {
  isRef,
  isRefObject,
  isDOMEntry,
  isReactElement,
  hasNameMetadata,
} from '../guards';
import { ArrayUtils, ObjectUtils } from '../../common';
import { Children } from 'react';
/**
 * Combines multiple React refs (callback refs or object refs) into a single ref callback.
 *
 * This is especially useful when a component needs to:
 * 1. Forward a ref to its parent via `forwardRef`
 * 2. Maintain its own internal ref for hooks like `useInView`, animations, or measurements
 *
 * The returned callback handles both:
 * - Function refs (calls the function with the new value)
 * - Object refs (assigns the `current` property)
 * - Properly supports `null` for unmounting
 *
 * @example
 * ```ts
 * const combinedRef = mergeRefs(forwardedRef, internalRef);
 * <div ref={combinedRef} />
 * ```
 *
 * @param refs - One or more React refs (callback or object refs)
 * @returns A single callback that updates all provided refs with the same value
 */
export const mergeRefs = <T>(
  ...refs: (Ref<T> | undefined)[]
): RefCallback<T> => {
  const validRefs = ArrayUtils.filter<Ref<T> | undefined, Ref<T>>(refs, isRef);

  return (value: T | null) => {
    for (const ref of validRefs) {
      if (isFunction(ref)) {
        ref(value);
      } else if (isRefObject(ref)) {
        ref.current = value;
      }
    }
  };
};
/**
 * Lazily evaluates the properties of an object that are functions and caches the results.
 *
 * This utility is useful when you have an object with expensive-to-compute properties
 * (functions) that you don’t want to execute until they are actually accessed. It also
 * ensures that each property is only computed **once**, even if accessed multiple times.
 *
 * The original object is **not mutated**; all computed results are stored in an internal cache.
 *
 * ### Features
 * - Lazy evaluation of function properties.
 * - Caches results for repeated access.
 * - Safe for shared or frozen objects.
 * - Works only on original string keys of the object.
 *
 * ### Example
 * ```ts
 * const config = {
 *   a: 10,
 *   b: () => Math.random() * 100,
 *   c: () => 'computed',
 * };
 *
 * const lazyConfig = lazyProxy(config);
 *
 * console.log(lazyConfig.a); // 10
 * console.log(lazyConfig.b); // e.g., 42.3 (evaluated only once)
 * console.log(lazyConfig.b); // same value as above (cached)
 * console.log(lazyConfig.c); // 'computed'
 * ```
 *
 * ### Use Cases
 * - Configuration objects with expensive default values.
 * - Large objects where some properties are rarely used.
 * - Avoiding repeated computation in utility objects or library settings.
 * - Safe lazy initialization in complex apps without mutating original objects.
 *
 * @param obj - The object whose function properties should be lazily evaluated.
 * @returns A proxied version of the object where function properties are evaluated lazily and cached.
 */
export function lazyProxy<T extends Record<string, unknown>>(obj: T): T {
  const cache = new Map<keyof T, unknown>();
  const keys = new Set<keyof T>(ObjectUtils.keys(obj));

  return new Proxy(obj, {
    get(target, prop: keyof T | string | symbol, receiver: T) {
      if (!isString(prop) || !keys.has(prop as keyof T)) {
        return Reflect.get(target, prop, receiver);
      }
      // Return cached value if already resolved
      if (cache.has(prop as keyof T)) {
        return cache.get(prop as keyof T);
      }

      const value = target[prop as keyof T];

      if (isFunction(value)) {
        const result = value();
        cache.set(prop as keyof T, result);
        return result;
      }
      return value;
    },
  });
}
/**
 * Merges CSS variables with an optional style object.
 *
 * @param vars - An object where keys are CSS variable names (like '--my-var') and values are strings
 * @param style - Optional existing style object to merge
 * @returns A CSSProperties object ready to pass to a React component
 */
export function mergeCssVars<
  T extends Record<string, string | number | undefined>,
>(vars: T, style?: CSSProperties): CSSProperties {
  const filteredVars: Record<string, string> = ObjectUtils.fromEntries(
    ObjectUtils.entries(vars)
      .filter(([_, value]) => value !== undefined && value !== '')
      .map(([key, value]) => [key, value!.toString()]), // ensure number -> string
  );

  return {
    ...filteredVars,
    ...style,
  };
}
/**
 * Merges a user-provided event handler with an internal component handler.
 *
 * The `internalHandler` will only execute if the `userHandler` does not call
 * `event.preventDefault()`. This allows users of your component to opt-out
 * of default behaviors.
 *
 * @template E - The type of the SyntheticEvent (e.g., React.MouseEvent)
 * @param userHandler - The external handler passed via props
 * @param internalHandler - The library/internal logic that should run by default
 * @returns A single function that orchestrates both calls
 *
 * @example
 * ```tsx
 * const handleClick = mergeEventHandlerClicks<React.MouseEvent>(
 *   props.onClick,
 *   (e) => console.log("Internal logic ran!")
 * );
 *
 * // In the component:
 * <button onClick={handleClick}>Click Me</button>
 * ```
 */
export function mergeEventHandlerClicks<E extends SyntheticEvent>(
  userHandler?: (event: E) => void,
  internalHandler?: (event: E) => void,
) {
  return (event: E) => {
    userHandler?.(event);

    if (!event.defaultPrevented) {
      internalHandler?.(event);
    }
  };
}
/**
 * Automatically extracts valid DOM props from a combined props object.
 *
 * This utility prevents React warnings like: "React does not recognize the `prop` on a DOM element."
 * It works by filtering the object against a whitelist of valid HTML attributes at runtime,
 * while maintaining strict TypeScript narrowing so the return type matches the target element.
 *
 * ### Features
 * - **Auto-Filtering**: No need to manually maintain an array of keys to delete.
 * - **Type Safe**: Automatically narrows the return type to `ComponentPropsWithoutRef<T>`.
 * - **Standard Compliant**: Supports all standard HTML attributes, `data-*`, and `aria-*` props.
 *
 * ### Example
 * ```tsx
 * interface MyButtonProps extends ComponentPropsWithoutRef<'button'> {
 *   mainCircleSize: number; // Custom prop: will be stripped
 *   variant: 'primary';    // Custom prop: will be stripped
 * }
 *
 * const MyButton = (props: MyButtonProps) => {
 *   // domProps is automatically inferred as ComponentPropsWithoutRef<'button'>
 *   // 'mainCircleSize' and 'variant' are removed automatically.
 *   const domProps = extractDOMProps<'button', MyButtonProps>(props);
 *
 *   return <button {...domProps}>Click Me</button>;
 * };
 * ```
 *
 * @template TElement - The HTML element type (e.g., 'div', 'button', 'span')
 * @template TFullProps - The combined custom and DOM props interface
 *
 * @param props - The full props object containing both custom and DOM-valid keys.
 * @returns A cleaned object containing only valid DOM properties for the specified element.
 */
export function extractDOMProps<
  TElement extends ElementType,
  TFullProps extends ComponentPropsWithoutRef<TElement>,
>(props: TFullProps): ComponentPropsWithoutRef<TElement> {
  const entries = ObjectUtils.entries(props);
  // 2. No cast needed: ArrayUtils.filter narrows based on the isDOMEntry predicate
  const filteredEntries = ArrayUtils.filter(entries, isDOMEntry<TElement>);
  // 3. No cast needed: ObjectUtils.fromEntries consumes the narrowed entries

  return ObjectUtils.fromEntries(
    filteredEntries,
  ) as ComponentPropsWithoutRef<TElement>;
}
/**
 * Filters React children by a specific component display name.
 *
 * This utility iterates over a ReactNode tree and returns only the children
 * that are valid React elements with a `displayName` matching the provided string.
 * It is especially useful for composite components like steppers or tabs,
 * where you want to operate only on specific subcomponents while ignoring others.
 *
 * The original `children` array is **not mutated**; a new filtered array is returned.
 *
 * ### Features
 * - Type-safe filtering of React elements.
 * - Skips non-React elements automatically.
 * - Returns a typed array of `ReactElement` for further processing.
 *
 * ### Example
 * ```tsx
 * const steps = filterChildrenByDisplayName(children, 'StepperStep');
 * steps.forEach(step => console.log(step.props));
 * ```
 *
 * ### Use Cases
 * - Stepper components: only extract `StepperStep` children for layout/logic.
 * - Tab components: only process `TabPanel` children.
 * - Any composite React component requiring selective child processing.
 *
 * @param children - The ReactNode children to filter.
 * @param displayName - The displayName of the component type to include.
 * @returns An array of ReactElement matching the given displayName.
 */
export function filterChildrenByDisplayName<T extends ReactNode>(
  children: T,
  displayName: string,
): ReactElement[] {
  return Children.toArray(children).filter((child): child is ReactElement => {
    if (!isReactElement(child)) return false;
    if (!hasNameMetadata(child.type)) return false;

    return (
      child.type.displayName === displayName ||
      child.type.name === displayName ||
      child.type.type?.displayName === displayName
    );
  });
}
