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
    before: true,
    beforeEach: true,
    after: true,
    afterEach: true,
    describe: true,
    expect: true,
    it: true,
    jest: true,
    Promise: true,
    test: true
  }
};
