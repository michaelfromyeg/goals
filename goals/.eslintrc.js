module.exports = {
  root: true,
  extends: "@react-native",
  rules: {
    "prettier/prettier": [
      "error",
      {
        arrowParens: "avoid",
        bracketSpacing: true,
        jsxBracketSameLine: false,
        printWidth: 120,
        semi: true,
        singleQuote: false,
        tabWidth: 2,
        trailingComma: "all",
      },
    ],
    quotes: "off",
    indent: "off",
    "max-len": "off",
  },
};
