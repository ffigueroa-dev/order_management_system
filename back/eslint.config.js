import js from '@eslint/js';
import globals from 'globals';

export default [
  {
    ignores: ['node_modules', 'dist'],
  },

  js.configs.recommended,

  {
    files: ['**/*.js'],
    ignores: ['src/db/migrations/**'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.node,
    },
    rules: {
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      indent: ['error', 2],

      'no-unused-vars': 'warn',
      'no-var': 'error',
      eqeqeq: ['error', 'always'],
    },
  },

  {
    files: ['src/db/migrations/**/*.cjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'script',
      globals: globals.node,
    },
    rules: {
      'no-unused-vars': 'off',
      'no-undef': 'off',
      'no-var': 'off',
    },
  },

  {
    files: ['src/db/config.cjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'script',
      globals: globals.node,
    },
    rules: {
      'no-undef': 'off',
    },
  },
];