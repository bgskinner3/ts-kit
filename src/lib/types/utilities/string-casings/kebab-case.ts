import type {
  TWords,
  TDelimiterCaseOptions,
  TMergeDelimiterCaseOptions,
} from './shared';

type KebabCaseFromArray<
  WordsArr extends string[],
  Options extends { preserveConsecutiveUppercase: boolean },
> = WordsArr extends [
  infer FirstWord extends string,
  ...infer Rest extends string[],
]
  ? Rest['length'] extends 0
    ? Options['preserveConsecutiveUppercase'] extends true
      ? FirstWord // Preserve: 'ID' -> 'ID'
      : Lowercase<FirstWord> // Don't Preserve: 'ID' -> 'id'
    : Options['preserveConsecutiveUppercase'] extends true
      ? `${FirstWord}-${KebabCaseFromArray<Rest, Options>}`
      : `${Lowercase<FirstWord>}-${KebabCaseFromArray<Rest, Options>}`
  : '';

export type TKebabCase<
  Type,
  Options extends TDelimiterCaseOptions = object,
> = Type extends string
  ? string extends Type
    ? Type
    : KebabCaseFromArray<
        TWords<Type>, // Pass raw 'camelCaseInput' here
        TMergeDelimiterCaseOptions<Options>
      >
  : Type;
