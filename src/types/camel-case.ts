/**
 * CamelCase options.
 *
 * @see {@link CamelCase}
 */
type TCamelCaseOptions = {
  /**
   * Whether to preserve consecutive uppercase letters.
   * @default true
   */
  preserveConsecutiveUppercase?: boolean;
};
type TDefaultCamelCaseOptions = {
  preserveConsecutiveUppercase: true;
};

/**
 * Merge user options with defaults.
 * Guarantees that all required keys exist and are boolean.
 */
type MergeCamelCaseOptions<Options extends TCamelCaseOptions> = {
  preserveConsecutiveUppercase: Options['preserveConsecutiveUppercase'] extends boolean
    ? Options['preserveConsecutiveUppercase']
    : TDefaultCamelCaseOptions['preserveConsecutiveUppercase'];
};

/**
 * Split a string literal by non-alphanumeric characters (dash, underscore, space)
 */
type Words<
  S extends string,
  Acc extends string[] = [],
> = S extends `${infer First}${infer Rest}`
  ? First extends '-' | '_' | ' '
    ? Words<Rest, Acc>
    : Rest extends `${infer NextChar}${infer Remaining}`
      ? NextChar extends '-' | '_' | ' '
        ? Words<Remaining, [...Acc, First]>
        : Words<
            `${NextChar}${Remaining}`,
            Acc extends [] ? [First] : [...Acc, First]
          >
      : [...Acc, First]
  : Acc;

/**
 * Convert an array of words to camel-case.
 */
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

/**
 * Convert a string literal to camel-case.
 *
 * Example:
 * ```ts
 * const a: CamelCase<'foo-bar'> = 'fooBar';
 * const b: CamelCase<'foo-BAR-baz', { preserveConsecutiveUppercase: true }> = 'fooBARBaz';
 * ```
 */
type TCamelCase<
  Type,
  Options extends TCamelCaseOptions = object,
> = Type extends string
  ? string extends Type
    ? Type
    : Uncapitalize<
        CamelCaseFromArray<
          Words<Type extends Uppercase<Type> ? Lowercase<Type> : Type>,
          MergeCamelCaseOptions<Options>
        >
      >
  : Type;

export type { TCamelCase, TCamelCaseOptions, TDefaultCamelCaseOptions };
