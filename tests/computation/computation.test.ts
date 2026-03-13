import { ComputationUtils } from '../../src/lib/computation/index';
describe('ComputationUtils', () => {
  describe('round', () => {
    it('rounds to integer by default', () => {
      expect(ComputationUtils.round(1.6)).toBe(2);
      expect(ComputationUtils.round(1.4)).toBe(1);
    });

    it('rounds to specified decimals', () => {
      expect(ComputationUtils.round(1.2345, 2)).toBe(1.23);
      expect(ComputationUtils.round(1.2355, 2)).toBe(1.24);
    });
  });

  describe('clamp', () => {
    it('returns value if within range', () => {
      expect(ComputationUtils.clamp(5, 0, 10)).toBe(5);
    });

    it('clamps below min', () => {
      expect(ComputationUtils.clamp(-5, 0, 10)).toBe(0);
    });

    it('clamps above max', () => {
      expect(ComputationUtils.clamp(20, 0, 10)).toBe(10);
    });
  });

  describe('getPercentage', () => {
    it('calculates percentage for numbers', () => {
      expect(ComputationUtils.getPercentage(50, 200)).toBe(25);
    });

    it('respects decimals', () => {
      expect(ComputationUtils.getPercentage(1, 3, 2)).toBe(33.33);
    });

    it('handles bigint values', () => {
      expect(ComputationUtils.getPercentage(50n, 200n)).toBe(25);
    });

    it('returns 0 if total is zero', () => {
      expect(ComputationUtils.getPercentage(10, 0)).toBe(0);
      expect(ComputationUtils.getPercentage(10n, 0n)).toBe(0);
    });
  });

  describe('computeMean', () => {
    it('computes mean for numbers', () => {
      expect(ComputationUtils.computeMean([1, 2, 3])).toBe(2);
    });

    it('computes mean for bigint values', () => {
      expect(ComputationUtils.computeMean([1n, 2n, 3n])).toBe(2);
    });

    it('handles mixed number and bigint', () => {
      expect(ComputationUtils.computeMean([1, 2n, 3])).toBe(2);
    });

    it('returns 0 for empty array', () => {
      expect(ComputationUtils.computeMean([])).toBe(0);
    });
  });

  describe('isAnomaly', () => {
    it('detects anomaly beyond threshold', () => {
      expect(ComputationUtils.isAnomaly(20, 10, 3, 2)).toBe(true);
    });

    it('returns false within threshold', () => {
      expect(ComputationUtils.isAnomaly(12, 10, 3, 2)).toBe(false);
    });

    it('returns false when stdDev is zero', () => {
      expect(ComputationUtils.isAnomaly(100, 100, 0)).toBe(false);
    });
  });

  describe('computeRatio', () => {
    it('computes pass ratio', () => {
      expect(ComputationUtils.computeRatio(75, 100)).toBe(75);
    });

    it('handles bigint ratio', () => {
      expect(ComputationUtils.computeRatio(1n, 4n, 2)).toBe(25);
    });
  });

  describe('welfordUpdate', () => {
    it('initializes state on first sample', () => {
      const result = ComputationUtils.welfordUpdate(undefined, 10);

      expect(result.welford.count).toBe(1);
      expect(result.welford.mean).toBe(10);
      expect(result.stdDev).toBe(0);
    });

    it('updates mean and stdDev incrementally', () => {
      let state;

      ({ welford: state } = ComputationUtils.welfordUpdate(undefined, 10));
      ({ welford: state } = ComputationUtils.welfordUpdate(state, 20));

      const result = ComputationUtils.welfordUpdate(state, 30);

      expect(result.welford.count).toBe(3);
      expect(result.welford.mean).toBeCloseTo(20);
      expect(result.stdDev).toBeGreaterThan(0);
    });
  });

  describe('computeDelta', () => {
    it('computes number deltas', () => {
      const result = ComputationUtils.computeDelta(10, 5);

      expect(result.netDelta).toBe(5);
      expect(result.absDelta).toBe(5);
    });

    it('computes negative number deltas', () => {
      const result = ComputationUtils.computeDelta(5, 10);

      expect(result.netDelta).toBe(-5);
      expect(result.absDelta).toBe(5);
    });

    it('computes bigint deltas', () => {
      const result = ComputationUtils.computeDelta(10n, 5n);

      expect(result.netDelta).toBe(5n);
      expect(result.absDelta).toBe(5n);
    });

    it('throws if types mismatch', () => {
      expect(() =>
        ComputationUtils.computeDelta(10n as any, 5 as any),
      ).toThrow();
    });
  });

  describe('computePercentageChange', () => {
    it('computes percentage change for numbers', () => {
      expect(ComputationUtils.computePercentageChange(120, 100)).toBe(20);
    });

    it('handles negative change', () => {
      expect(ComputationUtils.computePercentageChange(80, 100)).toBe(-20);
    });

    it('handles bigint values', () => {
      expect(ComputationUtils.computePercentageChange(120n, 100n)).toBe(20);
    });

    it('returns 0 if past is zero', () => {
      expect(ComputationUtils.computePercentageChange(100, 0)).toBe(0);
      expect(ComputationUtils.computePercentageChange(100n, 0n)).toBe(0);
    });
  });
});
