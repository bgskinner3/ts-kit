// strings.test.ts
import { expectTypeTestsToPassAsync } from 'jest-tsd';

describe('String Utilities Type Checks', () => {
  it('should pass all type assertions in strings.test-d.ts', async () => {
    await expectTypeTestsToPassAsync(
      'tests/types/utilities/test-setup/strings.test.ts',
    );
  }, 10000);
});
