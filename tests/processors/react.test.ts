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
} from '../../src/lib/processors/react';

describe('React Processor Utils', () => {
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
});
