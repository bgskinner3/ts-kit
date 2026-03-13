# TypeScript Utility Library

A **type-safe, custom-built utility library** for TypeScript projects, designed to make everyday development easier and safer.

This library contains a growing collection of **helpers, validators, type guards, transformers, processors, and debug utilities**, all written with TypeScript type safety in mind.

It’s **actively maintained and continuously expanded**, so new utilities and improvements are regularly added as I encounter common patterns and challenges in projects. Think of it as a personal toolkit for TypeScript development that **evolves with real-world needs**.

---

## Table of Contents

- [Installation](#installation)
- [Project Structure](#project-structure)
- [Tree-Shaking & Modular Imports](#tree-shaking--modular-imports)
- [Type Guards](#type-guards)
  - [Core Guards](#core-guards)
  - [React Guards](#react-guards)
  - [Validation Guards](#validation-guards)
- [Common Utilities](#common-utilities)
- [Computation Utilities](#computation-utilities)
- [Debug Utilities](#debug-utilities)
- [DOM Utilities](#dom-utilities)
- [Color Utilities](#color-utilities)
- [Processor Utilities](#processor-utilities)
- [Transformer Utilities](#transformer-utilities)
- [Usage](#usage)
- [Contributing](#contributing)

---

## Installation

```bash
npm install your-ts-utils
# or
yarn add your-ts-utils

```

---

## Project Structure

```text

src/
├── lib/
│   ├── common/
│   │   ├── arrays.ts
│   │   ├── objects.ts
│   │   └── index.ts
│   ├── validations/
│   │   ├── assertions.ts
│   │   └── index.ts
│   ├── guards/
│   │   ├── core
│   │   |   ├── primitives.ts
│   │   |   ├── link-guards.ts
│   │   |   ├── composite.ts
│   │   |   ├── reference.ts
│   │   |   ├── refined.ts
│   │   |   ├── string-guards.ts
│   │   |   └── index.ts
│   │   ├── react
│   │   |   ├── dom-guards.ts
│   │   |   ├── node-guards.ts
│   │   |   ├── react-primitive.ts
│   │   |   └── index.ts
│   ├── color/
│   │   ├── color.ts
│   │   └── index.ts
│   ├── dom/
│   │   ├── events.ts
│   │   ├── media.ts
│   │   └── index.ts
│   ├── link/
│   │   ├── link-utils.ts
│   │   └── index.ts
│   ├── processors/
│   │   ├── network.ts
│   │   ├── react.ts
│   │   └── index.ts
│   ├── transformers/
│   │   ├── object-transformers.ts
│   │   ├── string-transformers.ts
│   │   └── index.ts
│   ├── computation/
│   │   └── index.ts
│   ├── debug/
│   │   ├── debug.ts
│   │   └── index.ts

```

---

## Tree-Shaking & Modular Imports

This library is designed with **tree-shaking in mind**, allowing you to import only the utilities you need, keeping your bundle size minimal.

### How It Works

- All utility classes (e.g., `ArrayUtils`, `ObjectUtils`) are **pure static classes**.
- Each class is accompanied by **renamed, individual function exports** for **direct, tree-shakable imports**.
- Standalone utilities, like **type guards** (`isArrayOf`, `isKeyOfObject`, etc.), are also **tree-shakable**.

```ts
// Import only what you need (tree-shakable)
import { arrayMap, arrayFilter, objectGet } from '@/utils';

const doubled = arrayMap([1, 2, 3], (n) => n * 2);
const filtered = arrayFilter(doubled, (n) => n > 2);

const value = objectGet({ user: { name: 'Alice' } }, 'user.name');
```

---

## Type Guards

Type guards are the backbone of this library. They allow you to safely narrow types across different environments.

### 🔹 Core Guards

The "Pure JS" foundation. These have zero dependencies and work in any environment (Node, Deno, Bun, Browser).

- Primitives: High-speed checks for strings, numbers, bigints, and symbols.
- Composite: Complex validation for objects, arrays, and record shapes.
- String Formats: Validation for JSON, Hex, HTML, and case-conventions (Camel, Snake, Kebab).
- Network: Safe URL detection and same-origin validation.

[Full Reference →](docs/type-guards.md)

### ⚛️ React Guards

Specific utilities for the React ecosystem. These handle the complexities of the Virtual DOM and component lifecycle.

- Nodes: Validate renderable content, JSX elements, and Fragments.
- Primitives: Safe checks for useRef objects, Portals, and forwardRef components.
- DOM: Validation for prop keys and interactive elements (e.g., hasOnClick).

[Full Reference →](docs/type-guards.md)

### 🔹 Validation Guards

**Purpose:**  
Runtime validators built on top of type guards. Use them to assert that values conform to expected types, with optional error messages. Includes **primitive, reference, and composite assertions**, as well as **custom assertion creators**.

- **Creators:** `assertValue`, `makeAssert`
- **Primitive Assertions:** `assertIsNumber`, `assertIsInteger`, `assertIsString`, `assertIsBoolean`, `assertIsBigInt`, `assertIsSymbol`
- **Reference Assertions:** `assertIsNull`, `assertIsUndefined`, `assertIsDefined`, `assertIsNil`, `assertIsFunction`, `assertObject`, `assertIsArray`, `assertIsMap`, `assertIsSet`, `assertIsWeakMap`, `assertIsWeakSet`
- **Refined / Composite Assertions:** `assertIsCamelCase`, `assertIsBufferLikeObject`, `assertIsJSONArrayString`, `assertIsJSONObjectString`, `assertIsJsonString`, `assertIsAbsoluteUrl`, `assertIsInternalUrl`, `assertIsRGBTuple`

> ⚠️ **Note:** Importing the full `AssertionUtils` object is **not tree-shakable**. For smaller bundles, prefer individual assertion imports.

[Full Reference →](docs/type-guards.md)

---

## Common Utilities

✅ Tree-shakable  
✅ Type-safe  
✅ Works with objects, arrays, and primitive types  
✅ Modular imports supported

### 🧰 Object, array, and generic helpers

Provides **type-safe, reusable, and tree-shakable utilities** for working with objects, arrays, and other common operations. Designed to improve type inference, maintain immutability, and simplify everyday tasks.

[Full Reference →](docs/common.md)

---

## Computation Utilities

`ComputationUtils` provides **type-safe, numeric, and statistical helpers** for common mathematical operations.  
It supports **numbers and BigInts**, incremental statistics (Welford’s algorithm), percentages, deltas, clamping, rounding, and anomaly detection.

### Features

✅ Supports both `number` and `bigint`  
✅ Rounding & Clamping utilities  
✅ Percentages & Ratios  
✅ Incremental Statistics (Welford’s algorithm)  
✅ Deltas & Percentage Change  
✅ Anomaly Detection  
⚠️ **Note:** Not tree-shakable — importing the class brings in all methods

[Full Reference →](docs/computation-utils.md)

---

## DOM Utilities (`DomUtils`)

> ⚠️ **Note:** These utilities are framework-agnostic, but importing `DomUtils` as a whole will include all methods in your bundle.

`DomUtils` provides **type-safe, DOM-focused helpers** for handling keyboard interactions, media preloading, and image normalization. These utilities are **pure functions**, easy to test, and work in both native DOM and React environments.

### Features

✅ Keyboard event interpretation  
✅ Image preloading with caching  
✅ Image source normalization  
✅ Pure and framework-agnostic  
⚠️ Not tree-shakable when importing the full `DomUtils` object

[Full Reference →](docs/dom-utils.md)

---

## Color Utilities

> ⚠️ **Note:** Importing the full `ColorUtils` object will include all methods in your bundle.

`ColorUtils` provides **type-safe, color-focused helpers** for common operations like color parsing, conversion, and manipulation.  
These utilities are **pure functions**, framework-agnostic, and work in both browser and Node environments.

### Features

✅ Parse color strings (HEX, RGB, HSL)  
✅ Convert between color formats (e.g., HEX → RGB, RGB → HSL)  
✅ Generate color variations (lighten, darken, alpha adjustments)  
✅ Compare and blend colors  
✅ Pure and framework-agnostic  
⚠️ Not tree-shakable when importing the full `ColorUtils` object

[Full Reference →](docs/color-utils.md)

---

## Processor Utilities

> ⚠️ **Note:** Importing the full `ProcessorUtils` or `ReactProcessorUtils` object will include all methods in your bundle.

`ProcessorUtils` and `ReactProcessorUtils` provide **async, event, and React-focused helpers** for common operations like network requests, delays, retries, and React ref management.  
These utilities are **pure functions** where possible, easy to test, and work in both browser and Node environments (with React-specific utilities designed for React apps).

### Features

✅ Fetch and parse JSON with robust error handling  
✅ Retry async operations with exponential backoff  
✅ Delay execution for throttling or timeouts  
✅ Combine multiple React refs into a single callback  
✅ Lazily evaluate object properties and cache results  
✅ Merge CSS variables with existing style objects  
✅ Safely merge event handlers with internal logic  
✅ Filter and extract valid DOM props  
✅ Select React children by `displayName`  
✅ Pure and framework-agnostic where possible  
⚠️ Not tree-shakable when importing the full `ProcessorUtils` / `ReactProcessorUtils` object

[Full Reference →](docs/processor-utils.md)

---

## Transformer Utilities

WIP

---

## Debug Utilities

WIP

---

## Link Utilities

WIP
