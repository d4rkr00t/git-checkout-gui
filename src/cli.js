#! /usr/bin/env node
import childProcess from 'child_process';
import chalk from 'chalk';
import compact from 'lodash/array/compact';
import isEmpty from 'lodash/lang/isEmpty';

import gitSmartCheckout from './lib/';

const files = compact(childProcess
  .execSync('git status --porcelain -uno | sed s/^...//', { encoding: 'utf-8' })
  .split('\n'));

if (isEmpty(files)) {
  console.log(chalk.red('There is nothing to checkout.')); // eslint-disable-line
} else {
  gitSmartCheckout(files);
}
