# Color Utilities (`ColorUtils`)

`ColorUtils` provides **type-safe, color-focused helpers** for working with HEX and RGB colors, computing luminance, detecting light/dark colors, generating accessible text colors, and interpolating between colors.  
These utilities are **pure functions**, framework-agnostic, and work in both browser and Node environments.


---

## Utilities Table

| Function | Description |
| -------- | ----------- |
| `hexToRGB(hex)` | Converts a 6-character HEX color string to an `[r, g, b]` tuple. Throws for invalid HEX. |
| `validateRGB(input)` | Validates input as an RGB tuple or HEX string; converts HEX to RGB if needed. |
| `getLuminance(rgb)` | Returns the luminance of a color (0–1), from RGB tuple or HEX string. |
| `isLumLessThan(color, threshold)` | Checks if a color’s luminance is below a specified threshold. |
| `isDarkColor(color)` | Determines if a color is perceptually dark using WCAG-inspired threshold. |
| `isLumGreaterThan(color, threshold)` | Checks if a color’s luminance exceeds a threshold. |
| `contrastTextColor(color, options?)` | Returns a readable text color (`black` / `white`) for a given background. Supports Tailwind or CSS mode and custom threshold. |
| `hexToRGBShorthand(hex)` | Converts 3- or 6-character HEX to `[r, g, b]` array. Returns `null` if invalid. |
| `interpolateColor(start, end, factor)` | Linearly interpolates between two RGB colors and returns a CSS `rgb()` string. |
| `hexToHSL(hex)` | Converts a HEX color string to HSL object `{h, s, l}`. |
| `hexToNormalizedRGB(hex)` | Converts HEX to normalized RGB tuple `[r, g, b]` with values between 0–1. |

---

## Example Usage

### 1️⃣ Tree-shakable individual imports

```ts
import { hexToRGB, isDarkColor, contrastTextColor } from './lib/color';

const rgb = hexToRGB('#ff0000');          // [255, 0, 0]
const dark = isDarkColor(rgb);            // false
const textColor = contrastTextColor('#000000'); // 'text-white'

```


### 2️⃣ Using the full ColorUtils object

```ts
import { ColorUtils } from './lib/color';

const rgb = ColorUtils.hexToRGB('#00ff00');        // [0, 255, 0]
const dark = ColorUtils.isDarkColor(rgb);          // false
const textColor = ColorUtils.contrastTextColor('#ffffff'); // 'text-black'

```