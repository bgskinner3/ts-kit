type TArrayLengthMutationKeys =
  | 'splice'
  | 'push'
  | 'pop'
  | 'shift'
  | 'unshift'
  | number;

type TArrayItems<T extends Array<unknown>> =
  T extends Array<infer TItems> ? TItems : never;

type TFixedLengthArray<T extends unknown[]> = Pick<
  T,
  Exclude<keyof T, TArrayLengthMutationKeys>
> & {
  [Symbol.iterator]: () => IterableIterator<TArrayItems<T>>;
} & {
  length: number;
};
type TRGB = readonly [r: number, g: number, b: number];
type TCssRGB = `rgb(${number}, ${number}, ${number})`;

export type {
  TFixedLengthArray,
  TArrayItems,
  TArrayLengthMutationKeys,
  TRGB,
  TCssRGB,
};
