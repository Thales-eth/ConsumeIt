// @ts-check

import eslint from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';

export default {
  ignores: ['dist', 'node_modules'],
  ...eslint.configs.recommended,
  ...tseslint.configs.recommended,
  languageOptions: {
    parser,
    parserOptions: {
      ecmaVersion: 2024,
      sourceType: 'module'
    }
  },
  plugins: {
    '@typescript-eslint': tseslint
  },
  rules: {
    '@typescript-eslint/no-namespace': 'off',
    camelcase: 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'error'
  }
};
