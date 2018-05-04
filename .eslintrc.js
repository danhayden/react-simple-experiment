module.exports = {
  parser: "babel-eslint",
  extends: [
    "plugin:react/recommended",
    "standard",
    "prettier",
    "prettier/react",
    "prettier/standard"
  ],
  env: {
    browser: true,
    node: true
  },
  globals: {
    Promise: true
  }
};
