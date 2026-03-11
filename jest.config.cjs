/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  verbose: true,
  // globals: {
  //   'ts-jest': {
  //     useESM: true,
  //     tsconfig: 'tsconfig.json',
  //   },
  // },
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
};
