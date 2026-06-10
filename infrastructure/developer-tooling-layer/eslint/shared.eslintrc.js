/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["./base.eslintrc.js"],
  env: {
    node: true,
    jest: true,
  },
  rules: {
    "import/no-default-export": "off",
  },
  overrides: [
    {
      files: ["**/*.spec.ts", "**/*.test.ts"],
      env: {
        jest: true,
      },
    },
  ],
};
