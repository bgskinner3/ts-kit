import {
  isBufferLikeObject,
  isRGBTuple,
  isPhoneNumber,
  isEmail,
} from '../../src/lib/guards/core/refined';
import {
  isJSONArrayString,
  isJSONObjectString,
  isJsonString,
  isCamelCase,
  isSnakeCase,
  isKebabCase,
  isHexByteString,
  isHTMLString,
  isHexColor,
} from '../../src/lib/guards/core/string-guards';
import { isAbsoluteUrl } from '../../src/lib/guards/core/link-guards';
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
  describe('isPhoneNumber', () => {
    it('returns true for valid US numbers', () => {
      expect(isPhoneNumber('123-456-7890')).toBe(true);
      expect(isPhoneNumber('(123) 456-7890')).toBe(true);
      expect(isPhoneNumber('+1 123-456-7890')).toBe(true);
    });

    it('returns true for valid EU numbers', () => {
      expect(isPhoneNumber('+44 20 7946 0958')).toBe(true);
      expect(isPhoneNumber('+49-30-1234567')).toBe(true);
    });

    it('returns true for valid generic international numbers', () => {
      expect(isPhoneNumber('+91 98765 43210')).toBe(true);
      expect(isPhoneNumber('+61 412 345 678')).toBe(true);
    });

    it('returns false for invalid numbers', () => {
      expect(isPhoneNumber('abc')).toBe(false);
      expect(isPhoneNumber('123')).toBe(false);
      expect(isPhoneNumber('')).toBe(false);
      expect(isPhoneNumber(null)).toBe(false);
    });
  });
  describe('isEmail', () => {
    it('returns true for valid emails', () => {
      expect(isEmail('user@example.com')).toBe(true);
      expect(isEmail('first.last+tag@sub.domain.co.uk')).toBe(true);
      expect(isEmail('user_name-123@domain.io')).toBe(true);
      expect(isEmail('simple@example.co')).toBe(true);
    });

    it('returns false for invalid emails', () => {
      expect(isEmail('')).toBe(false); // empty string
      expect(isEmail('plainaddress')).toBe(false); // no @
      expect(isEmail('@missing-local.com')).toBe(false); // missing local part
      expect(isEmail('user@.com')).toBe(false); // missing domain name
      expect(isEmail('user@domain..com')).toBe(false); // double dot in domain
    });

    it('returns false for non-string values', () => {
      expect(isEmail(null)).toBe(false);
      expect(isEmail(undefined)).toBe(false);
      expect(isEmail(12345)).toBe(false);
      expect(isEmail({})).toBe(false);
    });
  });
  describe('isHTMLString', () => {
    it('returns true for safe HTML tags', () => {
      expect(isHTMLString('<div>Hello</div>')).toBe(true);
      expect(isHTMLString('<span>Text</span>')).toBe(true);
      expect(isHTMLString('<p>Paragraph</p>')).toBe(true);
      expect(isHTMLString('<ul><li>Item</li></ul>')).toBe(true);
      expect(isHTMLString('<b>Bold</b>')).toBe(true);
      expect(isHTMLString('<i>Italic</i>')).toBe(true);
      expect(isHTMLString('<a href="https://example.com">Link</a>')).toBe(true);
      expect(isHTMLString('<br>')).toBe(true);
    });

    it('returns true for HTML entities', () => {
      expect(isHTMLString('&nbsp;')).toBe(true);
      expect(isHTMLString('&copy;')).toBe(true);
    });

    it('returns false for disallowed or dangerous HTML tags', () => {
      expect(isHTMLString('<script>alert(1)</script>')).toBe(false);
      expect(isHTMLString('<iframe src="evil.com"></iframe>')).toBe(false);
      expect(isHTMLString('<object></object>')).toBe(false);
      expect(isHTMLString('<embed></embed>')).toBe(false);
      expect(isHTMLString('<div style="color:red">Test</div>')).toBe(true); // style is allowed in tag, only tag name matters here
    });

    it('returns false for plain text or invalid HTML', () => {
      expect(isHTMLString('Just text')).toBe(false);
      expect(isHTMLString('Hello & world')).toBe(false); // no entity at end
      expect(isHTMLString('123')).toBe(false);
      expect(isHTMLString('')).toBe(false);
    });

    it('returns false for non-string values', () => {
      expect(isHTMLString(null)).toBe(false);
      expect(isHTMLString(undefined)).toBe(false);
      expect(isHTMLString(123)).toBe(false);
      expect(isHTMLString({})).toBe(false);
      expect(isHTMLString([])).toBe(false);
    });
  });
  describe('isHexColor', () => {
    it('returns true for valid 3-digit and 6-digit hex colors', () => {
      // 3-digit hex
      expect(isHexColor('#fff')).toBe(true);
      expect(isHexColor('#ABC')).toBe(true);
      // 6-digit hex
      expect(isHexColor('#123456')).toBe(true);
      expect(isHexColor('#abcdef')).toBe(true);
      expect(isHexColor('#ABCDEF')).toBe(true);
    });

    it('returns false for invalid hex colors', () => {
      // Too short / too long
      expect(isHexColor('#ff')).toBe(false);
      expect(isHexColor('#12345')).toBe(false);
      expect(isHexColor('#1234567')).toBe(false);

      // Invalid characters
      expect(isHexColor('#12G')).toBe(false);
      expect(isHexColor('#12345Z')).toBe(false);

      // Missing #
      expect(isHexColor('123456')).toBe(false);
      expect(isHexColor('fff')).toBe(false);

      // Non-string types
      expect(isHexColor(null)).toBe(false);
      expect(isHexColor(undefined)).toBe(false);
      expect(isHexColor(123456)).toBe(false);
      expect(isHexColor({})).toBe(false);

      // Empty string
      expect(isHexColor('')).toBe(false);
    });

    it('handles edge cases with mixed case', () => {
      expect(isHexColor('#AbC')).toBe(true);
      expect(isHexColor('#aBcDeF')).toBe(true);
    });
  });
});
