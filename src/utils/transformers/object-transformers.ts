import { ObjectUtils, ArrayUtils } from '../common';
import { isString } from '../guards';
import { capitalizeString } from './string-transformers';

export const generateKeyMap = <
  K extends string,
  P extends string | undefined = undefined,
  S extends string = string,
>(data: {
  keys: readonly K[];
  prefix?: P;
  suffix: S;
}) => {
  const { keys, prefix, suffix } = data;

  const entries = ArrayUtils.map(keys, (key) => {
    const camel = prefix
      ? `${prefix}${key.charAt(0).toUpperCase() + key.slice(1)}${suffix}`
      : `${key.charAt(0).toLowerCase() + key.slice(1)}${suffix}`;

    return [key, camel] as [
      K,
      P extends string ? `${P}${Capitalize<K>}${S}` : `${K}${S}`,
    ];
  });

  return ObjectUtils.fromEntries(entries) satisfies Record<
    K,
    P extends string ? `${P}${Capitalize<K>}${S}` : `${K}${S}`
  >;
};

export const toKeyByField = <
  RowType extends Record<Key, string | number | symbol>,
  Key extends keyof RowType,
>(
  rows: RowType[],
  keyField: Key,
): Record<RowType[Key], Omit<RowType, Key>> => {
  return ObjectUtils.fromEntries<RowType[Key], Omit<RowType, Key>>(
    ArrayUtils.map(rows, (row) => {
      const key: RowType[Key] = row[keyField];
      const { [keyField]: _, ...rest } = row;
      return [key, rest] satisfies [RowType[Key], Omit<RowType, Key>];
    }),
  ) satisfies Record<RowType[Key], Omit<RowType, Key>>;
};

export const capitalizeArray = <T extends string>(
  arr: readonly T[],
): Capitalize<T>[] => ArrayUtils.map(arr, capitalizeString);

export const capitalizedKeys = <T extends Record<string, unknown>>(
  obj: T,
): Capitalize<keyof T & string>[] =>
  capitalizeArray(ObjectUtils.keys(obj).filter(isString));

export const ObjectTransformers = {
  capitalizedKeys,
  capitalizeArray,
  toKeyByField,
  generateKeyMap,
} as const;
