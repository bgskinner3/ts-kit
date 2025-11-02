// global/common-utils.docs.d.ts
declare global {
  class ColorUtilsDocs {
    static ColorUtils(): void;

    /**
     * ## ☀️ isLumGreaterThan — Check if a Color’s Luminance Exceeds a Threshold
     *
     * Determines whether the luminance of a color is above the given threshold.
     *
     * @param color - RGB tuple or HEX color string.
     * @param threshold - A number between 0 and 1 representing the luminance cutoff.
     * @returns `true` if the color’s luminance is greater than the threshold.
     *
     * @example
     * ```ts
     * isLumGreaterThan('#ffffff', 0.2); // true
     * isLumGreaterThan('#222222', 0.2); // false
     * ```
     */
    static isLumGreaterThan(): void;
    /**
     * ## 🌗 isLumLessThan — Check if a Color’s Luminance is Below a Threshold
     *
     * Determines whether the luminance of a color (in RGB array or HEX format)
     * is less than the specified threshold. Uses `getLuminance()` internally.
     *
     * @param color - RGB tuple or HEX color string (e.g. `[255,255,255]` or `"#ffffff"`)
     * @param threshold - A number between 0 and 1 representing the luminance cutoff.
     * @returns `true` if the color’s luminance is less than the threshold.
     *
     * @example
     * ```ts
     * isLumLessThan('#000000', 0.2); // true
     * isLumLessThan([255,255,255], 0.2); // false
     * ```
     */
    static isLumLessThan(): void;

    /**
     * ## 🎨 interpolateColor — Linear Interpolation Between Two RGB Colors
     *
     * Interpolates between two RGB colors based on a `factor` and returns a **CSS rgb() string**.
     *
     * ---
     *
     * ### ⚙️ Core Purpose
     * - Blend two colors linearly using a numeric factor between `0` and `1`.
     * - `factor = 0` returns the `start` color.
     * - `factor = 1` returns the `end` color.
     * - Any value in-between returns the proportional mix.
     *
     * ---
     *
     * ### 📘 Example Usage
     * ```ts
     * interpolateColor(
     *   { r: 255, g: 0, b: 0 },
     *   { r: 0, g: 0, b: 255 },
     *   0.5
     * );
     * // → "rgb(128, 0, 128)"
     *
     * interpolateColor(
     *   { r: 0, g: 255, b: 0 },
     *   { r: 0, g: 0, b: 0 },
     *   0.25
     * );
     * // → "rgb(0, 191, 0)"
     * ```
     *
     * ---
     *
     * ### 📌 Notes
     * - `start` and `end` colors must have `r`, `g`, `b` values as numbers.
     * - `factor` should ideally be in `[0, 1]`, but values outside will extrapolate.
     * - Returns a **valid CSS rgb() string** ready to use in style properties.
     */
    static interpolateColor(): void;

    /**
     * ## 🎨 hexToRGBShorthand — Convert Hex Color to RGB Array
     *
     * Converts a **hex color string** into an RGB array `[r, g, b]`.
     * Supports both **3-character shorthand** (e.g., `#abc`) and **6-character hex** (e.g., `#aabbcc`).
     *
     * ---
     *
     * ### ⚙️ Core Purpose
     * - Convert a user-friendly or CSS hex color into a numeric RGB array.
     * - Handles shorthand hex and expands it automatically.
     * - Returns `null` for invalid hex strings.
     *
     * ---
     *
     * ### 📘 Example Usage
     * ```ts
     * hexToRGBShorthand('#abc');     // [170, 187, 204]
     * hexToRGBShorthand('#aabbcc');  // [170, 187, 204]
     * hexToRGBShorthand('invalid');  // null
     * ```
     *
     * ---
     *
     * ### 📌 Notes
     * - Input must be a valid 3- or 6-character hex string (case-insensitive).
     * - Output is always a `[number, number, number]` array if valid.
     */
    static hexToRGBShorthand(): void;

    /**
     * ## 🎨 contrastTextColor — Returns an Accessible Text Color Based on Background
     *
     * Dynamically selects a readable text color (`black` or `white`) depending on
     * the background color’s luminance.
     *
     * The function can return:
     * - **Tailwind classes** (e.g. `'text-black'` / `'text-white'`)
     * - **CSS color values** (e.g. `'#000000'` / `'#ffffff'`)
     *
     * ---
     *
     * @param color - RGB tuple or HEX color string.
     * @param options - Optional configuration for return format and threshold.
     * @returns A string representing the contrasting text color (Tailwind or CSS).
     *
     * ---
     *
     * @example
     * ```ts
     * // Tailwind mode (default)
     * contrastTextColor('#000000');
     * // → 'text-white'
     *
     * // CSS mode
     * contrastTextColor('#ffffff', { mode: 'css' });
     * // → '#000000'
     *
     * // Custom threshold
     * contrastTextColor([120,120,120], { threshold: 0.2 });
     * // → 'text-white'
     * ```
     */
    static contrastTextColor(): void;

    /**
     * ## 🌑 isDarkColor — Check if a Color is Perceptually Dark
     *
     * Determines whether a color is "dark" based on a standard WCAG-inspired
     * luminance threshold (0.179). Works with both HEX and RGB formats.
     *
     * @param color - RGB tuple or HEX color string.
     * @returns `true` if the color is considered dark.
     *
     * @example
     * ```ts
     * isDarkColor('#000000'); // true
     * isDarkColor('#ffffff'); // false
     * ```
     */
    static isDarkColor(): void;
  }
}

// This ensures TypeScript treats the file as a module
export {};
