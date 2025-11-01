import { TTypeGuard, TElementLike, THTMLTags } from '../../types';
import { isObject, isFunction, isUndefined } from '../guards/reference';
import { isBoolean, isNumber, isSymbol, isString } from '../guards/primitives';
import { ObjectUtils } from '../common/object';

/**  @see {@link CompositeTypeGuardsDocs.isInArray} */
export const isInArray = <T>(
  target: readonly T[],
): TTypeGuard<T | undefined> => {
  const set = new Set(target);
  return (value: unknown): value is T | undefined =>
    !isUndefined(value) && set.has(value as T);
};

/** @see {@link CompositeTypeGuardsDocs.isKeyOfObject}  */
export const isKeyOfObject =
  <T extends object>(obj: T): TTypeGuard<keyof T> =>
  (key: unknown): key is keyof T =>
    (isString(key) || isNumber(key) || isSymbol(key)) && key in obj;

/** @see {@link CompositeTypeGuardsDocs.isKeyOfArray}  */
export const isKeyOfArray =
  <T extends readonly (string | number | symbol)[]>(
    keys: T,
  ): TTypeGuard<T[number]> =>
  (key: unknown): key is T[number] =>
    (isString(key) || isNumber(key) || isSymbol(key) || isBoolean(key)) &&
    keys.includes(key as T[number]);

/**  @see {@link CompositeTypeGuardsDocs.isArrayOf} */
export const isArrayOf = <T>(
  typeGuard: TTypeGuard<T>,
  value: unknown,
): value is T[] => Array.isArray(value) && value.every(typeGuard);

/**  @see {@link CompositeTypeGuardsDocs.isRecordOf} */
export const isRecordOf = <V>(
  value: unknown,
  typeGuard: TTypeGuard<V>,
): value is Record<string, V> =>
  isObject(value) && ObjectUtils.values(value).every(typeGuard);

/**  @see {@link CompositeTypeGuardsDocs.isElementLike} */
export const isElementLike: TTypeGuard<TElementLike> = (
  element: unknown,
): element is TElementLike =>
  isObject(element) &&
  'type' in element &&
  'props' in element &&
  isObject(element.props) &&
  (isString(element.type) || isFunction(element.type));

/**  @see {@link CompositeTypeGuardsDocs.isElementOfType} */
export const isElementOfType = <T extends THTMLTags>(
  element: unknown,
  allowedTypes: THTMLTags,
): element is { type: THTMLTags; props: object } =>
  isElementLike(element) && allowedTypes.includes(element.type as T);

export const CompositeTypeGuards = {
  isInArray,
  isArrayOf,
  isKeyOfArray,
  isKeyOfObject,
  isRecordOf,
  isElementOfType,
  isElementLike,
} as const;
