import { describe, it, expect } from 'vitest';
import { getCallerInfo } from '../src/core/stacktrace';

describe('Stacktrace', () => {
  it('should return stack info', () => {
    const info = getCallerInfo(0); // 0 depth might be inside the test function
    // We expect some file info. In test env, it depends on how code is run (eval vs file).
    // Vitest runs in files.
    expect(info.file).toBeDefined();
    expect(info.line).toBeDefined();
  });

  // Comprehensive stack parsing logic is hard to test cross-platform in unit tests without mocking Error.stack
  // But we can check if it returns *something*.
});
