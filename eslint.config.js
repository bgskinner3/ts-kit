/* eslint-disable @typescript-eslint/no-require-imports */
const js = require('@eslint/js');
const tseslint = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const prettier = require('eslint-plugin-prettier');
const globals = require('globals');
/** @type {import("eslint").FlatConfig[]} */
module.exports = [
  // 🔹 Ignore build / system directories
  {
    ignores: ['node_modules', 'dist', 'coverage'],
  },
  {
    files: ['solid-core/**/*.ts'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      // Relaxing 'any' is helpful for the complex Compiler API
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  // 🔹 Core JS + TS linting
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
        ...js.configs.recommended.globals,
        ...tseslint.configs.recommended.globals,
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        module: 'writable',
        require: 'readonly',
        process: 'readonly',
        URL: 'readonly',
        location: 'readonly',
        HTMLDivElement: 'readonly',
        HTMLElement: 'readonly',
        fetch: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      prettier,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,

      // Custom tweaks
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },
  {
    files: ['**/*.test.ts', '**/*.spec.ts'],
    languageOptions: {
      globals: {
        describe: true,
        it: true,
        expect: true,
        beforeEach: true,
        afterEach: true,
        test: true,
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'object-curly-spacing': ['error', 'always', { objectsInObjects: true }],
    },
  },
];
