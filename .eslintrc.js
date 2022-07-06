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
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  extends: [
    'plugin:markdown/recommended',
    'plugin:jsonc/recommended-with-jsonc',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  overrides: [
    {
      files: ['*.json', '*.json5', '*.jsonc'],
      parser: 'jsonc-eslint-parser',
    },
    {
      files: ['*.d.ts'],
      rules: {
        'import/no-duplicates': 'off',
      },
    }
  ],
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
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-unused-vars': ['warn'],
    // vue3
    'vue/custom-event-name-casing': 'off',
    'vue/html-closing-bracket-newline': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/html-self-closing': 'off',
    'vue/mustache-interpolation-spacing': 'off',
    'vue/multi-word-component-names': 'warn',
    'vue/v-bind-style': 'off',
    'vue/v-on-style': 'off',
    'vue/v-slot-style': 'off',
    // other
    'space-before-function-paren': 'off',
    'no-console': 'off',
    'no-debugger': 'warn',
    'no-use-before-define': 'off',
    'quotes': ['warn', 'single'],
    'comma-dangle': ['warn', 'never'],
    'semi': ['warn', 'never'],
    'max-len': ['warn', 100],
    'indent': ['warn', 2]
  }
})
