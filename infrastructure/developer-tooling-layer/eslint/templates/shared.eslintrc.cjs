const path = require("node:path");

/** Example shared package ESLint config — copy to packages/<name>/.eslintrc.cjs */
module.exports = {
  root: true,
  extends: [
    path.join(
      __dirname,
      "../../infrastructure/developer-tooling-layer/eslint/shared.eslintrc.js",
    ),
  ],
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: ["dist", "node_modules"],
};
