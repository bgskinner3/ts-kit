export type TWords<
  S extends string,
  Acc extends string[] = [],
> = S extends `${infer First}${infer Rest}`
  ? First extends '-' | '_' | ' '
    ? TWords<Rest, Acc>
    : Rest extends `${infer NextChar}${infer Remaining}`
      ? NextChar extends '-' | '_' | ' '
        ? TWords<Remaining, [...Acc, First]>
        : TWords<
            `${NextChar}${Remaining}`,
            Acc extends [] ? [First] : [...Acc, First]
          >
      : [...Acc, First]
  : Acc;

export type TDelimiterCaseOptions = {
  /**
   * Whether to preserve consecutive uppercase letters.
   * @default true
   */
  preserveConsecutiveUppercase?: boolean;
};
export type TDefaultDelimiterCaseOptions = {
  preserveConsecutiveUppercase: true;
};
export type TMergeDelimiterCaseOptions<Options extends TDelimiterCaseOptions> =
  {
    preserveConsecutiveUppercase: Options['preserveConsecutiveUppercase'] extends boolean
      ? Options['preserveConsecutiveUppercase']
      : TDefaultDelimiterCaseOptions['preserveConsecutiveUppercase'];
  };
