import { isObject, isDefined, isKeyInObject, isString } from '../guards';
/**
 * ## 🌐 fetchJson — Fetch and Parse JSON from a URL
 *
 * Performs a `fetch` request and attempts to parse the response as JSON.
 * Throws a detailed error if the request fails or the response is not valid JSON.
 *
 * ---
 *
 * ### Example
 *
 * ```ts
 * const data = await fetchJson<{ id: number; name: string }>(
 *   'https://api.example.com/users/1'
 * );
 * console.log(data.id, data.name);
 * ```
 *
 * @template T - Expected type of the JSON response
 * @param url - URL to fetch JSON from
 * @returns Parsed JSON data of type `T`
 * @throws Error if fetch fails or response is invalid JSON
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
 * ## ⏱ delay — Pause Execution for a Duration
 *
 * Returns a Promise that resolves after a specified number of milliseconds.
 * Useful for throttling, rate-limiting, or waiting between async operations.
 *
 * ---
 *
 * ### Example
 *
 * ```ts
 * await delay(1000); // Pause for 1 second
 * console.log('Done waiting!');
 * ```
 *
 * @param ms - Number of milliseconds to wait
 * @returns Promise that resolves after `ms` milliseconds
 */
export const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * ## 🔁 retry — Retry an Async Function with Exponential Backoff
 *
 * Executes an async function multiple times if it fails, with an **exponential backoff** strategy.
 * Automatically handles transient failures or rate-limiting errors.
 *
 * ---
 *
 * ### Example
 *
 * ```ts
 * const result = await retry(() => fetchJson('/api/data'), 3, 500);
 * console.log(result);
 * ```
 *
 * @template T - Return type of the async function
 * @param fn - Async function to retry
 * @param retries - Maximum number of retry attempts (default: 5)
 * @param delayMs - Base delay in milliseconds for exponential backoff (default: 500)
 * @returns Result of the async function if successful
 * @throws Last encountered error if all retries fail
 */
export async function retry<T>(
  fn: () => Promise<T>,
  retries = 5,
  delayMs = 500,
): Promise<T> {
  let lastError: unknown;

  function isErrorWithProps(
    err: unknown,
  ): err is { code?: string; message?: string } {
    return (
      isObject(err) && isDefined(err) && ('code' in err || 'message' in err)
    );
  }

  // for (let attempt = 0; attempt <= retries; attempt++) {
  //   try {
  //     const result = await fn();
  //     if (attempt > 0)
  //       console.log({}, `[Retry] Success on attempt ${attempt + 1}`);
  //     return result;
  //   } catch (err: unknown) {
  //     lastError = err;
  //     let isRateLimit = false;

  //     if (isErrorWithProps(err)) {
  //       const msg = err.message ?? '';
  //       const code = err.code ?? '';
  //       isRateLimit = code === 'BAD_DATA' || msg.includes('Too Many Requests');
  //     }
  //     if (!isRateLimit || attempt === retries) {
  //       console.error(`[Retry] Failed on attempt ${attempt + 1}:`, err);
  //       throw err;
  //     }

  //     const backoff = delayMs * 2 ** attempt + Math.random() * 200;
  //     console.warn(
  //       `[Retry] Rate limited on attempt ${attempt + 1}, retrying in ${Math.round(backoff)}ms...`,
  //     );

  //     // Await delay before next attempt
  //     await new Promise((resolve) => setTimeout(resolve, backoff));
  //   }
  // }
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const result = await fn();
      if (attempt > 0) {
        console.log({}, `[Retry] Success on attempt ${attempt + 1}`);
      }
      return result;
    } catch (err: unknown) {
      lastError = err;
      let isRateLimit = false;

      if (isErrorWithProps(err)) {
        const msg = err.message ?? '';
        const code = err.code ?? '';
        isRateLimit = code === 'BAD_DATA' || msg.includes('Too Many Requests');
      }

      // If not rate-limit error or last attempt, throw
      if (!isRateLimit || attempt === retries) {
        console.error(`[Retry] Failed on attempt ${attempt + 1}:`, err);

        // Normalize error so Jest can catch it
        let errorToThrow: Error;

        if (err instanceof Error) {
          errorToThrow = err;
        } else if (
          isObject(err) &&
          isKeyInObject('message')(err) &&
          isString(err.message)
        ) {
          errorToThrow = new Error(err.message);
        } else {
          errorToThrow = new Error(String(err || 'Retry failed'));
        }

        throw errorToThrow;
      }

      // Calculate exponential backoff + random jitter
      const backoff = delayMs * 2 ** attempt + Math.random() * 200;
      console.warn(
        `[Retry] Rate limited on attempt ${attempt + 1}, retrying in ${Math.round(backoff)}ms...`,
      );

      await new Promise((resolve) => setTimeout(resolve, backoff));
    }
  }
  console.error('[Retry] All retry attempts exhausted');
  // This should never be reached, but TS wants a return/throw
  throw lastError || new Error('Retry attempts exhausted');
}
