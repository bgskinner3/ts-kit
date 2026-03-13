import {
  toSnakeCase,
  toKebabCase,
  toCamelCase,
  capitalizeString,
} from './string-transformers';
import {
  capitalizedKeys,
  capitalizeArray,
  toKeyByField,
  generateKeyMap,
} from './object-transformers';

const TransformersUtils = {
  capitalizedKeys,
  capitalizeArray,
  toKeyByField,
  generateKeyMap,
  toSnakeCase,
  toKebabCase,
  toCamelCase,
  capitalizeString,
} as const;

export {
  TransformersUtils,
  capitalizedKeys,
  capitalizeArray,
  toKeyByField,
  generateKeyMap,
  toSnakeCase,
  toKebabCase,
  toCamelCase,
  capitalizeString,
};
