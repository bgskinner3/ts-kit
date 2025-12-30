import { TTypeGuard } from '../../types';
import { isValidElement } from 'react';
import type { ReactElement } from 'react';
import { isNil, isDefined, isFunction, isObject, isNull } from './reference';
import type {
  Ref,
  RefObject,
  ReactNode,
  MouseEvent,
  ElementType,
  ComponentPropsWithoutRef,
} from 'react';
import { isString, isNumber, isBoolean } from './primitives';
import { isArrayOf, isKeyInObject } from './composite';
import isPropValid from '@emotion/is-prop-valid';

export const hasOnClick: TTypeGuard<
  ReactElement<{ onClick?: (e: MouseEvent<HTMLElement>) => void }>
> = (
  value: unknown,
): value is ReactElement<{
  onClick?: (e: MouseEvent<HTMLElement>) => void;
}> => {
  return (
    isReactElement(value) &&
    !isNil(value.props) &&
    isKeyInObject('onClick')(value.props) &&
    isFunction(value.props.onClick)
  );
};

export const isDOMPropKey: TTypeGuard<string> = (
  value: unknown,
): value is string =>
  isString(value) &&
  (isPropValid(value) ||
    value.startsWith('data-') ||
    value.startsWith('aria-'));

export const isDOMEntry = <TElement extends ElementType>(
  entry: [PropertyKey, unknown],
): entry is [
  Extract<keyof ComponentPropsWithoutRef<TElement>, string>,
  unknown,
] => {
  return typeof entry[0] === 'string' && isDOMPropKey(entry[0]);
};

export const isRef = <T>(value: unknown): value is Ref<T> =>
  isDefined(value) &&
  (isFunction(value) || (isObject(value) && 'current' in value));

export const isRefObject = <T>(ref: Ref<T>): ref is RefObject<T | null> =>
  !isNull(ref) && isObject(ref) && 'current' in ref;

export const isPromise = <T>(value: unknown): value is Promise<T> =>
  !!value && isKeyInObject('then')(value) && isFunction(value.then);

const isPrimitive = (value: unknown): value is string | number | boolean =>
  isString(value) || isNumber(value) || isBoolean(value);
export const isValidReactNode: TTypeGuard<ReactNode> = (
  value: unknown,
): value is ReactNode =>
  isNil(value) ||
  isPrimitive(value) ||
  isValidElement(value) ||
  isArrayOf(isValidReactNode, value);

export const isReactElement: TTypeGuard<ReactElement> = (
  value: unknown,
): value is ReactElement => {
  return typeof value === 'object' && value !== null && 'type' in value;
};

export const ReactTypeGuards = {
  isRef,
  isRefObject,
  isValidReactNode,
  isReactElement,
  isPromise,
  hasOnClick,
  isDOMPropKey,
  isDOMEntry,
} as const;
