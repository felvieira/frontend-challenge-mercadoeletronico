import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import ts from 'typescript-eslint'

export default [
  js.configs.recommended,
  ...ts.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  {
    ignores: ['dist/', 'node_modules/', '*.cjs', 'coverage/']
  },
  {
    files: ['**/*.vue', '**/*.ts', '**/*.tsx', '**/*.js'],
    languageOptions: {
      parserOptions: {
        parser: ts.parser,
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    },
    rules: {
      'vue/multi-word-component-names': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      'vue/require-default-prop': 'off'
    }
  }
]