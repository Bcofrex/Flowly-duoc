// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ['expo', 'eslint:recommended', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true, // Usar comillas simples
        trailingComma: 'none' // No usar comas al final
      }
    ],
    'no-unused-vars': 'warn', // Advertir sobre variables no usadas
    'prefer-arrow-callback': 'error', // Requiere el uso de funciones flecha en callbacks
    'object-curly-spacing': ['error', 'always'] // Espacios dentro de objetos
  }
};
