import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  {
    ignores: ['node_modules', 'dist'],
  },

  js.configs.recommended,

  reactHooks.configs.flat.recommended,

  reactRefresh.configs.vite,

  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
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
];