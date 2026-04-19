/**
 * @jest-environment jsdom
 */
import React from 'react';
import {
  extractDOMProps,
  filterChildrenByDisplayName,
  mergeRefs,
  lazyProxy,
  mergeCssVars,
  mergeEventHandlerClicks,
  getRefCurrent,
  extractComponentProps,
} from '../../src/lib/processors/react';

describe('React Processor Utils', () => {
  describe('extractComponentProps', () => {
    it('extracts only whitelisted component props', () => {
      const props = {
        className: 'btn',
        onClick: () => {},
        variant: 'primary',
        disabled: false,
      };

      const result = extractComponentProps(props, ['className', 'variant']);

      expect(result).toEqual({
        className: 'btn',
        variant: 'primary',
      });
    });

    it('returns an empty object when no keys match', () => {
      const props = {
        a: 1,
        b: 2,
      };

      const result = extractComponentProps(props, ['c', 'd'] as any);

      expect(result).toEqual({});
    });

    it('returns all keys when full whitelist is provided', () => {
      const props = {
        className: 'box',
        id: 'test',
      };

      const result = extractComponentProps(props, ['className', 'id']);

      expect(result).toEqual(props);
    });

    it('does not mutate the original props object', () => {
      const props = {
        className: 'btn',
        variant: 'primary',
      };

      const original = { ...props };

      extractComponentProps(props, ['className']);

      expect(props).toEqual(original);
    });

    it('handles partial key matches correctly', () => {
      const props = {
        a: 1,
        b: 2,
        c: 3,
      };

      const result = extractComponentProps(props, ['a', 'c']);

      expect(result).toEqual({
        a: 1,
        c: 3,
      });
    });

    it('ignores non-existent keys safely', () => {
      const props = {
        name: 'test',
      };

      const result = extractComponentProps(props, ['name', 'fakeKey'] as any);

      expect(result).toEqual({
        name: 'test',
      });
    });

    it('preserves function values correctly', () => {
      const onClick = jest.fn();

      const props = {
        onClick,
        label: 'click me',
      };

      const result = extractComponentProps(props, ['onClick']);

      result.onClick();

      expect(onClick).toHaveBeenCalled();
    });

    it('handles empty props object', () => {
      const result = extractComponentProps({}, ['a', 'b'] as any);

      expect(result).toEqual({});
    });

    it('handles empty keys array', () => {
      const props = {
        a: 1,
        b: 2,
      };

      const result = extractComponentProps(props, [] as any);

      expect(result).toEqual({});
    });

    it('correctly narrows mixed-type props', () => {
      const props = {
        className: 'box',
        count: 5,
        active: true,
      };

      const result = extractComponentProps(props, ['count', 'active']);

      expect(result).toEqual({
        count: 5,
        active: true,
      });
    });
  });
  describe('mergeRefs', () => {
    it('updates both function and object refs', () => {
      const objRef = { current: null };
      const fnRef = jest.fn();
      const combined = mergeRefs(objRef, fnRef);

      const mockElement = { id: 'test' };
      combined(mockElement as any);

      expect(objRef.current).toBe(mockElement);
      expect(fnRef).toHaveBeenCalledWith(mockElement);
    });

    it('gracefully handles undefined refs', () => {
      const objRef = { current: null };
      const combined = mergeRefs(objRef, undefined);
      combined({} as any);
      expect(objRef.current).not.toBeNull();
    });
    it('updates an object ref specifically', () => {
      const objRef = { current: null };
      const combined = mergeRefs(objRef);

      const mockElement = { id: 'object-test' };
      combined(mockElement as any);

      // This forces the loop to skip the isFunction check and hit isRefObject
      expect(objRef.current).toBe(mockElement);
    });

    it('does not crash if an invalid ref type somehow passes the filter', () => {
      // This hits the "hidden" else branch of the if/else if logic
      // by passing something that isRef(ref) is true for, but isn't a function or obj.current
      // Although rare in TS, it ensures the loop completes safely.
      const weirdRef = Object.assign(() => {}, { current: undefined });
      delete (weirdRef as any).current;

      const combined = mergeRefs(weirdRef as any);
      expect(() => combined({} as any)).not.toThrow();
    });
    it('hits the isRefObject branch by using a non-function object ref', () => {
      // Create a "naked" object ref.
      // We explicitly ensure it is NOT a function so it fails the first 'if'.
      const objRef = { current: null };

      const combined = mergeRefs(objRef);
      const element = { nodeType: 1 };

      combined(element as any);

      expect(objRef.current).toBe(element);
    });
  });

  describe('lazyProxy', () => {
    it('evaluates functions only when accessed and caches the result', () => {
      const spy = jest.fn(() => Math.random());
      const config = { a: 1, b: spy };
      const proxy = lazyProxy(config);

      expect(spy).not.toHaveBeenCalled();

      const firstCall = proxy.b;
      expect(spy).toHaveBeenCalledTimes(1);

      const secondCall = proxy.b;
      expect(spy).toHaveBeenCalledTimes(1); // Still 1 due to cache
      expect(firstCall).toBe(secondCall);
    });
    it('falls back to Reflect for non-string, missing, or symbol properties', () => {
      const config = { a: 1 };
      const proxy = lazyProxy(config);

      // 1. Access a missing property (hits !keys.has)
      expect((proxy as any)['nonExistent']).toBeUndefined();

      // 2. Access a Symbol property (hits !isString)
      const mySymbol = Symbol('test');
      const withSymbol: any = { [mySymbol]: 'bar' };
      const symbolProxy = lazyProxy(withSymbol);
      expect(symbolProxy[mySymbol]).toBe('bar');
    });

    it('returns non-function values directly without caching', () => {
      const config = { a: 100 }; // 'a' is a number, not a function
      const proxy = lazyProxy(config);

      // Hits the final 'return value' branch
      expect(proxy.a).toBe(100);
    });
  });

  describe('mergeCssVars', () => {
    it('merges variables and strings into a style object', () => {
      const vars = { '--color': 'red', '--size': 10, '--empty': undefined };
      const style = { marginTop: '10px' };
      const merged = mergeCssVars(vars, style);

      expect(merged).toEqual({
        '--color': 'red',
        '--size': '10',
        marginTop: '10px',
      });
      expect(merged).not.toHaveProperty('--empty');
    });
  });

  describe('mergeEventHandlerClicks', () => {
    it('runs internal handler if user does not prevent default', () => {
      const user = jest.fn();
      const internal = jest.fn();
      const event = { defaultPrevented: false } as any;

      const handler = mergeEventHandlerClicks(user, internal);
      handler(event);

      expect(user).toHaveBeenCalled();
      expect(internal).toHaveBeenCalled();
    });

    it('skips internal handler if user calls preventDefault', () => {
      const user = jest.fn((e) => {
        e.defaultPrevented = true;
      });
      const internal = jest.fn();
      const event = { defaultPrevented: false } as any;

      const handler = mergeEventHandlerClicks(user, internal);
      handler(event);

      expect(internal).not.toHaveBeenCalled();
    });
  });

  describe('extractDOMProps', () => {
    it('strips non-DOM properties from the object', () => {
      const props = { id: 'foo', className: 'bar', customProp: 'hidden' };
      const domProps = extractDOMProps<'div', typeof props>(props);

      expect(domProps).toHaveProperty('id');
      expect(domProps).toHaveProperty('className');
      expect(domProps).not.toHaveProperty('customProp');
    });
  });

  describe('filterChildrenByDisplayName', () => {
    it('filters children based on their component displayName', () => {
      // 1. Define standard functional components
      const MyComp = () => null;
      MyComp.displayName = 'Target';

      const OtherComp = () => null;
      OtherComp.displayName = 'Ignore';

      // 2. Wrap one in Memo to test the nested logic
      const MemoComp = React.memo(() => null);
      MemoComp.displayName = 'TargetMemo';

      const children = [
        React.createElement(MyComp, { key: '1' }),
        React.createElement(OtherComp, { key: '2' }),
        React.createElement(MemoComp, { key: '3' }),
        'some text',
      ];

      // Test standard
      const filtered = filterChildrenByDisplayName(children, 'Target');
      expect(filtered).toHaveLength(1);

      // Test memoized (if your logic supports TargetMemo)
      const filteredMemo = filterChildrenByDisplayName(children, 'TargetMemo');
      expect(filteredMemo).toHaveLength(1);
    });
  });
  describe('getRefCurrent', () => {
    it('returns the value from a RefObject', () => {
      const mockElement = { id: 'test-el' };
      const objRef = { current: mockElement };

      const result = getRefCurrent(objRef);
      expect(result).toBe(mockElement);
    });

    it('returns null for function/callback refs', () => {
      const fnRef = jest.fn();

      // Callback refs are valid Ref types, but have no synchronous .current
      const result = getRefCurrent(fnRef);
      expect(result).toBeNull();
    });

    it('returns null for null or undefined refs', () => {
      expect(getRefCurrent(null)).toBeNull();
      expect(getRefCurrent(undefined)).toBeNull();
    });

    it('returns null if RefObject.current is not yet set', () => {
      const emptyRef = { current: null };
      expect(getRefCurrent(emptyRef)).toBeNull();
    });
  });
});
