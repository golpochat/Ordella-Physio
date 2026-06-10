/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["./base.eslintrc.js", "plugin:nestjs/recommended"],
  plugins: ["nestjs"],
  env: {
    node: true,
    jest: true,
  },
  rules: {
    "nestjs/use-validation-pipe": "off",
    "nestjs/use-guards": "off",
    "nestjs/api-method-should-specify-api-response": "off",
  },
  overrides: [
    {
      files: ["**/*.spec.ts", "**/*.test.ts"],
      rules: {
        "@typescript-eslint/no-explicit-any": "off",
      },
    },
  ],
};
