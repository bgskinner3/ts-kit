# Dom Utils

`DomUtils` provides **type-safe, DOM-focused helpers** for keyboard events, image preloading, and image normalization.  
These utilities are **pure functions**, framework-agnostic, and work in both native DOM and React environments.

---

## Utilities Table

| Function | Description |
| -------- | ----------- |
| `getKeyboardAction(event, config)` | Interprets a `KeyboardEvent` and returns semantic actions: copy, paste, clear, allowed keys, or block typing. Configurable via `TKeyboardConfig`. |
| `preloadImages(urls, options)` | Preloads one or multiple images with caching. Uses `Image.decode()` when available, falls back to `onload/onerror`. LRU cache prevents memory overflow. |
| `normalizeImageSrc(src)` | Normalizes various image sources into a plain string URL. Supports string URLs, image objects, module default exports, Next.js `StaticImageData`, Vite, etc. |

---

## Example Usage

### 1️⃣ Tree-shakable individual imports

Import only the utilities you need to keep your bundle minimal:

```ts
import { getKeyboardAction, preloadImages, normalizeImageSrc } from './lib/dom';

// Keyboard event
const action = getKeyboardAction(event, { allowedKeys: ['enter', 'tab'] });
if (action.isPaste) console.log('User pasted content.');

// Preload images
await preloadImages(['/img/photo1.jpg', '/img/photo2.jpg']);

// Normalize image source
const imageUrl = normalizeImageSrc(imageModule);

```

### 2️⃣ Using the full DomUtils object

Importing the entire DomUtils object includes all methods in your bundle:

```ts
import { DomUtils } from './lib/dom';

// Keyboard event
const action = DomUtils.getKeyboardAction(event);
if (action.isCopy) console.log('User copied content.');

// Preload images
await DomUtils.preloadImages(['/img/photo1.jpg', '/img/photo2.jpg']);

// Normalize image source
const imageUrl = DomUtils.normalizeImageSrc(imageModule);

```

> ⚠️ **Note:** While convenient, using `DomUtils` is **not tree-shakable**.  
> For large projects or bundles, prefer **individual imports**.