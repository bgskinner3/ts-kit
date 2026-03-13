# 🧮 Computation Utilities (`ComputationUtils`)

> ⚠️ **Note:** The following utilities are **not modular or tree-shakable**.  
> Importing the entire `ComputationUtils` class will include all methods in your bundle.

---

## Overview

`ComputationUtils` provides **common numeric and statistical utilities**, including rounding, clamping, percentages, incremental variance calculations, and BigInt-safe operations. Ideal for dashboards, analytics, streaming data, or performance monitoring.

---

## Methods

| Function                                        | Description                                                                           |
| ----------------------------------------------- | ------------------------------------------------------------------------------------- |
| `round(value, decimals)`                        | Rounds a number to the specified number of decimal places.                            |
| `clamp(val, min, max)`                          | Constrains a number to stay within `[min, max]`.                                      |
| `getPercentage(value, total, decimals)`         | Computes a percentage of `value` over `total`, safely handling `number` and `bigint`. |
| `computeMean(arr)`                              | Calculates the arithmetic mean of an array of numbers or BigInts.                     |
| `isAnomaly(value, mean, stdDev, threshold)`     | Determines if a number is an outlier based on the standard deviation and threshold.   |
| `computeRatio(achieved, total, decimals)`       | Returns a human-readable pass/fail ratio as a percentage.                             |
| `welfordUpdate(state, newValue)`                | Incrementally updates Welford’s running mean and variance for streaming data.         |
| `computeDelta(current, past)`                   | Computes net and absolute difference between two numbers or BigInts.                  |
| `computePercentageChange(current, past, scale)` | Computes the percentage change between two numbers or BigInts, optionally scaled.     |

---

# Example Usage

```ts
import { ComputationUtils } from '@/lib/computation';

// Round and clamp
const value = ComputationUtils.round(3.14159, 2); // 3.14
const clamped = ComputationUtils.clamp(120, 0, 100); // 100

// Percentage and mean
const percent = ComputationUtils.getPercentage(45, 200, 1); // 22.5
const mean = ComputationUtils.computeMean([1, 2, 3, 4]); // 2.5

// Detect anomalies
const isOutlier = ComputationUtils.isAnomaly(120, 100, 10); // true

// Compute pass/fail ratio
const ratio = ComputationUtils.computeRatio(7n, 10n); // 70

// Streaming variance with Welford
let state;
({ welford: state, stdDev: const sd } = ComputationUtils.welfordUpdate(state, 10));

// Deltas and percentage change
const { netDelta, absDelta } = ComputationUtils.computeDelta(150, 100); // {50, 50}
const change = ComputationUtils.computePercentageChange(150n, 100n); // 50

```

## Notes

- These utilities are **class-based**, so importing `ComputationUtils` pulls in **all methods**.
- For **tree-shakable, modular computation functions**, consider creating **per-function exports** if bundle size is critical.
- Supports both `number` and `bigint` where explicitly noted.
