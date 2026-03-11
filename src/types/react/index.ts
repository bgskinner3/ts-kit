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

export type { TPropCategories, TPropMap, TNamedComponent };
