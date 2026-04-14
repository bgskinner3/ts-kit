import type {
  TContrastReport,
  TContrastStatus,
  TTypeGuard,
  TRGBTuple,
} from '../types';
import { getLuminance } from '../color';
import { isHexColor, isRGBString, isKeyInObject, isTuple3 } from '../guards';
import { ObjectUtils } from '../common/object';
import { DEFAULT_A11Y_SEED } from '../../constants';

/**
 * A11yContrastAuditor
 *
 * A utility class designed to help maintain WCAG-compliant color contrast in UI designs.
 *
 * This class analyzes foreground and background color combinations, identifies accessibility
 * violations, and suggests alternative colors to improve readability and meet WCAG
 * contrast requirements. It leverages internal Tailwind design tokens to ensure any
 * suggested replacements are consistent with the project's design system.
 *
 * Key Features:
 * - Detects insufficient contrast between text and background colors.
 * - Suggests accessible color alternatives based on Tailwind tokens.
 * - Helps developers maintain inclusive, accessible interfaces.
 *
 * @example
 * ```ts
 * // 1. Identify an issue
 * const report = A11yContrastAuditor.audit('white', 'primary-400');
 *
 * if (!report.isAA) {
 *   console.warn(`Contrast ratio too low: ${report.ratio}:1`);
 *
 *   // 2. Fix the issue by finding the closest passing shade in the same family
 *   const blueFamily: ColorKey[] = ['blue-500', 'blue-600', 'blue-700', 'blue-800'];
 *   const safeShade = A11yContrastAuditor.findSafeShade('white', 'primary-400', blueFamily);
 *
 *   // Output: "Suggested fix: Use blue-600 for compliance with minimal visual shift."
 *   console.log(`Suggested fix: Use ${safeShade} for compliance.`);
 * }
 * ```
 */
export class A11yContrastAuditor {
  private static palette: Record<string, string> = DEFAULT_A11Y_SEED;
  private static isValidColor: TTypeGuard<string> = (
    value: unknown,
  ): value is string => {
    return isHexColor(value) || isRGBString(value);
  };
  private static getLum(value: string): number {
    const resolvedColor = isKeyInObject(value)(this.palette)
      ? this.palette[value]
      : value;

    if (!this.isValidColor(resolvedColor)) {
      console.warn(`[A11y Auditor]: Cannot process: "${value}".`);
      return 0;
    }

    // Handle RGB String
    if (isRGBString(resolvedColor)) {
      const match = resolvedColor.match(/\d+/g);
      if (match) {
        // Extract the first 3 numbers from the string
        const rgbTupleRaw = match.slice(0, 3).map(Number);

        // Use your Tuple3 guard to verify the parse succeeded
        const rgbTuple: TRGBTuple = isTuple3(rgbTupleRaw)
          ? rgbTupleRaw
          : [0, 0, 0]; // Fallback to black on parse failure

        return getLuminance(rgbTuple);
      }
    }

    return getLuminance(resolvedColor);
  }
  /**
   * Prime the Auditor with your REAL project colors.
   * Can initialize with more exteranl colors
   */
  public static initialize(projectColors: Record<string, string>) {
    this.palette = { ...this.palette, ...projectColors };
  }
  /**
   * Find the nearest passing Color shade in a family.
   *
   * Instead of returning the first passing shade found, this method calculates the
   * "perceptual distance" between the failing background and all compliant candidates.
   * It then returns the shade with the smallest luminance delta to ensure the
   * accessibility fix has the least possible impact on the original design intent.
   *
   * @param fg - The foreground ColorKey (e.g., 'white')
   * @param bg - The current failing background ColorKey (e.g., 'blue-400')
   * @param family - An array of potential Tailwind shades to pivot to
   * @param level - The target WCAG compliance level ('AA' or 'AAA')
   * @returns The compliant ColorKey closest in brightness to the original background
   */
  public static findBestColor(
    fg: string,
    bg: string,
    candidates: string[],
    level: 'AA' | 'AAA' = 'AA',
  ): string | null {
    const threshold = level === 'AAA' ? 7.0 : 4.5;
    const currentBgLum = this.getLum(bg);

    return (
      candidates
        .filter((shade) => this.audit(fg, shade).ratio >= threshold)
        .sort((a, b) => {
          const distA = Math.abs(this.getLum(a) - currentBgLum);
          const distB = Math.abs(this.getLum(b) - currentBgLum);
          return distA - distB;
        })[0] ?? null
    );
  }

  /**
   * Automatically retrieves all shades for a given color family from the design tokens.
   * @example getFamily('blue') -> ['blue-50', 'blue-100', ..., 'blue-950']
   */
  public static getFamily(baseName: string): string[] {
    return ObjectUtils.keys(this.palette).filter(
      (key) => key.startsWith(`${baseName}-`) || key === baseName,
    );
  }

  /**
   * Performs a batch accessibility audit on a collection of foreground colors.
   *
   * This is designed for 'Discovery' workflows—automatically identifying every
   * failing combination within a specific palette or theme. Use this for
   * CI/CD health checks, design system documentation, or to validate complex
   * UI components that support multiple text/icon colors.
   *
   * @param bg - The consistent background ColorKey to test against
   * @param fgs - An array of potential foreground ColorKeys (text, icons, etc.)
   * @returns An array containing only the failing combinations for immediate resolution
   */
  public static auditPalette(bg: string, foregrounds: string[]) {
    return foregrounds
      .map((fg) => ({
        color: fg,
        ...this.audit(fg, bg),
      }))
      .filter((result) => !result.isAA);
  }
  /**
   * Executes a single-pair WCAG 2.1 contrast evaluation using Tailwind tokens.
   *
   * Converts Tailwind ColorKeys into relative luminance values to calculate the
   * exact contrast ratio. It maps the result to standard accessibility tiers (AA/AAA)
   * and provides a detailed report including the hex values used in the calculation.
   *
   * @param foreground - The text or icon ColorKey
   * @param background - The container or surface ColorKey
   * @returns A comprehensive report including ratio, pass/fail status, and color metadata
   */

  public static audit(foreground: string, background: string): TContrastReport {
    const l1 = this.getLum(foreground);
    const l2 = this.getLum(background);

    const brightest = Math.max(l1, l2);
    const darkest = Math.min(l1, l2);
    const ratio = (brightest + 0.05) / (darkest + 0.05);

    // Standard WCAG 2.1 Thresholds
    const isAAA = ratio >= 7.0;
    const isAA = ratio >= 4.5;
    const isAALargeText = ratio >= 3.0; // Ensure this is strictly >= 3.0

    // Determine status string
    let status: TContrastStatus = 'FAIL';
    if (isAA) {
      status = 'PASS';
    } else if (isAALargeText) {
      status = 'LARGE_TEXT_ONLY';
    }

    return {
      ratio: Number(ratio.toFixed(2)),
      status,
      isAA,
      isAAA,
      isAALargeText,
      colors: {
        foreground: { hex: foreground },
        background: { hex: background },
      },
    };
  }

  // TESTING TRANVERSING THE COMPONENT DOM TO DISCOVER FOREGROUND AND BACKGROUND
  private static getEffectiveBg(el: HTMLElement | null): string {
    if (!el || el === document.body.parentElement) return '#ffffff';

    const style = window.getComputedStyle(el);
    const bg = style.backgroundColor.trim();

    // Robust check for transparency:
    // 1. Literal 'transparent'
    // 2. rgba with 0 alpha: 'rgba(0, 0, 0, 0)'
    // 3. Modern slash syntax with 0 alpha: 'rgb(0 0 0 / 0)'
    const isTransparent =
      bg === 'transparent' ||
      bg === 'rgba(0, 0, 0, 0)' ||
      bg.includes('/ 0') ||
      (bg.startsWith('rgba') && bg.endsWith(', 0)'));

    if (isTransparent) {
      return this.getEffectiveBg(el.parentElement);
    }

    return bg;
  }
  /**
   * Audit an actual DOM element via Computed Styles.
   * Useful for when colors are dynamic or inherited.
   */
  public static auditElement(el: HTMLElement): TContrastReport {
    const style = window.getComputedStyle(el);
    const fg = style.color;
    const bg = this.getEffectiveBg(el);

    return this.audit(fg, bg);
  }
}
