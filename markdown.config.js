/* eslint global-require: "off" */
/* eslint node/no-unpublished-require: "off" */
const path = require("path");
const markdownMagic = require("markdown-magic");
const markdownMagicDependencyTable = require("markdown-magic-dependency-table");
const markdownMagicPackageScripts = require("markdown-magic-package-scripts");

const config = {
  transforms: {
    DEPENDENCYTABLE: markdownMagicDependencyTable,
    SCRIPTS: markdownMagicPackageScripts
  },
  DEBUG: false
};

let markdownPath = path.join(__dirname, "*.md");
markdownMagic(markdownPath, config);

markdownPath = path.join(__dirname, ".github/CONTRIBUTING.md");
markdownMagic(markdownPath, config);
