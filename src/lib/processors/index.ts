import { lazyProxy, mergeRefs } from "./react";
import { fetchJson, delay, retry } from "./network";


const ProcessorUtils = {
    lazyProxy,
    mergeRefs,
    fetchJson, delay, retry
} as const


export {
    ProcessorUtils,
    lazyProxy,
    mergeRefs,
    fetchJson, delay, retry
}
/**
 * =============================================================================
 * Processors Folder / Module
 * =============================================================================
 *
 * ## Role / Purpose
 *
 * **Role:**
 * The `processors/` folder contains reusable functions that process, transform,
 * or handle data in a meaningful way. These functions are generally stateless,
 * deterministic, and focused on specific operations or domains.
 *
 * - Responsible for handling transformations, computations, and controlled
 *   side-effects (e.g., network calls, React ref handling, HTML processing).
 * - Exists to provide a centralized, organized toolbox of utility functions
 *   that can be reused across the application.
 *
 * ---
 *
 * ## Guidelines
 *
 * **✅ What goes here:**
 * - Pure utility functions that transform or process data
 * - Async helpers and network-related utilities (fetch, retry, delay)
 * - Domain-specific processors: HTML, strings, URLs, React refs, time/durations
 * - Example: `function makeStringKebabCase(str: string): string {...}`
 * - Example: `function extractFirstImageSrc(html: string): string | null {...}`
 * - Example: `async function fetchJson<T>(url: string): Promise<T> {...}`
 *
 * **🚫 What does NOT go here:**
 * - Runtime assertion functions or validators
 * - Type guards or type-refinement functions
 * - Generic array/object helpers (use `common/` instead)
 *
 * ---
 *
 * ## Benefits
 *
 * - Groups all data-processing utilities in one place for discoverability
 * - Encourages consistent patterns for transformations and side-effect handling
 * - Improves maintainability by separating processors from guards, assertions,
 *   and generic helpers
 * - Makes it easier to scale and add new processors without polluting unrelated
 *   folders
 * - Optional link: Related folders include `guards/`, `common/`, and `transformers/`
 *
 */
