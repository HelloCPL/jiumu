const { defineConfig } = require('eslint-define-config')

module.exports = defineConfig({
  root: true,
  // To specify environments in a configuration file
  env: {
    es6: true,
    browser: true,
    node: true
  },
  // use your own parser
  parser: 'vue-eslint-parser',
  extends: [
    'plugin:markdown/recommended',
    'plugin:jsonc/recommended-with-jsonc',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended'
  ],

  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    },
    project: ['./tsconfig.json']
  },

  rules: {
    // ts
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': ['warn'],
    'vue/custom-event-name-casing': 'off',
    'no-use-before-define': 'off',
    'no-unused-vars': ['warn'],
    'space-before-function-paren': 'off',
    quotes: ['error', 'single'],
    'comma-dangle': ['error', 'never'],
    semi: ['error', 'never'],
    'max-len': ['error', 120]
  }
})
