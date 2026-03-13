# Common Utilities Reference

This document provides **type-safe, reusable, and tree-shakable utilities** for arrays and objects.

---

## 🧰 Array Utilities (`ArrayUtils`)

**Purpose:**  
A set of **pure, type-safe** array helpers designed for better type inference, immutability, and consistent handling of arrays.

### Available Methods

| Method                                  | Description                                                                    |
| --------------------------------------- | ------------------------------------------------------------------------------ |
| `includes(arr, el)`                     | Type-safe `Array.includes` that narrows union types.                           |
| `createFixedLengthArray(items, length)` | Creates an array with exactly the specified length. Throws if length mismatch. |
| `readAllItems(arr)`                     | Returns a shallow copy of the array.                                           |
| `map(arr, fn)`                          | Type-safe wrapper around `Array.map`.                                          |
| `forEachUnion(arr, fn)`                 | Iterates safely over arrays with union element types.                          |
| `forEach(arr, fn)`                      | Standard type-safe `forEach`.                                                  |
| `reduce(arr, fn, init)`                 | Strictly typed reduce helper.                                                  |
| `flat(arr)`                             | One-level flattening.                                                          |
| `flatMap(arr, fn)`                      | FlatMap alternative with strong typing.                                        |
| `filter(arr, fn)`                       | Type-safe filter.                                                              |
| `filterNonNullable(arr)`                | Removes nullish values safely.                                                 |

### Example Usage

```ts
import { ArrayUtils, map, filterNonNullable } from '@/utils';

const clean = filterNonNullable([1, null, 2]); // [1, 2]
const doubled = map(clean, (n) => n * 2); // [2, 4]
```

## 🧩 Object Utilities (`ObjectUtils`)

**Purpose:**  
Type-safe object helpers wrapping `Object.*` APIs, providing:

- 🔒 Safer key/value inference
- 🧠 Stronger TypeScript typing
- 💪 Optional dot-path helpers for nested access

---

**Available Methods:**

| Method                  | Description                                                         |
| ----------------------- | ------------------------------------------------------------------- |
| `keys(obj)`             | Returns keys of an object with proper type inference.               |
| `entries(obj)`          | Returns key-value pairs with full type support.                     |
| `fromEntries(entries)`  | Constructs an object from typed key-value entries.                  |
| `values(obj)`           | Returns values with inferred types.                                 |
| `has(obj, path)`        | Checks if a nested property exists using dot notation.              |
| `get(obj, path)`        | Safely retrieves a nested property via dot path.                    |
| `set(obj, path, value)` | Sets a nested property via dot path, creating intermediate objects. |

### Example Usage

```ts
import { ObjectUtils, objectKeys, objectGet } from '@/utils';

const user = { profile: { name: 'Alice', age: 30 } };

const keys = objectKeys(user); // ['profile']
const nameExists = ObjectUtils.has(user, 'profile.name'); // true
const name = objectGet(user, 'profile.name'); // 'Alice'

// Using tree-shakable imports
import { objectSet } from '@/utils';
objectSet(user, 'profile.age', 31); // safely updates age
```
