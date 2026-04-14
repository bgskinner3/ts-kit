// objects.test.ts
import { expectTypeTestsToPassAsync } from 'jest-tsd';

describe('Objects Utilities Type Checks', () => {
  it('should pass all type assertions in objects.test-d.ts', async () => {
    await expectTypeTestsToPassAsync(
      'tests/types/utilities/test-setup-object/index.test-d.ts',
    );
  }, 10000);
});
