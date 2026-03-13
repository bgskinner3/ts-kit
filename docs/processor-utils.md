# Processor Utilities (`ProcessorUtils` & `ReactProcessorUtils`)

`ProcessorUtils` and `ReactProcessorUtils` provide **asynchronous operations, event orchestration, and React helper utilities**.  
They are framework-agnostic where possible, with specialized functions for React when needed.

- **ProcessorUtils:** Async and network helpers
- **ReactProcessorUtils:** React-focused utilities for refs, DOM props, and children filtering

---

## Utilities Table

| Function | Category | Description |
| -------- | -------- | ----------- |
| `fetchJson(url)` | Async / Network | Fetches JSON from a URL and parses it. Throws detailed errors on failure or invalid JSON. |
| `delay(ms)` | Async | Returns a promise that resolves after `ms` milliseconds, useful for throttling or timeouts. |
| `retry(fn, retries?, delayMs?)` | Async / Network | Retries an async function with **exponential backoff**. Handles transient failures and rate-limiting. |
| `mergeRefs(...refs)` | React Ref | Combines multiple React refs (object or callback refs) into a single ref callback. |
| `lazyProxy(obj)` | React / Object | Lazily evaluates function properties of an object and caches results on first access. |
| `mergeCssVars(vars, style?)` | React / Styling | Merges CSS variables and optional style objects into a single CSSProperties object. |
| `mergeEventHandlerClicks(userHandler?, internalHandler?)` | React / Event | Combines user and internal click handlers. Internal only runs if `event.preventDefault()` wasn’t called. |
| `extractDOMProps(props)` | React / DOM | Filters a props object to include only valid DOM attributes for a given element type. |
| `filterChildrenByDisplayName(children, displayName)` | React / Node | Returns only React children that match a given `displayName`. Skips non-React elements. |

---
## Example Usage

### 1️⃣ Using `ProcessorUtils`

```ts
import { fetchJson, delay, retry, ProcessorUtils } from './lib/processor';

// Fetch JSON directly
const user = await fetchJson<{ id: number; name: string }>(
  'https://api.example.com/users/1'
);

// Retry with exponential backoff
const data = await retry(() => fetchJson('/api/data'), 3, 500);

// Delay execution
await delay(1000);
console.log('Waited 1 second');

// Using the object
const result = await ProcessorUtils.fetchJson('/api/data');

```

### 2️⃣ Using ReactProcessorUtils

```ts
import { mergeRefs, extractDOMProps, filterChildrenByDisplayName, ReactProcessorUtils } from './lib/processor';
import React, { useRef, forwardRef } from 'react';

// Combine refs
const ref1 = useRef<HTMLDivElement>(null);
const ref2 = useRef<HTMLDivElement>(null);
const combinedRef = mergeRefs(ref1, ref2);

// Extract valid DOM props
const domProps = extractDOMProps({ id: 'btn', custom: 'ignored' });

// Filter children by displayName
const steps = filterChildrenByDisplayName(children, 'StepperStep');

// Using the object
const domProps2 = ReactProcessorUtils.extractDOMProps({ id: 'btn', custom: 'ignored' });

```