#! /usr/bin/env node
import childProcess from 'child_process';
import chalk from 'chalk';
import compact from 'lodash/array/compact';
import isEmpty from 'lodash/lang/isEmpty';

import gitSmartCheckout from './lib/';

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
