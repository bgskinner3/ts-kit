import { TCamelCase, TSnakeCase, TKebabCase } from '../../types';
import { isNil, isNonEmptyString } from '../guards';
import { REGEX_CONSTANTS } from '../../constants';

export const capitalizeString = <S extends string>(str: S): Capitalize<S> => {
  return (str[0].toUpperCase() + str.slice(1)) as Capitalize<S>;
};

export const toCamelCase = <T extends TCamelCase<string>>(
  value: T | string,
): TCamelCase<T | string> => {
  if (isNil(value) || !isNonEmptyString(value)) return '';
  const cleaned = value.replace(REGEX_CONSTANTS.letterSeparator, ' ');
  return cleaned
    .replace(REGEX_CONSTANTS.camelCaseBoundary, (word, idx) =>
      idx === 0 ? word.toLowerCase() : word.toUpperCase(),
    )
    .replace(REGEX_CONSTANTS.whitespace, '');
};

export const toKebabCase = <T extends string>(
  value: T | string,
): TKebabCase<T | string> => {
  if (isNil(value) || !isNonEmptyString(value)) return '';
  const cleaned = value.replace(REGEX_CONSTANTS.wordBoundarySplitter, ' ');
  const withBoundaries = cleaned.replace(
    REGEX_CONSTANTS.kebabCaseBoundary,
    '$1 $2',
  );
  return withBoundaries
    .trim()
    .split(REGEX_CONSTANTS.whitespace)
    .join('-')
    .toLowerCase();
};

export const toSnakeCase = <T extends string>(
  value: T | string,
): TSnakeCase<T | string> => {
  if (isNil(value) || !isNonEmptyString(value)) return '';
  const cleaned = value.replace(REGEX_CONSTANTS.wordBoundarySplitter, ' ');
  // Step 2: Insert spaces before uppercase letters (camelCase boundaries)
  const withBoundaries = cleaned.replace(
    REGEX_CONSTANTS.kebabCaseBoundary,
    '$1 $2',
  );

  return withBoundaries
    .trim()
    .split(REGEX_CONSTANTS.whitespace)
    .join('_')
    .toLowerCase();
};

export const StringTransformers = {
  toSnakeCase,
  toKebabCase,
  toCamelCase,
  capitalizeString,
} as const;
