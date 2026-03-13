import { getKeyboardAction } from './events';
import { preloadImages, normalizeImageSrc } from './media';

const DomUtils = {
  getKeyboardAction,
  preloadImages,
  normalizeImageSrc,
} as const;

export { getKeyboardAction, preloadImages, normalizeImageSrc, DomUtils };
