import type { TTypeGuard, TAbsoluteURL, TInternalUrl } from '../../types';
import { isNonEmptyString } from './primitives';

/**
 * ## 🧩 isValidUrl — Type Guard for Absolute URLs
 *
 * Checks whether a given string is a valid absolute URL according to the
 * browser's `URL` constructor. Returns `true` if the string can be parsed
 * as a valid URL, otherwise `false`.
 *
 * ---
 *
 * ### ⚙️ Core Purpose
 * - 🔹 Ensures the string is non-empty and a valid URL.
 * - 🔹 Provides a **TypeScript type guard** (`url is string`) for safe narrowing.
 *
 * ---
 *
 * ### 📘 Example Usage
 * ```ts
 * isValidUrl('https://example.com'); // true
 * isValidUrl('ftp://example.com');   // true
 * isValidUrl('not a url');           // false
 * isValidUrl('');                     // false
 * ```
 *
 * ---
 *
 * @param url - The value to validate as a URL.
 * @returns `true` if `url` is a non-empty valid absolute URL string.
 */
export const isAbsoluteUrl: TTypeGuard<TAbsoluteURL> = (
  url: unknown,
): url is TAbsoluteURL => {
  if (!isNonEmptyString(url)) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};
/**
 * ## 🏠 isInternalUrl — Type Guard for Same-Origin or Relative Links
 *
 * Checks if a value is a valid internal URL. A URL is considered "internal" if it
 * is a relative path (starts with `/`) or an absolute URL that matches the
 * current window's origin (same domain).
 *
 * ---
 *
 * ### ⚙️ Core Purpose
 * - 🔹 Distinguish between internal navigation and external outbound links.
 * - 🔹 Validate relative paths for client-side routing.
 * - 🔹 Ensure a URL belongs to the current application's hostname.
 *
 * ---
 *
 * ### 📘 Example Usage
 * ```ts
 * // Assuming current origin is 'https://myapp.com'
 * isInternalUrl('/dashboard');              // true
 * isInternalUrl('https://myapp.com'); // true
 * isInternalUrl('https://google.com');      // false
 * isInternalUrl('mailto:test@test.com');    // false
 * ```
 *
 * ---
 *
 * ### ⚠️ Environment Note
 * - This guard requires a **browser environment** (`window.location`).
 * - In SSR or Node.js environments, it will consistently return `false`.
 *
 * ---
 *
 * @param url - The value to validate as an internal link.
 * @returns `true` if `url` is a non-empty string belonging to the current origin.
 */
export const isInternalUrl: TTypeGuard<TInternalUrl> = (
  url: unknown,
): url is TInternalUrl => {
  if (
    typeof window === 'undefined' ||
    typeof location === 'undefined' ||
    !isNonEmptyString(url)
  ) {
    return false;
  }
  if (url.startsWith('/')) return true;
  try {
    const parsed = new URL(url, location.origin);
    return parsed.hostname === location.hostname;
  } catch {
    return false;
  }
};
