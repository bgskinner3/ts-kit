// core.test.ts
import { expectTypeTestsToPassAsync } from 'jest-tsd';

describe('Core Utilities Type Checks', () => {
  it('should pass all type assertions in core.test-d.ts', async () => {
    await expectTypeTestsToPassAsync(
      'tests/types/utilities/test-setup/core.test.ts',
    );
  }, 10000);
});
