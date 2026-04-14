import type {
  TWords,
  TDelimiterCaseOptions,
  TMergeDelimiterCaseOptions,
} from './shared';

type CamelCaseFromArray<
  WordsArr extends string[],
  Options extends { preserveConsecutiveUppercase: boolean },
  OutputString extends string = '',
> = WordsArr extends [
  infer FirstWord extends string,
  ...infer Rest extends string[],
]
  ? Options['preserveConsecutiveUppercase'] extends true
    ? `${Capitalize<FirstWord>}${CamelCaseFromArray<Rest, Options>}`
    : `${Capitalize<Lowercase<FirstWord>>}${CamelCaseFromArray<Rest, Options>}`
  : OutputString;

type TCamelCase<
  Type,
  Options extends TDelimiterCaseOptions = object,
> = Type extends string
  ? string extends Type
    ? Type
    : Uncapitalize<
        CamelCaseFromArray<
          TWords<Type extends Uppercase<Type> ? Lowercase<Type> : Type>,
          TMergeDelimiterCaseOptions<Options>
        >
      >
  : Type;

export type { TCamelCase };
