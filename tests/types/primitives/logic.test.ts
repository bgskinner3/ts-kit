// logic.test.ts
import { expectTypeTestsToPassAsync } from 'jest-tsd';

describe('Logic Primitive Type Checks', () => {
  it('should pass all type assertions in logic.test-d.ts', async () => {
    await expectTypeTestsToPassAsync(
      'tests/types/primitives/test-setup/logic.test.ts',
    );
  }, 10000);
});
