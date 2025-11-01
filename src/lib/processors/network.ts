/**
 * Fetches JSON from a URL and parses it with type safety.
 *
 * @template T - Expected type of the JSON response.
 * @param url - The URL to fetch.
 * @returns Parsed JSON of type T.
 * @throws If the fetch fails or response is not ok.
 */
export async function fetchJson<T = unknown>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      `❌ Failed to fetch ${url}: ${response.status} ${response.statusText}`,
    );
  }
  try {
    const data: T = await response.json();
    return data;
  } catch (err) {
    throw new Error(
      `❌ Failed to parse JSON from ${url}: ${(err as Error).message}`,
    );
  }
}

/**
 * Pauses execution for a specified amount of time.
 *
 * Useful in async functions when you want to wait or throttle execution,
 * e.g., for retry loops, animation delays, or rate-limiting API calls.
 *
 * @example
 * ```ts
 * async function demo() {
 *   console.log('Start');
 *   await delay(1000); // Pause for 1 second
 *   console.log('1 second later');
 * }
 * ```
 *
 * @param ms - The number of milliseconds to wait
 * @returns A Promise that resolves after the specified delay
 */
export const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Retry an asynchronous function with exponential backoff on rate-limited errors.
 *
 * @template T - Return type of the async function
 * @param fn - The async function to retry
 * @param retries - Maximum number of retry attempts (default: 5)
 * @param delayMs - Base delay in milliseconds for backoff (default: 500)
 * @returns The result of the async function
 *
 * @example
 * const result = await retry(() => fetchData(), 3, 300);
 */
export async function retry<T>(
  fn: () => Promise<T>,
  retries = 5,
  delayMs = 500,
): Promise<T> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const result = await fn();
      //   if (attempt > 0) logDev(`[Retry] Success on attempt ${attempt + 1}`);
      return result;
    } catch {
      //   const isRateLimit =
      //     err?.code === 'BAD_DATA' || err?.message?.includes('Too Many Requests');

      //   if (!isRateLimit || attempt === retries) {
      //     console.error(`[Retry] Failed on attempt ${attempt + 1}:`, err);
      //     throw err;
      //   }

      const backoff = delayMs * 2 ** attempt + Math.random() * 200;
      console.warn(
        `[Retry] Rate limited on attempt ${attempt + 1}, retrying in ${Math.round(backoff)}ms...`,
      );

      // Await delay before next attempt
      await new Promise((resolve) => setTimeout(resolve, backoff));
    }
  }

  // This should never be reached, but TS wants a return/throw
  throw new Error('Retry attempts exhausted');
}
