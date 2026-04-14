import { TCamelCase, TSnakeCase, TKebabCase } from '../types';
import { toWords } from '../../managers';
/**
 * @utilType util
 * @name capitalizeString
 * @category String Transformers
 * @description Capitalizes the first character of a string while maintaining TypeScript literal types.
 * @link #capitalizestring
 * ---
 *
 * ### Example
 *
 * ```ts
 * capitalizeString('hello'); // "Hello"
 * capitalizeString('userName'); // "UserName"
 * ```
 */
export const capitalizeString = <S extends string>(str: S): Capitalize<S> => {
  return (str[0].toUpperCase() + str.slice(1)) as Capitalize<S>;
};

/**
 * @utilType util
 * @name toCamelCase
 * @category String Transformers
 * @description Converts a string from any format (snake, kebab, space) into camelCase.
 * @link #tocamelcase

 * ### Example
 *
 * ```ts
 * toCamelCase('hello-world'); // "helloWorld"
 * toCamelCase('user_name'); // "userName"
 * toCamelCase('Hello World'); // "helloWorld"
 * ```
 */
export const toCamelCase = <T extends string>(
  value: T | string,
): TCamelCase<T | string> => {
  const words = toWords(value);
  if (words.length === 0) return '';

  return words
    .map((word, idx) => {
      const lower = word.toLowerCase();
      return idx === 0 ? lower : lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join('') as TCamelCase<T>;
};
/**
 * @utilType util
 * @name toKebabCase
 * @category String Transformers
 * @description Converts a string into kebab-case, ideal for URLs and CSS class names.
 * @link #tokebabcase
 *
 * ### Example
 *
 * ```ts
 * toKebabCase('helloWorld'); // "hello-world"
 * toKebabCase('User Name'); // "user-name"
 * toKebabCase('user_name'); // "user-name"
 * ```
 */
export const toKebabCase = <T extends string>(
  value: T | string,
): TKebabCase<T | string> => {
  const words = toWords(value);
  if (words.length === 0) return '';

  return words.map((word) => word.toLowerCase()).join('-') as TKebabCase<T>;
};
/**
 * @utilType util
 * @name toSnakeCase
 * @category String Transformers
 * @description Converts a string into snake_case, commonly used for database and API fields.
 * @link #tosnakecase

 *
 * ### Example
 *
 * ```ts
 * toSnakeCase('helloWorld'); // "hello_world"
 * toSnakeCase('User Name'); // "user_name"
 * toSnakeCase('user-name'); // "user_name"
 * ```
 */
export const toSnakeCase = <T extends string>(
  value: T | string,
): TSnakeCase<T | string> => {
  const words = toWords(value);
  if (words.length === 0) return '';

  return words.map((word) => word.toLowerCase()).join('_') as TSnakeCase<T>;
};
