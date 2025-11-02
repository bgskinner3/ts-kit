# Guard Utilities

This module provides **type-safe guards** for TypeScript projects, helping you validate values at runtime while retaining strong type inference.

---

## Table of Contents

- [Reference Type Guards](#reference-type-guards)
- [Primitive Type Guards](#primitive-type-guards)
- [Composite Type Guards](#composite-type-guards)
- [Refined Type Guards](#refined-type-guards)

---

## Reference Type Guards

### 🧠 Safe Type Checks for Reference & Built-In Objects

ReferenceTypeGuards focus on **reference-based types** like objects, arrays, functions, maps, sets, and weak collections. These guards enable **compile-time type narrowing** and **runtime validation**.

**Core Guards Include:**

| Function     | Description                             |
| ------------ | --------------------------------------- |
| `isObject`   | Checks if a value is a non-null object. |
| `isArray`    | Checks if a value is an array.          |
| `isFunction` | Checks if a value is a function.        |
| `isMap`      | Checks if a value is a `Map`.           |
| `isSet`      | Checks if a value is a `Set`.           |
| `isWeakMap`  | Checks if a value is a `WeakMap`.       |
| `isWeakSet`  | Checks if a value is a `WeakSet`.       |
| `isNull`     | Checks if a value is `null`.            |

**Example:**

```ts
import { isArray, isMap, isWeakSet } from '@/utils/guards/reference';

const arr = [1, 2, 3];
const map = new Map();
const weakSet = new WeakSet();

if (isArray(arr)) console.log('Array of length:', arr.length);
if (isMap(map)) console.log('Map size:', map.size);
if (isWeakSet(weakSet)) console.log('WeakSet detected!');
```

## Primitive Type Guards

### 🔹 Type-Safe Validators for Primitive Values

These guards validate **primitives** (`string`, `number`, `boolean`, `bigint`, `symbol`, `undefined`, `null`) and derived primitive-like values.

**Core Guards Include:**

| Function           | Description                                                 |
| ------------------ | ----------------------------------------------------------- |
| `isNumber`         | Checks if a value is a number (not NaN, finite).            |
| `isInteger`        | Checks if a number is an integer.                           |
| `isString`         | Checks if a value is a string.                              |
| `isNonEmptyString` | Checks if a string has length > 0.                          |
| `isBoolean`        | Checks if a value is a boolean.                             |
| `isBigInt`         | Checks if a value is a bigint.                              |
| `isSymbol`         | Checks if a value is a symbol.                              |
| `isOneOf`          | Checks if a value matches one of a set of allowed literals. |
| `isHexString`      | Checks if a string is a valid hexadecimal string.           |
| `isJsonString`     | Checks if a string contains valid JSON.                     |
| `isCamelCase`      | Checks if a string is camelCase.                            |

**Example:**

```ts
import { isNumber, isNonEmptyString, isOneOf } from '@/utils/guards/primitives';

isNumber(42); // true
isNonEmptyString('hello'); // true
isOneOf(['red', 'green'], 'green'); // true
```

## Composite Type Guards

### 🔹 Type-Safe Validators for Structured & Reference-Like Values

These guards validate **non-primitive, structured, or reference-based types**, such as objects, arrays, key membership, buffers, and React-like elements.

**Core Guards Include:**

| Function          | Description                                                               |
| ----------------- | ------------------------------------------------------------------------- |
| `isInArray`       | Factory guard: checks if a value exists in a predefined array.            |
| `isArrayOf`       | Checks if a value is an array where every element passes a type guard.    |
| `isKeyOfArray`    | Checks if a value is one of the keys in a readonly array of allowed keys. |
| `isKeyOfObject`   | Checks if a value is a valid key of a given object.                       |
| `isRecordOf`      | Checks if an object’s property values all satisfy a given type guard.     |
| `isElementLike`   | Checks if a value is a React-like element with `type` and `props`.        |
| `isElementOfType` | Checks if a React-like element’s `type` is in a list of allowed types.    |

**Example:**

```ts
import {
  isInArray,
  isArrayOf,
  isKeyOfArray,
  isKeyOfObject,
  isRecordOf,
  isElementLike,
  isElementOfType,
} from '@/utils/guards/composite';

const arr = [1, 2, 3];
if (isArrayOf(isNumber, arr)) {
  console.log('All numbers!', arr);
}

const allowedKeys = ['id', 'name'] as const;
const key: unknown = 'name';
if (isKeyOfArray(allowedKeys)(key)) {
  console.log('Valid key:', key);
}

const user = { id: 1, name: 'Alice' };
if (isKeyOfObject(user)(key)) {
  console.log('User has property:', key);
}

const record = { a: 1, b: 2 };
if (isRecordOf(record, isNumber)) {
  console.log('All values are numbers');
}

const element: unknown = { type: 'div', props: { className: 'container' } };
if (isElementOfType(element, ['div', 'span'])) {
  console.log('Valid element type:', element.type);
}
```

## Refined Type Guards

### 🔹 Advanced Validators for Strings, URLs, Buffers, and Structured Data

These guards validate **specialized, formatted, or derived types**—including camelCase, snake_case, URLs, JSON strings, RGB tuples, phone numbers, and more.

**Core Guards Include:**

| Function             | Description                                                                          |
| -------------------- | ------------------------------------------------------------------------------------ |
| `isCamelCase`        | Checks if a string is camelCase.                                                     |
| `isSnakeCase`        | Checks if a string is snake_case.                                                    |
| `isKebabCase`        | Checks if a string is kebab-case.                                                    |
| `isHexByteString`    | Checks if a string is a valid hexadecimal byte string (optional fixed length).       |
| `isBufferLikeObject` | Checks if an object resembles a Node.js Buffer `{ type: 'Buffer', data: number[] }`. |
| `isJSONArrayString`  | Checks if a string contains a valid JSON array.                                      |
| `isJSONObjectString` | Checks if a string contains a valid JSON object.                                     |
| `isJsonString`       | Checks if a string contains any valid JSON data (array or object).                   |
| `isAbsoluteUrl`      | Checks if a string is a valid absolute URL.                                          |
| `isInternalUrl`      | Checks if a string is an internal URL relative to the current hostname.              |
| `isRGBTuple`         | Checks if a value is an array of three numbers, each between 0–255.                  |
| `isPhoneNumber`      | Checks if a string matches common US, EU, or generic phone number formats.           |
| `isEmail`            | Checks if a string is a valid email address.                                         |
| `isHTMLString`       | Checks if a string contains HTML tags.                                               |

**Example:**

```ts
import { RefinedTypeGuards } from '@/utils/guards/refined';

const str = 'helloWorld';
if (RefinedTypeGuards.isCamelCase(str)) {
  console.log('Valid camelCase:', str);
}

const hex = 'a1b2c3';
if (RefinedTypeGuards.isHexByteString()(hex)) {
  console.log('Valid hex byte string:', hex);
}

const buffer = { type: 'Buffer', data: [1, 2, 3] };
if (RefinedTypeGuards.isBufferLikeObject(buffer)) {
  console.log('Buffer-like object detected');
}

const url = 'https://example.com';
if (RefinedTypeGuards.isAbsoluteUrl(url)) {
  console.log('Absolute URL:', url);
}

const rgb: unknown = [255, 128, 0];
if (RefinedTypeGuards.isRGBTuple(rgb)) {
  console.log('Valid RGB tuple:', rgb);
}

const json = '{"name":"Alice"}';
if (RefinedTypeGuards.isJSONObjectString(json)) {
  console.log('Valid JSON object string');
}
```
