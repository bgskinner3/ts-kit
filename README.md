# @bgskinner2/ts-utils

## The Type-Strict Architecture Kit

> Stop guessing. Stop casting. Start narrowing.

**@bgskinner2/ts-utils** is a high-performance, tree-shakable toolkit for TypeScript developers who treat type safety as a requirement, not a suggestion.  
It provides runtime utilities and advanced “wizard-level” types to eliminate `as any` hacks and handle edge cases that standard libraries ignore.

&nbsp;

## 🚀 Why This Library?

- 🎯 **Zero-Cheat Narrowing** — Real runtime guards that communicate perfectly with the TypeScript compiler
- 🌲 **100% Tree-Shakable** — ESM-first. You only pay for the bytes you actually import
- 🛠️ **Architecture First** — Specialized helpers for state normalization, design systems, and data transformation
- 📦 **Zero Dependencies** — No supply-chain bloat. Just pure, optimized logic

&nbsp;

&nbsp;

## ✨ A Taste of the Runtime

This is just a small sample of our 50+ utilities.  
View the full API documentation.

---

### 1. `extractDOMProps` — The "Unknown Prop" Exterminator

**The Problem:**  
Passing `...props` to a polymorphic component or a headless UI element triggers the dreaded React "Unknown prop" warning. Existing solutions (like `@emotion/is-prop-valid`) are often heavy dependencies or miss modern attributes.

**The Solution:**  
A high-performance filtering engine synced with React 19 and HTML5/SVG specifications.

---

### 🛡️ Why it's superior

**Modern First**

- Includes `popover`, `inert`, `fetchPriority`, and React 19's new `action` / `formAction` props missing from legacy libraries.

**Performance Engineered**

- **Memoized Lookups:** O(1) performance for repeat property checks
- **Optimized Regex:** Handles `data-*`, `aria-*`, and `x-*` attributes in a single pass
- **Smart Event Detection:** Uses low-level `charCodeAt` checks to identify `on*` event handlers instantly

**Tree-Shakable**

- Zero dependencies
- Delivers production-grade DOM filtering without library bloat
- Equivalent robustness to styled-components-style prop filtering, but lightweight

&nbsp;

```ts
import { extractDOMProps } from '@bgskinner2/ts-utils';

// 1. Define a "Dirty" Props object with custom logic
interface MyLinkProps {
  href: string; // Valid DOM prop
  target: string; // Valid DOM prop
  trackingId: string; // ❌ Custom logic prop
  internalFlag: boolean; // ❌ Custom logic prop
}

const props: MyLinkProps = {
  href: '/home',
  target: '_blank',
  trackingId: 'abc-123',
  internalFlag: true,
};

// 2. Extract only valid Anchor attributes
const safeProps = extractDOMProps<'a', MyLinkProps>(props);

/**
 * HOVER RESULT in VS Code:
 *
 * const safeProps: {
 *   href: string;
 *   target: string;
 * }
 *
 * (The 'trackingId' and 'internalFlag' are stripped at both
 * the type level and the runtime level.)
 */
```

&nbsp;

### 2. `getCallerLocation` — The Debugging Specialist

**The Problem:**  
Generic loggers often lose the context of where an error or event actually originated, especially when wrapped in multiple helper functions.

**The Solution:**  
Surgically parses the V8 stack trace to extract the exact file, line, and column of the caller—intelligently skipping `node_modules` to find your code.

&nbsp;

```ts
import { getCallerLocation } from '@bgskinner2/ts-utils';

function logger(msg: string) {
  const origin = getCallerLocation({ topParent: true });
  console.log(`[${origin}] ${msg}`);
}

// Output: "[src/services/user.ts:42:15] User Logged In"
```

&nbsp;

### 3. `generateKeyMap` — The Architecture Builder

**The Problem:**  
Keeping runtime object keys and TypeScript types in sync usually requires manual, error-prone duplication.

**The Solution:**  
Generates runtime constants from an array while providing 1:1 Template Literal Type parity for perfect IDE autocompletion.

&nbsp;

```ts
import { generateKeyMap } from '@bgskinner2/ts-utils';

const actions = generateKeyMap({
  keys: ['user', 'post'] as const,
  prefix: 'get',
  suffix: 'ById',
});

// Result: { user: 'getUserById', post: 'getPostById' }
// Autocompletion: actions.user -> 'getUserById'
```

&nbsp;

## 🧩 A Taste of Advanced Utility Types

High-level types for complex state manipulation. Zero runtime cost.

### 1. `TCamelCase<S>` — The "Intelligent" String Wizard

**The Problem:**  
Most string transformers are "dumb"—they break on acronyms, mixed delimiters, or PascalCase.

**The Solution:**  
A high-precision recursive parser that understands word boundaries, acronym transitions, and multi-delimiters (`-`, `_`, ` `).

&nbsp;

```ts
import type { TCamelCase } from '@bgskinner2/ts-utils';

type T1 = TCamelCase<'USER_ID'>; // "userId"
type T2 = TCamelCase<'XML_HTTP_Request'>; // "xmlHttpRequest"
type T3 = TCamelCase<'button-label'>; // "buttonLabel"

/**
 * 💡 The Casing Suite:
 * This logic powers our full bidirectional mapping suite,
 * including TSnakeCase<S> and TKebabCase<S>.
 */
```

---

## Why This Is the "Smart" Move

**Completeness**  
It reassures developers that if they need to convert `camelCase` back to `SNAKE_CASE` for database writes (or similar use cases), the library already covers the full transformation cycle.

**Searchability**  
Terms like _snake case_ and _kebab case_ are high-intent search queries on npm. Including them helps position the library within the correct developer mental models and improves discoverability.

**Proactive Design**  
By referencing the full transformation family, it signals that the ecosystem is complete. Ensure that `TSnakeCase` and `TKebabCase` are also included in the API Overview table for consistency and discoverability.

---

&nbsp;

### 2. `TNonNullableDeep<T>` — The "Guaranteed Data" Pattern

**The Problem:**  
Generated API types are often "leaky," forcing you to use optional chaining or null-checks on every single nested property, even after data is validated.

**The Solution:**  
Recursively removes `null` and `undefined` from every property at every level, transforming "loose" schemas into strict internal models.

&nbsp;

```ts
import type { TNonNullableDeep } from '@bgskinner2/ts-utils';

type RawResponse = { user?: { id: string | null; meta?: { age: number } } };

// Result: { user: { id: string; meta: { age: number } } }
type ValidatedData = TNonNullableDeep<RawResponse>;
```

&nbsp;

### 3. `TIfValueRequire<T, Trigger, Value, Dependent>` — The "Logic Enforcer"

**The Problem:**  
Some component props should only be required if another prop is set to a specific value (e.g., a "Gradient" variant requiring a `colors` array). Standard TypeScript doesn't enforce this relationship, leading to runtime crashes.

**The Solution:**  
Creates a strict dependency. If the `Trigger` key matches the `Value`, the `Dependent` key becomes required. Otherwise, it is forbidden.

&nbsp;

```ts
import type { TIfValueRequire } from '@bgskinner2/ts-utils';

type TButtonConfig = {
  variant: { solid: string; gradient: string };
  colors: { primary: string; secondary: string };
};

// 'colors' is REQUIRED only if 'variant' is 'gradient'
type TProps = TIfValueRequire<TButtonConfig, 'variant', 'gradient', 'colors'>;

const btn1: TProps = { variant: 'gradient', colors: 'primary' }; // ✅
const btn2: TProps = { variant: 'solid' }; // ✅ (colors forbidden)
const btn3: TProps = { variant: 'gradient' }; // ❌ Error: 'colors' missing
```

&nbsp;

## 🛠 API Overview

A high-level map of the 50+ tools available in the full suite.

| Category                | Runtime Utilities                      | Type-Level Enforcement                           |
| ----------------------- | -------------------------------------- | ------------------------------------------------ |
| **Deep Transformation** | `normalizeBigInt`, `deepClone`         | `TDeepMap`, `TNonNullableDeep`, `TDeepWriteable` |
| **Architectural State** | `generateKeyMap`, `lazyProxy`          | `TXOR`, `TIfValueRequire`, `TOmitMethods`        |
| **React & DOM**         | `extractDOMProps`, `mergeRefs`         | `isDOMPropKey`, `isDOMEntry`, `TCva`             |
| **String Wizardry**     | `toCamelCase`, `toKebabCase`           | `TCamelCase`, `TSnakeCase`, `TKebabCase`         |
| **Resilience**          | `retry` (Exponential Backoff), `delay` | `TTypeGuard`, `TAsyncResult`                     |
| **Debugging**           | `getCallerLocation`, `logError`        | `TStackFrame`, `TDebugConfig`                    |

&nbsp;

---

📘 Full API reference → https://github.com/bgskinner3/ts-kit/blob/main/docs/util-lib.md

Unlock the complete type-safe toolkit.

---

## 🛡️ Philosophy

> "If a bug can be caught at compile-time, it should never reach runtime."

We don't believe in "cheating" with `as any`. Our utilities are designed to turn loose data into rigid constraints. Every runtime function in this library is paired with a corresponding type utility to ensure 1:1 parity between your logic and your IDE.

- **Standardized:** Optimized for Modern TypeScript (5.x+)
- **Safe:** Strictly follows Semantic Versioning (SemVer)
- **Lean:** 100% tree-shakable with zero external dependencies

---

### Explore more

- 📘 [Documentation Garden](https://github.com/bgskinner3/ts-kit)
- 🐛 [Report a Bug](https://github.com/bgskinner3/issues)
