const path = require("node:path");

/** Example frontend app ESLint config — copy to apps/<name>/.eslintrc.cjs */
module.exports = {
  root: true,
  extends: [
    path.join(
      __dirname,
      "../../infrastructure/developer-tooling-layer/eslint/frontend.eslintrc.js",
    ),
  ],
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: [".next", "node_modules"],
};
