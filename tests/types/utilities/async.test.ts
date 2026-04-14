// async.test.ts
import { expectTypeTestsToPassAsync } from 'jest-tsd';

describe('Async Utilities Type Checks', () => {
  it('should pass all type assertions in async.test-d.ts', async () => {
    await expectTypeTestsToPassAsync(
      'tests/types/utilities/test-setup/async.test.ts',
    );
  }, 10000);
});
