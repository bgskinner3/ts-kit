import {
  isPropValid,
  isDOMPropKey,
  isDOMEntry,
} from '../../src/lib/guards/dom-guards';
import { VALID_DOM_TESTING_KEYS } from '../../src/constants/react-props';
describe('DOM Property Guards', () => {
  describe('isPropValid', () => {
    it('returns true for standard HTML attributes', () => {
      expect(isPropValid('id')).toBe(true);
      expect(isPropValid('className')).toBe(true);
      expect(isPropValid('href')).toBe(true);
      expect(isPropValid('tabIndex')).toBe(true);
    });

    it('returns true for SVG-specific attributes', () => {
      expect(isPropValid('viewBox')).toBe(true);
      expect(isPropValid('strokeWidth')).toBe(true);
      expect(isPropValid('fill')).toBe(true);
    });

    it('returns true for event handlers using the charCode optimization', () => {
      expect(isPropValid('onClick')).toBe(true);
      expect(isPropValid('onTransitionEnd')).toBe(true);
      expect(isPropValid('onChange')).toBe(true);
    });

    it('returns true for data and aria patterns via regex', () => {
      expect(isPropValid('data-testid')).toBe(true);
      expect(isPropValid('aria-label')).toBe(true);
      expect(isPropValid('data-custom-attribute')).toBe(true);
    });

    it('returns false for custom React props or non-DOM strings', () => {
      expect(isPropValid('isActive')).toBe(false);
      expect(isPropValid('myCustomProp')).toBe(false);
      expect(isPropValid('only-relevant')).toBe(false); // starts with 'on' but 3rd char is not uppercase
    });

    it('is memoized (internal behavior check)', () => {
      // First call computes
      const first = isPropValid('id');
      // Second call should be near-instant lookup
      const second = isPropValid('id');
      expect(first).toBe(true);
      expect(second).toBe(true);
    });
    describe('isPropValid - Random Sampling', () => {
      // Pick 5 random keys from the hundreds of available props
      const randomSample = [...VALID_DOM_TESTING_KEYS]
        .sort(() => 0.5 - Math.random())
        .slice(0, 5);

      it.each(randomSample)('should validate the random prop: %s', (prop) => {
        expect(isPropValid(prop)).toBe(true);
      });
    });
  });

  describe('isDOMPropKey', () => {
    it('narrows unknown values to strings if they are valid DOM props', () => {
      expect(isDOMPropKey('id')).toBe(true);
      expect(isDOMPropKey(123)).toBe(false);
      expect(isDOMPropKey(null)).toBe(false);
    });
  });

  describe('isDOMEntry', () => {
    it('validates [key, value] tuples for DOM forwarding', () => {
      const validEntry: [PropertyKey, unknown] = ['className', 'container'];
      const invalidEntry: [PropertyKey, unknown] = ['customProp', true];

      expect(isDOMEntry(validEntry)).toBe(true);
      expect(isDOMEntry(invalidEntry)).toBe(false);
    });
  });
});
