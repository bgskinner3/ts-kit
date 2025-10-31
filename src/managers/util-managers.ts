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

export { exportAndRenameStaticMethods };
