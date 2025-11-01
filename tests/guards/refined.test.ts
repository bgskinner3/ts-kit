import {
  isCamelCase,
  isSnakeCase,
  isKebabCase,
  isHexByteString,
  isBufferLikeObject,
  isJSONArrayString,
  isJSONObjectString,
  isJsonString,
  isAbsoluteUrl,
  // isInternalUrl,
  isRGBTuple,
} from '../../src/utils';

describe('Refined / Composite Type Guards', () => {
  describe('isCamelCase', () => {
    it('returns true for valid camelCase strings', () => {
      expect(isCamelCase('fooBar')).toBe(true);
      expect(isCamelCase('helloWorld123')).toBe(true);
    });
    it('returns false for non-camelCase strings', () => {
      expect(isCamelCase('FooBar')).toBe(false);
      expect(isCamelCase('foo_bar')).toBe(false);
      expect(isCamelCase('foo-bar')).toBe(false);
      expect(isCamelCase('')).toBe(false);
    });
  });

  describe('isSnakeCase', () => {
    it('returns true for valid snake_case strings', () => {
      expect(isSnakeCase('foo_bar')).toBe(true);
      expect(isSnakeCase('hello_world')).toBe(true);
    });
    it('returns false for non-snake_case strings', () => {
      expect(isSnakeCase('fooBar')).toBe(false);
      expect(isSnakeCase('foo-bar')).toBe(false);
      expect(isSnakeCase('')).toBe(false);
    });
  });

  describe('isKebabCase', () => {
    it('returns true for valid kebab-case strings', () => {
      expect(isKebabCase('foo-bar')).toBe(true);
      expect(isKebabCase('hello-world')).toBe(true);
    });
    it('returns false for non-kebab-case strings', () => {
      expect(isKebabCase('fooBar')).toBe(false);
      expect(isKebabCase('foo_bar')).toBe(false);
      expect(isKebabCase('')).toBe(false);
    });
  });

  describe('isHexByteString', () => {
    it('returns true for valid hex byte strings', () => {
      const guard = isHexByteString(); // no expected length
      expect(guard('0a1b')).toBe(true);
      expect(guard('ff')).toBe(true);
      expect(guard('0A0B0C')).toBe(true);
    });

    it('returns false for invalid strings', () => {
      const guard = isHexByteString();
      expect(guard('0g')).toBe(false);
      expect(guard('123')).toBe(false); // odd length
      expect(guard('')).toBe(false);
    });

    it('respects expectedLength', () => {
      const guard4 = isHexByteString(4);
      expect(guard4('0a1b')).toBe(true);
      expect(guard4('0a1b0c')).toBe(false);

      const guard2 = isHexByteString(2);
      expect(guard2('0a')).toBe(true);
      expect(guard2('0a1b')).toBe(false);
    });
  });

  describe('isBufferLikeObject', () => {
    it('returns true for valid buffer-like objects', () => {
      const obj = { type: 'Buffer', data: [1, 2, 3] };
      expect(isBufferLikeObject(obj)).toBe(true);
    });
    it('returns false for invalid objects', () => {
      expect(isBufferLikeObject({ type: 'Buffer', data: [1, '2'] })).toBe(
        false,
      );
      expect(isBufferLikeObject({ type: 'NotBuffer', data: [1, 2] })).toBe(
        false,
      );
      expect(isBufferLikeObject(null)).toBe(false);
      expect(isBufferLikeObject([])).toBe(false);
    });
  });

  describe('isJSONArrayString', () => {
    it('returns true for valid JSON arrays', () => {
      expect(isJSONArrayString('[1,2,3]')).toBe(true);
      expect(isJSONArrayString('[]')).toBe(true);
    });
    it('returns false for invalid JSON arrays', () => {
      expect(isJSONArrayString('{}')).toBe(false);
      expect(isJSONArrayString('invalid')).toBe(false);
    });
  });

  describe('isJSONObjectString', () => {
    it('returns true for valid JSON objects', () => {
      expect(isJSONObjectString('{"foo":1}')).toBe(true);
      expect(isJSONObjectString('{}')).toBe(true);
    });
    it('returns false for invalid JSON objects', () => {
      expect(isJSONObjectString('[]')).toBe(false);
      expect(isJSONObjectString('invalid')).toBe(false);
    });
  });

  describe('isJsonString', () => {
    it('returns true for valid JSON (array or object)', () => {
      expect(isJsonString('{"foo":1}')).toBe(true);
      expect(isJsonString('[1,2,3]')).toBe(true);
    });
    it('returns false for invalid JSON', () => {
      expect(isJsonString('foo')).toBe(false);
    });
  });

  describe('isAbsoluteUrl', () => {
    it('returns true for valid absolute URLs', () => {
      expect(isAbsoluteUrl('https://example.com')).toBe(true);
      expect(isAbsoluteUrl('http://example.com')).toBe(true);
    });
    it('returns false for invalid URLs', () => {
      expect(isAbsoluteUrl('foo')).toBe(false);
      expect(isAbsoluteUrl('')).toBe(false);
    });
  });

  // describe('isInternalUrl', () => {
  //     it('returns true for relative URLs', () => {
  //         expect(isInternalUrl('/path')).toBe(true);
  //     });
  //     it('returns false for external URLs', () => {
  //         expect(isInternalUrl('https://example.com')).toBe(false);
  //     });
  //     it('returns false for invalid values', () => {
  //         expect(isInternalUrl('')).toBe(false);
  //         expect(isInternalUrl(null)).toBe(false);
  //     });
  // });

  describe('isRGBTuple', () => {
    it('returns true for valid RGB arrays', () => {
      expect(isRGBTuple([0, 128, 255])).toBe(true);
    });
    it('returns false for invalid RGB arrays', () => {
      expect(isRGBTuple([0, -1, 255])).toBe(false);
      expect(isRGBTuple([0, 128])).toBe(false);
      expect(isRGBTuple([0, 128, 256])).toBe(false);
      expect(isRGBTuple(['0', 128, 255])).toBe(false);
    });
  });
});
