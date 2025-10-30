module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended'
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  rules: {
    'max-len': ['error', { code: 100 }],
    'indent': ['error', 2],
    'no-console': 'error',
    'no-useless-escape': 'error',
    'no-undef': 'error'
  },
  overrides: [
    {
      files: ['src/utils/logger.js'],
      rules: {
        'no-console': 'off' // Console statements são intencionais no logger
      }
    },
    {
      files: ['src/js/new-design.legacy.js'],
      rules: {
        'no-console': 'off', // Arquivo legacy mantido para referência
        'no-undef': 'off'   // Pode ter dependências não definidas
      }
    }
  ],
  ignorePatterns: [
    'dist/',
    'node_modules/',
    'src/js/new-design.js' // Arquivo legacy
  ]
};