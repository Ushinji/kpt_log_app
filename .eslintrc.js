module.exports = {
  extends: [
    'airbnb',
    'prettier'
  ],
  plugins: [
    'prettier',
  ],
  env: {
    browser: true,
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'es5',
      },
    ],
  }
};