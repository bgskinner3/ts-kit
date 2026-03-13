/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  verbose: true,
  coverageReporters: ['text', 'text-summary'],
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/utils/dev-only/**'],
  transform: {
    // 🔹 This is the fix for the warning
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.json', // Ensure it points to your config
      },
    ],
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}', // Include all TS files in src
    '!src/**/*.d.ts', 
    '!src/**/index.ts',
    '!src/global.d.ts', 
    '!src/managers/**', 
    '!src/types/**', 
    '!**/node_modules/**', 
  ],
};
