import type { TGenericUrlObject, THashScrollOptions } from '../types';
import {
  isDefined,
  isString,
  isObject,
  isKeyInObject,
  isArray,
  isInternalUrl,
  isAbsoluteUrl,
} from '../guards/core';
import { ObjectUtils, ArrayUtils } from '../common';

/**
 * Normalize various URL inputs to a string.
 *
 * @param href - The input URL, which can be a string, URL instance, or object with pathname/query/hash.
 * @returns A normalized string URL.
 *
 * @example
 * LinkUtils.normalizeUrl('https://example.com/path?query=1#hash');
 * // 'https://example.com/path?query=1#hash'
 *
 * @example
 * LinkUtils.normalizeUrl({ pathname: '/path', query: { q: '1' }, hash: '#section' });
 * // '/path?q=1#section'
 */
export function normalizeUrl(
  href?: string | URL | TGenericUrlObject | null,
): string {
  if (!isDefined(href)) return '';

  // 1. Handle simple strings
  if (isString(href)) return href;

  // 2. Handle native URL instances
  if (href instanceof URL) return href.toString();

  // 3. Handle UrlObjects (Next.js / Node)
  if (
    isObject(href) &&
    (isKeyInObject('pathname')(href) || isKeyInObject('query')(href))
  ) {
    const { pathname = '', query, hash = '' } = href;

    let queryString = '';

    if (isObject(query)) {
      const params = new URLSearchParams();

      // Cleanly iterate and append valid query params
      ObjectUtils.entries(query).forEach(([key, value]) => {
        if (isDefined(value)) {
          // Handle arrays (e.g. ?tag=a&tag=b) or primitives
          if (isArray(value)) {
            ArrayUtils.forEach(value, (v) => params.append(key, String(v)));
          } else {
            params.append(key, String(value));
          }
        }
      });

      const search = params.toString();
      if (search) queryString = `?${search}`;
    }

    const cleanPath = pathname || '';
    const cleanHash = hash && !hash.startsWith('#') ? `#${hash}` : hash || '';

    return `${cleanPath}${queryString}${cleanHash}`;
  }

  return '';
}
/**
 * ## 🧩 extractRelativePath — Extracts Relative Paths
 *
 * Extracts the relative path from an internal URL or absolute URL pointing
 * to the same origin. Ensures that the returned path always starts with `/`.
 *
 * ---
 *
 * ### ⚙️ Core Purpose
 * - 🔹 Converts internal absolute URLs to relative paths.
 * - 🔹 Preserves already relative paths.
 * - 🔹 Safely handles invalid or external URLs by returning `/`.
 *
 * ---
 *
 * ### 📘 Example Usage
 * ```ts
 * LinkUtils.extractRelativePath('/about');
 * // '/about'
 *
 * LinkUtils.extractRelativePath('https://example.com/about?query=1');
 * // '/about'
 *
 * LinkUtils.extractRelativePath('https://external.com/page');
 * // '/'
 * ```
 *
 * ---
 *
 * @param url - The input URL string or unknown value.
 * @returns A string representing the relative path, always starting with `/`.
 */
export const extractRelativePath = (url?: unknown): string => {
  if (!isInternalUrl(url)) return '/';

  const trimmedUrl = url.trim();
  if (!trimmedUrl) return '/';

  if (trimmedUrl.startsWith('/')) return trimmedUrl;

  if (isAbsoluteUrl(trimmedUrl)) {
    const parsed = new URL(trimmedUrl);
    return parsed.pathname || '/';
  }

  return `/${trimmedUrl}`;
};
/**
 * Removes the hash fragment from a URL string while preserving path and query.
 */
export const stripHash = (url?: string): string => {
  if (!url) return '';

  // Simple string split is faster and SSR-safe for 90% of cases
  if (!url.includes('#')) return url;

  try {
    // If window exists, we can use the URL constructor for more accuracy
    const base =
      typeof window !== 'undefined'
        ? window.location.origin
        : 'http://localhost';
    const parsed = new URL(url, base);

    // Return path + search (and origin if it's external)
    const isInternal =
      typeof window !== 'undefined' && parsed.origin === window.location.origin;
    return isInternal
      ? `${parsed.pathname}${parsed.search}`
      : `${parsed.origin}${parsed.pathname}${parsed.search}`;
  } catch {
    // Fallback for malformed URLs
    return url.split('#')[0];
  }
};

export const handleInternalHashScroll = ({
  event,
  href,
  behavior = 'smooth',
  block = 'start',
}: THashScrollOptions): boolean => {
  if (typeof window === 'undefined') return false;
  if (!href.startsWith('#')) return false;

  // iOS Safari has broken scrollIntoView behavior
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  if (isIOS) return false;

  const id = href.replace(/^#/, '');
  const element = document.getElementById(id);
  if (!element) return false;

  event?.preventDefault();

  element.scrollIntoView({
    behavior,
    block,
  });

  return true;
};
