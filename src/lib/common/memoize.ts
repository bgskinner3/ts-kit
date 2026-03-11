/**
 * Simple memoization utility for functions with a single string argument.
 *
 * This creates a cache (using Object.create(null) for a "pure" object) to store
 * the results of function calls. If the function is called again with the same
 * string, the cached result is returned instantly instead of re-calculating.
 *
 * USE CASE:
 * Highly effective for expensive operations that run frequently during render
 * cycles, such as Regex-based prop validation (isPropValid) or theme lookups.
 *
 * @param fn - The function to be memoized.
 * @returns A wrapped version of the function that caches its results.
 *
 * @example
 * const expensiveCheck = memoize((str: string) => someRegex.test(str));
 * expensiveCheck('className'); // Calculated and cached
 * expensiveCheck('className'); // Returned from cache (O(1) lookup)
 */
export const memoize = <T>(fn: (arg: string) => T) => {
  const cache: Record<string, T> = Object.create(null);

  return (arg: string): T => {
    if (arg in cache) {
      return cache[arg]; // Return the "remembered" result
    }
    const result = fn(arg); // Run the actual logic
    cache[arg] = result; // Save it for next time
    return result;
  };
};
