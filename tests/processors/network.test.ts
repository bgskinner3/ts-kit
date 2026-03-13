/**
 * @jest-environment jsdom
 */
import { fetchJson, delay, retry } from '../../src/lib/processors/network';

describe('Network Processor Utils', () => {
  describe('delay', () => {
    it('should resolve after the specified time', async () => {
      jest.useFakeTimers();
      const promise = delay(1000);

      jest.advanceTimersByTime(1000);
      await expect(promise).resolves.toBeUndefined();
      jest.useRealTimers();
    });
  });

  describe('fetchJson', () => {
    const mockUrl = 'https://api.example.com';

    beforeEach(() => {
      global.fetch = jest.fn();
    });

    it('returns parsed JSON on successful response', async () => {
      const mockData = { id: 1, name: 'Test' };
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => mockData,
      });

      const result = await fetchJson(mockUrl);
      expect(result).toEqual(mockData);
      expect(global.fetch).toHaveBeenCalledWith(mockUrl);
    });

    it('throws a descriptive error when response is not ok', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      });

      await expect(fetchJson(mockUrl)).rejects.toThrow(/Failed to fetch.*404/);
    });

    it('throws error when JSON parsing fails', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: () => Promise.reject(new Error('Invalid JSON')),
      });

      await expect(fetchJson(mockUrl)).rejects.toThrow(/Failed to parse JSON/);
    });
  });

  describe('retry', () => {
    let _warnSpy: jest.SpyInstance;
    let _errorSpy: jest.SpyInstance;

    beforeEach(() => {
      _warnSpy = jest.spyOn(console, 'warn').mockImplementation();
      _errorSpy = jest.spyOn(console, 'error').mockImplementation();
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should return result on first success', async () => {
      const fn = jest.fn().mockResolvedValue('success');
      const result = await retry(fn);
      expect(result).toBe('success');
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('should retry on rate limit errors and eventually succeed', async () => {
      const fn = jest
        .fn()
        .mockRejectedValueOnce({ message: 'Too Many Requests' })
        .mockResolvedValueOnce('success');

      const result = await retry(fn, 5, 10);
      expect(result).toBe('success');
      expect(fn).toHaveBeenCalledTimes(2); // ✅ only 2 calls
    });

    it('should fail immediately if the error is not a rate limit', async () => {
      const fn = jest.fn().mockRejectedValue(new Error('Normal Error'));
      await expect(retry(fn, 3, 10)).rejects.toThrow('Normal Error');
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('should throw after exhausting all retries', async () => {
      const fn = jest.fn().mockRejectedValue({ message: 'Too Many Requests' });
      await expect(retry(fn, 2, 10)).rejects.toThrow('Too Many Requests');
      expect(fn).toHaveBeenCalledTimes(3); // Initial + 2 retries
    });
  });
});
