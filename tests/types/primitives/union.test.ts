// union.test.ts
import { expectTypeTestsToPassAsync } from 'jest-tsd';

describe('Union  Primitive Type Checks', () => {
  it('should pass all type assertions in union.test-d.ts', async () => {
    await expectTypeTestsToPassAsync(
      'tests/types/primitives/test-setup/union.test.ts',
    );
  }, 10000);
});
