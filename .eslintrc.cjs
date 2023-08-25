/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jsx-a11y/recommended'
  ],
  plugins: ['tailwindcss'],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  rules: {
    'tailwindcss/no-custom-classname': 'off',
    'tailwindcss/classnames-order': 'off',
    'prefer-const': 'error'
  }
}
