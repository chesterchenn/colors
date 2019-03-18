module.exports = {
  "env": {
    "browser": true,
    "es6": true
  },
  "extends": "eslint:recommended",
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "rules": {
    "eqeqeq": ["error", "allow-null"],
    "indent": ["warn", 2],
    "no-console": "off",
    "no-unused-vars": ["warn"],
    "no-undef": "off",
    "no-multiple-empty-lines": ["warn", { "max": 1 }],
    "semi": ["warn", "always"],
  }
};
