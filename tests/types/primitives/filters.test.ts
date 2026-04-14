// filters.test.ts
import { expectTypeTestsToPassAsync } from 'jest-tsd';
/**
 *
 */
describe('Filter Primitives Type Checks', () => {
  it('should pass all type assertions in filters.test-d.ts', async () => {
    await expectTypeTestsToPassAsync(
      'tests/types/primitives/test-setup/filters.test.ts',
    );
  }, 10000);
});
