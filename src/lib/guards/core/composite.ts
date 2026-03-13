import type { TTypeGuard } from '../../../types';
import { isObject, isUndefined, isDefined } from './reference';
import { isBoolean, isNumber, isSymbol, isString } from './primitives';
import { ObjectUtils } from '../../common/object';

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

/** @see {@link CompositeTypeGuardsDocs.isKeyInObject}  */
export const isKeyInObject =
  <K extends PropertyKey>(key: K) =>
  (obj: unknown): obj is Record<K, unknown> =>
    isObject(obj) && key in obj;

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

export const hasDefinedKeys = <T extends object>(
  requiredKeys: (keyof T)[],
): ((value: unknown) => value is T) => {
  return (value: unknown): value is T => {
    if (!value || !isObject(value)) return false;
    return requiredKeys.every(
      (key) => isKeyInObject(key)(value) && isDefined(value[key]),
    );
  };
};
