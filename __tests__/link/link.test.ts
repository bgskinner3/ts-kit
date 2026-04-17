/**
 * @jest-environment jsdom
 */
import {
  normalizeUrl,
  handleInternalHashScroll,
  //   extractRelativePath,
  stripHash,
} from '../../src/lib/link';
describe('Link Utilities', () => {
  describe('normalizeUrl', () => {
    test('returns empty string for nullish values', () => {
      expect(normalizeUrl(null)).toBe('');
      expect(normalizeUrl(undefined)).toBe('');
    });

    test('returns plain strings as-is', () => {
      const url = 'https://google.com';
      expect(normalizeUrl(url)).toBe(url);
    });

    test('converts native URL objects to strings', () => {
      const url = new URL('https://example.com/path');
      expect(normalizeUrl(url)).toBe('https://example.com/path');
    });

    test('handles complex Next.js-style URL objects', () => {
      const input = {
        pathname: '/shop',
        query: { category: 'shoes', tags: ['new', 'sale'] },
        hash: 'top',
      };
      // Note: URLSearchParams encodes arrays as key=val&key=val
      expect(normalizeUrl(input)).toBe(
        '/shop?category=shoes&tags=new&tags=sale#top',
      );
    });
  });

  // describe('extractRelativePath', () => {
  //   // Use a backup to restore later if needed
  //   const originalLocation = window.location;

  //   beforeAll(() => {
  //     // 1. Delete the existing property
  //     // @ts-expect-error
  //     delete (window as any).location;

  //     // 2. Define a new static location object
  //     Object.defineProperty(window, 'location', {
  //       value: new URL('https://myapp.com'),
  //       configurable: true,
  //       writable: true,
  //     });
  //   });

  //   afterAll(() => {
  //     // Restore original location to prevent side effects in other test files
  //     window.location = originalLocation;
  //   });

  //   test.each([
  //     ['/about', '/about'],
  //     ['https://myapp.com', '/contact'],
  //     ['https://external.com', '/'],
  //     // ... rest of your cases
  //   ])('should transform %p into %p', (input, expected) => {
  //     expect(extractRelativePath(input)).toBe(expected);
  //   });
  // });

  describe('stripHash', () => {
    test.each([
      ['/path#section', '/path'],
      ['/path?q=1#section', '/path?q=1'],
      ['https://ext.com', 'https://ext.com'],
      ['/no-hash', '/no-hash'],
      ['', ''],
    ])('should strip hash from %p', (input, expected) => {
      expect(stripHash(input)).toBe(expected);
    });
  });

  describe('handleInternalHashScroll', () => {
    let mockElement: HTMLElement;
    const mockEvent = { preventDefault: jest.fn() } as any;

    beforeEach(() => {
      jest.clearAllMocks();
      // Setup a dummy element in JSDOM
      mockElement = document.createElement('div');
      mockElement.id = 'target';
      mockElement.scrollIntoView = jest.fn();
      document.body.appendChild(mockElement);
    });

    afterEach(() => {
      document.body.removeChild(mockElement);
    });

    test('returns false if not a hash link', () => {
      const result = handleInternalHashScroll({ href: '/not-a-hash' });
      expect(result).toBe(false);
    });

    test('scrolls and prevents default if element exists', () => {
      const result = handleInternalHashScroll({
        event: mockEvent,
        href: '#target',
        behavior: 'auto',
      });

      expect(result).toBe(true);
      expect(mockEvent.preventDefault).toHaveBeenCalled();
      expect(mockElement.scrollIntoView).toHaveBeenCalledWith({
        behavior: 'auto',
        block: 'start',
      });
    });

    test('returns false if element is missing', () => {
      const result = handleInternalHashScroll({ href: '#ghost' });
      expect(result).toBe(false);
    });
  });
});
