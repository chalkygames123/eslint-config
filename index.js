module.exports = {
  extends: [
    'airbnb-base',
    'plugin:eslint-comments/recommended',
    'plugin:regexp/recommended',
  ],
  env: {
    browser: true,
    es2021: true,
  },
  reportUnusedDisableDirectives: true,
  rules: {
    'eslint-comments/disable-enable-pair': [
      'error',
      {
        allowWholeFile: true,
      },
    ],
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'unknown',
          'parent',
          'sibling',
          'index',
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
        },
      },
    ],
    'import/prefer-default-export': 'off',
  },
  settings: {
    'import/resolver': ['node', 'webpack'],
  },
}
