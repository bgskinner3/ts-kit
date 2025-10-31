/* eslint-disable @typescript-eslint/no-explicit-any */
/**  @see {@link TypeDocs.TStaticMethods}  */
type TStaticMethods<T> = {
  [K in keyof T as T[K] extends (...args: any) => any ? K : never]: T[K];
};

export type { TStaticMethods };
