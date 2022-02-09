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
  parserOptions: {
    ecmaVersion: 'latest',
  },
  reportUnusedDisableDirectives: true,
  rules: {
    'eslint-comments/disable-enable-pair': [
      'error',
      {
        allowWholeFile: true,
      },
    ],
    'import/no-anonymous-default-export': 'error',
    'import/prefer-default-export': 'off',
    'no-continue': 'off',
    'no-restricted-syntax': 'off',
  },
  settings: {
    'import/resolver': ['node', 'webpack'],
  },
}
