module.exports = {
  root: true,
  extends: ["@ordella/config-eslint"],
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: ["dist", "node_modules"],
};
