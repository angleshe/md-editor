module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['eslint-config-ts', 'plugin:prettier/recommended'],
  parserOptions: {
    project: './tsconfig.json'
  },
  rules: {
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-empty-function': ['error', { allow: ['methods'] }],
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
    'no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-constructor': 'error',
    '@typescript-eslint/unbound-method': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off'
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
