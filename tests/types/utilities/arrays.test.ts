// arrays.test.ts
import { expectTypeTestsToPassAsync } from 'jest-tsd';

describe('Array Utilities Type Checks', () => {
  it('should pass all type assertions in arrays.test-d.ts', async () => {
    await expectTypeTestsToPassAsync(
      'tests/types/utilities/test-setup/arrays.test.ts',
    );
  }, 10000);
});
