import {
  TTypeGuard,
  TBufferLikeObject,
  TElementLike,
  THTMLTags,
} from '../../types';
import { isObject, isFunction } from '../guards/reference';
import { isNumber, isSymbol } from '../guards/primitives';
import { ObjectUtils } from '../common/object';
import { isString, isNonEmptyString } from '../guards/primitives';

/**  @see {@link CompositeTypeGuardsDocs.isBufferLikeObject} */
export const isBufferLikeObject: TTypeGuard<TBufferLikeObject> = (
  value: unknown,
): value is TBufferLikeObject => {
  if (!isObject(value)) return false;

  const hasTypeBuffer = 'type' in value && value.type === 'Buffer';
  const hasNumberArrayData =
    'data' in value && isArrayOf(isNumber, (value as { data: unknown }).data);

  return hasTypeBuffer && hasNumberArrayData;
};

/**  @see {@link CompositeTypeGuardsDocs.isInArray} */
export const isInArray = <T>(
  target: readonly T[],
): TTypeGuard<T | undefined> => {
  const set = new Set(target); // create once for O(1) lookups
  return (value: unknown): value is T | undefined =>
    value !== undefined && set.has(value as T);
};

/**  @see {@link CompositeTypeGuardsDocs.isValidUrl} */
export const isValidUrl: TTypeGuard<string> = (url: unknown): url is string => {
  if (!isNonEmptyString(url)) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**  @see {@link CompositeTypeGuardsDocs.isUrlOrRelativePath} */
export const isUrlOrRelativePath: TTypeGuard<string> = (
  value: unknown,
): value is string => {
  if (!isNonEmptyString(value)) return false;

  // Relative URLs starting with '/'
  if (value.startsWith('/')) return true;

  // Otherwise must be a valid absolute URL
  return isValidUrl(value);
};

/**  @see {@link CompositeTypeGuardsDocs.isInternalUrl} */
export const isInternalUrl = (url?: string): boolean => {
  if (!isClientSide() || !isNonEmptyString(url)) return false;

  // Relative paths are always internal
  if (url.startsWith('/')) return true;

  try {
    const parsed = new URL(url, location.origin);
    return parsed.hostname === location.hostname;
  } catch {
    return false;
  }
};

/**  @see {@link CompositeTypeGuardsDocs.isClientSide} */
export const isClientSide = (): boolean => typeof window !== 'undefined';

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
    (isString(key) || isNumber(key) || isSymbol(key)) &&
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
): value is Record<string, V> => {
  if (!isObject(value)) return false;

  return ObjectUtils.values(value).every(typeGuard);
};
