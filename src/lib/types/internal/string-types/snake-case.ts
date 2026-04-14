import type {
  TWords,
  TDelimiterCaseOptions,
  TMergeDelimiterCaseOptions,
} from './shared';

/**
 * Join an array of words with underscores (_), respecting preserveConsecutiveUppercase
 */
type SnakeCaseFromArray<
  WordsArr extends string[],
  Options extends { preserveConsecutiveUppercase: boolean },
  OutputString extends string = '',
> = WordsArr extends [
  infer FirstWord extends string,
  ...infer Rest extends string[],
]
  ? Rest['length'] extends 0
    ? Options['preserveConsecutiveUppercase'] extends true
      ? FirstWord
      : Lowercase<FirstWord>
    : Options['preserveConsecutiveUppercase'] extends true
      ? `${FirstWord}_${SnakeCaseFromArray<Rest, Options>}`
      : `${Lowercase<FirstWord>}_${SnakeCaseFromArray<Rest, Options>}`
  : OutputString;

/**
 * Convert a string literal to snake_case
 */
export type TSnakeCase<
  Type,
  Options extends TDelimiterCaseOptions = object,
> = Type extends string
  ? string extends Type
    ? Type
    : SnakeCaseFromArray<
        TWords<Type extends Uppercase<Type> ? Lowercase<Type> : Type>,
        TMergeDelimiterCaseOptions<Options>
      >
  : Type;
