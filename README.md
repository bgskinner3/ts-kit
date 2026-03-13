# TypeScript Utility Library

A **type-safe, custom-built utility library** for TypeScript projects, designed to make everyday development easier and safer.

This library contains a growing collection of **helpers, validators, type guards, transformers, processors, and debug utilities**, all written with TypeScript type safety in mind.

It’s **actively maintained and continuously expanded**, so new utilities and improvements are regularly added as I encounter common patterns and challenges in projects. Think of it as a personal toolkit for TypeScript development that **evolves with real-world needs**.

---

## Table of Contents

- [Installation](#installation)
- [Project Structure](#project-structure)
<!-- - [Modules](#modules)
  - [Common Utilities](#common-utilities)
  - [Validations](#validations)
  - [Guards](#guards)
  - [Transformers](#transformers)
  - [Processors](#processors)
  - [Debug Utilities](#debug-utilities)
- [Usage](#usage)
- [Contributing](#contributing) -->

---

## Installation

```bash


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

## 🛡️ Type Guards

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

---

## Common Utilities

### 🧰 Object, array, and generic helpers

Provides **type-safe, reusable, and tree-shakable utilities** for working with objects, arrays, and other common operations. Designed to improve type inference, maintain immutability, and simplify everyday tasks.

[Full Reference →](docs/common.md)

---

## Computation Utilities

---

## Debug Utilities

---

## DOM Utilities
