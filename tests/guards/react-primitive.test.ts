/**
 * @jest-environment jsdom
 */
import React from 'react';
import { createPortal } from 'react-dom';
import {
  isRef,
  isRefObject,
  isPromise,
  isReactPortal,
  hasChildren,
  isComponentType,
  isForwardRef,
} from '../../src/lib/guards/react/react-primitive';

describe('React Primitive Guards', () => {
  describe('isRef & isRefObject', () => {
    it('identifies object refs (useRef/createRef)', () => {
      const ref = { current: document.createElement('div') };
      expect(isRef(ref)).toBe(true);
      expect(isRefObject(ref)).toBe(true);
    });

    it('identifies callback refs (functions)', () => {
      const cbRef = (_el: HTMLElement | null) => {};
      expect(isRef(cbRef)).toBe(true);
      expect(isRefObject(cbRef)).toBe(false); // Functions aren't RefObjects
    });
  });

  describe('isPromise', () => {
    it('identifies native Promises and thenables', () => {
      expect(isPromise(Promise.resolve())).toBe(true);
      expect(isPromise({ then: () => {} })).toBe(true);
      expect(isPromise({})).toBe(false);
    });
  });

  describe('isReactPortal', () => {
    it('identifies portals created via react-dom', () => {
      const div = document.createElement('div');
      const portal = createPortal(React.createElement('span'), div);
      expect(isReactPortal(portal)).toBe(true);
    });
  });

  describe('hasChildren', () => {
    it('returns true if object has a defined children prop', () => {
      expect(hasChildren({ children: 'hello' })).toBe(true);
      expect(hasChildren({ children: null })).toBe(false); // isDefined(null) is false
      expect(hasChildren({})).toBe(false);
    });
  });

  describe('isComponentType', () => {
    it('identifies functional components (hits isFunction branch)', () => {
      const FnComp = () => null;
      // This returns true at the very first check
      expect(isComponentType(FnComp)).toBe(true);
    });

    it('returns false for non-component objects (hits the false branches)', () => {
      // Hits: isFunction(false) -> has 'prototype'(true) -> isObject(prototype)(true)
      // -> has 'render'(false) 🛑
      const plainObj = { prototype: {} };
      expect(isComponentType(plainObj)).toBe(false);

      // Hits: isFunction(false) -> has 'prototype'(false) 🛑
      expect(isComponentType({ arbitrary: 'data' })).toBe(false);
    });

    it('returns false for null or primitives', () => {
      expect(isComponentType(null)).toBe(false);
      expect(isComponentType(123)).toBe(false);
    });
    it('hits the final isFunction check for class-like objects', () => {
      // 1. isFunction(fakeClass) is FALSE (it's a plain object)
      // 2. has prototype is TRUE
      // 3. isObject(prototype) is TRUE
      // 4. has render is TRUE
      // 5. isFunction(render) is TRUE ✅ <--- This is the one you are missing
      const fakeClass = {
        prototype: {
          render: () => null,
        },
      };

      expect(isComponentType(fakeClass)).toBe(true);
    });

    it('hits the false branch of the final isFunction check', () => {
      // Hits everything up to the end, but render is NOT a function
      const brokenClass = {
        prototype: {
          render: 'not-a-function',
        },
      };

      expect(isComponentType(brokenClass)).toBe(false);
    });
  });

  describe('isForwardRef', () => {
    it('identifies components wrapped in React.forwardRef', () => {
      const Forwarded = React.forwardRef((_props, _ref) => null);
      expect(isForwardRef(Forwarded)).toBe(true);
      expect(isForwardRef(() => null)).toBe(false);
    });
  });
});
