module.exports = {
  env: {
    es2020: true,
    node: true,
    jest: true
  },
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'import/extensions': ['error', 'ignorePackages', { ts: 'never' }],
    'import/prefer-default-export': 'off',
    camelcase: 'off',
    'class-methods-use-this': 'off',
    'func-names': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '_'
      }
    ],
    '@typescript-eslint/no-explicit-any': 'off',
    'no-useless-constructor': 'off',
    'import/no-extraneous-dependencies': 'off',
    '@typescript-eslint/no-var-requires': 'off'
  },
  settings: {
    'import/resolver': {
      typescript: {}
    }
  }
};
