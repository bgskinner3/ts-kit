// global/common-utils.docs.d.ts
declare global {
  class ProcessorUtilsDocs {
    /**
     * Retry an asynchronous function with exponential backoff.
     *
     * This utility attempts to execute the given async function multiple times
     * if it fails due to rate-limiting errors (e.g., `BAD_DATA` or "Too Many Requests").
     * Logging occurs only when a retry is necessary.
     *
     * @template T - The type of the value returned by the function.
     * @param fn - The async function to retry.
     * @param retries - Maximum number of retries (default: 5). Total attempts = retries + 1.
     * @param delayMs - Base delay in milliseconds for exponential backoff (default: 500ms).
     * @returns The resolved value of type `T` if successful.
     * @throws The last encountered error if all retries fail, or if the error is not rate-limit related.
     *
     * @example
     * ```ts
     * const result = await retry(() => fetchJson<MyData>(url), 3, 400);
     * ```
     *
     * @remarks
     * - First attempt is silent; no logging.
     * - On rate-limit errors:
     *    - Logs a warning with backoff time.
     *    - Applies exponential backoff with small random jitter.
     * - On success after retries, logs success.
     * - Non-rate-limit errors or exhausted retries throw the error.
     */
    static retry(): void;

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
    static delay(): void;

    /**
     * Lightweight wrapper around the Fetch API for GET requests.
     *
     * - Automatically throws an error if the response status is not OK (non-2xx).
     * - Parses the response body as JSON.
     *
     * @template T - Expected type of the parsed JSON response
     * @param url - The URL to fetch
     * @returns A promise resolving to the parsed JSON of type `T`
     *
     * @example
     * ```ts
     * type DogResponse = { message: string; status: string };
     * const data = await InfraUtils.fetchJson<DogResponse>('https://dog.ceo/api/breeds/image/random');
     * console.log(data.message); // string
     * ```
     */
    static fetchJson(): void;
  }
}

// This ensures TypeScript treats the file as a module
export {};
