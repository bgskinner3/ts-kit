// /**
//  * TUnionToIntersection
//  */
// type TUnionToIntersection<U> =
//   (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;

/**
 * TUnionToIntersection: Type-Safe Union-to-Intersection Converter
 *
 * Transforms a union type (`A | B`) into an intersection type (`A & B`).
 * By using `U extends unknown` instead of `any`, we maintain strict
 * type checking during the distribution phase.
 *
 * @template U - The union to be transformed
 */
type TUnionToIntersection<U> = (
  U extends unknown ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;

export type { TUnionToIntersection };
