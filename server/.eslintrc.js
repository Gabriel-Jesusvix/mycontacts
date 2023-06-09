module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'class-methods-use-this': 'off',
    camelcase: 'off',
    'no-sequences': 'off',
    'no-unexpected-multiline': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-unused-vars': ['error', { arrIgnorePattern: 'next' }],
  },
};
