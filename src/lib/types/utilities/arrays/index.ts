type TArrayLengthMutationKeys =
  | 'splice'
  | 'push'
  | 'pop'
  | 'shift'
  | 'unshift'
  | number;

type TArrayItems<T extends Array<unknown>> =
  T extends Array<infer TItems> ? TItems : never;
/**
 * TFixedLengthArray: Immutable-Length Array Utility
 *
 * Creates a type that behaves like a standard array but prevents any operations
 * that would mutate its length (like .push() or .pop()). It ensures the
 * 'length' property is treated as a fixed numeric literal.
 *
 * @template T - A tuple type representing the fixed structure (e.g., [string, number])
 *
 * @example
 * type Coordinate = [number, number];
 * type FixedCoord = TFixedLengthArray<Coordinate>;
 *
 * const point: FixedCoord = [10, 20];
 *
 * // ✅ Valid: Accessing and iteration
 * const x = point[0];
 *
 * // ❌ Error: Property 'push' does not exist on TFixedLengthArray
 * point.push(30);
 *
 * // ❌ Error: Property 'splice' does not exist
 * point.splice(0, 1);
 */
type TFixedLengthArray<T extends unknown[]> = Pick<
  T,
  Exclude<keyof T, TArrayLengthMutationKeys>
> & {
  [Symbol.iterator]: () => IterableIterator<TArrayItems<T>>;
} & {
  length: number;
};

export type { TFixedLengthArray };
