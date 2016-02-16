#! /usr/bin/env node
import childProcess from 'child_process';
import chalk from 'chalk';
import compact from 'lodash/compact';
import isEmpty from 'lodash/isEmpty';

import gitSmartCheckout from './lib/';

// Temporary polifyll for ancient node 0.10
require('es6-promise').polyfill();

childProcess.exec('git status --porcelain -uno | sed s/^...//', (error, files, stderr) => {
  if (error) {
    console.log(chalk.red(error)); // eslint-disable-line
    return;
  }

  if (stderr) {
    console.log(chalk.red(stderr)); // eslint-disable-line
    return;
  }

  files = compact(files.split('\n'));

  if (isEmpty(files)) {
    console.log(chalk.red('There is nothing to checkout.')); // eslint-disable-line
    return;
  }

  gitSmartCheckout(files);
});
