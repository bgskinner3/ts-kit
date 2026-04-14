// unions.test.ts
import { expectTypeTestsToPassAsync } from 'jest-tsd';

describe('Unions Utilities Type Checks', () => {
  it('should pass all type assertions in unions.test-d.ts', async () => {
    await expectTypeTestsToPassAsync(
      'tests/types/utilities/test-setup/unions.test.ts',
    );
  }, 10000);
});
