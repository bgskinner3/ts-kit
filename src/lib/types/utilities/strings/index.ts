/**
 * ToPath: Recursive Path Constructor
 *
 * Transforms a tuple of strings into a URL path string separated by forward slashes.
 * It recursively joins elements, ensuring no trailing slash if the list is empty.
 *
 * @template TItems - A tuple of path segments (e.g., ['users', 'profile'])
 *
 * @example
 * // Result: "users/profile/settings"
 * type MyPath = ToPath<['users', 'profile', 'settings']>;
 */
type ToPath<TItems extends string[]> = TItems extends [
  infer Head extends string,
  ...infer Tail extends string[],
]
  ? `${Head}${Tail extends [] ? '' : `/${ToPath<Tail>}`}`
  : '';

// Recursively builds a query string from parameter names
/**
 * ToQueryString: Recursive Query Parameter Builder
 *
 * Transforms a tuple of parameter names into a template literal representing
 * a query string. Each key is mapped to a generic `string` value placeholder.
 *
 * @template TParams - A tuple of query keys (e.g., ['id', 'ref'])
 *
 * @example
 * // Result: "id=string&ref=string"
 * type MyQuery = ToQueryString<['id', 'ref']>;
 */
type ToQueryString<TParams extends string[]> = TParams extends [
  infer Head extends string,
  ...infer Tail extends string[],
]
  ? `${Head}=${string}${Tail extends [] ? '' : '&'}${ToQueryString<Tail>}`
  : '';

/**
 * TStrictURL: Type-Safe URL Template
 *
 * Generates a strictly formatted URL template literal based on protocol,
 * domain, and optional path/query parameters. This is excellent for
 * enforcing valid endpoint structures in API clients.
 *
 * @template TProtocol - Restricted to 'https' or 'http'
 * @template TDomain - Must end in a valid TLD (.com, .dev, or .io)
 * @template TPath - Optional tuple of path segments
 * @template TParams - Optional tuple of query parameter keys
 *
 * @example
 * // Result: "https://myapp.com"
 * type UserEndpoint = TStrictURL<
 *   'https',
 *   '://myapp.com',
 *   ['v1', 'user'],
 *   ['id', 'token']
 * >;
 */
type TStrictURL<
  TProtocol extends 'https' | 'http',
  TDomain extends `${string}.${'com' | 'dev' | 'io'}`,
  TPath extends string[] = [],
  TParams extends string[] = [],
> = `${TProtocol}://${TDomain}${TPath extends []
  ? ''
  : `/${ToPath<TPath>}`}${TParams extends []
  ? ''
  : `?${ToQueryString<TParams>}`}`;

// TODO: ADD TCamelCase TKebab etc util types
export type { TStrictURL, ToPath, ToQueryString };
