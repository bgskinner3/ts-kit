/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  verbose: true,
  coverageReporters: ['text', 'text-summary'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.json',
        // 🚨 CRITICAL: Set to false to enable full type-checking
        isolatedModules: false,
        // 🚨 CRITICAL: Ensure diagnostics aren't set to warnOnly
        diagnostics: {
          warnOnly: false,
        },
      },
    ],
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/index.ts',
    '!src/global.d.ts',
    '!src/managers/**',
    '!src/types/**',
    '!**/node_modules/**',
    '!src/lib/processors/visual.ts'
  ],
};
