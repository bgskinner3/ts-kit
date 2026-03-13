/**
 * @jest-environment jsdom
 */
import { isAbsoluteUrl } from '../../src/lib/guards/core/link-guards';

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
  // TODO: fix test error
  //   describe('isInternalUrl', () => {
  //     // 1. We must use a copy, not a reference
  //     const oldLocation = window.location;

  //     beforeAll(() => {
  //       // 2. The "Nuclear" delete
  //       // @ts-expect-error window location temp
  //       delete window.location;

  //       // 3. Simple assignment works once the property is deleted
  //       // @ts-expect-error window location temp
  //       window.location = {
  //         origin: 'https://mysite.com',
  //         hostname: 'mysite.com',
  //         href: 'https://mysite.com',
  //         assign: jest.fn(),
  //         replace: jest.fn(),
  //       };
  //     });

  //     afterAll(() => {
  //       // 4. Restore it
  //       // @ts-expect-error window location temp
  //       window.location = oldLocation;
  //     });

  //     it('returns true for relative paths starting with /', () => {
  //       expect(isInternalUrl('/profile')).toBe(true);
  //     });

  //     it('returns true for absolute URLs matching the current origin', () => {
  //       expect(isInternalUrl('https://mysite.com')).toBe(true);
  //     });

  //     it('returns false for external domains', () => {
  //       expect(isInternalUrl('https://external.com')).toBe(false);
  //     });
  //   });
});
