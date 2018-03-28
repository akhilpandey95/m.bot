/* This Source Code Form is subject to the terms of the MIT
* License. If a copy of the same was not distributed with this
* file, You can obtain one at
* https://github.com/akhilpandey95/m.bot/blob/master/LICENSE.
*/

const colors = require('colors');
const eslint = require('eslint').CLIEngine;

let files_to_lint = [
  'app.js',
  '.eslint.js'
];

let lint_config = new eslint ({
  fix: true,
  useEslintrc: false,
  env: ['node', 'es6'],
  extends: 'eslint-recommended',
  rules: {
    'comma-dangle': 0,
    'curly': [2, 'all'],
    'eqeqeq': [2, 'smart'],
    'indent': [2, 2],
    'keyword-spacing': 2,
    'linebreak-style': [2, 'unix'],
    'new-cap': [2, {'newIsCap': true, 'capIsNew': false}],
    'no-cond-assign': 0,
    'no-spaced-func': 2,
    'no-use-before-define': 2,
    'no-unused-vars': ['error', {'args': 'none'}],
    'no-useless-concat': 'error',
    'one-var': [2, 'never'],
    'prefer-template': 'error',
    'quotes': ['error', 'double'],
    'semi': [2, 'always'],
    'space-before-blocks': 2,
    'space-before-function-paren': [2, 'never'],
    'space-infix-ops': 2,
    'space-unary-ops': 2
  }
});

let lint_report = lint_config.executeOnFiles(files_to_lint);

let log_to_console = (report_file, save_changes) => {
  for (let i = 0; i < report_file.results.length; ++i) {
        process.stdout.write(`${'['}\n`);
        process.stdout.write(` ${'Filepath: '.green} ${report_file.results[i].filePath.bold.red}${','}\n`);
        process.stdout.write(` ${'Errors: '.green} ${report_file.results[i].errorCount.toString().bold.magenta}${','}\n`);
        process.stdout.write(` ${'Warnings: '.green} ${report_file.results[i].warningCount.toString().bold.blue}${','}\n`);
        for (let j = 0; j < report_file.results[i].errorCount; ++j) {
            process.stdout.write(` ${'Error Message: '.green}${j.toString().green} ${report_file.results[i].messages[j].message.bold.yellow}${','}\n`);
            process.stdout.write(` ${'Line, Column: '.green} ${'['}${report_file.results[i].messages[j].line.toString().underline.cyan}${','}${report_file.results[i].messages[j].column.toString().underline.cyan}${']'}\n`);
        }
        process.stdout.write(`${']'}\n`);
    }
    process.stdout.write(` ${'Changes saved to the disk: '.red}${save_changes.toString().bold.yellow}\n`);

    if (save_changes) {
        eslint.outputFixes(report_file);
    }
}

if (process.env.npm_config_save && !process.env.npm_config_info) {
    log_to_console(lint_report, process.env.npm_config_save);
} else if (process.env.npm_config_info && !process.env.npm_config_save) {
    process.stdout.write(`${'Usage: npm run lint [OPTION..]'}\n`);
    process.stdout.write(`${'--info'}                 ${'display this help and exit'}\n`);
    process.stdout.write(`${'--save'}                 ${'boolean flag for writing changes to the disk after linting'}\n`);
    process.stdout.write(`${'Report bugs to https://github.com/akhilpandey95/m.bot/issues'}\n`);
} else if (process.env.npm_config_info && process.env.npm_config_save) {
    process.stdout.write(`${'Sorry, you cannot use both the command flags at the same time'}\n`);
} else if (!process.env.npm_config_info && !process.env.npm_config_save) {
    log_to_console(lint_report, false);
}
