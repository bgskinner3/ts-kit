const js = require('@eslint/js');
const tseslint = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const prettier = require('eslint-plugin-prettier');

/** @type {import("eslint").FlatConfig[]} */
module.exports = [
  // 🔹 Ignore build / system directories
  {
    ignores: ['node_modules', 'dist', 'coverage'],
  },

  // 🔹 Core JS + TS linting
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      prettier,
    },
    rules: {
      // Spread recommended rules instead of using `extends`
      ...js.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,

      // Prettier integration
      'prettier/prettier': 'error',

      // Custom tweaks
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },

  // 🔹 Test files (Jest / Vitest)
  {
    files: ['**/*.test.ts', '**/*.spec.ts'],
    languageOptions: {
      globals: {
        describe: true,
        it: true,
        expect: true,
        beforeEach: true,
        afterEach: true,
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];
