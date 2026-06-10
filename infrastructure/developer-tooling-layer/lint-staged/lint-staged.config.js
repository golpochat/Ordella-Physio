const path = require("node:path");

const toolingRoot = path.join(__dirname, "..");
const prettierConfig = path.join(toolingRoot, "prettier", "prettier.config.js");

/** @type {import("lint-staged").Config} */
module.exports = {
  "*.{js,jsx,ts,tsx,mjs,cjs}": [
    `eslint --fix --max-warnings=0`,
    `prettier --write --config ${prettierConfig}`,
  ],
  "*.{json,md,yml,yaml,css,scss,html}": [
    `prettier --write --config ${prettierConfig}`,
  ],
};
