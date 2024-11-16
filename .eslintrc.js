export default {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "prettier",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "prettier"],
  rules: {
    "prettier/prettier": "warn",
    "react/react-in-jsx-scope": "off",
    "no-unused-vars": "warn",
    "no-console": "off",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
