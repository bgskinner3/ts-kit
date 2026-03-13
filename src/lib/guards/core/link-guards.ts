import type { TTypeGuard, TAbsoluteURL, TInternalUrl } from '../../../types';
import { isNonEmptyString } from './primitives';

/**  @see {@link CompositeTypeGuardsDocs.isValidUrl} */
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
