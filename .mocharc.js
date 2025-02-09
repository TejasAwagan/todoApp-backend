module.exports = {
  diff: true,
  extension: ["js"],
  package: "./package.json",
  reporter: "spec",
  slow: 75,
  timeout: 10000,
  ui: "bdd",
  "watch-files": ["test/**/*.js"],
  "watch-ignore": ["node_modules"],
};
