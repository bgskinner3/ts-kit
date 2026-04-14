// object.test.ts
import { expectTypeTestsToPassAsync } from 'jest-tsd';

describe('Object Primitive Type Checks', () => {
  it('should pass all type assertions in object.test-d.ts', async () => {
    // Points to this file to resolve 'object.test-d.ts' in the same folder
    await expectTypeTestsToPassAsync(
      'tests/types/primitives/test-setup/objects.test.ts',
    );
  }, 10000);
});
