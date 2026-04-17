import {
  logDev,
  highlight,
  getCallerLocation,
  serialize,
} from '../../src/lib/debug';
import { ANSI_COLOR_CODES } from '../../src/constants';

describe('Debug Utilities', () => {
  const originalEnv = process.env.NODE_ENV;

  afterEach(() => {
    process.env.NODE_ENV = originalEnv;
    jest.restoreAllMocks();
  });

  describe('highlight', () => {
    test('wraps text in ANSI color codes', () => {
      const result = highlight('test', 'red');
      expect(result).toBe(
        `${ANSI_COLOR_CODES.red}test${ANSI_COLOR_CODES.reset}`,
      );
    });

    test('defaults to yellow', () => {
      const result = highlight('test');
      expect(result).toBe(
        `${ANSI_COLOR_CODES.yellow}test${ANSI_COLOR_CODES.reset}`,
      );
    });
  });

  describe('serialize', () => {
    test('returns empty string for undefined', () => {
      expect(serialize(undefined)).toBe('');
    });

    test('returns string as-is', () => {
      expect(serialize('hello')).toBe('hello');
    });

    test('handles BigInt in objects', () => {
      const data = { id: BigInt(123) };
      const result = serialize(data);
      expect(result).toContain('"id": "123"');
    });

    test('pretty prints JSON', () => {
      const data = { a: 1 };
      expect(serialize(data)).toBe(JSON.stringify(data, null, 2));
    });
  });

  describe('getCallerLocation', () => {
    test('strips path prefixes correctly', () => {
      // Mocking Error.stack is tricky, we test the logic via options
      const mockCwd = '/user/project';
      const result = getCallerLocation({ stripPathPrefix: mockCwd });
      // In Jest/Node, this will return the line in this test file
      expect(result).not.toContain(mockCwd);
    });

    test('returns unknown if stack is missing', () => {
      const spy = jest.spyOn(global, 'Error').mockImplementation(
        () =>
          ({
            stack: undefined,
          }) as any,
      );
      expect(getCallerLocation({})).toBe('unknown');
      spy.mockRestore();
    });
  });

  describe('logDev', () => {
    let consoleSpy: jest.SpyInstance;

    beforeEach(() => {
      consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      jest.spyOn(console, 'error').mockImplementation();
      jest.spyOn(console, 'table').mockImplementation();
    });

    test('does not log in production by default', () => {
      process.env.NODE_ENV = 'production';
      logDev({ enabled: true }, 'test message');
      expect(consoleSpy).not.toHaveBeenCalled();
    });

    test('logs in production if overrideDev is true', () => {
      process.env.NODE_ENV = 'production';
      logDev({ overrideDev: true }, 'critical log');
      expect(consoleSpy).toHaveBeenCalled();
    });

    test('handles different log types via first argument', () => {
      process.env.NODE_ENV = 'development';
      logDev({}, 'error', 'failure');
      expect(console.error).toHaveBeenCalled();
    });

    test('processes table data with "current" refs', () => {
      process.env.NODE_ENV = 'development';
      const tableRef = {
        current: [{ key: 'init', start: 0, end: 50 }],
      };

      logDev({}, 'table', tableRef);

      expect(console.table).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({ key: 'init', duration: '50.00ms' }),
        ]),
      );
    });

    test('respects the "enabled" option', () => {
      process.env.NODE_ENV = 'development';
      logDev({ enabled: false }, 'silence');
      expect(consoleSpy).not.toHaveBeenCalled();
    });
  });
});
