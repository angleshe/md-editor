module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['eslint-config-ts', 'plugin:prettier/recommended'],
  parserOptions: {
    project: './tsconfig.json'
  },
  rules: {
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/interface-name-prefix': [
      'error',
      { prefixWithI: 'always', allowUnderscorePrefix: true }
    ],
    '@typescript-eslint/class-name-casing': [
      'error',
      {
        allowUnderscorePrefix: true
      }
    ],
    'comma-dangle': ['error', 'never'],
    complexity: [
      'error',
      {
        max: 15
      }
    ],
    'no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-constructor': 'error'
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', './src/'],
          ['lib', './src/lib/'],
          ['public', './src/public/'],
          ['res', './src/res/'],
          ['script', './src/script/'],
          ['style', './src/style/']
        ],
        extensions: ['.ts', '.js', '.json', '.modules.scss', '.scss']
      }
    }
  }
};
