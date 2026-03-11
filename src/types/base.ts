type TPropMap = Record<string, boolean>;

type TPropCategories = {
  readonly [category: string]: TPropMap;
};
/**
 * We use an empty object type to satisfy the internal React constraints
 * without resorting to the 'any' keyword.
 */
type TSafeReactProps = Record<string, unknown>;
export type { TPropCategories, TPropMap, TSafeReactProps };
