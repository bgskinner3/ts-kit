import { TTypeGuard } from '../../types';

const extractAsType = <T>(
  value: unknown,
  typeGuard: TTypeGuard<T>,
): T | undefined => {
  return typeGuard(value) ? value : undefined;
};

const extractTypedKeyOrNada = <T extends string | number | symbol>(
  keys: readonly T[],
  key: unknown,
): T | undefined => {
  const keySet = new Set(keys); // O(1) lookup
  return keySet.has(key as T) ? (key as T) : undefined;
};
