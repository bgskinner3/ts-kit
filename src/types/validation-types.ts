import { HTML_TAGS } from '../constants';
import { TJSONObjectString, TJSONArrayString } from './branded';
type TTypeGuard<T> = (value: unknown) => value is T;
type TAssert<T> = (value: unknown) => asserts value is T;
type TAnyFunction = (...args: unknown[]) => unknown;
type TJSONDataString = TJSONObjectString | TJSONArrayString;
type TAnyObject = Record<PropertyKey, unknown>
type TElementLike = {
  type: string;
  props: { children?: unknown; [key: string]: unknown };
};

type THTMLTags = (typeof HTML_TAGS)[number];

export type {
  TTypeGuard,
  TAnyFunction,
  THTMLTags,
  TElementLike,
  TAssert,
  TJSONDataString,
  TAnyObject
};
