module.exports = {
  parser: 'babel-eslint',
  extends: ['unobtrusive', 'unobtrusive/react'],
  env: {
    browser: true,
    node: true
  },
  globals: {
    Promise: true
  }
}
