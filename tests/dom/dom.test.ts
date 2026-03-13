/**
 * @jest-environment jsdom
 */
import { getKeyboardAction } from '../../src/lib/dom/events';
import { preloadImages, normalizeImageSrc } from '../../src/lib/dom/media';
import { TKeyboardConfig } from '../../src/types';

describe('Media Utils', () => {
  // -------------------------------
  // normalizeImageSrc
  // -------------------------------
  describe('normalizeImageSrc', () => {
    it('returns string URLs as-is', () => {
      expect(normalizeImageSrc('test.jpg')).toBe('test.jpg');
    });

    it('returns src from object', () => {
      expect(normalizeImageSrc({ src: 'test.jpg' })).toBe('test.jpg');
    });

    it('returns src from default object', () => {
      expect(normalizeImageSrc({ default: { src: 'test.jpg' } })).toBe(
        'test.jpg',
      );
    });

    it('returns empty string for null or undefined', () => {
      expect(normalizeImageSrc(null)).toBe('');
      expect(normalizeImageSrc(undefined)).toBe('');
    });

    it('returns empty string for unexpected object shapes', () => {
      expect(normalizeImageSrc({ foo: 'bar' } as any)).toBe('');
    });
  });

  // -------------------------------
  // preloadImages
  // -------------------------------
  describe('preloadImages', () => {
    beforeEach(() => {
      // Reset cache for each test
      (global as any).PRELOAD_CACHE = new Map<string, true>();

      // Mock Image constructor
      global.Image = class {
        src = '';
        fetchPriority: any;
        complete = false;
        onload: (() => void) | null = null;
        onerror: (() => void) | null = null;
        decode = jest.fn().mockResolvedValue(undefined);
      } as any;
    });

    it('preloads a single image', async () => {
      const promise = preloadImages('image.jpg');
      expect(promise).toBeInstanceOf(Promise);
      await expect(promise).resolves.toBeUndefined();
    });

    it('preloads multiple images', async () => {
      const urls = ['a.jpg', 'b.jpg', 'c.jpg'];
      await expect(preloadImages(urls)).resolves.toBeUndefined();
    });

    it('skips images that are already cached', async () => {
      const urls = ['cached.jpg'];
      await preloadImages(urls);
      // call again should resolve immediately
      await expect(preloadImages(urls)).resolves.toBeUndefined();
    });

    it('supports fetchPriority option', async () => {
      const urls = ['priority.jpg'];
      await expect(
        preloadImages(urls, { fetchPriority: 'high' }),
      ).resolves.toBeUndefined();
    });

    it('returns immediately in non-browser environments', async () => {
      const originalWindow = global.window;

      delete (global as any).window;
      await expect(preloadImages('image.jpg')).resolves.toBeUndefined();
      global.window = originalWindow;
    });
  });

  // -------------------------------
  // getKeyboardAction
  // -------------------------------
  // describe('getKeyboardAction', () => {
  //   it('identifies allowed navigation keys', () => {
  //     const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
  //     const action = getKeyboardAction(event);
  //     expect(action.isAllowedKey).toBe(true);
  //     expect(action.shouldBlockTyping).toBe(false);
  //   });

  //   it('identifies copy shortcuts (Cmd/Ctrl + C)', () => {
  //     const event = new KeyboardEvent('keydown', { key: 'c', metaKey: true });
  //     const action = getKeyboardAction(event);
  //     expect(action.isCopy).toBe(true);
  //     expect(action.shouldBlockTyping).toBe(false);
  //   });

  //   it('identifies paste shortcuts (Cmd/Ctrl + V)', () => {
  //     const event = new KeyboardEvent('keydown', { key: 'v', ctrlKey: true });
  //     const action = getKeyboardAction(event);
  //     expect(action.isPaste).toBe(true);
  //   });

  //   it('flags unauthorized keys as shouldBlockTyping', () => {
  //     const event = new KeyboardEvent('keydown', { key: 'z' });
  //     const action = getKeyboardAction(event);
  //     expect(action.isAllowedKey).toBe(false);
  //     expect(action.shouldBlockTyping).toBe(true);
  //   });

  //   it('correctly identifies clear keys (Backspace/Delete)', () => {
  //     const event = new KeyboardEvent('keydown', { key: 'Backspace' });
  //     const action = getKeyboardAction(event);
  //     expect(action.isClear).toBe(true);
  //     expect(action.isAllowedKey).toBe(true);
  //   });

  //   it('respects custom configuration overrides', () => {
  //     const customConfig = { allowedKeys: ['z'] };
  //     const event = new KeyboardEvent('keydown', { key: 'z' });
  //     const action = getKeyboardAction(event, customConfig);
  //     expect(action.isAllowedKey).toBe(true);
  //     expect(action.shouldBlockTyping).toBe(false);
  //   });

  //   it('handles Shift + allowed key correctly', () => {
  //     const event = new KeyboardEvent('keydown', {
  //       key: 'ArrowUp',
  //       shiftKey: true,
  //     });
  //     const action = getKeyboardAction(event);
  //     expect(action.isAllowedKey).toBe(true);
  //   });

  //   it('handles no key pressed (empty string)', () => {
  //     const event = new KeyboardEvent('keydown', { key: '' });
  //     const action = getKeyboardAction(event);
  //     expect(action.isAllowedKey).toBe(false);
  //     expect(action.shouldBlockTyping).toBe(true);
  //   });
  //   it('handles Alt key shortcuts', () => {
  //     const customConfig = {
  //       copyShortcut: { key: 'a', modifiers: ['alt'] },
  //       pasteShortcut: { key: 'b', modifiers: ['alt'] },
  //     };
  //     const copyEvent = new KeyboardEvent('keydown', {
  //       key: 'A',
  //       altKey: true,
  //     });
  //     const pasteEvent = new KeyboardEvent('keydown', {
  //       key: 'b',
  //       altKey: true,
  //     });

  //     expect(getKeyboardAction(copyEvent, customConfig).isCopy).toBe(true);
  //     expect(getKeyboardAction(pasteEvent, customConfig).isPaste).toBe(true);
  //   });

  //   it('respects custom clear keys', () => {
  //     const customConfig = { clearKeys: ['x'] };
  //     const event = new KeyboardEvent('keydown', { key: 'x' });
  //     const result = getKeyboardAction(event, customConfig);
  //     expect(result.isClear).toBe(true);
  //     expect(result.isAllowedKey).toBe(false);
  //   });
  // });
  describe('getKeyboardAction', () => {
    it('identifies allowed navigation keys', () => {
      const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
      const action = getKeyboardAction(event);
      expect(action.isAllowedKey).toBe(true);
      expect(action.shouldBlockTyping).toBe(false);
    });

    it('identifies copy shortcuts (Cmd/Ctrl + C)', () => {
      const eventMeta = new KeyboardEvent('keydown', {
        key: 'c',
        metaKey: true,
      });
      const eventCtrl = new KeyboardEvent('keydown', {
        key: 'c',
        ctrlKey: true,
      });
      expect(getKeyboardAction(eventMeta).isCopy).toBe(true);
      expect(getKeyboardAction(eventCtrl).isCopy).toBe(true);
    });

    it('identifies paste shortcuts (Cmd/Ctrl + V)', () => {
      const eventMeta = new KeyboardEvent('keydown', {
        key: 'v',
        metaKey: true,
      });
      const eventCtrl = new KeyboardEvent('keydown', {
        key: 'v',
        ctrlKey: true,
      });
      expect(getKeyboardAction(eventMeta).isPaste).toBe(true);
      expect(getKeyboardAction(eventCtrl).isPaste).toBe(true);
    });

    it('flags unauthorized keys as shouldBlockTyping', () => {
      const event = new KeyboardEvent('keydown', { key: 'z' });
      const action = getKeyboardAction(event);
      expect(action.isAllowedKey).toBe(false);
      expect(action.shouldBlockTyping).toBe(true);
    });

    it('correctly identifies clear keys (Backspace/Delete)', () => {
      const eventBackspace = new KeyboardEvent('keydown', { key: 'Backspace' });
      const eventDelete = new KeyboardEvent('keydown', { key: 'Delete' });
      expect(getKeyboardAction(eventBackspace).isClear).toBe(true);
      expect(getKeyboardAction(eventDelete).isClear).toBe(true);
    });

    it('respects custom configuration overrides for allowedKeys', () => {
      const customConfig = { allowedKeys: ['z'] };
      const event = new KeyboardEvent('keydown', { key: 'z' });
      const action = getKeyboardAction(event, customConfig);
      expect(action.isAllowedKey).toBe(true);
      expect(action.shouldBlockTyping).toBe(false);
    });

    it('respects custom clearKeys configuration', () => {
      const customConfig = { clearKeys: ['x'] };
      const event = new KeyboardEvent('keydown', { key: 'x' });
      const action = getKeyboardAction(event, customConfig);
      expect(action.isClear).toBe(true);
    });

    it('respects custom copy/paste shortcuts', () => {
      const customConfig: TKeyboardConfig = {
        copyShortcut: { key: 'a', modifiers: ['alt'] },
        pasteShortcut: { key: 'b', modifiers: ['alt'] },
      };
      const copyEvent = new KeyboardEvent('keydown', {
        key: 'A',
        altKey: true,
      });
      const pasteEvent = new KeyboardEvent('keydown', {
        key: 'b',
        altKey: true,
      });
      expect(getKeyboardAction(copyEvent, customConfig).isCopy).toBe(true);
      expect(getKeyboardAction(pasteEvent, customConfig).isPaste).toBe(true);
    });

    it('handles Shift + allowed key correctly', () => {
      const event = new KeyboardEvent('keydown', {
        key: 'ArrowUp',
        shiftKey: true,
      });
      const action = getKeyboardAction(event);
      expect(action.isAllowedKey).toBe(true);
    });

    it('handles no key pressed (empty string)', () => {
      const event = new KeyboardEvent('keydown', { key: '' });
      const action = getKeyboardAction(event);
      expect(action.isAllowedKey).toBe(false);
      expect(action.shouldBlockTyping).toBe(true);
    });

    it('handles uppercase letters for allowedKeys', () => {
      const event = new KeyboardEvent('keydown', { key: 'TAB' });
      const action = getKeyboardAction(event);
      expect(action.isAllowedKey).toBe(true);
    });
  });
});
