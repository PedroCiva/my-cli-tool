import globals from 'globals';

export default [
  {
    languageOptions: {
      globals: globals.node,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      'no-undef': 'error', // Disallow the use of undeclared variables
      'no-unused-vars': 'warn', // Disallow unused variables
      'no-extra-semi': 'error', // Disallow unnecessary semicolons
      'no-redeclare': 'error', // Disallow variable redeclaration
      'no-dupe-args': 'error', // Disallow duplicate arguments in functions
      'no-dupe-keys': 'error', // Disallow duplicate keys in objects
      'no-unreachable': 'error', // Disallow unreachable code
      'no-duplicate-case': 'error', // Disallow duplicate cases in switch statements
      'no-console': 'off', // Allow console statements
      'no-debugger': 'warn', // Warn about debugger statements
    },
  },
];
