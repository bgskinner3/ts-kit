import { isObject, isDefined } from '../guards';
/**
 * @see {@link ProcessorUtilsDocs.fetchJson}
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
 * @see {@link ProcessorUtilsDocs.delay}
 */
export const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Retries an async function multiple times with exponential backoff.
 * Useful for handling rate limits or transient failures.
 *
 * @see {@link ProcessorUtilsDocs.retry} For full documentation
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

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const result = await fn();
      if (attempt > 0)
        console.log({}, `[Retry] Success on attempt ${attempt + 1}`);
      return result;
    } catch (err: unknown) {
      lastError = err;
      let isRateLimit = false;

      if (isErrorWithProps(err)) {
        const msg = err.message ?? '';
        const code = err.code ?? '';
        isRateLimit = code === 'BAD_DATA' || msg.includes('Too Many Requests');
      }
      if (!isRateLimit || attempt === retries) {
        console.error(`[Retry] Failed on attempt ${attempt + 1}:`, err);
        throw err;
      }

      const backoff = delayMs * 2 ** attempt + Math.random() * 200;
      console.warn(
        `[Retry] Rate limited on attempt ${attempt + 1}, retrying in ${Math.round(backoff)}ms...`,
      );

      // Await delay before next attempt
      await new Promise((resolve) => setTimeout(resolve, backoff));
    }
  }
  console.error('[Retry] All retry attempts exhausted');
  // This should never be reached, but TS wants a return/throw
  throw lastError || new Error('Retry attempts exhausted');
}
