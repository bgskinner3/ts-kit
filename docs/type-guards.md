# 🛡️ Guard Utilities

This document covers type predicates that narrow unknown values into specific types. These are separated into Core (Environment Agnostic) and React (UI Specific).

---

## Table of Contents

- [Primitive & Reference](#primitive--reference)
- [Format & Logic](#format--logic)
- [Assertions](#assertions)

---

## 🌍 Core Guards (CoreGuards)

**Purpose:**  
Zero-dependency, pure TypeScript guards. Use these in Node.js, Edge Functions, or the Browser to safely validate data shapes and primitives.

### Primitive & Reference

| Function           | Description                                                                    |
| ------------------ | ------------------------------------------------------------------------------ |
| `isObject`         | Checks if a value is a non-null object (excluding arrays).                     |
| `isArray`          | Checks if a value is an array.                                                 |
| `isFunction`       | Checks if a value is a function.                                               |
| `isMap`            | Checks if a value is a `Map`.                                                  |
| `isSet`            | Checks if a value is a `Set`.                                                  |
| `isWeakMap`        | Checks if a value is a `WeakMap`.                                              |
| `isWeakSet`        | Checks if a value is a `WeakSet`.                                              |
| `isNull`           | Checks if a value is exactly `null`.                                           |
| `isNil`            | Checks if a value is `null` or `undefined`.                                    |
| `isInstanceOf`     | Checks if a value is an instance of a given constructor.                       |
| `isDefined`        | Checks if a value is neither `null` nor `undefined`.                           |
| `isUndefined`      | Checks if a value is `undefined`.                                              |
| `isNumber`         | Checks if a value is a finite number (not `NaN`).                              |
| `isInteger`        | Checks if a value is an integer.                                               |
| `isString`         | Checks if a value is a string.                                                 |
| `isNonEmptyString` | Checks if a value is a non-empty, non-whitespace string.                       |
| `isBoolean`        | Checks if a value is a boolean.                                                |
| `isBigInt`         | Checks if a value is a `bigint`.                                               |
| `isSymbol`         | Checks if a value is a `symbol`.                                               |
| `isPrimitive`      | Checks if a value is a primitive (`string`, `number`, `boolean`, or `bigint`). |

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

### Format & Logic

| Function             | Description                                                                                             |
| -------------------- | ------------------------------------------------------------------------------------------------------- |
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

---

## 🔧 Assertions

**Purpose:**  
Runtime validation helpers that leverage your type guards to assert types safely and provide useful error messages.  
Includes both **generic creators** and **pre-built primitive, reference, and composite assertions**.

---

### Core Assertion Creators

| Function                                  | Description                                                                                                      |
| ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `assertValue(value, typeGuard, message?)` | Asserts that a value passes a type guard. Narrows the type at compile time. Throws an error if validation fails. |
| `makeAssert(guard, key)`                  | Creates a reusable assertion function for a specific type guard. Returns a function `(value, message?) => void`. |

---

### Pre-Created Assertion Functions

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

---

### Example Usage

```ts
import {
  assertIsNumber,
  assertIsString,
  assertIsDefined,
  makeAssert,
} from '@/utils/guards/assertions';

const value: unknown = 42;
assertIsNumber(value); // narrows type to number

const name: unknown = 'Alice';
assertIsString(name); // narrows type to string

const optional: unknown = null;
assertIsDefined(optional); // throws if null or undefined

// Using a custom reusable assertion
const assertNumber = makeAssert(isNumber, 'myNumber');
assertNumber(value); // same as assertIsNumber
```

---

## ⚛️ React Guards (ReactGuards)

**Purpose:**  
Specialized guards for the React ecosystem. Use these to safely traverse the Virtual DOM, handle Refs, and validate component metadata.

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

## Examples

### Working with Refs

```ts
import { isRefObject } from '@/react/guards/primitive';

function focusIfPossible(ref: unknown) {
  if (isRefObject<HTMLInputElement>(ref) && ref.current) {
    ref.current.focus();
  }
}
```

### Handling Unknown React Nodes

```ts
import { isValidReactNode } from '@/react/guards/node';

function renderSafe(node: unknown) {
  if (isValidReactNode(node)) {
    return node;
  }

  return null;
}
```

### Detecting Clickable Elements

```ts
import { hasOnClick } from '@/react/guards/node';
import React from 'react';

function wrapClick(child: unknown) {
  if (hasOnClick(child)) {
    return React.cloneElement(child, {
      onClick: (e) => {
        console.log('Clicked!');
        child.props.onClick?.(e);
      },
    });
  }

  return child;
}
```

### Validating JSX Elements

```ts
import { isReactElement, isFragment } from '@/react/guards/node';

function inspectElement(value: unknown) {
  if (isFragment(value)) {
    console.log('Fragment detected');
  }

  if (isReactElement(value)) {
    console.log('Element type:', value.type);
  }
}
```
