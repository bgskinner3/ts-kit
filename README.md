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

npm i @bgskinner2/ts-utils


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

| Function             | Description                                                                                             |
| -------------------- | ------------------------------------------------------------------------------------------------------- |
| `isObject`           | Checks if a value is a non-null object (excluding arrays).                                              |
| `isArray`            | Checks if a value is an array.                                                                          |
| `isFunction`         | Checks if a value is a function.                                                                        |
| `isMap`              | Checks if a value is a `Map`.                                                                           |
| `isSet`              | Checks if a value is a `Set`.                                                                           |
| `isWeakMap`          | Checks if a value is a `WeakMap`.                                                                       |
| `isWeakSet`          | Checks if a value is a `WeakSet`.                                                                       |
| `isNull`             | Checks if a value is exactly `null`.                                                                    |
| `isNil`              | Checks if a value is `null` or `undefined`.                                                             |
| `isInstanceOf`       | Checks if a value is an instance of a given constructor.                                                |
| `isDefined`          | Checks if a value is neither `null` nor `undefined`.                                                    |
| `isUndefined`        | Checks if a value is `undefined`.                                                                       |
| `isNumber`           | Checks if a value is a finite number (not `NaN`).                                                       |
| `isInteger`          | Checks if a value is an integer.                                                                        |
| `isString`           | Checks if a value is a string.                                                                          |
| `isNonEmptyString`   | Checks if a value is a non-empty, non-whitespace string.                                                |
| `isBoolean`          | Checks if a value is a boolean.                                                                         |
| `isBigInt`           | Checks if a value is a `bigint`.                                                                        |
| `isSymbol`           | Checks if a value is a `symbol`.                                                                        |
| `isPrimitive`        | Checks if a value is a primitive (`string`, `number`, `boolean`, or `bigint`).                          |
| `isAbsoluteUrl`      | Checks if a value is a valid absolute URL using the `URL` constructor.                                  |
| `isInternalUrl`      | Checks if a URL is relative (`/path`) or belongs to the current origin (browser only).                  |
| `isInArray`          | Factory guard that checks if a value exists in a predefined array (uses a `Set` internally).            |
| `isKeyOfObject`      | Factory guard that checks whether a value is a valid key of a given object.                             |
| `isKeyInObject`      | Factory guard that checks whether an object contains a specific key.                                    |
| `isKeyOfArray`       | Factory guard that checks if a value matches one of the allowed primitive keys in an array.             |
| `isArrayOf`          | Checks if a value is an array where every element satisfies a given type guard.                         |
| `isRecordOf`         | Checks if a value is an object where all values satisfy a given type guard.                             |
| `hasDefinedKeys`     | Factory guard that verifies an object contains required keys with defined values.                       |
| `isBufferLikeObject` | Checks if a value matches the Node.js Buffer JSON structure `{ type: 'Buffer', data: number[] }`.       |
| `isRGBTuple`         | Checks if a value is a tuple `[number, number, number]` with values between `0–255`.                    |
| `isPhoneNumber`      | Checks if a string matches common international phone number patterns.                                  |
| `isEmail`            | Checks if a value is a valid email address string.                                                      |
| `isCamelCase`        | Checks if a string follows `camelCase` naming conventions.                                              |
| `isSnakeCase`        | Checks if a string follows `snake_case` naming conventions.                                             |
| `isKebabCase`        | Checks if a string follows `kebab-case` naming conventions.                                             |
| `isJSONArrayString`  | Checks if a string contains valid JSON that parses to an array.                                         |
| `isJSONObjectString` | Checks if a string contains valid JSON that parses to an object.                                        |
| `isJsonString`       | Checks if a string contains valid JSON (array or object).                                               |
| `isHexByteString`    | Factory guard that checks if a string is a valid hexadecimal byte string (optionally enforcing length). |
| `isHTMLString`       | Checks if a string appears to contain HTML markup.                                                      |

[Full Reference →](docs/type-guards.md)

### ⚛️ React Guards

Specific utilities for the React ecosystem. These handle the complexities of the Virtual DOM and component lifecycle.

| Function           | Category        | Description                                                                            |
| ------------------ | --------------- | -------------------------------------------------------------------------------------- |
| `isRef`            | React Primitive | Checks if a value is a valid React `Ref` (callback ref or object ref with `.current`). |
| `isRefObject`      | React Primitive | Checks if a value is a `RefObject` containing a `.current` property.                   |
| `isPromise`        | React Utility   | Checks if a value is a `Promise` or "thenable" object with a `.then()` method.         |
| `isReactPortal`    | React Primitive | Checks if a value is a React Portal created via `ReactDOM.createPortal`.               |
| `hasChildren`      | React Props     | Checks if an object contains a defined `children` property.                            |
| `isComponentType`  | React Component | Checks if a value is a valid React component (function or class component).            |
| `isForwardRef`     | React Component | Checks if a component was created using `React.forwardRef`.                            |
| `isValidReactNode` | React Node      | Checks if a value is a valid `ReactNode` (anything React can render).                  |
| `isReactElement`   | React Node      | Checks if a value is a valid JSX `ReactElement`.                                       |
| `isFragment`       | React Node      | Checks if a React element is a `<React.Fragment>`.                                     |
| `hasOnClick`       | React Props     | Checks if a React element has a valid `onClick` handler.                               |
| `isElementLike`    | React Node      | Checks if an object resembles a React element (`type` and `props`).                    |
| `isElementOfType`  | React Node      | Checks if an element-like object matches one of the allowed HTML tag types.            |
| `hasNameMetadata`  | React Component | Checks if a component has identifying metadata like `displayName` or `name`.           |
| `isPropValid`      | DOM Guard       | Checks if a property is a valid React DOM attribute or event handler.                  |
| `isDOMPropKey`     | DOM Guard       | Type guard validating a string as a valid DOM property key.                            |
| `isDOMEntry`       | DOM Guard       | Checks if a `[key, value]` pair represents a valid DOM property entry for an element.  |

[Full Reference →](docs/type-guards.md)

### 🔹 Validation Guards

**Purpose:**  
Runtime validators built on top of type guards. Use them to assert that values conform to expected types, with optional error messages. Includes **primitive, reference, and composite assertions**, as well as **custom assertion creators**.

#### Primitive Assertions

| Function                        | Description                          |
| ------------------------------- | ------------------------------------ |
| `assertIsNumber(value)`         | Asserts value is a number.           |
| `assertIsInteger(value)`        | Asserts value is an integer.         |
| `assertIsString(value)`         | Asserts value is a string.           |
| `assertIsNonEmptyString(value)` | Asserts value is a non-empty string. |
| `assertIsBoolean(value)`        | Asserts value is a boolean.          |
| `assertIsBigInt(value)`         | Asserts value is a bigint.           |
| `assertIsSymbol(value)`         | Asserts value is a symbol.           |

#### Reference Assertions

| Function                   | Description                                 |
| -------------------------- | ------------------------------------------- |
| `assertIsNull(value)`      | Asserts value is `null`.                    |
| `assertIsUndefined(value)` | Asserts value is `undefined`.               |
| `assertIsDefined(value)`   | Asserts value is not `null` or `undefined`. |
| `assertIsNil(value)`       | Asserts value is `null` or `undefined`.     |
| `assertIsFunction(value)`  | Asserts value is a function.                |
| `assertObject(value)`      | Asserts value is a non-null object.         |
| `assertIsArray(value)`     | Asserts value is an array.                  |
| `assertIsMap(value)`       | Asserts value is a `Map`.                   |
| `assertIsSet(value)`       | Asserts value is a `Set`.                   |
| `assertIsWeakMap(value)`   | Asserts value is a `WeakMap`.               |
| `assertIsWeakSet(value)`   | Asserts value is a `WeakSet`.               |

#### Refined / Composite Assertions

| Function                          | Description                                                                               |
| --------------------------------- | ----------------------------------------------------------------------------------------- |
| `assertIsCamelCase(value)`        | Asserts string follows `camelCase`.                                                       |
| `assertIsBufferLikeObject(value)` | Asserts value matches Node.js Buffer JSON structure `{ type: 'Buffer', data: number[] }`. |
| `assertIsJSONArrayString(value)`  | Asserts string is valid JSON array.                                                       |
| `assertIsJSONObjectString(value)` | Asserts string is valid JSON object.                                                      |
| `assertIsJsonString(value)`       | Asserts string is valid JSON (array or object).                                           |
| `assertIsAbsoluteUrl(value)`      | Asserts string is a valid absolute URL.                                                   |
| `assertIsInternalUrl(value)`      | Asserts string is relative or belongs to current origin.                                  |
| `assertIsRGBTuple(value)`         | Asserts value is an RGB tuple `[number, number, number]`.                                 |

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

// new intro

@bgskinner2/ts-utils
The Type-Strict Architecture Kit
Stop guessing. Stop casting. Start narrowing.
@bgskinner2/ts-utils is a high-performance, tree-shakable toolkit for developers who treat type safety as a requirement, not a suggestion. We provide the runtime logic and "Wizard-Level" types to kill as any hacks and handle the edge cases that standard libraries ignore.
🚀 Why This Library?
🎯 Zero-Cheat Narrowing: Real runtime guards that communicate perfectly with the TS compiler.
🌲 100% Tree-Shakable: ESM-first. You only pay for the bytes you actually import.
🛠️ Architecture First: Specialized helpers for state normalization, design systems, and data transformation.
📦 Zero Dependencies: No supply-chain bloat. Just pure, optimized logic.
✨ A Taste of the Toolkit
The following is just a small sample of our comprehensive utility suite. View the Full API Reference for the complete list.
🛠 Featured Runtime Utils
isDOMEntry (The Prop-Filter)
Filter out internal logic props while keeping valid React DOM attributes. No more "Unknown Prop" warnings.

```tsx
const SafeDiv = ({ internalFlag, ...props }) => (
  <div {...Object.fromEntries(Object.entries(props).filter(isDOMEntry))} />
);
```

generateKeyMap (The Auto-Completer)
Transform arrays into keyed objects with perfect IDE autocompletion using Template Literal Types.

```ts
const actions = generateKeyMap({
  keys: ['user'] as const,
  prefix: 'get',
  suffix: 'Data',
});
// Result: { user: 'getUserData' } (Type-safe and autocompleted)
```

🧩 A Taste of Advanced Utility Types
High-level types for complex state manipulation. Zero runtime cost.
TXOR<T, U> (Strict Exclusivity)
Standard unions are leaky. TXOR enforces a strict choice between two property sets, preventing invalid state combinations.

```ts
type Auth = TXOR<{ email: string }, { provider: string }>;
const valid: Auth = { email: 'test@me.com' }; // ✅
const invalid: Auth = { email: 'test@me.com', provider: 'google' }; // ❌ Error
```

TCamelCase<S> (Recursive Transformer)
A wizard-level string transformer that handles complex delimiters and case preservation at the type level.

```ts
type Key = TCamelCase<'USER_FIRST_NAME'>; // Result: "userFirstName"
```

🛠 API Overview
This is just a fraction of what's available:
Category Highlights
Type Guards isString, isDOMPropKey, isNonNullable, isObject
Enforcement TXOR, TRequireKey, Branded, DeepPartial
Data Logic toKeyByField, lazyProxy, DeepNormalizeBigInt
Async/Network retry (w/ Backoff), fetchJson, delay
🛡️ The Philosophy
If a bug can be caught at compile-time, it should never reach runtime. Our utilities turn "cheats" into "constraints." We follow SemVer and are optimized for Modern TypeScript (5.x+).
Explore the Full Documentation Garden | Report a Bug
