import type {
  TWords,
  TDelimiterCaseOptions,
  TMergeDelimiterCaseOptions,
} from './shared';

type KebabCaseFromArray<
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
      ? `${FirstWord}-${KebabCaseFromArray<Rest, Options>}`
      : `${Lowercase<FirstWord>}-${KebabCaseFromArray<Rest, Options>}`
  : OutputString;

export type TKebabCase<
  Type,
  Options extends TDelimiterCaseOptions = object,
> = Type extends string
  ? string extends Type
    ? Type
    : KebabCaseFromArray<
        TWords<Type extends Uppercase<Type> ? Lowercase<Type> : Type>,
        TMergeDelimiterCaseOptions<Options>
      >
  : Type;
