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
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    // Possibilita console.log em desenvolvimento
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    // Possibilita debugger em desenvolvimento
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    // Preferência por aspas simples
    'quotes': ['error', 'single'],
    // Ponto e vírgula obrigatório
    'semi': ['error', 'always'],
    // Indentação de 2 espaços
    'indent': ['error', 2],
    // Espaço antes de parênteses em funções
    'space-before-function-paren': ['error', 'never'],
    // Comprimento máximo da linha
    'max-len': ['error', { code: 100 }],
    // Não permite variáveis não utilizadas
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    // Exige uso de === ao invés de ==
    'eqeqeq': ['error', 'always']
  },
  ignorePatterns: [
    'node_modules/',
    'dist/',
    'build/',
    'public/',
    '*.min.js'
  ]
};
