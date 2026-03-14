import {
  isJsonString,
  isHexByteString,
  isHTMLString,
  isJSONObjectString,
  isJSONArrayString,
  isKebabCase,
  isSnakeCase,
  isCamelCase,
} from './string-guards';
import { isAbsoluteUrl, isInternalUrl } from './link-guards';
import {
  isNumber,
  isInteger,
  isString,
  isNonEmptyString,
  isBoolean,
  isBigInt,
  isSymbol,
  isPrimitive,
} from './primitives';
import {
  isEmail,
  isPhoneNumber,
  isRGBTuple,
  isBufferLikeObject,
} from './refined';
import {
  isNull,
  isFunction,
  isObject,
  isArray,
  isMap,
  isSet,
  isWeakMap,
  isWeakSet,
  isNil,
  isUndefined,
  isDefined,
  isInstanceOf,
} from './reference';
import {
  hasDefinedKeys,
  isRecordOf,
  isArrayOf,
  isKeyOfArray,
  isKeyOfObject,
  isInArray,
  isKeyInObject,
  isShape,
} from './composite';

export const CoreTypeGuards = {
  // Primitives
  isString,
  isNumber,
  isBoolean,
  isBigInt,
  isNil,
  isDefined,
  isInteger,
  isNonEmptyString,
  isSymbol,
  isPrimitive,
  isNull,
  isFunction,
  isObject,
  isArray,
  isMap,
  isSet,
  isWeakMap,
  isWeakSet,
  isUndefined,
  isInstanceOf,
} as const;
export const FormatTypeGuards = {
  isEmail,
  isPhone: isPhoneNumber,
  isUrlAbsolute: isAbsoluteUrl,
  isUrlInternal: isInternalUrl,
  isJsonString,
  isHTMLString,
  isCamelCase,
  isSnakeCase,
  isKebabCase,
  isHexByteString,
  isJSONObjectString,
  isJSONArrayString,
  isRGBTuple,
  isBufferLikeObject,
} as const;

export const CollectionTypeGuards = {
  isArrayOf,
  isRecordOf,
  isKeyOfObject,
  isKeyInObject,
  isKeyOfArray,
  isInArray,
  hasKeys: hasDefinedKeys,
  isShape,
} as const;

export * from './reference';
export * from './primitives';
export * from './composite';
export * from './refined';
export * from './link-guards';
export * from './string-guards';
