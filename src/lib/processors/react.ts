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
import {
  isFunction,
  isString,
  isDOMEntry,
  isRef,
  isRefObject,
  isReactElement,
  isKeyOfArray,
} from '../guards';
import { ArrayUtils, ObjectUtils } from '../common';
import { Children } from 'react';
/**
 * @utilType util
 * @name mergeRefs
 * @category Processors React
 * @description Consolidates multiple React refs (callback or object) into a single functional ref.
 * @link #mergerefs
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
 * @utilType util
 * @name lazyProxy
 * @category Processors React
 * @description Transparently caches the results of function properties upon first access.
 * @link #lazyproxy
 *
 * ## ⏱️ lazyProxy — On-Demand Property Evaluation
 *
 * Wraps an object in a Proxy to lazily evaluate function properties.
 * Results are cached, ensuring expensive computations only run once.
 *
 * - **Immutable**: Does not mutate the original object.
 * - **Performant**: Ideal for heavy config objects or unused properties.
 *
 * @param obj - The object containing functions to be lazily evaluated.
 * @returns A proxied version of the object with cached evaluation.
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
 * @utilType util
 * @name mergeCssVars
 * @category Processors React
 * @description Safely merges a dictionary of CSS variables into a React CSSProperties object.
 * @link #mergecssvars
 *
 * ## 🎨 mergeCssVars — Dynamic Style Injection
 *
 * Cleanly merges custom CSS variables with standard React style objects.
 * Automatically filters out `undefined` or empty values to keep the DOM clean.
 *
 * @param vars - Object containing CSS variable names (e.g., '--brand-color').
 * @param style - Existing React style object to merge with.
 * @returns A validated CSSProperties object.
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
 * @utilType util
 * @name mergeEventHandlerClicks
 * @category Processors React
 * @description Orchestrates user and internal click handlers, allowing user-level preventDefault() to block internal logic.
 * @link #mergeeventhandlerclicks
 *
 * ## 🖱️ mergeEventHandlerClicks — Smart Event Composition
 *
 * Merges a user-provided event handler with an internal component handler.
 * The `internalHandler` will only execute if the `userHandler` does not call
 * `event.preventDefault()`.
 *
 * @template E - The type of the SyntheticEvent (e.g., React.MouseEvent)
 * @param userHandler - The external handler passed via props
 * @param internalHandler - The library logic that should run by default
 * @returns A single function that orchestrates both calls
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
 * @utilType util
 * @name extractDOMProps
 * @category React
 * @description Strips custom component props to return only valid HTML attributes for a specific element.
 * @link #extractdomprops
 *
 * ## 🧹 extractDOMProps — Safe Attribute Filtering
 *
 * Automatically extracts valid DOM props from a combined props object.
 * Prevents React "unknown prop" warnings by filtering against a whitelist.
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
 * @utilType util
 * @name filterChildrenByDisplayName
 * @category Processors React
 * @description Filters a React children tree to find components matching a specific displayName.
 * @link #filterchildrenbydisplayname
 *
 * ## 🔍 filterChildrenByDisplayName — Selective Child Parsing
 *
 * Iterates over a ReactNode tree and returns only the children
 * matching the provided string. Ideal for composite components like Tabs or Steppers.
 */
export function filterChildrenByDisplayName<T extends ReactNode>(
  children: T,
  displayName: string,
): ReactElement[] {
  return Children.toArray(children).filter((child): child is ReactElement => {
    if (!isReactElement(child)) return false;
    // @ts-expect-error - displayName may exist on type
    return child.type?.displayName === displayName;
  });
}
/**
 * @utilType util
 * @name getRefCurrent
 * @category Processors React
 * @description Safely extracts the current value from either RefObjects or ForwardedRefs.
 * @link #getrefcurrent
 *
 * ## ⚓ getRefCurrent — Safe Ref Access
 *
 * Supports RefObjects (useRef) and ForwardedRefs. Useful in effects to avoid
 * repetitive null-checks and type casting.
 */

export function getRefCurrent<T>(ref: Ref<T> | undefined | null): T | null {
  if (!ref) return null;

  if (isRefObject(ref)) {
    return ref.current;
  }

  // Callback refs (functions) don't have a 'current' property we can synchronously pull
  return null;
}
/**
 * Extracts a subset of properties from an object based on a whitelist of keys.
 *
 * This is useful for separating component-specific props from generic HTML
 * or system props, especially in design systems or polymorphic components.
 *
 * Example use cases:
 * - separating layout props from DOM props
 * - isolating design-system variants
 * - filtering props before spreading into native elements
 *
 * @example
 * ```ts
 * // 1. Define your custom keys (use 'as const' for best type inference)
 * const CODE_BLOCK_KEYS = ['language', 'showLineNumbers', 'rawCode'] as const;
 *
 * // 2. Extract only those props into a bundled object
 * const codeBlockProps = extractComponentProps(props, CODE_BLOCK_KEYS);
 *
 * // 3. Pass the bundle directly to your child component
 * return <CodeBlock {...codeBlockProps} />;
 * ```
 *
 * @returns A new object containing only the specified keys
 */
// export function extractComponentProps<
//   T extends Record<string, unknown>,
//   K extends keyof T & string, // Constrain K to strings for fromEntries compatibility
// >(props: T, keys: readonly K[]): Partial<Record<K, T[K]>> {
//   const isTargetKey = isKeyOfArray(keys);

//   const entries = ObjectUtils.entries(props);

//   const filteredEntries = entries.filter((entry): entry is [K, T[K]] =>
//     isTargetKey(entry[0]),
//   );

//   return ObjectUtils.fromEntries<K, T[K]>(filteredEntries)
// }
export function extractComponentProps<
  T extends Record<string, unknown>,
  K extends keyof T,
>(props: T, keys: readonly K[]): Pick<T, K> {
  const isTargetKey = isKeyOfArray(keys);

  const entries = ObjectUtils.entries(props);

  const filteredEntries = entries.filter((entry): entry is [K, T[K]] =>
    isTargetKey(entry[0]),
  );

  // Using unknown as a bridge tells TS to trust that the
  // filtered entries exactly match the specific Pick shape.
  return ObjectUtils.fromEntries(filteredEntries) as Pick<T, K>;
}
