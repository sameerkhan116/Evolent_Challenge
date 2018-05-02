module.exports = {
  "parser": "babel-eslint",
  "extends": "airbnb",
  "plugins": [
    "jsx-a11y",
    "react",
    "import"
  ],
  "globals": {
    "document": 1
  },
  "parserOptions": {
    "ecmaVersion": 7,
    "sourceType": "module"
  },
  "env": {
    "browser": 1
  },
  "rules": {
    "react/jsx-filename-extension": 0,
    "jsx-a11y/label-has-for": 0,
    "react/prop-types": 0,
    "no-console": 0,
    "no-shadow": 0
  }
};