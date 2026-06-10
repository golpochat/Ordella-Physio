const path = require("node:path");

/** Example backend service ESLint config — copy to services/<name>/.eslintrc.cjs */
module.exports = {
  root: true,
  extends: [
    path.join(
      __dirname,
      "../../infrastructure/developer-tooling-layer/eslint/backend.eslintrc.js",
    ),
  ],
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: ["dist", "node_modules"],
};
