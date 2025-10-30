import { TStaticMethods } from '../types';

/**  @see {@link ManagerDocs.exportStaticMethods}  */
function exportAndRenameStaticMethods<
  T extends { new (...args: any[]): any },
  R extends Record<string, keyof TStaticMethods<T>>,
>(cls: T, renameMap: R): { [K in keyof R]: TStaticMethods<T>[R[K]] } {
  const result: Record<string, Function> = {};

  for (const [newKey, oldKey] of Object.entries(renameMap)) {
    const prop = (cls as any)[oldKey];
    if (typeof prop === 'function') {
      result[newKey] = prop.bind(cls);
    }
  }

  return result as { [K in keyof R]: TStaticMethods<T>[R[K]] };
}

export { exportAndRenameStaticMethods };
