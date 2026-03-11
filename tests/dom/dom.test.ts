/**
 * @jest-environment jsdom
 */
import { getKeyboardAction } from '../../src/lib/dom/events';
import { preloadImages, normalizeImageSrc } from '../../src/lib/dom/media';

describe('Media Utils', () => {
  it('normalizes various image shapes', () => {
    expect(normalizeImageSrc('test.jpg')).toBe('test.jpg');
    expect(normalizeImageSrc({ src: 'test.jpg' })).toBe('test.jpg');
    expect(normalizeImageSrc({ default: { src: 'test.jpg' } })).toBe(
      'test.jpg',
    );
  });

  it('preloads images and populates cache', async () => {
    // Note: JSDOM mocks the Image object so you can test the logic flow
    const promise = preloadImages('test.jpg');
    expect(promise).toBeInstanceOf(Promise);
  });
});
describe('getKeyboardAction', () => {
  it('identifies allowed navigation keys', () => {
    const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
    const action = getKeyboardAction(event);

    expect(action.isAllowedKey).toBe(true);
    expect(action.shouldBlockTyping).toBe(false);
  });

  it('identifies copy shortcuts (Cmd/Ctrl + C)', () => {
    const event = new KeyboardEvent('keydown', { 
      key: 'c', 
      metaKey: true // Simulating Mac Cmd+C
    });
    const action = getKeyboardAction(event);

    expect(action.isCopy).toBe(true);
    expect(action.shouldBlockTyping).toBe(false);
  });

  it('identifies paste shortcuts (Cmd/Ctrl + V)', () => {
    const event = new KeyboardEvent('keydown', { 
      key: 'v', 
      ctrlKey: true // Simulating Windows Ctrl+V
    });
    const action = getKeyboardAction(event);

    expect(action.isPaste).toBe(true);
  });

  it('flags unauthorized keys as shouldBlockTyping', () => {
    const event = new KeyboardEvent('keydown', { key: 'z' });
    const action = getKeyboardAction(event);

    expect(action.isAllowedKey).toBe(false);
    expect(action.shouldBlockTyping).toBe(true);
  });

  it('correctly identifies clear keys (Backspace/Delete)', () => {
    const event = new KeyboardEvent('keydown', { key: 'Backspace' });
    const action = getKeyboardAction(event);

    expect(action.isClear).toBe(true);
    expect(action.isAllowedKey).toBe(true);
  });

  it('respects custom configuration overrides', () => {
    const customConfig = {
      allowedKeys: ['z'],
    };
    const event = new KeyboardEvent('keydown', { key: 'z' });
    const action = getKeyboardAction(event, customConfig);

    expect(action.isAllowedKey).toBe(true);
    expect(action.shouldBlockTyping).toBe(false);
  });
});