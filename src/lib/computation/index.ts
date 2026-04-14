import { isBigInt, isNumber } from '../guards/core/primitives';
type TWelfordState = {
  count: number;
  mean: number;
  squaredDeviationSum: number;
};
export class ComputationUtils {
  private static toNum(v: number | bigint): number {
    return isBigInt(v) ? Number(v) : v;
  }
  /**
   * @utilType util
   * @name round
   * @category Computation
   * @description Rounds a number to a specified number of decimal places.
   * @link #round
   */
  static round(value: number, decimals = 0): number {
    const factor = Math.pow(10, decimals);
    return Math.round(value * factor) / factor;
  }
  /**
   * @utilType util
   * @name clamp
   * @category Computation
   * @description Restricts a value to be within a defined minimum and maximum range.
   * @link #clamp
   */

  static clamp(val: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, val));
  }
  /**
   * @utilType util
   * @name getPercentage
   * @category Computation
   * @description Calculates the percentage of a value relative to a total, with BigInt safety and rounding.
   * @link #getpercentage
   */
  static getPercentage(
    value: number | bigint,
    total: number | bigint,
    decimals = 0,
  ): number {
    if (total === 0 || total === 0n) return 0;

    if (isBigInt(value) || isBigInt(total)) {
      const p = BigInt(10 ** (decimals + 2));
      return Number((BigInt(value) * 100n * p) / BigInt(total)) / Number(p);
    }

    return this.round((value / total) * 100, decimals);
  }
  /**
   * @utilType util
   * @name computeMean
   * @category Computation
   * @description Calculates the arithmetic mean of an array of numbers or BigInts.
   * @link #computemean
   */
  static computeMean(arr: (number | bigint)[]): number {
    if (!arr.length) return 0;
    const numbers = arr.map((v) => this.toNum(v));
    return numbers.reduce((sum, v) => sum + v, 0) / numbers.length;
  }
  /**
   * @utilType util
   * @name isAnomaly
   * @category Computation
   * @description Statistical outlier detection based on standard deviations from the mean.
   * @link #isanomaly
   */
  static isAnomaly(
    value: number,
    mean: number,
    stdDev: number,
    threshold = 2,
  ): boolean {
    if (stdDev === 0) return false;
    return Math.abs(value - mean) > stdDev * threshold;
  }
  /**
   * @utilType util
   * @name computeRatio
   * @category Computation
   * @description Generates a ratio as a percentage, optimized for pass/fail metrics.
   * @link #computeratio
   */

  static computeRatio(
    achieved: number | bigint,
    total: number | bigint,
    decimals = 2,
  ): number {
    return this.getPercentage(achieved, total, decimals);
  }
  /**
   * @utilType util
   * @name welfordUpdate
   * @category Computation
   * @description Efficiently updates running mean and variance using Welford's algorithm.
   * @link #welfordupdate
   * High-level:
   * - Efficiently calculates running mean and variance without storing all samples.
   * - Perfect for streaming data like oracle price feeds.
   *
   * https://en.wikipedia.org/wiki/Algorithms_for_calculating_variance
   *
   * @param state - Previous Welford state, or undefined if this is the first sample
   * @param newValue - The new data point to incorporate
   * @returns Object containing:
   *   - welford: updated state (count, mean, squaredDeviationSum)
   *   - stdDev: current standard deviation based on updated state
   */
  static welfordUpdate(
    state: TWelfordState | undefined,
    newValue: number,
  ): { welford: TWelfordState; stdDev: number } {
    if (!state) {
      return {
        welford: { count: 1, mean: newValue, squaredDeviationSum: 0 },
        stdDev: 0,
      };
    }

    const {
      count: prevCount,
      mean: prevMean,
      squaredDeviationSum: prevSqDev,
    } = state;

    const newCount = prevCount + 1;
    const delta = newValue - prevMean;
    const newMean = prevMean + delta / newCount;
    const newSquaredDeviationSum = prevSqDev + delta * (newValue - newMean);

    const variance = newCount > 1 ? newSquaredDeviationSum / (newCount - 1) : 0;
    const stdDev = Math.sqrt(variance);

    return {
      welford: {
        count: newCount,
        mean: newMean,
        squaredDeviationSum: newSquaredDeviationSum,
      },
      stdDev,
    };
  }

  /**
   * @utilType util
   * @name computeDelta
   * @category Computation
   * @description Calculates the net and absolute difference between two numbers or BigInts.
   * @link #computedelta
   */
  /* prettier-ignore */ static computeDelta(current: bigint, past: bigint): { netDelta: bigint; absDelta: bigint };
  /* prettier-ignore */ static computeDelta(current: number, past: number): { netDelta: number; absDelta: number };
  /* prettier-ignore */ static computeDelta(
    current: number | bigint,
    past: number | bigint,
  ): { netDelta: number | bigint; absDelta: number | bigint } {
    
    if (isBigInt(current) && isBigInt(past)) {
      const netDelta = current - past;
      const absDelta = netDelta < 0n ? -netDelta : netDelta;
      return { netDelta, absDelta };
    }

    if (isNumber(current) && isNumber(past)) {
      const netDelta = current - past;
      const absDelta = Math.abs(netDelta);
      return { netDelta, absDelta };
    }
    throw new Error("Incompatible types: current and past must both be number or both be bigint.");
  }
  /**
   * @utilType util
   * @name computePercentageChange
   * @category Computation
   * @description Calculates the percentage increase or decrease between two values.
   * @link #computepercentagechange
   */
  static computePercentageChange(
    current: number | bigint,
    past: number | bigint,
    scale = 1n,
  ): number {
    if (past === 0 || past === 0n) return 0;

    if (isBigInt(current) || isBigInt(past)) {
      const curr = BigInt(current);
      const prev = BigInt(past);
      // Use a passed-in scale or default to 1 (no scaling)
      return Number(((curr - prev) * (100n * scale)) / prev) / Number(scale);
    }
    return ((current - past) / past) * 100;
  }
}
