#!/usr/bin/env node --harmony
/*eslint no-console: "off"*/
const CrcModelFormatter = require('./crc-model-formatter');
const CrcModelList = require('./crc-model-list');
const CrcModelVisitor = require('./crc-model-visitor');
const concat = require('concat');
const fs = require('fs');
const glob = require('glob');
const mkdirp = require('mkdirp');
const path = require('path');
const program = require('commander');
const { version } = require('../package');

const logTag = '[crc-reporter]';

/**
 * Prepend JavaScript comments to shebangs (!#) to prevent breaking the AST parser.
 *
 * @private
 * @param {string} code The source code to be parsed.
 *
 * @returns {string} The source code with shebangs commented (if any).
 */
const preprocessShebangs = (code) => code.replace('#!', '// #!');

/**
 * Saves a Class-Responsibility-Collaboration report to the filesystem.
 *
 * @private
 * @param {string} report   The CRC Model report.
 * @param {string} filepath The filesystem location for the report.
 *
 * @throws {Error} throws an `Error` if the report cannot be saved.
 *
 * @returns {void}
 */
const saveToFile = (report, filepath) => {
    const buffer = new Buffer(report);
    const msg = 'Class-Responsibility-Collaborators report';

    fs.open(filepath, 'w', (err, fd) => {
        /* istanbul ignore next: standard error handling for 3rd-party lib */
        if (err) {
            throw err;
        }

        fs.write(fd, buffer, 0, buffer.length, null, (err) => {
            /* istanbul ignore next: standard error handling for 3rd-party lib */
            if (err) {
                throw err;
            }
            fs.close(fd, () => {
                console.info(`${logTag} Saved ${msg} to ${filepath}.`);
            });
        });
    });
};

/**
 * Saves `CrcModels` to file.
 *
 * @private
 * @param {array<string>} files  A list of files to be parsed.
 * @param {string} reportFilePath The filesystem location for the report.
 *
 * @returns {void}
 */
const generateReport = (files, output) => {
    concat(files).then((code) => {
        CrcModelVisitor.customDeclarators = [
            'ClassDeclaration',
            'ClassExpression',
            'VariableDeclaration',
            'VariableDeclarator'
        ];
        const crcModelList = new CrcModelList(preprocessShebangs(code));
        const template = fs.readFileSync(path.resolve(__dirname, 'templates', 'crc-card.html'));
        const formatter = new CrcModelFormatter(template);
        const report = formatter.format(crcModelList);
        saveToFile(report, output);
        CrcModelVisitor.customDeclarators = CrcModelVisitor.defaultDeclarators;
    }, (reason) => {
        console.error(logTag, reason);
    });
};

/**
 * A command-line interface that creates a Class-Responsibility-Collaborators report.
 */
program
    .version(version)
    .description('Generates a Class-Responsibility-Collaboration report for analysis and refactoring.')
    .arguments('<files>')
    .option('-o, --output [output]', 'The report destination. Defaults to "./crc-model-report."')
    .option('-x, --exclude [glob]', 'A glob of files to exclude from analysis."')
    .action((filePattern) => {
        glob(filePattern, (err, files) => {
            /* istanbul ignore next: standard error handling for 3rd-party lib */
            if (err) {
                console.error(`${logTag} glob error`, err);
            }
            const destFile = program.output || './reports/crc-model-report.md';
            const destPath = path.dirname(destFile);
            mkdirp(destPath, (err) => {
                /* istanbul ignore next: standard error handling for 3rd-party lib */
                if (err) {
                    console.error(`${logTag} mkdirp error`, err);
                }
                else {
                    /* istanbul ignore next: standard error handling for 3rd-party lib */
                    try {
                        generateReport(files, destFile);
                    }
                    catch (err) {
                        console.error(logTag, err);
                    }
                }
            });
        });
    });

const isCli = require.main === module;

/* istanbul ignore next */
if (isCli) {
    program.parse(process.argv);
}

module.exports = program;
