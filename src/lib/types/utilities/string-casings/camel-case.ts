import type {
  TWords,
  TDelimiterCaseOptions,
  TMergeDelimiterCaseOptions,
} from './shared';

type CamelCaseFromArray<
  WordsArr extends string[],
  Options extends { preserveConsecutiveUppercase: boolean },
  IsFirst extends boolean = true,
> = WordsArr extends [
  infer First extends string,
  ...infer Rest extends string[],
]
  ? IsFirst extends true
    ? // Handle the first word: force full lowercase if not preserving
      `${Options['preserveConsecutiveUppercase'] extends true
        ? Uncapitalize<First>
        : Lowercase<First>}${CamelCaseFromArray<Rest, Options, false>}`
    : // Handle subsequent words: force capitalization
      `${Options['preserveConsecutiveUppercase'] extends true
        ? Capitalize<First>
        : Capitalize<
            Lowercase<First>
          >}${CamelCaseFromArray<Rest, Options, false>}`
  : '';

export type TCamelCase<
  Type,
  Options extends TDelimiterCaseOptions = object,
> = Type extends string
  ? string extends Type
    ? Type
    : CamelCaseFromArray<
        TWords<Type extends Uppercase<Type> ? Lowercase<Type> : Type>,
        TMergeDelimiterCaseOptions<Options>,
        true // Explicitly start as first word
      >
  : Type;
