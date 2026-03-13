/**
 * @jest-environment jsdom
 */
import {
  isAbsoluteUrl,
  isInternalUrl,
} from '../../src/lib/guards/core/link-guards';

describe('Link Property Guards', () => {
  describe('isAbsoluteUrl', () => {
    it('returns true for valid absolute URLs', () => {
      expect(isAbsoluteUrl('https://google.com')).toBe(true);
      expect(isAbsoluteUrl('mailto:test@example.com')).toBe(true);
      expect(isAbsoluteUrl('ftp://server.local')).toBe(true);
    });

    it('returns false for relative paths or non-URLs', () => {
      expect(isAbsoluteUrl('/dashboard')).toBe(false);
      expect(isAbsoluteUrl('just-a-string')).toBe(false);
      expect(isAbsoluteUrl('')).toBe(false);
    });
  });
  // TODO: fix type issues
  describe('isInternalUrl', () => {
    // Save the original location
    const originalLocation = global.location;

    // beforeAll(() => {
    //   // Replace global.location with a mock object that matches the Location interface
    //   // Jest can safely overwrite global.location itself
    //   delete (global as any).location;
    //   (global as any).location = {
    //     origin: 'https://example.com',
    //     hostname: 'example.com',
    //   };
    // });

    afterAll(() => {
      global.location = originalLocation;
    });

    it('returns true for relative URLs starting with /', () => {
      expect(isInternalUrl('/dashboard')).toBe(true);
      expect(isInternalUrl('/about')).toBe(true);
    });

    // it('returns true for absolute URLs on the same host', () => {
    //   expect(isInternalUrl('https://example.com/dashboard')).toBe(true);
    //   expect(isInternalUrl('https://example.com/about?foo=bar')).toBe(true);
    // });

    it('returns false for absolute URLs on a different host', () => {
      expect(isInternalUrl('https://google.com')).toBe(false);
      expect(isInternalUrl('https://sub.example.com')).toBe(false);
    });

    // it('returns false for invalid URLs', () => {
    //   expect(isInternalUrl('not-a-url')).toBe(false);
    //   expect(isInternalUrl('')).toBe(false);
    //   expect(isInternalUrl(null as any)).toBe(false);
    //   expect(isInternalUrl(undefined as any)).toBe(false);
    //   expect(isInternalUrl(123 as any)).toBe(false);
    // });

    // it('returns false when window is undefined', () => {
    //   const _window = global.window;
    //   delete (global as any).window;
    //   expect(isInternalUrl('/dashboard')).toBe(false);
    //   global.window = _window;
    // });
  });
});
