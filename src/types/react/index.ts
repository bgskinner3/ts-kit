import type { ComponentProps, ComponentType } from 'react';

type TPropMap = Record<string, boolean>;

type TPropCategories = {
  readonly [category: string]: TPropMap;
};

/**
 * A structural contract for any React component that might have
 * identification metadata.
 */
type TNamedComponent = {
  displayName?: string;
  name?: string;
  /** Support for nested types in Memo/ForwardRef */
  type?: TNamedComponent;
};

/**
 * TPropType
 *
 * Extracts the type of a specific prop `K` from a React component `T`.
 *
 * This is a utility type for working with component props in a fully type-safe way.
 * It allows you to refer to a single prop’s type without manually extracting it
 * from the component's props interface.
 *
 * @template T - The React component type (must extend `ComponentType<object>`).
 * @template K - The key of the prop to extract (must be a valid key of `ComponentProps<T>`).
 *
 * @example
 * ```ts
 * import StatusIndicator from './StatusIndicator';
 *
 * type IndicatorType = TPropType<typeof StatusIndicator, 'indicator'>;
 * // IndicatorType is now the type of StatusIndicator's 'indicator' prop
 *
 * const value: IndicatorType = 'positive'; // TypeScript knows this is valid
 * ```
 *
 * @remarks
 * - Works for functional components, class components, and forwardRef components.
 * - Provides full type safety for prop extraction.
 */

/* prettier-ignore */ type TPropType<T extends ComponentType<object>, K extends keyof ComponentProps<T>> = ComponentProps<T>[K];

export type { TPropCategories, TPropMap, TNamedComponent, TPropType };
