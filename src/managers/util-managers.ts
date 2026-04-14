import { TStaticMethods } from '../types';

/**  @see {@link ManagerDocs.exportStaticMethods}  */
function exportAndRenameStaticMethods<
  T extends new (...args: unknown[]) => unknown,
  R extends Record<string, keyof TStaticMethods<T>>,
>(cls: T, renameMap: R): { [K in keyof R]: TStaticMethods<T>[R[K]] } {
  const result = {} as { [K in keyof R]: TStaticMethods<T>[R[K]] };

  for (const [newKey, oldKey] of Object.entries(renameMap) as [
    keyof R,
    keyof TStaticMethods<T>,
  ][]) {
    const prop = cls[oldKey] as unknown;

    // Only bind if it’s a function
    if (typeof prop === 'function') {
      // Infer type of function parameters and return
      result[newKey] = (prop as (...args: unknown[]) => unknown).bind(
        cls,
      ) as TStaticMethods<T>[R[typeof newKey]];
    }
  }

  return result;
}

function exportStaticMethods<T extends new (...args: unknown[]) => unknown>(
  cls: T,
): TStaticMethods<T> {
  const result = {} as TStaticMethods<T>;

  for (const key of Object.getOwnPropertyNames(cls)) {
    if (key === 'prototype' || key === 'name' || key === 'length') continue;

    const typedKey = key as keyof T;
    const prop = cls[typedKey];

    if (typeof prop === 'function') {
      // Cast via unknown first to satisfy TypeScript
      (result as unknown as Record<keyof TStaticMethods<T>, unknown>)[
        typedKey as keyof TStaticMethods<T>
      ] = prop.bind(cls);
    }
  }

  return result;
}

const toWords = (value: string): string[] => {
  if (!value) return [];

  // 1. Split by existing delimiters (space, dash, underscore)
  // 2. Use a regex that catches:
  //    - Lowercase to Uppercase transitions (camelCase -> camel, Case)
  //    - Acronym boundaries (XMLHttp -> XML, Http)
  //    - Numbers
  return value
    .replace(/([a-z])([A-Z])/g, '$1 $2') // camelCase -> camel Case
    .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2') // XMLHttp -> XML Http
    .replace(/[^a-zA-Z0-9]+/g, ' ') // delimiters -> space
    .trim()
    .split(/\s+/);
};

export { exportAndRenameStaticMethods, exportStaticMethods, toWords };
