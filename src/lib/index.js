import inquirer from 'inquirer';
import chalk from 'chalk';
import childProcess from 'child_process';
import isEmpty from 'lodash/lang/isEmpty';

import DynamicCheckbox from './dynamic-checkbox';
import prepareChoices from './prepare-choices';
import manageState from './manage-state';

/**
 * Git Smart checkout
 *
 * @param {String[]} files
 */
export default function gitSmartCheckout(files) {
  inquirer.registerPrompt('dynamic-checkbox', DynamicCheckbox);

  let choices = prepareChoices(files, { chalk });

  const prompt = {
    type: 'dynamic-checkbox',
    message: 'Select files to checkout',
    name: 'files',
    choices: choices,
    pageSize: 20,
    onSelect(index, choice) {
      choices = manageState(choices, choice, { chalk });
      return choices;
    }
  };

  inquirer.prompt([prompt], function (answers) {
    console.log(); // eslint-disable-line

    if (isEmpty(answers.files)) {
      console.log(chalk.red('Exit. You didn\'t choose anything!')); // eslint-disable-line
    } else {
      const promiseList = [];

      answers.files.forEach((file) => {
        console.log(chalk.yellow(`Checkout: ${file}`)); // eslint-disable-line

        promiseList.push(new Promise((resolve) => {
          const cp = childProcess.spawn(`git`, ['checkout', file]);

          cp.stderr.on('data', (data) => {
            console.log(chalk.red(data)); // eslint-disable-line
          });

          cp.on('exit', resolve);
        }));
      });

      Promise
        .all(promiseList)
        .then(() => {
          console.log(); // eslint-disable-line
          console.log(chalk.green('Done!')); // eslint-disable-line
          console.log(); // eslint-disable-line
        });
    }
  });
}
