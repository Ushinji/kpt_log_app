module.exports = {
  extends: [
    'airbnb',
    'prettier',
    "prettier/flowtype",
    "prettier/react",
    "prettier/standard"
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
    "jsx-a11y/anchor-is-valid": [
      'error',
      {
        components: ['Link'],
        specialLink: ['to', 'hrefLeft', 'hrefRight'],
        aspects: ['noHref', 'invalidHref', 'preferButton'],
      },
    ],
    //"react/jsx-one-expression-per-line": "off",
  }
};