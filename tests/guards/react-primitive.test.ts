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
} from '../../src/lib/guards/react-primitive';

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
    it('identifies functional components', () => {
      const FnComp = () => null;
      expect(isComponentType(FnComp)).toBe(true);
    });

    it('identifies class components', () => {
      class ClassComp extends React.Component {
        render() {
          return null;
        }
      }
      expect(isComponentType(ClassComp)).toBe(true);
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
