//   public static getRandomDuration = ({
//     min = 1000,
//     max = 4000,
//   }: {
//     max?: number | undefined;
//     min?: number | undefined;
//   } = {}): number => {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
//   };

/**
 * Merges multiple React refs (both callback and object refs) into a single ref callback.
 *
 * This is useful when a component needs to forward a ref to its parent
 * **and** also maintain its own internal ref (e.g., for `useInView` or animations).
 *
 * @example
 * ```ts
 * const combinedRef = GeneratorHelpers.mergeRefs(forwardedRef, inViewRef);
 * <div ref={combinedRef} />
 * ```
 *
 * @param refs - An array of React refs (object refs or callback refs)
 * @returns A single React ref callback that assigns the value to all provided refs
 */
//   static mergeRefs<T>(
//     ...refs: (React.Ref<T> | undefined)[]
//   ): React.RefCallback<T> {
//     return (value: T) => {
//       refs.forEach((ref) => {
//         if (!ref) return;
//         if (typeof ref === 'function') {
//           ref(value);
//         } else {
//           // Assign to object refs
//           // @ts-expect-error ObjectRef type may be readonly, but React allows assigning .current
//           ref.current = value;
//         }
//       });
//     };
//   }

//   static hashString(str: string): string {
//     return createHash('md5').update(str).digest('hex');
//   }
