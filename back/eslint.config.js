import js from '@eslint/js';
import globals from 'globals';

export default [
  {
    ignores: ['node_modules', 'dist']
  },
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.node
    },
    rules: {
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      indent: ['error', 2],

      
      'no-unused-vars': 'warn',
      'no-var': 'error',
      eqeqeq: ['error', 'always']
    }
  }
];