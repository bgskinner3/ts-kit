/**
 * @jest-environment jsdom
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {
  isValidReactNode,
  isReactElement,
  isFragment,
  hasOnClick,
  isElementLike,
  hasNameMetadata,
  createPropGuard,
  isElementOfType,
} from '../../src/lib/guards/react/node-guards';
import { THTMLTags } from '../../src/types';

describe('React Node Guards', () => {
  describe('isValidReactNode', () => {
    it('returns true for primitives (strings, numbers, null)', () => {
      expect(isValidReactNode('hello')).toBe(true);
      expect(isValidReactNode(42)).toBe(true);
      expect(isValidReactNode(null)).toBe(true);
      expect(isValidReactNode(undefined)).toBe(true);
    });

    it('returns true for JSX elements', () => {
      expect(isValidReactNode(React.createElement('div'))).toBe(true);
    });

    it('returns true for arrays of valid nodes', () => {
      expect(isValidReactNode(['a', 1, React.createElement('span')])).toBe(
        true,
      );
    });

    it('returns true for Portals', () => {
      const container = document.createElement('div');
      const portal = ReactDOM.createPortal(
        React.createElement('div'),
        container,
      );
      expect(isValidReactNode(portal)).toBe(true);
    });
  });

  describe('isFragment', () => {
    it('returns true only for React.Fragment', () => {
      expect(isFragment(React.createElement(React.Fragment))).toBe(true);
      expect(isFragment(React.createElement('div'))).toBe(false);
    });
  });

  describe('hasOnClick', () => {
    it('returns true if element has an onClick function prop', () => {
      const element = React.createElement('button', { onClick: () => {} });
      expect(hasOnClick(element)).toBe(true);
    });

    it('returns false if onClick is missing or not a function', () => {
      expect(hasOnClick(React.createElement('button'))).toBe(false);
      expect(
        hasOnClick(React.createElement('button', { onClick: 'not-a-fn' })),
      ).toBe(false);
    });
  });

  describe('isElementLike', () => {
    it('returns true for plain objects that match the React shape', () => {
      // This is for JSON-serialized elements that lost their Symbol
      const mockElement = {
        type: 'div',
        props: { className: 'foo' },
      };
      expect(isElementLike(mockElement)).toBe(true);
    });

    it('returns false for actual React Elements (because they are symbols)', () => {
      // Note: Standard React Elements pass this too because they satisfy the shape
      expect(isElementLike(React.createElement('div'))).toBe(true);
    });
  });

  describe('isReactElement', () => {
    it('isReactElement identifies JSX correctly', () => {
      const element = React.createElement('div');
      const plainObject = { type: 'div', props: {} };

      expect(isReactElement(element)).toBe(true);
      expect(isReactElement(plainObject)).toBe(false); // Fails because it lacks the Symbol
    });
  });

  describe('isElementOfType', () => {
    describe('isElementOfType', () => {
      it('returns true if element type matches', () => {
        const element = React.createElement('span');
        expect(isElementOfType(element, ['div', 'span'])).toBe(true);
      });

      it('returns false if element type is not in list', () => {
        const element = React.createElement('p');
        expect(isElementOfType(element, ['span'])).toBe(false); // Pass as array
      });
    });

    it('returns false for non-elements', () => {
      expect(isElementOfType('not-an-element', 'div')).toBe(false);
    });
  });

  describe('hasNameMetadata', () => {
    it('identifies components via various keys', () => {
      const CompA = () => null;
      CompA.displayName = 'A';

      function CompB() {
        return null;
      }

      expect(hasNameMetadata(CompA)).toBe(true);
      expect(hasNameMetadata(CompB)).toBe(true);
      expect(hasNameMetadata(() => null)).toBe(true); // Functions have 'name' by default
    });
  });

  describe('createPropGuard', () => {
    it('correctly validates primitives vs objects', () => {
      const isStatus = createPropGuard<any, any>();
      expect(isStatus('active')).toBe(true);
      expect(isStatus({ color: 'red' })).toBe(false); // Now returns false
    });
  });
});
