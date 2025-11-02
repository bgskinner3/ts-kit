# TypeScript Utility Library

A **type-safe, custom-built utility library** for TypeScript projects, designed to make everyday development easier and safer.

This library contains a growing collection of **helpers, validators, type guards, transformers, processors, and debug utilities**, all written with TypeScript type safety in mind.

It’s **actively maintained and continuously expanded**, so new utilities and improvements are regularly added as I encounter common patterns and challenges in projects. Think of it as a personal toolkit for TypeScript development that **evolves with real-world needs**.

---

## Table of Contents

- [Installation](#installation)
- [Project Structure](#project-structure)
- [Modules](#modules)
  - [Common Utilities](#common-utilities)
  - [Validations](#validations)
  - [Guards](#guards)
  - [Transformers](#transformers)
  - [Processors](#processors)
  - [Debug Utilities](#debug-utilities)
- [Usage](#usage)
- [Contributing](#contributing)

---

## Installation

```bash
npm install your-library-name
# or
yarn add your-library-name

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

## Project Structure

```text

src/
├── lib/
│   ├── common/        # Generic helpers for arrays, objects, and other utilities
│   │   ├── arrays.ts
│   │   ├── objects.ts
│   │   ├── common-utils.d.ts
│   │   └── index.ts
│   ├── validations/   # Assertion and validation helpers
│   │   ├── assertions.ts
│   │   └── index.ts
│   ├── guards/        # Type guards (primitive, reference, composite, refined)
│   │   ├── primitives.ts
│   │   ├── reference.ts
│   │   ├── composite.ts
│   │   ├── refined.ts
│   │   └── index.ts
│   ├── transformers/  # Object and string transformation utilities
│   │   ├── object-transformers.ts
│   │   ├── string-transformers.ts
│   │   └── index.ts
│   ├── processors/    # Network, React, and string processing helpers
│   │   ├── network.ts
│   │   ├── react.ts
│   │   ├── strings.ts
│   │   └── index.ts
│   └── debug/         # Development-only debug utilities
│       └── index.ts
└── types/             # Shared TypeScript types and interfaces
    └── index.ts

```

---

# 📦 Modules

A quick overview of the library’s main modules with links to detailed documentation.

## Common Utils

### 🧰 Object, array, and generic helpers

Provides **type-safe, reusable, and tree-shakable utilities** for working with objects, arrays, and other common operations. Designed to improve type inference, maintain immutability, and simplify everyday tasks.

[Full Reference →](docs/common.md)

## Validation Utils

### ✅ Assertion and type validation helpers

Includes helpers for **assertions, type checks, and input validation**. Ensures your data and code assumptions are safe and predictable.

[Full Reference →](docs/validation.md)

## Guard Utils

### 🛡️ Type guards for primitives, references, composites, and refined types

Provides **type-safe guards** that help TypeScript infer correct types, making your code safer and easier to maintain.

[Full Reference →](docs/guard.md)

## Transformer Utils

### 🔄 Object and string transformation utilities

Utilities to **transform, map, and manipulate objects or strings** in a type-safe way, supporting common transformations in applications.

[Full Reference →](docs/transformer.md)

## Processor Utils

### 🛠️ Network, React, and string processing helpers

Includes helpers for **data processing**, such as network responses, React elements, and string manipulation.

[Full Reference →](docs/processor.md)

## Debug Utils

### 🐞 Development-only debug and logging utilities

Provides **debugging and logging helpers** to assist during development, not included in production builds.

[Full Reference →](docs/debug.md)
