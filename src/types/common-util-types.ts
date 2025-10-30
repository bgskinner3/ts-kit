type TArrayLengthMutationKeys =
  | 'splice'
  | 'push'
  | 'pop'
  | 'shift'
  | 'unshift'
  | number;

type TArrayItems<T extends Array<any>> =
  T extends Array<infer TItems> ? TItems : never;

type TFixedLengthArray<T extends any[]> = Pick<
  T,
  Exclude<keyof T, TArrayLengthMutationKeys>
> & { [Symbol.iterator]: () => IterableIterator<TArrayItems<T>> } & {
  length: number;
};

export type { TFixedLengthArray, TArrayItems, TArrayLengthMutationKeys };
