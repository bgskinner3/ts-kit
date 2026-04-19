import { fetchJson, delay, retry } from './network';
import {
  mergeRefs,
  lazyProxy,
  mergeCssVars,
  mergeEventHandlerClicks,
  extractDOMProps,
  filterChildrenByDisplayName,
  getRefCurrent,
  extractComponentProps,
} from './react';
const ProcessorUtils = {
  fetchJson,
  delay,
  retry,
} as const;

const ReactProcessorUtils = {
  mergeRefs,
  lazyProxy,
  mergeCssVars,
  mergeEventHandlerClicks,
  extractDOMProps,
  filterChildrenByDisplayName,
  getRefCurrent,
} as const;

export {
  ProcessorUtils,
  ReactProcessorUtils,
  fetchJson,
  delay,
  retry,
  mergeRefs,
  lazyProxy,
  mergeCssVars,
  mergeEventHandlerClicks,
  extractDOMProps,
  filterChildrenByDisplayName,
  getRefCurrent,
  extractComponentProps,
};
