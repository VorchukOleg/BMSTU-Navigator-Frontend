import globals from 'globals';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';

export default [
  { files: ['**/*.{js,mjs,cjs,jsx}'] },
  { languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
  { languageOptions: { globals: globals.browser } },
  pluginReactConfig,
  {
    rules: {
      'max-len': ['error', { code: 120 }],
      camelcase: ['error', { ignoreDestructuring: true }],
      semi: ['error', 'always'], // точки с запятой
      'eol-last': ['error', 'always'], // Пустая строка в конце файла
      quotes: ['error', 'single'], // Одинарные кавычки
      'no-unused-vars': 'off', // Запрет неиспользуемых переменных
      'no-undef': 'error', // Запрет использования необъявленных переменных
      'no-trailing-spaces': 'error', // Запрет завершающих пробелов
      'no-var': 'error', // Запрет использования var
      'prefer-const': 'error', // Предпочтение const
      'no-tabs': 'error', // Запрет использования табуляции
      'newline-before-return': 'error', // Перенос строки перед return
      'no-irregular-whitespace': 'error', // Запрет неправильных пробелов
      'no-multi-spaces': 'error', // Запрет множественных пробелов
      'no-case-declarations': 'off',
    },
  },
];
